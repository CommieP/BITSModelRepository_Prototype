import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";

const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1} />
}

const PreviewCanvas = () => {
    // Extract the model URL from the Redux store
    const modelUrl = useSelector((state) => state.formData.file);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            {modelUrl ? (
                <Canvas>
                    {/* Load and display the GLTF model */}
                    <OrbitControls></OrbitControls>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 5, 5]} intensity={1} />
                    <Model url={modelUrl} />
                    <OrbitControls />
                </Canvas>
            ) : (
                <p>No model uploaded. Please upload a GLTF/GLB file to preview it.</p>
            )}
        </div>
    );
};

export default PreviewCanvas;
