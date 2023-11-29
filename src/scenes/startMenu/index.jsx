import { useProgress } from "@react-three/drei"
import { useEffect, useState } from "react"
import "../startMenu/startMenu.css"
import { setInterfaceOpen } from "state"
import { useDispatch } from "react-redux"
export default function StartMenu( { started, onStarted } ) {
    const { active, progress, errors, item, loaded, total } = useProgress()

    const [isTotal, setIsTotal] = useState( false )

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( setInterfaceOpen( false ) )
        if ( progress === 100 ) {

            setTimeout( () => {
                setIsTotal( true )
            }, 3100 )

        }
    }, [total, progress] )

    return <>
        {isTotal &&
            <div className="startMenu" style={started ? { display: 'none' } : { display: 'flex' }}>
                <div className="startMenu__overlay" >
                    <img className="startMenu__image" src="../img/artefakt.png" alt="artefacktImage"></img>
                    <div className="startMenu__text">
                        <p>This work is co-authored by Artefakt Studio & Agarta</p>
                    </div>
                    <span onClick={onStarted} className="startMenu__bouton" >Entrez</span>
                </div>
            </div>
        }
    </>
}