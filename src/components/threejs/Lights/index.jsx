import React, { useRef, useEffect } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { DirectionalLightHelper } from 'three';
import { Bloom, EffectComposer, HueSaturation, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Environment } from '@react-three/drei';

extend( { DirectionalLightHelper } );

export default function Lightning() {
    const lightRef = useRef();
    const { scene, camera } = useThree();

    useEffect( () => {
        console.log( lightRef.current )
        if ( lightRef.current ) {
            const helper = new DirectionalLightHelper( lightRef.current, 5 );
            scene.add( helper );

            return () => {
                if ( helper ) {
                    scene.remove( helper );
                    helper.dispose();
                }
            };
        }
    }, [scene] );

    return (
        <>
            {/* 
      <directionalLight position={[-1.51708, 7.9756, 2.34483]} intensity={0.5} castShadow /> */}
            <ambientLight intensity={1} />
            
            <directionalLight
                ref={lightRef}
                position={[0.5, 10, 0]}
                intensity={1}
                color={"white"}
                castShadow={true}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={0.5}
                shadow-camera-far={500}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />
            <Environment files='../../glass_passage_4k.hdr'/>
            <EffectComposer>
                <ToneMapping
                    blendFunction={BlendFunction.NORMAL} // blend mode
                    adaptive={true} // toggle adaptive luminance map usage
                    resolution={1024} // texture resolution of the luminance map
                    middleGrey={0.6} // middle grey factor
                    maxLuminance={30.0} // maximum luminance
                    averageLuminance={3.0} // average luminance
                    adaptationRate={1.0} // luminance adaptation rate
                />
  
            </EffectComposer>
        </>
    );
}
