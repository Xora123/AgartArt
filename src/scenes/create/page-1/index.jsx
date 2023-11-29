import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux";
import MetaDataDialog from "./metaDataDialog";

export default function ContenuPage1() {

    const [nombreOeuvres, setNombreOeuvres] = useState( null );

    // Selectors 
    const userId = useSelector( ( state ) => state.user._id );
    const exhibitionId = useSelector( ( state ) => state.currentProjectId );
    const token = useSelector( ( state ) => state.token );
    const [imageURL, setImageURL] = useState( '' );
    const [imageId, setImageId] = useState( '' );
    const [currentImageId, setCurrentImageId] = useState( null );


    /*
    * Force Update
    */
    const [reducerValue, forceUpdate] = useReducer( x => x + 1, 0 )


    // Chargement du plan de la galerie 
    const projectImages = {
        "Gallery1": "../../plan/plan-Model-1.jpg",
        "Gallery2": "../../plan/plan-Model-2.jpg"
    }

    /*
    * Requete pour récuperer les données de l'exposition en cours en fonction de l'id
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
    }, [exhibitionId, token, reducerValue] );


    /*
    * Requete pour récuperer les images de l'exposition 
    */
    const [existingImages, setExistingImages] = useState( [] );

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
    }, [exhibitionId, token, reducerValue] );


    /*
     * Fonction pour gérer le téléchargement des images 
     */

    const handleImageUpload = ( event, index ) => {
        console.log( reducerValue )
        const file = event.target.files[0];
        if ( file ) {
            const reader = new FileReader();
            reader.onloadend = () => {

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

                return response.json(); // ou response.text() si votre serveur ne renvoie pas du JSON

            } )
            .then( data => {
                console.log( 'Images uploaded successfully:', data )
                setImageId( data._id )
                forceUpdate()
            } )
            .catch( error => {

            } );
    };


    /*
    * Ouverture de la boite de dialogue pour les metadonnées 
    */

    const [dialogOpen, setDialogOpen] = useState( false );

    const handleOpenDialog = ( index ) => {
        const existingImage = existingImages.find( ( image ) => image.location === index.toString() );
        const imageId = existingImage ? existingImage._id : null;
        setCurrentImageId( imageId );
        setDialogOpen( true );
    };

    return (
        <Box sx={{ p: 3, my: 4 }}>
            <Typography variant="h3" gutterBottom>
                Téléchargement des œuvres
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

            </Typography >
            <form method="post" encType="multipart/form-data">
                <Grid container spacing={2}>
                    {Array.from( { length: nombreOeuvres }, ( _, index ) => {
                        const existingImage = existingImages.find( image => image.location === index.toString() );
                        const imagePath = existingImage ? `http://localhost:3001/${existingImage.filePath}?timestamp=${Date.now()}` : null;
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Paper elevation={3} sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="subtitle1" gutterBottom align="center">
                                        Emplacement {index + 1}
                                    </Typography>
                                    {imagePath ? (
                                        <Box sx={{ width: '100%', mb: 2 }}>
                                            <img
                                                src={imagePath}
                                                alt={`Preview ${index}`}
                                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                                onLoad={() => console.log( 'loaded' )}
                                            />
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button variant="outlined" component="label">
                                                    Changer l'œuvre
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={( event ) => {
                                                            handleImageUpload( event, index )
                                                        }}
                                                    />
                                                </Button>
                                                <Button variant="outlined" onClick={() => handleOpenDialog(index)}>
                                                    MetaDonnées
                                                </Button>
                                     
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            Télécharger une œuvre
                                            <input
                                                type="file"
                                                hidden
                                                onChange={( event ) => {
                                                    handleImageUpload( event, index );
                                                }}
                                            />
                                        </Button>
                                    )}
                                </Paper>
                            </Grid>
                        );
                    } )}
                </Grid>
            </form>
            <MetaDataDialog open={dialogOpen} imageId={currentImageId}  onClose={() => setDialogOpen( false )} />
        </Box >
            
    );
}