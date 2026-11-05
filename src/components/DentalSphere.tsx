import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DentalSphereProps {
  mode?: 'hero' | 'page' | 'small';
  className?: string;
}

export const DentalSphere: React.FC<DentalSphereProps> = ({
  mode = 'hero',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isHero = mode === 'hero';
    const width = container.clientWidth || (isHero ? 380 : 220);
    const height = container.clientHeight || (isHero ? 380 : 220);

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isHero ? 4.2 : 5.0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Canvas Texture: Exactly Logo and Name 180 degrees apart so they NEVER collide
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const renderTexture = (logoImg?: HTMLImageElement) => {
      if (!ctx) return;

      // Clean, premium dental dark-emerald background
      const grad = ctx.createLinearGradient(0, 0, 2048, 1024);
      grad.addColorStop(0, '#05120a');
      grad.addColorStop(0.5, '#0b2416');
      grad.addColorStop(1, '#07180e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 2048, 1024);

      // Subtle longitude & latitude lines
      ctx.strokeStyle = 'rgba(131, 196, 8, 0.15)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 2048; i += 128) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1024);
        ctx.stroke();
      }
      for (let j = 0; j < 1024; j += 128) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(2048, j);
        ctx.stroke();
      }

      // Elegant equator hairline accents
      ctx.strokeStyle = '#83C408';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 360);
      ctx.lineTo(2048, 360);
      ctx.moveTo(0, 664);
      ctx.lineTo(2048, 664);
      ctx.stroke();

      // SIDE 1 (Centered at x = 512): ONLY the authentic Logo
      if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
        const logoTargetW = 440;
        const logoTargetH = (logoImg.naturalHeight / logoImg.naturalWidth) * logoTargetW;
        ctx.drawImage(
          logoImg,
          512 - logoTargetW / 2,
          512 - logoTargetH / 2,
          logoTargetW,
          logoTargetH
        );
      } else {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '700 64px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('CLÍNICA DENTAL SET', 512, 512);
      }

      // SIDE 2 (Centered at x = 1536, exactly 180° away so they NEVER collide): ONLY the Name "CLÍNICA DENTAL SET"
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Line 1: CLÍNICA
      ctx.font = '500 48px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.letterSpacing = '14px';
      ctx.fillText('CLÍNICA', 1536, 460);

      // Line 2: DENTAL SET
      ctx.font = '800 76px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#83C408';
      ctx.letterSpacing = '10px';
      ctx.fillText('DENTAL SET', 1536, 560);
    };

    renderTexture();

    // Load authentic logo image
    const logoImg = new Image();
    logoImg.src = '/assets/logo-blanc.png';
    logoImg.onload = () => {
      renderTexture(logoImg);
      sphereTexture.needsUpdate = true;
    };

    const sphereTexture = new THREE.CanvasTexture(canvas);
    sphereTexture.wrapS = THREE.RepeatWrapping;
    sphereTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Main Sphere Mesh (Exact original 1.55 radius on Homepage Hero)
    const sphereRadius = isHero ? 1.55 : 1.5;
    const geometry = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: sphereTexture,
      roughness: 0.3,
      metalness: 0.2,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Glowing atmospheric outer shield
    const glowGeometry = new THREE.SphereGeometry(sphereRadius * 1.05, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x83c408,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Orbital ring
    const ringGeometry = new THREE.RingGeometry(sphereRadius * 1.25, sphereRadius * 1.32, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x23a455,
      transparent: true,
      opacity: isHero ? 0.35 : 0.3,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.y = Math.PI / 6;
    scene.add(ring);

    // Particles
    const particleCount = isHero ? 50 : 32;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.9 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x83c408,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x83c408, 2.0);
    dirLight1.position.set(5, 4, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x23a455, 1.5);
    dirLight2.position.set(-5, -3, -4);
    scene.add(dirLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const baseSpeed = isHero ? 0.008 : 0.01;
      sphere.rotation.y += baseSpeed;
      glowSphere.rotation.y += baseSpeed * 0.8;
      ring.rotation.z -= baseSpeed * 0.4;
      particles.rotation.y += baseSpeed * 0.2;

      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.25;
      sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.05;
      sphere.position.y = Math.sin(elapsedTime * 1.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW && newH) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      sphereTexture.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode]);

  if (mode === 'hero') {
    // Original Homepage Hero Mode (420x420 centerpiece)
    return (
      <div className={`relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center ${className}`}>
        {/* Background ambient glow aura in brand green */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#23A455]/25 via-[#83C408]/20 to-transparent blur-3xl pointer-events-none" />

        {/* 3D Three.js Canvas Container */}
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 hover:scale-[1.02]"
          aria-label="Esfera 3D interactiva con el logo y nombre de Clínica Dental SET"
        />
      </div>
    );
  }

  // Unified Subpage Header Mode (consistent height across all secondary pages)
  return (
    <div
      className={`relative w-24 h-24 sm:w-40 sm:h-40 lg:w-[220px] lg:h-[220px] aspect-square shrink-0 flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-[#23A455]/25 via-[#83C408]/20 to-transparent blur-2xl pointer-events-none" />
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-200 hover:scale-[1.03]"
        aria-label="Esfera 3D interactiva con el logo y nombre de Clínica Dental SET"
      />
    </div>
  );
};
