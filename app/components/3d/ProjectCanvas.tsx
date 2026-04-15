"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FloatingAvatar from "./FloatingAvatar";

export default function ProjectCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <FloatingAvatar />
      </Suspense>
    </Canvas>
  );
}
