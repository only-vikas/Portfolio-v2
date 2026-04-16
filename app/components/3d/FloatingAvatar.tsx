"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Float, Preload, RoundedBox, Sparkles, Html, Center } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * Avatar Model component
 * Handles loading the GLB, eye tracking, and dynamic head isolation
 */
function Avatar({ mouse, activeHeadIndex }: { mouse: React.MutableRefObject<THREE.Vector2>, activeHeadIndex: number }) {
  const { scene } = useGLTF("/models/avatar.glb");
  const group = useRef<THREE.Group>(null);
  
  // Joint/Bone references for tracking
  const leftEye = useRef<THREE.Object3D | null>(null);
  const rightEye = useRef<THREE.Object3D | null>(null);
  const neck = useRef<THREE.Object3D | null>(null);
  
  const [meshOffset, setMeshOffset] = useState(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    let meshIndex = 0;
    scene.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name.includes("eyeleft") || (name.includes("eye") && name.includes("l"))) leftEye.current = child;
      if (name.includes("eyeright") || (name.includes("eye") && name.includes("r"))) rightEye.current = child;
      if (name.includes("neck")) neck.current = child;
      
      // Isolate the specific head based on the activeHeadIndex state
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (meshIndex !== activeHeadIndex) {
          mesh.visible = false;
        } else {
          mesh.visible = true;
          // Natively compute bounding box to find the exact center of this specific hidden mesh
          if (mesh.geometry) {
            mesh.geometry.computeBoundingBox();
            const boundingBox = mesh.geometry.boundingBox;
            if (boundingBox) {
              const center = new THREE.Vector3();
              boundingBox.getCenter(center);
              // Set offset to perfectly align this geometry to 0,0,0 natively
              setMeshOffset(new THREE.Vector3(-center.x, -center.y, -center.z));
            }
          }
          mesh.position.set(0, 0, 0);
        }
        meshIndex++;
      }
    });

    // Ensure it's facing front
    scene.rotation.y = Math.PI * 0.1;
  }, [scene, activeHeadIndex]);

  useFrame((state) => {
    if (!group.current) return;

    const targetX = mouse.current.x * 3;
    const targetY = mouse.current.y * 3;
    const lookTarget = new THREE.Vector3(targetX, targetY, 5);

    if (leftEye.current && rightEye.current) {
      const leftTarget = new THREE.Vector3().copy(lookTarget).add(new THREE.Vector3(-0.5, 0, 0));
      const rightTarget = new THREE.Vector3().copy(lookTarget).add(new THREE.Vector3(0.5, 0, 0));
      leftEye.current.lookAt(leftTarget);
      rightEye.current.lookAt(rightTarget);
    }

    if (neck.current) {
        neck.current.rotation.y = THREE.MathUtils.lerp(neck.current.rotation.y, mouse.current.x * 0.4, 0.1);
        neck.current.rotation.x = THREE.MathUtils.lerp(neck.current.rotation.x, -mouse.current.y * 0.3, 0.1);
    }

    const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.01;
    group.current.scale.setScalar(breathingScale);
  });

  return (
    <group 
      ref={group} 
      position={[0, -0.5, 0]} // Slight global Y adjustment to make room for big hair
      scale={130} // Pushed scale massively to consume ~80% of vertical viewport
    >
       <primitive object={scene} position={[meshOffset.x, meshOffset.y, meshOffset.z]} />
    </group>
  );
}

/**
 * Interactive Wix Studio style Glass Backdrop
 */
function GlassBackdrop() {
  return (
    <RoundedBox args={[7, 9, 0.2]} radius={0.5} smoothness={4} position={[0, -0.5, -1]}>
      <meshPhysicalMaterial 
        color="#1a1a2e"
        transmission={0.8}
        opacity={0.9}
        transparent
        roughness={0.2}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </RoundedBox>
  );
}

/**
 * Cinematic Lighting that follows the cursor
 */
function CinematicLighting({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const rimLightRef = useRef<THREE.SpotLight>(null);
  
  useFrame(() => {
    if (rimLightRef.current) {
      rimLightRef.current.position.x = mouse.current.x * 10;
      rimLightRef.current.position.y = mouse.current.y * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#000000" />
      <spotLight position={[5, 5, 5]} intensity={2.5} angle={0.4} penumbra={1} castShadow color="#ffffff" />
      <pointLight position={[-5, 2, -5]} intensity={1.5} color="#4f46e5" />
      <spotLight 
        ref={rimLightRef} 
        position={[0, 0, 10]} 
        intensity={8} 
        color="#00f3ff" 
        distance={20}
        angle={0.5} 
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
  
  // Use state to quickly toggle through available heads visually in development!
  const [activeHeadIndex, setActiveHeadIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Keyboard navigation to easily isolate the correct head
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveHeadIndex(prev => (prev + 1) % 18);
      if (e.key === "ArrowLeft") setActiveHeadIndex(prev => (prev - 1 + 18) % 18);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useFrame(() => {
    if (parallaxGroupRef.current) {
      parallaxGroupRef.current.rotation.x = THREE.MathUtils.lerp(parallaxGroupRef.current.rotation.x, -mouse.current.y * 0.15, 0.05);
      parallaxGroupRef.current.rotation.y = THREE.MathUtils.lerp(parallaxGroupRef.current.rotation.y, mouse.current.x * 0.15, 0.05);
    }
  });

  const baseScale = viewport.width < 10 ? 0.6 : 1.0;

  return (
    <>

      <group ref={containerRef} scale={baseScale}>
        <group ref={parallaxGroupRef}>
          <CinematicLighting mouse={mouse} />
          
          <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1} floatingRange={[-0.1, 0.1]}>
            <Suspense fallback={null}>
              <Avatar mouse={mouse} activeHeadIndex={activeHeadIndex} />
            </Suspense>
          </Float>
          
          <Environment preset="city" />
        </group>

        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} />
          <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={2} height={480} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </group>
    </>
  );
}

useGLTF.preload("/models/avatar.glb");
