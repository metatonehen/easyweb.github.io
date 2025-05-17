import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface CubeVertex {
  id: string;
  label: string;
  icon: string;
  color: string;
  position: [number, number, number];
  link: string;
}

interface UseMetatronCubeOptions {
  vertices: CubeVertex[];
  rotationSpeed?: number;
  lineColor?: string;
  lineOpacity?: number;
  vertexRadius?: number;
}

export function useMetatronCube({
  vertices,
  rotationSpeed = 0.001,
  lineColor = '#8a4fff',
  lineOpacity = 0.3,
  vertexRadius = 0.5
}: UseMetatronCubeOptions) {
  const cubeRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number>();
  
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

  const initCube = (container: HTMLDivElement) => {
    containerRef.current = container;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 10;
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

    // Create Metatron's Cube group
    const cubeGroup = new THREE.Group();
    cubeRef.current = cubeGroup;
    scene.add(cubeGroup);

    // Add vertices (spheres at each point)
    vertices.forEach(vertex => {
      const sphereGeometry = new THREE.SphereGeometry(vertexRadius, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(vertex.color),
        transparent: true,
        opacity: 0.7
      });
      
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.set(...vertex.position);
      sphere.userData.id = vertex.id;
      
      cubeGroup.add(sphere);
    });

    // Add lines to connect vertices
    const geometryLines = new THREE.BufferGeometry();
    const verticesPositions: number[] = [];
    
    // Add the center point of the cube
    const center = new THREE.Vector3(0, 0, 0);
    
    // Create lines from center to each vertex
    vertices.forEach(vertex => {
      const pos = new THREE.Vector3(...vertex.position);
      
      // Line from center to vertex
      verticesPositions.push(center.x, center.y, center.z);
      verticesPositions.push(pos.x, pos.y, pos.z);
    });
    
    // Connect vertices to each other
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const pos1 = new THREE.Vector3(...vertices[i].position);
        const pos2 = new THREE.Vector3(...vertices[j].position);
        
        // Calculate distance between vertices
        const distance = pos1.distanceTo(pos2);
        
        // Only connect vertices that are within a certain distance (for Metatron's Cube structure)
        if (distance < 6) {
          verticesPositions.push(pos1.x, pos1.y, pos1.z);
          verticesPositions.push(pos2.x, pos2.y, pos2.z);
        }
      }
    }
    
    geometryLines.setAttribute('position', new THREE.Float32BufferAttribute(verticesPositions, 3));
    
    const material = new THREE.LineBasicMaterial({ 
      color: lineColor,
      transparent: true,
      opacity: lineOpacity,
      linewidth: 1
    });
    
    const lines = new THREE.LineSegments(geometryLines, material);
    cubeGroup.add(lines);

    // Animation function
    const animate = () => {
      if (cubeRef.current) {
        cubeRef.current.rotation.x += rotationSpeed;
        cubeRef.current.rotation.y += rotationSpeed * 1.2;
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

  return { initCube };
}
