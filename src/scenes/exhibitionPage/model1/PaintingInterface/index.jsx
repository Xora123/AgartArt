import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import state, { setInterfaceOpen } from 'state';
import { useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ImageModal( open, ...props ) {

    const imageId = useSelector( ( state ) => state.imageId )
    const isOpen = useSelector( ( state ) => state.open );
    const [imageData, setImageData] = useState( {} );
    const [loading, setLoading] = useState( false );
    const dispatch = useDispatch();

    useEffect( () => {
        console.log( imageId )
        setLoading( true ); // Commencer le chargement
        if ( imageId ) {
            // Effectuer la requête HTTP GET pour récupérer l'image par son nom, l'ID de l'utilisateur et l'ID de l'expérience
            fetch( `http://localhost:3001/images/image-details/${imageId}` )
                .then( ( response ) => {
                    if ( !response.ok ) {
                        throw new Error( "La requête a échoué" );
                    }
                    return response.json();
                } )
                .then( ( data ) => {

                    // Si la requête réussit, stockez les données de l'image dans le state
                    setImageData( data );

                    setLoading( false );
                } )
                .catch( ( error ) => {
                    // En cas d'erreur, gérez l'erreur ici (par exemple, affichez un message d'erreur)
                    console.error( "Erreur lors de la récupération de l'image :", error );
                } );
        }

    }, [imageId] );

    const handleClose = () => {
        dispatch( setInterfaceOpen( false ) )
    }


    return <>
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="image-modal-title"
            aria-describedby="image-modal-description"
        >
            <Box sx={style}>
                <IconButton onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0 }}>
                    <CloseIcon />
                </IconButton>
                <Typography id="image-modal-title" variant="h6" component="h2">
                    A propos de l'oeuvre
                </Typography>
                <Typography id="image-modal-description" sx={{ mt: 2 }} component="div">
                    {loading ? <div></div> :
                        imageData.filePath && <div><img width='100%' src={`http://localhost:3001/${imageData.filePath}`} alt={imageData.title} /></div>}
                    {imageData.title && <div><b>Titre:</b> {imageData.title}</div>}
                    {imageData.creator && <div><b>Créateur:</b> {imageData.creator}</div>}
                    {imageData.technical && <div><b>Technique:</b> {imageData.technical}</div>}
                    {imageData.origin && <div><b>Origine:</b> {imageData.origin}</div>}
                    {imageData.description && <div><b>Description:</b> {imageData.description}</div>}
                    {( imageData.sizeX && imageData.sizeY ) && <div><b>Size:</b> {imageData.sizeX} x {imageData.sizeY}</div>}
                    {/* {imageData.exhibitionId && <div><b>Exhibition ID:</b> {imageData.exhibitionId}</div>}
            {imageData.imageName && <div><b>Image Name:</b> {imageData.imageName}</div>} */}
                </Typography>
            
            </Box>
        </Modal>
    </>
}
