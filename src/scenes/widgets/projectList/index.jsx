import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';


const ProjectsList = () => {
  const [projects, setProjects] = useState( [] );
 
  const userId = useSelector( ( state ) => state.user._id );
  const token = useSelector( ( state ) => state.token );

  // Retrouver la liste des projets 
  useEffect( () => {
    fetch( `http://localhost:3001/exhibitions/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    } )
      .then( response => {
        if ( !response.ok ) {
          throw new Error( 'Network response was not ok' );
        }
        console.log( response )
        return response.json();
      } )
      .then( data => {
        setProjects( data );

      } )
      .catch( err => {

      } );
  }, [userId] );



  // Supprimer une exhibiton
  const handleDelete = ( projectId ) => {
    fetch( `http://localhost:3001/exhibitions/delete/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    } )
      .then( response => {
        if ( !response.ok ) {
          throw new Error( 'Network response was not ok' );
        }
        // Mise à jour de l'état pour refléter la suppression du projet
        setProjects( projects.filter( project => project._id !== projectId ) );
      } )
      .catch( err => {

      } );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Liste des Projets
      </Typography>
      <Grid container spacing={3}>
        {projects.map( project => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {project.title}
                </Typography>
                <Typography color="textSecondary">
                  Statut: {project.projetStatus}
                </Typography>
                <Typography color="textSecondary">
                  Template: {project.template}
                </Typography>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/exhibition/${project._id}`}
                    style={{ marginLeft: '-16px' }}
                  >
                    Voir l'expérience
                  </Button>
                </CardContent>
              </CardContent>
              <CardContent sx={{ flexGrow: 1 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete( project._id )}
                >
                  Supprimer
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={`/home/create/${project._id}`}
                  style={{ marginLeft: '10px' }}
                >
                  Modifier
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ) )}
      </Grid>
    </Container>
  );
};


export default ProjectsList;
