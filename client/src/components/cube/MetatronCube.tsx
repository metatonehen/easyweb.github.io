import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import CubeVertex from './CubeVertex';

interface MetatronCubeProps {
  vertices: {
    id: string;
    label: string;
    icon: string;
    color: string;
    position: [number, number, number];
    link: string;
    shape?: string; // Add shape property for Platonic solids
  }[];
  size?: number;
  rotationSpeed?: number;
  className?: string;
  lineColor?: string;
  lineOpacity?: number;
  pulseEffect?: boolean;
  outerCircle?: boolean;
  woodenStyle?: boolean;
}

const MetatronCube: React.FC<MetatronCubeProps> = ({
  vertices,
  size = 300,
  rotationSpeed = 0.001,
  className = '',
  lineColor = '#a88d5e', // Changed to wooden gold color
  lineOpacity = 0.75,
  pulseEffect = true,
  outerCircle = true,
  woodenStyle = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Group | null>(null);

  // Create a 3D scene with Metatron's Cube
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Metatron's Cube group
    const cubeGroup = new THREE.Group();
    cubeRef.current = cubeGroup;
    scene.add(cubeGroup);
    
    // Add central flower shape based on reference image
    const flowerShape = new THREE.Shape();
    const flowerRadius = 0.4;
    const petalCount = 6;

    // Create center of flower
    flowerShape.moveTo(0, 0);
    flowerShape.absarc(0, 0, flowerRadius * 0.5, 0, Math.PI * 2, false);
    
    // Create flower petals
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalX = Math.cos(angle) * flowerRadius;
      const petalY = Math.sin(angle) * flowerRadius;
      
      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.ellipse(
        petalX * 0.5, petalY * 0.5, // Center of ellipse
        flowerRadius * 0.3, flowerRadius * 0.15, // x and y radius
        angle, angle - Math.PI, false // Start and end angle
      );
      
      const petalGeometry = new THREE.ShapeGeometry(petalShape);
      const petalMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      
      const petalMesh = new THREE.Mesh(petalGeometry, petalMaterial);
      petalMesh.position.z = 0.01; // Slightly above the plane
      cubeGroup.add(petalMesh);
    }

    // Add outer circle (circumscribe the Metatron's Cube)
    if (outerCircle) {
      // Outer double circle as in reference image
      const outerRadius = 3.5;
      
      // Main outer circle
      const circleGeometry = new THREE.BufferGeometry();
      const circleVertices = [];
      const segments = 64;
      
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        circleVertices.push(
          outerRadius * Math.cos(theta), outerRadius * Math.sin(theta), 0
        );
      }
      
      circleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(circleVertices, 3));
      
      const circleMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: woodenStyle ? 0.9 : lineOpacity + 0.1
      });
      
      const circle = new THREE.Line(circleGeometry, circleMaterial);
      cubeGroup.add(circle);
      
      // Secondary outer circle (slightly smaller)
      const innerCircleGeometry = new THREE.BufferGeometry();
      const innerCircleVertices = [];
      
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        innerCircleVertices.push(
          (outerRadius - 0.15) * Math.cos(theta), (outerRadius - 0.15) * Math.sin(theta), 0
        );
      }
      
      innerCircleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(innerCircleVertices, 3));
      
      const innerCircleMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: woodenStyle ? 0.9 : lineOpacity
      });
      
      const innerCircle = new THREE.Line(innerCircleGeometry, innerCircleMaterial);
      cubeGroup.add(innerCircle);
    }

    // Add lines to connect vertices - exact Metatron's Cube pattern from reference
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
    
    // Connect vertices to each other - creating the mesh pattern matching the reference
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const pos1 = new THREE.Vector3(...vertices[i].position);
        const pos2 = new THREE.Vector3(...vertices[j].position);
        
        verticesPositions.push(pos1.x, pos1.y, pos1.z);
        verticesPositions.push(pos2.x, pos2.y, pos2.z);
      }
    }
    
    geometryLines.setAttribute('position', new THREE.Float32BufferAttribute(verticesPositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: woodenStyle ? 0.85 : lineOpacity
    });
    
    const lines = new THREE.LineSegments(geometryLines, lineMaterial);
    cubeGroup.add(lines);

    // Add circles around each vertex point as in reference image
    vertices.forEach(vertex => {
      const vertexPos = new THREE.Vector3(...vertex.position);
      
      // Create circle around vertex
      const vertexCircleGeometry = new THREE.BufferGeometry();
      const vertexCircleVertices = [];
      const vertexRadius = 0.7;
      const vertexSegments = 32;
      
      for (let i = 0; i <= vertexSegments; i++) {
        const theta = (i / vertexSegments) * Math.PI * 2;
        const x = vertexPos.x + vertexRadius * Math.cos(theta);
        const y = vertexPos.y + vertexRadius * Math.sin(theta);
        vertexCircleVertices.push(x, y, vertexPos.z);
      }
      
      vertexCircleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertexCircleVertices, 3));
      
      const vertexCircleMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: woodenStyle ? 0.85 : lineOpacity + 0.1
      });
      
      const vertexCircle = new THREE.Line(vertexCircleGeometry, vertexCircleMaterial);
      cubeGroup.add(vertexCircle);
    });

    // Animation loop
    let scale = 1.0;
    let growing = true;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (cubeRef.current) {
        cubeRef.current.rotation.x += rotationSpeed;
        cubeRef.current.rotation.y += rotationSpeed * 1.2;
        
        // Pulse effect for animation if enabled
        if (pulseEffect && !woodenStyle) { // No pulse in wooden style
          if (growing) {
            scale += 0.003;
            if (scale >= 1.3) growing = false;
          } else {
            scale -= 0.003;
            if (scale <= 0.8) growing = true;
          }
          
          // Pulse the opacity of the lines
          if (lineMaterial.opacity) {
            lineMaterial.opacity = lineOpacity + (Math.sin(Date.now() * 0.001) * 0.1);
          }
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [rotationSpeed, lineColor, lineOpacity, pulseEffect, outerCircle, woodenStyle]);

  return (
    <div className={`cube-container relative ${className}`} style={{ width: size, height: size }}>
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Optional: Add a subtle wooden-colored background for wooden style */}
      {woodenStyle ? (
        <div 
          className="absolute inset-0 rounded-full" 
          style={{
            background: `radial-gradient(circle, #f3efe1 0%, transparent 75%)`,
            opacity: 0.15,
            zIndex: -1
          }}
        />
      ) : (
        <div 
          className="absolute inset-0 rounded-full animate-pulse-slow" 
          style={{
            background: `radial-gradient(circle, ${lineColor}33 0%, transparent 70%)`,
            filter: 'blur(10px)',
            zIndex: -1
          }}
        />
      )}
      
      {/* Render vertex components separately in DOM for interactivity */}
      {vertices.map((vertex) => (
        <CubeVertex
          key={vertex.id}
          label={vertex.label}
          icon={vertex.icon}
          color={woodenStyle ? '#a88d5e' : vertex.color}
          link={vertex.link}
          // Calculate 2D position based on 3D position
          position={{
            top: `${50 + vertex.position[1] * -15}%`,
            left: `${50 + vertex.position[0] * 15}%`,
          }}
          shape={vertex.shape || 'default'}
        />
      ))}
    </div>
  );
};

export default MetatronCube;
