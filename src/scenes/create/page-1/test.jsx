import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';


const ContenuPage1 = () => {

    // States
    const [imageURL, setImageURL] = useState( '' );
    const [nombreOeuvres, setNombreOeuvres] = useState( '' );
    const [imagePreviews, setImagePreviews] = useState( {} );
    const [imageId, setImageId] = useState( '' );
    const [imageKey, setImageKey] = useState( 0 );
    const [loaded, setLoaded] = useState();

    // Selectors 
    const userId = useSelector( ( state ) => state.user._id );
    const exhibitionId = useSelector( ( state ) => state.currentProjectId );
    const token = useSelector( ( state ) => state.token );

    // Chargement du plan de la galerie 
    const projectImages = {
        "Gallery1": "../../plan/plan-Model-1.jpg",
        "Gallery2": "../../plan/plan-Model-2.jpg"
    }

    /*
     * Requete pour charger les données du dossier contenant les images 
     */

    useEffect( () => {
        fetch( `http://localhost:3001/exhibitions/exhibitionId/${exhibitionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        } )
            .then( response => {
                if ( !response.ok ) {
                    throw new Error( 'Network response was not ok' );
                }

                return response.json();
            } )
            .then( data => {

                setNombreOeuvres( data.artworksnb )
                setImageURL( projectImages[data.template] );

            } )
            .catch( err => {

            } );
    }, [userId] );

    /*
     * Fonction pour gérer le téléchargement des images 
     */

    const handleImageUpload = ( event, index ) => {

        const file = event.target.files[0];
        if ( file ) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the state with the new image preview URL
                setImagePreviews( prevState => ( {
                    ...prevState,
                    [index]: reader.result
                } ) );
            };
            reader.readAsDataURL( file );
        }

        const formData = new FormData();
        formData.append( 'userId', userId );
        formData.append( 'exhibitionId', exhibitionId );
        formData.append( 'inputIndex', index );

        for ( const file of event.target.files ) {
            formData.append( 'image', file );
        }

        fetch( `http://localhost:3001/images/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,

            },
            body: formData,
        } )
            .then( response => {
                console.log( 'r' )
                return response.json(); // ou response.text() si votre serveur ne renvoie pas du JSON

            } )
            .then( data => {
                console.log( 'Images uploaded successfully:', data );
                setImageId( data._id )

            } )
            .catch( error => {

            } );
    };

    // État pour stocker les images existantes depuis la base de données
    const [existingImages, setExistingImages] = useState( [] );


    // Effet pour charger les images existantes
    useEffect( () => {
        // Effectuez une requête pour récupérer les images existantes pour l'exposition actuelle
        fetch( `http://localhost:3001/images/images-for-exhibition/${exhibitionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        } )
            .then( ( response ) => {
                if ( !response.ok ) {
                    throw new Error( 'Network response was not ok' );
                }
                return response.json();
            } )
            .then( ( data ) => {
                setExistingImages( data )
                // Stockez les images existantes dans l'état

            } )
            .catch( ( err ) => {
                console.error( 'Error fetching existing images:', err );

            } );
    }, [exhibitionId, token] );



    return (
        <Paper elevation={3} sx={{ p: 3, my: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Plan de la galerie
                </Typography>
                <Box
                    component="img"
                    sx={{
                        maxWidth: '80%',
                        height: 'auto',
                        width: '80%',
                        display: 'block',
                        mx: 'auto',
                    }}
                    src={imageURL}
                    loading="lazy"
                    alt="Plan de la galerie"
                />
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Téléchargement des œuvres
                </Typography>
                <form method="post" encType="multipart/form-data">
                    <Grid container spacing={2}>
                        {Array.from( { length: nombreOeuvres }, ( _, index ) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={index}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 2,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant="subtitle1" gutterBottom align="center">
                                        Emplacement {index + 1}
                                    </Typography>
                                    {existingImages.map( ( existingImage ) => {
                                        if ( existingImage.location === index.toString() ) {
                                            return (
                                                <div key={existingImage._id}>
                                                    <img
                                                        src={`http://localhost:3001/${existingImage.filePath}`}
                                                        alt={`Preview ${index}`}
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            marginBottom: '10px',
                                                        }}
                                                        onLoad={() => console.log( 'loaded' )}
                                                    />
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <Button
                                                            variant="outlined"
                                                            component="label"
                                                        >
                                                            Changer l'oeuvre
                                                            <input
                                                                type="file"
                                                                name="image"
                                                                hidden
                                                                onChange={( event ) => handleImageUpload( event, index )}
                                                            />
                                                        </Button>
                                                        <Button variant="outlined">
                                                            MetaDonnées
                                                        </Button>
                                                    </Box>
                                                </div>
                                            );
                                        }
                                        return <>
                                        </>
                                    } )}
                                    {existingImages.every( ( existingImage ) => existingImage.location !== index.toString() ) && (
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            Téléchargement d'une oeuvre
                                            <input
                                                type="file"
                                                name="image"
                                                hidden
                                                onChange={( event ) => {

                                                    handleImageUpload( event, index );
                                                    window.location.reload();

                                                }}
                                            />

                                        </Button>
                                    )}

                                </Paper>
                            </Grid>
                        ) )}
                    </Grid>
                </form>
            </Box>
        </Paper>
    );
};

export default ContenuPage1