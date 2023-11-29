import React, { useState } from 'react';
import { Box, Typography, Divider, Button, Paper, Grid } from '@mui/material';
import { Canvas } from '@react-three/fiber';

const ContenuPage2 = () => {

    const [ambiantColor, setAmbiantColor] = useState()

    const [wallColor, setWallColor] = useState()


    
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <Typography variant="h6" gutterBottom component="div" sx={{ p: 2 }}>
                Lumière d'ambiance
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={6}>
                    <Typography>Color</Typography>
                    <input type="color" defaultValue="#ffffff" />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Intensity</Typography>
                    <input type="number" defaultValue={1.00} />
                </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom component="div" sx={{ p: 2 }}>
                Couleurs de la galerie
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={6}>
                    <Typography>Color</Typography>
                    <input type="color" defaultValue="#ffffff" />
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Button variant="contained">Ajouter</Button>
            </Box>
        </Box>
    );
};

export default ContenuPage2;
