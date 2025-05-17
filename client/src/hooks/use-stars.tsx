import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface UseStarsOptions {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  depth?: number;
  twinkle?: boolean;
}

export function useStars({
  count = 200,
  color = '#FFFFFF',
  size = 2,
  speed = 0.01,
  depth = 400,
  twinkle = true
}: UseStarsOptions = {}) {
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  const initStars = (container: HTMLDivElement) => {
    containerRef.current = container;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.z = depth;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: color,
      size: size,
      transparent: true,
      sizeAttenuation: true,
      opacity: 1,
      blending: THREE.AdditiveBlending
    });

    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random position
      positions[i * 3] = (Math.random() - 0.5) * width * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * height * 2;
      positions[i * 3 + 2] = Math.random() * depth;
      
      // Random opacity for twinkling effect
      opacities[i] = Math.random();
      
      // Random speed for movement effect
      speeds[i] = (Math.random() + 0.5) * speed;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    starGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Animation function
    const animate = () => {
      if (starsRef.current && twinkle) {
        const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
        const opacities = starsRef.current.geometry.attributes.opacity.array as Float32Array;
        const speeds = starsRef.current.geometry.attributes.speed.array as Float32Array;
        
        for (let i = 0; i < count; i++) {
          // Move star (along z-axis for parallax effect)
          positions[i * 3 + 2] -= speeds[i];
          
          // If star is too close, reset to far distance
          if (positions[i * 3 + 2] < 0) {
            positions[i * 3] = (Math.random() - 0.5) * width * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * height * 2;
            positions[i * 3 + 2] = depth;
          }
          
          // Twinkle effect
          opacities[i] = 0.3 + 0.7 * Math.sin(Date.now() * 0.001 * speeds[i]);
        }
        
        starsRef.current.geometry.attributes.position.needsUpdate = true;
        
        // Update material opacity
        const opacityArray = Array.from(opacities);
        const material = starsRef.current.material as THREE.PointsMaterial;
        material.opacity = Math.max(...opacityArray);
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && cameraRef.current && rendererRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  };

  return { initStars };
}
