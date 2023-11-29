

import { useCallback } from "react";
import * as THREE from 'three';
import { useDispatch, useSelector } from "react-redux";
import { setImageId, setInterfaceOpen } from "state";
import Test from "../LoadPaintings/test";

export default function PaintingPage( { cameraControlsRef } ) {

    const oeuvreId = useSelector( ( state ) => state.oeuvreId );
    const clickedSide = useSelector( ( state ) => state.clickedSide )

    const dispatch = useDispatch()

    const handleInterface = useCallback( ( oeuvreId ) => {
        dispatch( setImageId( oeuvreId ) );
        setTimeout( () => {
            dispatch( setInterfaceOpen( true ) )
        }, [300] );
    }, [dispatch] );

    const handleClick = useCallback( ( event ) => {
        cameraControlsRef.current.normalizeRotations();

        const boundingBox = new THREE.Box3().setFromObject( event.object );
        const middle = new THREE.Vector3().addVectors( boundingBox.min, boundingBox.max ).multiplyScalar( 0.5 );

        const moveToAndRotateCamera = ( x, y, z, azimuth, polar ) => {
            cameraControlsRef.current.moveTo( x, y, z, true );
            cameraControlsRef.current.rotateTo( azimuth, polar, true );


            if ( event.distance > 2.8 && event.distance < 3.2 ) {
                handleInterface( oeuvreId );
            }
        };

        switch ( clickedSide ) {
            case 'front':
                moveToAndRotateCamera( middle.x, middle.y, middle.z + 3, calculateAzimuthAngle(), Math.PI / 2 );
                break;
            case 'back':
                moveToAndRotateCamera( middle.x, middle.y, middle.z - 3, Math.PI, Math.PI / 2 );
                break;
            case 'right':
                moveToAndRotateCamera( middle.x - 3, middle.y, middle.z, 4.7211, Math.PI / 2 );
                break;
            case 'left':
                moveToAndRotateCamera( middle.x + 3, middle.y, middle.z, Math.PI / 2, Math.PI / 2 );
                break;
            default:
                break;
        }
    }, [cameraControlsRef, handleInterface, oeuvreId, clickedSide] );

    const calculateAzimuthAngle = () => {
        const normalizedAzimuthAngle = THREE.MathUtils.euclideanModulo( cameraControlsRef.current.azimuthAngle, 360 * THREE.MathUtils.DEG2RAD );
        return normalizedAzimuthAngle > ( 180 * THREE.MathUtils.DEG2RAD ) ? 360 * THREE.MathUtils.DEG2RAD : 0;
    };

    return (
        <>
            <group
                onClick={( event ) => {
                    handleClick( event );
                    event.stopPropagation();
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'grab'; }}
            >
                <Test />
            </group>
        </>
    );
}
