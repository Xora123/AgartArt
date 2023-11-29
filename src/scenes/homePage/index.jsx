import Navbar from "scenes/navbar";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  List,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  DialogActions,
  Avatar
} from "@mui/material";
import { Link } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from "@emotion/react";
import ProjectsList from "scenes/widgets/projectList";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProjectId } from "state";

const HomePage = () => {
  const { palette } = useTheme()
  const [open, setOpen] = useState( false );
  const userId = useSelector( ( state ) => state.user._id );
  const [selectedIndex, setSelectedIndex] = useState( 0 );
  const exhibitionId = useSelector( ( state ) => state.currentProjectId );
  const dispatch = useDispatch()

  /* Fonction pour ajouter un projet dans la homepage */
  const [galleryName, setGalleryName] = useState( "" );
  const [template, setTemplate] = useState( "" ); // peut stocker "Model 1" ou "Model 2"
  const [artworknbr, setArtworknbr] = useState( "" ); // Nombre d'oeuvre dans le model

  /* Fonction pour gerer l'ouverture et la fermeture de la popup */
  const handleClickOpen = () => {
    setOpen( true );
  };

  const handleClose = () => {
    setOpen( false );
  };

  /* Fonction pour gerer la preview des différents models  */
  const handleListItemClick = ( event, index ) => {
    setSelectedIndex( index );
    const selectedTemplate = index === 0 ? "Gallery1" : "Gallery2";
    setTemplate( selectedTemplate );

    const nbr = selectedTemplate === "Gallery1" ? "40" : "35"

    setArtworknbr( nbr )

    console.log( nbr )
  };

  /* Requete base de donnée pour crée un nouveau projet */
  const handleContinue = () => {
    fetch( "http://localhost:3001/exhibitions/createExhibition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem( 'token' )}`
      },
      body: JSON.stringify( {
        title: galleryName,
        template: template,
        userId: userId,
        artworksnb: artworknbr,
      } ),
    } )
      .then( response => response.json() )
      .then( data => {
        const projectId = data.exhibitionId;
        dispatch(
          setCurrentProjectId(
            projectId
          ) );
        handleClose();
        
      } )
      .catch( error => {
        // Handle error here
        console.error( "There was an error:", error );
      } );
  };


  return <>
    <Navbar />
    {/* Contenue de la page */}
    <FlexBetween gap="1.5" margin="1.5rem">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="indianred"
      >
        Mes projets
      </Typography>
    </FlexBetween>
    <FlexBetween margin="1.5rem">
      <Button variant="outlined" onClick={handleClickOpen}>
        Crée un nouveau projet
      </Button>

      {/* Popup création d'un template */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Crée une nouvelle galerie
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3>1. Veuillez choisir un nom pour votre galerie</h3>
            <Input
              color="primary"
              placeholder="Nom de galerie"
              size="md"
              variant="outlined"
              value={galleryName}
              onChange={( e ) => setGalleryName( e.target.value )}
            />

            <h3>2. Veuillez choisir un template</h3>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={( event ) => handleListItemClick( event, 0 )}
              >
                <ListItemIcon sx={{ marginRight: 2 }}>
                <Avatar src="../MonaPreview.png" sx={{ width: 80, height: 80 }} />
                </ListItemIcon>
                <ListItemText primary="Gallery classique" />
                <Link to="/model/1" target="_blank">
                  <VisibilityIcon
                    sx={{ "&:hover": { color: palette.primary.main } }}
                  />
                </Link>
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={( event ) => handleListItemClick( event, 1 )}
              >
                <ListItemIcon sx={{ marginRight: 2 }}>
                <Avatar src="../ModernArtPreview.png" sx={{ width: 80, height: 80 }} />
                </ListItemIcon>
                <ListItemText primary="Gallery d'art Modern" />
                <Link to="/model/2" target="_blank">
                  <VisibilityIcon
                    sx={{ "&:hover": { color: palette.primary.main } }}
                  />
                </Link>
              </ListItemButton>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Link to={`/home/create/${exhibitionId}`} target="_blank">
            <Button onClick={handleContinue}>Continuer</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </FlexBetween>
    <ProjectsList />
  </>
};

export default HomePage;
