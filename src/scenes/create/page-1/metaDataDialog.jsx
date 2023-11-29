import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Field, Formik } from "formik";
import { Button, FormControlLabel, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function MetaDataDialog( { open, onClose, imageId } ) {
  const token = useSelector( ( state ) => state.token );

  // Initial values pour le formulaire formik
  const [initialValues, setInitialValues] = useState( {
    title: '',
    creator: '',
    technical: '',
    origin: '',
    description: '',
    sizeX: '',
    sizeY: '',
    fondBlanc: ''
  } );

  const saveMetaData = async ( values ) => {
    const formData = new FormData();

    // Toujours ajouter chaque champ à formData, même s'il est vide
    formData.append( 'title', values.title || '' );
    formData.append( 'creator', values.creator || '' );
    formData.append( 'technical', values.technical || '' );
    formData.append( 'origin', values.origin || '' );
    formData.append( 'description', values.description || '' );
    formData.append( 'sizeX', values.sizeX || '' );
    formData.append( 'sizeY', values.sizeY || '' );
    formData.append( 'fondBlanc', values.fondBlanc || '' );

    fetch( `http://localhost:3001/images/update/${imageId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    } )
      .then( response => {
        if ( !response.ok ) {
          throw new Error( 'Réponse du serveur non valide' );
        }
        return response.json();
      } )
      .then( data => {
        // Gérer la réponse
      } )
      .catch( error => {
        // Gérer les erreurs
      } );
  };

  // Function to handle form submission
  const handleFormSubmit = ( values ) => {
    console.log( 'Form data', values );
    saveMetaData( values )
      .then( () => {
        onClose();
      } )
      .catch( ( error ) => {
        console.error( 'Erreur lors de la sauvegarde des métadonnées:', error );
      } );
  };

  // Use Effect pour charger les données du formulaire si elle existe.
  useEffect( () => {
    fetch( `http://localhost:3001/images/image-details/${imageId}`, {
      method: 'GET',
      headers: {
        // Vos en-têtes si nécessaire
      },
    } )
      .then( response => response.json() )
      .then( data => {
        setInitialValues( {
          title: data.title || '',
          creator: data.creator || '',
          technical: data.technical || '',
          origin: data.origin || '',
          description: data.description || '',
          sizeX: data.sizeX || '',
          sizeY: data.sizeY || '',
          fondBlanc: data.fondBlanc || '',
        } );
      } )
      .catch( error => {
        console.error( 'Erreur lors de la récupération des données:', error );
      } );
  }, [open, imageId] );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modification de l'oeuvre</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit} enableReinitialize>
          {( {
            values,
            handleBlur,
            handleChange,
            handleSubmit,
          } ) => (
            <form id="formik-form" onSubmit={handleSubmit}>
              <Field as={TextField} onChange={handleChange} onBlur={handleBlur} autoFocus margin="dense" name="title" label="Titre" type="text" fullWidth variant="standard" />
              <Field as={TextField} onChange={handleChange} onBlur={handleBlur} margin="dense" name="creator" label="Créateur" type="text" fullWidth multiline rows={1} variant="standard" />
              <Field as={TextField} onChange={handleChange} onBlur={handleBlur} margin="dense" name="technical" label="Technique" type="text" fullWidth multiline rows={1} variant="standard" />
              <Field as={TextField} onChange={handleChange} onBlur={handleBlur} margin="dense" name="origin" label="Origine" type="text" fullWidth multiline rows={1} variant="standard" />
              <Field as={TextField} onChange={handleChange} onBlur={handleBlur} margin="dense" name="description" label="Description" type="text" fullWidth multiline rows={4} variant="standard" />
              <Typography variant="h6" gutterBottom>
                Taille de l'oeuvre
              </Typography>
              <Field as={TextField} onChange={handleChange} onBlur={handleBlur} label="X" name="sizeX" InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
              <Field as={TextField} onChange={handleChange} onBlur={handleBlur} label="Y" name="sizeY" InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />

              <Typography variant="h6" gutterBottom>
                Blanc dormant
              </Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="fondBlanc"
                value={values.fondBlanc}
                onChange={handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="0 cm" />
                <FormControlLabel value="0.2" control={<Radio />} label="2 cm" />
                <FormControlLabel value="0.35" control={<Radio />} label="3.5 cm" />
                <FormControlLabel value="0.5" control={<Radio />} label="5 cm" />
              </RadioGroup>

              <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button
                  onClick={() => handleFormSubmit( values )}
                  type="submit"
                  form="formik-form"
                >
                  Sauvegarder
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
