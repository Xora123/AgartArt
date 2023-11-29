import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button, Paper, Grid } from '@mui/material';
import Navbar from 'scenes/navbar';
import ContenuPage1 from './page-1';
import ContenuPage2 from './page-2';
import ContenuPage3 from './page-3';
import ContenuPage4 from './page-4';
import { Link, useParams } from 'react-router-dom';

const CreatePage = () => {

    const [contenu, setContenu] = useState( <ContenuPage1 /> );

    const id = useParams()
    return <>
        <Navbar />
        <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', px: 3 }}>
            <Grid container>
                {/* Zone des boutons sur la gauche en colonne */}
                <Grid item xs={12} sm={3} md={2} lg={1} sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 3 }}>
                    <Button variant="contained" color="primary" onClick={() => setContenu( <ContenuPage1 /> )}>
                        Œuvres
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setContenu( <ContenuPage2 /> )}>
                        Options
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setContenu( <ContenuPage3 /> )}>
                        Effets
                    </Button>
                    <Button
                    variant="contained"
                    color="primary" 
                    component={Link}
                    to={`/exhibition/${id.exhibitionId}`}
                  >
                    Voir l'expérience
                  </Button>
                    {/* Ajoutez d'autres boutons pour les autres pages de la même manière */}
                </Grid>
                {/* Contenu changeant à droite en fonction du bouton cliqué */}
                <Grid item xs={12} sm={9} md={10} lg={11} sx={{ p: 3 }}>
                    <Paper sx={{ p: 2, minHeight: 500, overflow: 'auto' }}>
                        {contenu}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </>
}


export default CreatePage