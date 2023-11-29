import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Monalisart from "./model1";
import ModernArt from "./model2";
import React from 'react'
import ReactDOM from 'react-dom/client'

const ExhibitonPage = () => {

    const { exhibitionId } = useParams();
    const [exhibition, setExhibition] = useState( null );

    // Fetch la gallery en fonction de l'id
    useEffect( () => {
        const fetchExhibition = async () => {
            try {
                // Adjust the URL to match your API endpoint
                const response = await fetch( `http://localhost:3001/exhibitions/exhibitionId/${exhibitionId}` );
                if ( !response.ok ) {
                    throw new Error( `HTTP error! status: ${response.status}` );
                }
                const data = await response.json();
                setExhibition( data );
            } catch ( err ) {
           
            } finally {

            }
        };

        fetchExhibition();
    }, [exhibitionId] );

    if ( !exhibition ) {
        return <div>Loading...</div>;
    }

    return <>

        {
            exhibition.template === 'Gallery1' ? (
                <Monalisart />
            ) : (
                <ModernArt />
            )
        }
    </>
}

export default ExhibitonPage