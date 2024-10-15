import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const Model = ({ modelUrl }) => {
    const gltf = useLoader(GLTFLoader, modelUrl);
    console.log("Model Loaded:", gltf);
    
    return (
        <primitive
            object={gltf.scene}
            scale={10} // Adjust scale if necessary
            position={[0, 0, 0]} // Adjust position if the model is far off the view
        />
    );
};

const ViewerCanvas = () => {
    const location = useLocation();
    const { modelUrl } = location.state; // Get the model URL from state

    return (
        <div className="viewerPage">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <mesh>
                    <boxGeometry attach="geometry" args={[1, 1, 1]} />
                    <meshStandardMaterial attach="material" color="#6be092" />
                </mesh>
                <Suspense> {/* Suspense with fallback */}
                    <Model modelUrl={modelUrl} />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default ViewerCanvas;
