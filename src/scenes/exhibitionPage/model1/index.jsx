import { BakeShadows, Center, Environment, Html, Lightformer, Loader, OrbitControls, PerformanceMonitor, SpotLight, Stage, useGLTF, useProgress } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Model } from "./LoadModel/model"
import Lights from "components/threejs/Lights"
import { Suspense, useEffect, useRef, useState } from "react"
import RaycastWhenCameraMoves from "scenes/widgets/threejs/RayCastWhenCameraMoves"
import CameraControl from "scenes/widgets/threejs/cameraControls"
import CameraMovement from "scenes/widgets/threejs/cameraMovement"
import PaintingPage from "scenes/exhibitionPage/model1/PaintingClick"
import ImageModal from "./PaintingInterface"
import { Perf } from "r3f-perf"
import StartMenu from "scenes/startMenu"
import { LoadingScreen } from "scenes/LoadingScreen"
import MenuBurger from "scenes/menuBurger"
import ListingOeuvreMenu from "scenes/listingOeuvreMenu"
import * as THREE from 'three'
const Monalisart = () => {
    const { nodes } = useGLTF( "../../floor_exclusion.gltf" );
    const cameraControlsRef = useRef();
    const [start, setStart] = useState( false );
    const [dpr, setDpr] = useState( 1.5 );


    return <>
        <Canvas shadows gl={{ logarithmicDepthBuffer: true }} dpr={dpr}>


            {/* <Suspense fallback>
                <Perf />

                <RaycastWhenCameraMoves />

                <CameraControl ref={cameraControlsRef} />

                <CameraMovement cameraControlsRef={cameraControlsRef}>

                    <mesh
                        visible={false}
                        geometry={nodes.Floor_Inside.geometry}
                        position={[-0.15, -2.1, -2.95]}
                        scale={0.01}
                    />
                </CameraMovement>
                <Center>
               
                    <PaintingPage cameraControlsRef={cameraControlsRef} />
                </Center>
        
            </Suspense>
          */}
            <Model />
       
            <OrbitControls />
            <Lights />
        </Canvas>
        {/* <StartMenu started={start} onStarted={() => setStart( true )} />
        <ImageModal />
        <LoadingScreen />
        <MenuBurger cameraControlsRef={cameraControlsRef} />
        <ListingOeuvreMenu cameraControlsRef={cameraControlsRef} /> */}
    </>
}

export default Monalisart