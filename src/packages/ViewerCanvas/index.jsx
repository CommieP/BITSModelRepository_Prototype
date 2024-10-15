import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const Model = ({ modelUrl }) => {
    const gltf = useLoader(GLTFLoader, modelUrl);
    return <primitive object={gltf.scene} scale={0.5} />;
};

const ViewerCanvas = () => {
    const location = useLocation();
    const { modelUrl } = location.state; // Get the model URL from state

    return (
        <div className="viewer-page">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <Suspense> {/* Suspense with fallback */}
                    <Model modelUrl={modelUrl} />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default ViewerCanvas;
