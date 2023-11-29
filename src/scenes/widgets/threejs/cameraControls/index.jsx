import { useRef, forwardRef, useEffect } from 'react'
import { CameraControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

// ------------------------------------------------------------------------ //
// //
// ----------------------------------------------------------------------- //

const CameraControl = forwardRef( function CameraControl( props, cameraControlsRef ) {


    const { camera } = useThree()

    const meshRef = useRef()
    // ------------------------------------------------------------------------ //
    // in order to archive FPS look, set EPSILON for the distance to the center//
    // ----------------------------------------------------------------------- //

    const EPS = 1e-5;
    camera.position.set( 0, 0, EPS );

    // ------------------------------------------------------------------------ //
    // Au début de l'expérience on bouge la camera a une certaine position      //
    // ----------------------------------------------------------------------- //

    useEffect( () => {
        cameraControlsRef.current.moveTo( -1, -0.8031246606558562, -10 )
        cameraControlsRef.current.rotateTo( Math.PI, Math.PI / 2 )
        cameraControlsRef.current.camera.near = 0.1
    }, [cameraControlsRef] )

    useFrame( () => {
        cameraControlsRef.current.normalizeRotations()
    } )

    return <>
        <CameraControls
            {...props}
            ref={cameraControlsRef}
            makeDefault
            smoothTime={0.4}
            restThreshold={0.15}
            minDistance={3}
            draggingSmoothTime={0}
            azimuthRotateSpeed={-0.2}
            polarRotateSpeed={-0.2}
            dollyToCursor={true}
            mouseButtons={{ left: 1, middle: 0, right: 0, shiftLeft: 0, wheel: 0 }}
            touches={{one:32, two:0, three:0}}
        />
    </>
} )

export default CameraControl