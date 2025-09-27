import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const FuturisticModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Geometry & Material
    // Optimized geometry: Reduced segments from (200, 20) to (128, 16)
    // This decreases the polygon count for better performance without significant visual loss.
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
    // Changed to a wireframe material to make the model look "hollow"
    const material = new THREE.MeshBasicMaterial({
      color: 0xD8ECF8,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights are no longer needed for a MeshBasicMaterial, so they have been removed for optimization.

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
        const targetX = mouse.y * 0.4;
        const targetY = mouse.x * 0.4;
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.05);
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetY, 0.05);
        mesh.rotation.z += 0.002;
      
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
        if (!currentMount) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};
