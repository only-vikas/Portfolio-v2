"use client";

import { useRef, useEffect, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * Color palette derived from the 2D reference (ava1.png):
 * - Hair: warm brown tones
 * - Skin: warm peach/beige
 * - Hoodie/Jacket: steel blue / denim blue
 * - Inner shirt: off-white / cream
 * - Backpack straps: warm brown leather
 */
const COLORS = {
  hair: new THREE.Color("#5C3A1E"),           // Rich brown hair
  hairHighlight: new THREE.Color("#7A4E2A"),   // Lighter highlights
  skin: new THREE.Color("#E8B89D"),            // Warm peach skin
  skinShadow: new THREE.Color("#D4A088"),      // Slightly darker
  hoodie: new THREE.Color("#4A6B8A"),          // Steel blue hoodie
  hoodieInner: new THREE.Color("#D4CFC7"),     // Light cream hood lining
  shirt: new THREE.Color("#E5DFD5"),           // Off-white shirt
  shirtButtons: new THREE.Color("#C5BFB4"),    // Buttons
  backpackStrap: new THREE.Color("#8B6039"),    // Brown leather
  pendant: new THREE.Color("#1a1a1a"),         // Dark pendant/necklace
  stubble: new THREE.Color("#C09A80"),         // Chin stubble tone
};

/**
 * Apply vertex colors to the single-mesh model based on position.
 * The model is a bust (~chest up), so we segment by Y coordinate:
 * 
 * Model bbox: center=(-0.002, -0.006, -0.006) size=(1.453, 1.989, 0.885)
 * So Y ranges roughly from -1.0 to +1.0
 * 
 * Segmentation (from top to bottom):
 *   Y > 0.45: Hair (top of head)
 *   Y > 0.15: Face / Skin (forehead to chin)
 *   Y > -0.10: Neck / Collar area (transition zone)
 *   Y > -0.40: Upper clothing (hoodie + shirt collar)
 *   Y <= -0.40: Lower clothing (hoodie body)
 * 
 * + X-based adjustments for backpack straps (far left/right on back)
 * + Z-based adjustments for face vs back of head
 */
function applyVertexColors(mesh: THREE.Mesh) {
  const geometry = mesh.geometry;
  const positions = geometry.attributes.position;
  const vertexCount = positions.count;

  // Compute normals if not present
  if (!geometry.attributes.normal) {
    geometry.computeVertexNormals();
  }
  const normals = geometry.attributes.normal;

  // Create color attribute
  const colors = new Float32Array(vertexCount * 3);

  // Compute bounding box for normalization
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox!;
  const minY = bbox.min.y;
  const maxY = bbox.max.y;
  const rangeY = maxY - minY;
  const minX = bbox.min.x;
  const maxX = bbox.max.x;
  const rangeX = maxX - minX;
  const minZ = bbox.min.z;
  const maxZ = bbox.max.z;
  const rangeZ = maxZ - minZ;

  const tempColor = new THREE.Color();

  for (let i = 0; i < vertexCount; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);

    // Normalized coordinates (0-1)
    const ny = (y - minY) / rangeY;   // 0 = bottom, 1 = top
    const nx = (x - minX) / rangeX;   // 0 = left, 1 = right
    const nz = (z - minZ) / rangeZ;   // 0 = back, 1 = front

    // Normal for front/back detection
    const normalZ = normals ? normals.getZ(i) : 0;
    const isFrontFacing = normalZ > 0.3;
    const isBackFacing = normalZ < -0.3;

    // Distance from center X (0 = center, 1 = far side)
    const centerDistX = Math.abs(nx - 0.5) * 2;

    // --- SEGMENTATION ---

    if (ny > 0.78) {
      // === TOP OF HEAD: HAIR ===
      // Add slight variation based on position for more natural look
      const variation = Math.sin(x * 15) * 0.03 + Math.sin(z * 12) * 0.02;
      tempColor.copy(COLORS.hair);
      tempColor.r += variation;
      tempColor.g += variation * 0.7;
      tempColor.b += variation * 0.3;
    }
    else if (ny > 0.65) {
      // === HAIR TO FACE TRANSITION ===
      // Front = face, sides/back = hair
      if (isFrontFacing && centerDistX < 0.55) {
        // Forehead area
        const t = (ny - 0.65) / 0.13;
        tempColor.copy(COLORS.skin).lerp(COLORS.hair, t * 0.3);
      } else {
        // Side/back hair
        const variation = Math.sin(x * 10 + z * 8) * 0.025;
        tempColor.copy(COLORS.hair);
        tempColor.r += variation;
        tempColor.g += variation * 0.6;
      }
    }
    else if (ny > 0.42) {
      // === FACE AREA (Eyes, Nose, Cheeks, Mouth) ===
      if (isFrontFacing && centerDistX < 0.5) {
        // Front face - skin
        tempColor.copy(COLORS.skin);

        // Cheek area (slight blush)
        if (ny > 0.48 && ny < 0.58 && centerDistX > 0.2 && centerDistX < 0.45) {
          tempColor.lerp(new THREE.Color("#D9A090"), 0.3);
        }
        // Nose tip (slightly pinker)
        if (ny > 0.50 && ny < 0.56 && centerDistX < 0.08 && nz > 0.7) {
          tempColor.lerp(new THREE.Color("#D9A088"), 0.4);
        }
        // Mouth area
        if (ny > 0.44 && ny < 0.48 && centerDistX < 0.15) {
          tempColor.lerp(new THREE.Color("#C08070"), 0.2);
        }
        // Chin / lower face (slightly darker for stubble hint)
        if (ny < 0.46 && ny > 0.42 && centerDistX < 0.2) {
          tempColor.lerp(COLORS.stubble, 0.15);
        }
      } else if (centerDistX > 0.45) {
        // Side of head - hair/ears
        if (isBackFacing || centerDistX > 0.65) {
          tempColor.copy(COLORS.hair);
        } else {
          // Ear area
          tempColor.copy(COLORS.skin);
          tempColor.lerp(COLORS.skinShadow, 0.2);
        }
      } else {
        // Back of head
        tempColor.copy(COLORS.hair);
      }
    }
    else if (ny > 0.35) {
      // === NECK AREA ===
      if (isFrontFacing && centerDistX < 0.3) {
        // Front neck = skin
        tempColor.copy(COLORS.skin);
        tempColor.lerp(COLORS.skinShadow, 0.15);
      } else if (centerDistX > 0.55) {
        // Far sides at neck level - could be hair falling down or hood
        tempColor.copy(COLORS.hoodieInner);
      } else {
        // Back of neck / collar
        tempColor.copy(COLORS.hoodieInner);
      }
    }
    else if (ny > 0.28) {
      // === COLLAR / HOOD AREA ===
      if (isFrontFacing && centerDistX < 0.25) {
        // Center front - shirt collar / v-neck area
        tempColor.copy(COLORS.shirt);
      } else if (centerDistX > 0.65) {
        // Far sides - backpack straps
        tempColor.copy(COLORS.backpackStrap);
      } else {
        // Hood lining
        tempColor.copy(COLORS.hoodieInner);
      }
    }
    else if (ny > 0.18) {
      // === UPPER CHEST ===
      if (isFrontFacing && centerDistX < 0.2) {
        // Center front - shirt with buttons
        tempColor.copy(COLORS.shirt);
        // Button dots
        if (centerDistX < 0.04 && Math.abs(Math.sin(ny * 80)) > 0.95) {
          tempColor.copy(COLORS.shirtButtons);
        }
      } else if (centerDistX > 0.6) {
        // Far sides - backpack straps
        tempColor.copy(COLORS.backpackStrap);
      } else {
        // Hoodie
        tempColor.copy(COLORS.hoodie);
      }

      // Pendant/necklace - thin line center front
      if (isFrontFacing && centerDistX < 0.03 && ny > 0.22 && ny < 0.3) {
        tempColor.copy(COLORS.pendant);
      }
    }
    else {
      // === LOWER BODY (Main hoodie area) ===
      if (isFrontFacing && centerDistX < 0.18) {
        // Center front - shirt visible under open hoodie
        tempColor.copy(COLORS.shirt);
        // Button line
        if (centerDistX < 0.03) {
          tempColor.lerp(COLORS.shirtButtons, 0.3);
        }
      } else if (centerDistX > 0.6) {
        // Far sides - backpack straps
        tempColor.copy(COLORS.backpackStrap);
      } else {
        // Main hoodie body
        tempColor.copy(COLORS.hoodie);
        // Subtle pocket area (right side, lower)
        if (ny < 0.1 && centerDistX > 0.3 && centerDistX < 0.5 && nx > 0.5) {
          tempColor.lerp(new THREE.Color("#3D5A73"), 0.3);
        }
      }
    }

    // Set vertex color
    colors[i * 3] = tempColor.r;
    colors[i * 3 + 1] = tempColor.g;
    colors[i * 3 + 2] = tempColor.b;
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Update material to use vertex colors
  const material = mesh.material as THREE.MeshStandardMaterial;
  if (material) {
    const newMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.55,
      metalness: 0.02,
      side: THREE.DoubleSide,
      envMapIntensity: 0.8,
    });
    mesh.material = newMat;
  }
}

