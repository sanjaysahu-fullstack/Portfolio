import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Scene, Camera & Renderer with precise parameters
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf7f7f8, 0.08);
    
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Build central glowing crystal clusters
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Geometry 1: Elegant High-poly Icosahedron (Crystalline shape)
    const innerGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const innerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xeff6ff,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.9, // Clear glass transparency
      thickness: 2.0,
      side: THREE.DoubleSide
    });
    const coreMesh = new THREE.Mesh(innerGeo, innerMaterial);
    coreGroup.add(coreMesh);

    // Outer wireframe shell to catch reflections and look super complex & technical
    const outerGeo = new THREE.IcosahedronGeometry(1.52, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd97706, // Bronze/amber wireframe
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(outerGeo, wireMat);
    coreGroup.add(wireMesh);

    // Secondary intersecting crystal (gives that technical, premium, overlapping look)
    const octGeo = new THREE.OctahedronGeometry(1.8, 0);
    const octMat = new THREE.MeshPhysicalMaterial({
      color: 0xf3f4f6,
      emissive: 0x18181b,
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 0.8,
      transmission: 0.85,
      thickness: 1.5,
      wireframe: true
    });
    const extMesh = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(extMesh);

    // 3. Floating Amber Stardust System
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a floating sphere distribution around center
      const r = 3.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      scales[i / 3] = Math.random();
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    // Custom beautiful glowing canvas texture for particles
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(217, 119, 6, 0.8)");
    grad.addColorStop(1, "rgba(217, 119, 6, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      color: 0xd97706,
      size: 0.12,
      map: pTexture,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Orbiting Cluster of database/nodes
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const nodeGeo = new THREE.DodecahedronGeometry(0.12, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x78350f,
    });

    const orbiters: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yParam: number }[] = [];
    const orbitCount = 8;
    for (let i = 0; i < orbitCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 2.6;
      node.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      orbitGroup.add(node);

      orbiters.push({
        mesh: node,
        angle,
        radius,
        speed: 0.006 + Math.random() * 0.004,
        yParam: Math.random() * Math.PI
      });
    }

    // 5. Deluxe Multi-layered Lights
    const ambientLight = new THREE.AmbientLight(0xf3f4f6, 3.0);
    scene.add(ambientLight);

    // Warm Solar Gold directional light
    const sunLight = new THREE.DirectionalLight(0xd97706, 2.0);
    sunLight.position.set(5, 5, 5);
    scene.add(sunLight);

    // Architectural slate contrasting backlight
    const blueLight = new THREE.DirectionalLight(0x4b5563, 1.5);
    blueLight.position.set(-5, -2, -5);
    scene.add(blueLight);

    // Interactive pointer tracker light
    const mouseLight = new THREE.PointLight(0xd97706, 3.0, 15);
    scene.add(mouseLight);

    // 6. Interactive states
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // 7. Perfect update loop
    let frameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const time = clock.getElapsedTime();

      // Smooth hover interpolation
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.1;

      // Spin areole system
      coreGroup.rotation.y = time * 0.15 + targetX * 0.5;
      coreGroup.rotation.x = time * 0.08 + targetY * 0.3 + (scrollY * 0.0005);
      
      // Counter rotation for secondary
      extMesh.rotation.y = -time * 0.2;
      extMesh.rotation.z = time * 0.1;

      // Dynamic morphing vertex simulated vibration scale
      const scaleFactor = 1.0 + Math.sin(time * 2) * 0.05;
      coreMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Follow mouse cursor with glowing sphere light
      mouseLight.position.x = targetX * 5;
      mouseLight.position.y = targetY * 5;
      mouseLight.position.z = 3.0;

      // Spin orbital connection nodes
      orbiters.forEach((orb, idx) => {
        orb.angle += orb.speed;
        const currentY = Math.sin(time + orb.yParam) * 0.45;
        orb.mesh.position.x = Math.cos(orb.angle) * orb.radius;
        orb.mesh.position.z = Math.sin(orb.angle) * orb.radius;
        orb.mesh.position.y = currentY;
        
        // Spin the orb itself
        orb.mesh.rotation.y += 0.02;
        orb.mesh.rotation.x += 0.01;
      });

      // Slowly rotate background particle field space
      particles.rotation.y = time * 0.02;
      particles.rotation.x = time * 0.01;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    // 8. Unmount & Cleanup resources
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      innerGeo.dispose();
      innerMaterial.dispose();
      outerGeo.dispose();
      wireMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      pTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
