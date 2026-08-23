import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
    const ref = useRef(null);
    // Generate 5000 stars in a radius of 1.2
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false} />

            </Points>
        </group>);

};

const Starfield = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black" />
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
            </Canvas>
        </div>);

};

export default Starfield;