/**
 * Avatar Model component
 * Loads avatar1.glb and applies vertex-based coloring to match the 2D reference
 */
function Avatar({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const { scene } = useGLTF("/models/avatar1.glb");
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    // Apply vertex colors to each mesh
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        applyVertexColors(child as THREE.Mesh);
      }
    });

    // Face slightly forward
    scene.rotation.y = Math.PI * 0.05;
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;

    // Subtle parallax following cursor
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.current.x * 0.15,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.current.y * 0.08,
      0.05
    );

    // Breathing animation
    const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.006;
    group.current.scale.set(breathingScale, breathingScale, breathingScale);
  });

  return (
    <group
      ref={group}
      position={[0, -0.8, 0]}
      scale={2.8}
    >
      <primitive object={scene} />
    </group>
  );
}

/**
 * Cinematic Lighting designed for the portrait bust
 */
function CinematicLighting({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const rimLightRef = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    if (rimLightRef.current) {
      rimLightRef.current.position.x = mouse.current.x * 6;
      rimLightRef.current.position.y = 4 + mouse.current.y * 4;
    }
  });

  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight intensity={0.6} />
      {/* Hemisphere for natural sky/ground gradient */}
      <hemisphereLight intensity={0.8} color="#ffeedd" groundColor="#1a1a2e" />
      {/* Key light - warm from upper right */}
      <spotLight
        position={[4, 6, 5]}
        intensity={2.2}
        angle={0.5}
        penumbra={1}
        castShadow
        color="#fff5e6"
        shadow-mapSize={[1024, 1024]}
      />
      {/* Fill light - cooler from left */}
      <pointLight position={[-4, 2, 3]} intensity={1.0} color="#94a3d4" />
      {/* Rim light - purple accent from behind */}
      <pointLight position={[0, 1, -4]} intensity={0.8} color="#8b5cf6" />
      {/* Bottom fill - prevent harsh shadows under chin */}
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#e8c9b8" />
      {/* Interactive cursor-following accent light */}
      <spotLight
        ref={rimLightRef}
        position={[0, 4, 8]}
        intensity={3}
        color="#60a5fa"
        distance={20}
        angle={0.6}
        penumbra={1}
      />
    </>
  );
}

export default function FloatingAvatar() {
  const containerRef = useRef<THREE.Group>(null);
  const parallaxGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (parallaxGroupRef.current) {
      parallaxGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        parallaxGroupRef.current.rotation.x,
        -mouse.current.y * 0.08,
        0.04
      );
      parallaxGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        parallaxGroupRef.current.rotation.y,
        mouse.current.x * 0.08,
        0.04
      );
    }
  });

  // Scale based on viewport width
  const baseScale = viewport.width < 10 ? 0.55 : 0.85;

  return (
    <>
      <group ref={containerRef} scale={baseScale}>
        <group ref={parallaxGroupRef}>
          <CinematicLighting mouse={mouse} />

          <Float
            speed={1.2}
            rotationIntensity={0.02}
            floatIntensity={0.06}
            floatingRange={[-0.04, 0.04]}
          >
            <Suspense fallback={null}>
              <Avatar mouse={mouse} />
            </Suspense>
          </Float>

          <Environment preset="city" />
        </group>

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom luminanceThreshold={0.7} mipmapBlur intensity={0.6} />
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.05}
            bokehScale={1.2}
            height={480}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0008, 0.0008)}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </group>
    </>
  );
}

useGLTF.preload("/models/avatar1.glb");
