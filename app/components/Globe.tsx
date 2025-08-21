'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Position camera
    camera.position.z = 2.5;

    // Create globe with custom texture
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create a simple gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#1e40af');
      gradient.addColorStop(0.5, '#0891b2');
      gradient.addColorStop(1, '#1e40af');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some continents-like shapes
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(100, 50, 80, 40);
      ctx.fillRect(300, 80, 60, 30);
      ctx.fillRect(200, 150, 70, 35);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      bumpMap: texture,
      bumpScale: 0.02,
      specular: new THREE.Color(0x444444),
      shininess: 10
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Add community member points
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.015,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const vertices = [];
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.05 + Math.random() * 0.03;

      vertices.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Rotate globe
      globe.rotation.y += 0.005;
      
      // Rotate points slightly faster
      points.rotation.y += 0.008;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      
      // Cleanup
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full rounded-full" />;
};

export default Globe;