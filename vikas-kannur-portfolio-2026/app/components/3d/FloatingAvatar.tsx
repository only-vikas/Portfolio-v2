"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FloatingAvatar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    // Track mouse position natively for performance
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // GSAP Scroll effect
    if (groupRef.current && materialRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(groupRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom center",
          scrub: 1,
        },
      });
      // Try fading the material opacity via GSAP
      gsap.to(materialRef.current, {
        opacity: 0.6,
        transparent: true,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom center",
          scrub: 1,
        },
      });
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current && groupRef.current) {
      // Slow rotation on its own
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Floating up and down
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;

      // Mouse Parallax (smooth lerp)
      // We map the normalized mouse coordinates to viewport coordinates for a subtle effect
      const targetX = (mouse.current.x * viewport.width) / 10;
      const targetY = (mouse.current.y * viewport.height) / 10;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
      
      <Icosahedron ref={meshRef} args={[1, 0]} scale={2}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
    </group>
  );
}
