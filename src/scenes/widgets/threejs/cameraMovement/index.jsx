
import { useGLTF } from "@react-three/drei";
import { invalidate, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from 'three'
// import useBearStore from "../../store/useBearStore";
import TWEEN from '@tweenjs/tween.js';
import { setCameraMovementFalse, setCameraMovementTrue } from "state/threejs";
import { useDispatch, useSelector } from "react-redux";

export default function CameraMovement( { children, cameraControlsRef } ) {

    const { nodes, materials } = useGLTF( "../../floor_exclusion.gltf" );

    // Utilisez useDispatch pour obtenir la fonction dispatch
    const dispatch = useDispatch();


    const desactiverCamera = () => {
        dispatch( setCameraMovementFalse() );
    };

    const [animationStart, setAnimationStart] = useState( true )
    const { viewport, mouse } = useThree()

    const [a, setA] = useState()
    // create objects and add to scene

    const circleRef = useRef();
    const ringRef = useRef()

    const ref = useRef()
    const [pointer] = useState( () => new THREE.Vector3() )
    const [normal] = useState( () => new THREE.Vector3() )

    // const remove = useBearStore( ( state ) => state.remove )
    useFrame( ( state, dt ) => {

        if ( animationStart === true ) {
            ref.current.position.copy( pointer )
            // Comment the next line if face normal isn't important
            ref.current.quaternion.setFromAxisAngle( normal, Math.PI / 2 )
        }

    } )
    function moveCamera( position, duration ) {

        const currentPosition = cameraControlsRef.current._target.clone();

        // create a new tween
        const tween = new TWEEN.Tween( { t: 0 } )
            .to( { t: 1 }, duration * 1000 )
            .onUpdate( ( obj ) => {
                const newPosition = currentPosition.clone().lerp( position, obj.t );
                cameraControlsRef.current.moveTo( newPosition.x, -0.8031246715337038, newPosition.z );
            } );

        // create an animation to enlarge and fade the circle on start
        const circleTweens = [
            new TWEEN.Tween( { scale: 1, opacity: 0.5 } )
                .to( { scale: 1.7, opacity: 0 }, 500 )
                .easing( TWEEN.Easing.Quadratic.Out )
                .onUpdate( ( { scale, opacity } ) => {
                    circleRef.current.scale.set( scale, scale, scale );
                    circleRef.current.material.opacity = opacity;
                    ringRef.current.material.opacity = opacity;
                } ),
        ];

        // chain the circle animation with the camera movement
        tween.onStart( () => {
            circleTweens.forEach( ( t ) => t.start() );
            setAnimationStart( false )
        } );

        tween.onComplete( () => {
            circleTweens.forEach( ( t ) => t.stop() );
            circleRef.current.scale.set( 1, 1, 1 );
            circleRef.current.material.opacity = 0.8;
            ringRef.current.material.opacity = 0.5
            setAnimationStart( true )
        } );

        tween.start();
    }

    useFrame( () => {
        TWEEN.update();

    } );

    const [cursor, setCursor] = useState( 'grab' );
    useEffect( () => {
        var c;
        cameraControlsRef.current.addEventListener( 'controlstart', function () {
            c = document.body.style.cursor
        } )
        cameraControlsRef.current.addEventListener( 'control', function () {
            if ( ref.current ) {

                ref.current.visible = false;
                document.body.style.cursor = 'grabbing'
            }
        } )
        cameraControlsRef.current.addEventListener( 'controlend', function () {
            if ( ref.current ) {
                ref.current.visible = true;
                document.body.style.cursor = c
            }
        } )
    }, [cameraControlsRef] )

    useEffect( () => {
        document.body.style.cursor = cursor;
    }, [cursor] );

    const [ze, setZe] = useState()
    const [isVisible, setIsVisible] = useState( false )
    return <>
        <mesh
            visible={false}
            geometry={nodes.Floor_Inside.geometry}
            position={[-0.15, -2.1, -2.95]}
            scale={0.01}
            onPointerDown={() => {
                var c = mouse.x
                setA( c )
            }}
            onPointerUp={( event ) => {
                var c = mouse.x
                if ( ( Math.abs( a - c ) < 0.01 ) && animationStart === true ) {
                    moveCamera( event.point, 1 );
                    desactiverCamera()
                }
            }}
            onPointerOut={( e ) => {
                circleRef.current.visible = false;
                ringRef.current.visible = false;
            }}
            onPointerMove={( e ) => {
                setCursor( 'pointer' )
            }}

        />
        <group
            onPointerOut={( e ) => {
                circleRef.current.visible = false;
                ringRef.current.visible = false;
                e.stopPropagation()
            }}
            onPointerOver={( e ) => {
                circleRef.current.visible = true;
                ringRef.current.visible = true;
                setIsVisible( true )
                e.stopPropagation()
            }}
            onPointerMove={( e ) => {
                pointer.copy( e.point )
                normal.copy( e.face.normal )
            }}

        >
            {children}
        </group>
        <group ref={ref} visible={isVisible}>
            <mesh rotation-x={Math.PI / 2} ref={circleRef} position-y={0.0001}>
                <ringGeometry args={[0.26, 0.3, 32]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.8}
                    color="white"
                    toneMapped={false}
                    side={THREE.DoubleSide}
                    polygonOffset
                    polygonOffsetFactor={-1}
                />
            </mesh>
            <mesh rotation-x={Math.PI / 2} position-y={0.0001} ref={ringRef}>
                <circleGeometry args={[0.26, 32]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.5}
                    toneMapped={false}
                    side={THREE.DoubleSide}
                    depthTest={true}
                />
            </mesh>
        </group>
    </>
}