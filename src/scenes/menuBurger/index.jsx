import { useEffect, useState } from "react"
import Tooltip from "scenes/utils/ToolTip"
import "../menuBurger/MenuBurger.css"
import { useIsLandscape } from "scenes/utils/Is_landscape"
import { useDispatch } from "react-redux"
import { setListingInterfaceOpen } from "state"


export default function MenuBurger( { cameraControlsRef } ) {

    const [isMenuOpen, setIsMenuOpen] = useState( '' )
    const [style, setStyle] = useState()

    const dispatch = useDispatch()
    // Fermeture/Ouverture du Menu burger
    function handleMenuOpen() {
        setIsMenuOpen( true );
    }

    function handleMenuClose() {
        setIsMenuOpen( false );
    }

    const handleMenuListingClick = () => {
        setIsMenuOpen( false )
    }

    const listingInterface = () =>{
        dispatch(setListingInterfaceOpen(true))
    }

    // Fonction pour enter/quitter le fullscreen
    function enterFullScreen() {
        if ( !document.fullscreenElement ) {
            document.documentElement.requestFullscreen();
            setIsMenuOpen( false )
        } else {
            if ( document.exitFullscreen ) {
                document.exitFullscreen();
                setIsMenuOpen( false )
            }
        };
    }

    useEffect( () => {

        setStyle( { position: 'absolute', top: '1rem', right: '1rem', borderRadius: '50%', backgroundColor: 'white' } )

    }, [] )



    return <>
        {isMenuOpen ? (
            <div className="burgerMenu--deskstop" >
                <div>
                    <img alt='' className="burgerMenu__icones" onClick={handleMenuClose} src="../Icons/icon-menu-close.svg"></img>
                </div>

                <div style={{ display: 'block' }}>
                    {document.fullscreenElement ?
                        <Tooltip tooltip={<img alt='' style={{ width: '9rem', marginLeft: '-90px' }} src="../Icons/infobulle-fullscreen-off.svg"></img>}>
                            <img alt='' className="burgerMenu__icones" onClick={enterFullScreen} src="../Icons/icon-fullscreen-on.svg"></img>
                        </Tooltip>
                        :
                        <Tooltip tooltip={<img alt='' style={{ width: '7rem', marginLeft: '-58px' }} src="../Icons/infobulle-fullscreen.svg"></img>}>
                            <img alt='' className="burgerMenu__icones" onClick={enterFullScreen} src="../Icons/icon-fullscreen-off.svg"></img>
                        </Tooltip>
                    }
                </div>
                <Tooltip tooltip={<img alt='' style={{ width: '11rem', marginLeft: '-122px' }} src="/Icons/infobulle-list.svg"></img>}>
                    <img alt='' className="burgerMenu__icones" src="/Icons/icon-list.svg" onClick={listingInterface}></img>
                </Tooltip>
                <Tooltip tooltip={<img alt='' style={{ width: '10rem', marginLeft: '-106px' }} src="../Icons/infobulle-reset.svg"></img>}>
                    <img

                        alt='' onClick={() => {
                            cameraControlsRef.current.moveTo( -1, 1.649, -10, true )
                            cameraControlsRef.current.rotateTo( Math.PI, Math.PI / 2, true )
                            cameraControlsRef.current.camera.near = 0.1
                        }}
                        className="burgerMenu__icones" src="/Icons/icon-reset.svg"></img>
                </Tooltip>

                <Tooltip tooltip={<img alt='' style={{ width: '4rem', marginLeft: '-10px' }} src="../Icons/infobulle-info.svg"></img>}>
                    <img alt='' className="burgerMenu__icones" src="../Icons/icon-info.svg"></img>
                </Tooltip>

            </div>
        )
            :
            (

                <img alt='' className="hamburger" onClick={handleMenuOpen} style={style} src="../Icons/icon-menu-open.svg">
                </img>

            )}
    </>
}


