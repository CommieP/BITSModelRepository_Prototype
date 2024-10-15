// ViewerPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const ViewerCanvas = () => {
    const location = useLocation();
    const { modelUrl } = location.state; // Get the model URL from state

    const gltf = useLoader(GLTFLoader, modelUrl);

    return (
        <div className="viewer-page">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <primitive object={gltf.scene} scale={0.5} />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default ViewerCanvas;
