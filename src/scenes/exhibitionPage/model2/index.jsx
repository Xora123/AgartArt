import { Loader, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Model } from "./model"
import Lights from "components/threejs/Lights"
import { Suspense } from "react"

const ModernArt = () => {

    return <>
        <Canvas shadows camera={{ position: [30, 30, 30], fov: 70 }}>
            <color attach="background" args={["#ececec"]} />
            <OrbitControls />
            <Lights />
            <ambientLight />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
        <Loader />
    </>
}

export default ModernArt