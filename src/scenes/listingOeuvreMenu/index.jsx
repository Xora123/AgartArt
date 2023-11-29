import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Button, Typography, Card, CardContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setListingInterfaceOpen } from 'state';

const ListingOeuvreMenu = () => {
    const isMenuOpen = useSelector((state) => state.listingInterface);
    const params = useParams();
    const [oeuvreTab, setOeuvreTab] = useState([]);
    const id = params.exhibitionId;
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://localhost:3001/images/images-for-exhibition/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setOeuvreTab(data);
            })
            .catch((err) => {
                // Gérer l'erreur ici
            });
    }, [id, token]);

    const handleClose = () => {
        dispatch(setListingInterfaceOpen(false));
    }

    return (
        <>
            {isMenuOpen && (
                <Paper style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', overflow: 'auto', padding: '20px' }}>
                    <IconButton onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseIcon />
                    </IconButton>
                    <Grid container spacing={2}>
                        {oeuvreTab.map((oeuvre, index) => (
                            <Grid key={index} item xs={12} md={6}>
                                <Card>
                                    <img width='100%' src={`http://localhost:3001/${oeuvre.filePath}`} alt={oeuvre.title} style={{ height: '60%', objectFit: 'cover' }} />
                                    <CardContent>
                                        <Typography variant="body1"><b>Créateur:</b> {oeuvre.title}</Typography>
                                        <Typography variant="body1"><b>Créateur:</b> {oeuvre.creator}</Typography>
                                        <Typography variant="body1"><b>Technique:</b> {oeuvre.technical}</Typography>
                                        <Typography variant="body1"><b>Origine:</b> {oeuvre.origin}</Typography>
                                        <Typography variant="body1"><b>Description:</b> {oeuvre.description}</Typography>
                                        {(oeuvre.sizeX && oeuvre.sizeY) && <Typography variant="body1"><b>Taille:</b> {oeuvre.sizeX} x {oeuvre.sizeY}</Typography>}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}
        </>
    );
};

export default ListingOeuvreMenu;
