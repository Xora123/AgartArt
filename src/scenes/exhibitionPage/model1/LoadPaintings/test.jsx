import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as THREE from 'three';
import { useDispatch, useSelector } from "react-redux";
import { useGLTF } from "@react-three/drei";
import { predefinedMeshes } from "../PaintingPosition/predefinedMeshes";
import { setClickedSide, setOeuvreId } from "state";


export default function Test() {
    const { exhibitionId } = useParams();
    const token = useSelector( ( state ) => state.token );
    const [oeuvreTab, setOeuvreTab] = useState( null );
    const [textures, setTextures] = useState( {} );
    const meshRef = useRef();
    const { nodes, materials } = useGLTF( '/cadreTransformed.glb' );
    const dispatch = useDispatch();

    useEffect( () => {
        fetch( `http://localhost:3001/images/images-for-exhibition/${exhibitionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        } )
            .then( ( response ) => {
                if ( !response.ok ) {
                    throw new Error( "Network response was not ok" );
                }
                return response.json();
            } )
            .then( ( data ) => {
                setOeuvreTab( data );
            } )
            .catch( ( err ) => { } );
    }, [exhibitionId, token] );

    useEffect( () => {
        // Charger les textures à partir des fichiers image dans filePath
        const textureLoader = new THREE.TextureLoader();
        const textures = {};
        if ( oeuvreTab ) {
            oeuvreTab.forEach( ( oeuvre ) => {
                const fullPath = `http://localhost:3001/${oeuvre.filePath}`;
                textures[`image-${oeuvre.location}`] = textureLoader.load( fullPath );
            } );
            setTextures( textures );
        }
    }, [oeuvreTab] );

    if ( !oeuvreTab ) {
        return null; // En attendant que les données soient chargées
    }

    const handleMeshClick = ( side, objectId ) => {
        dispatch( setOeuvreId( objectId ) )
        dispatch( setClickedSide( side ) )
    };
    function Cadre( props ) {


        return (
            <group {...props} dispose={null}>
                <mesh geometry={nodes.Cube004.geometry} material={materials.Fond} />
                <mesh geometry={nodes.Cube004_1.geometry} material={materials.Cadre} ref={meshRef} />
            </group>
        );
    }

    const meshElements = oeuvreTab.map( ( oeuvre ) => {
        const location = oeuvre.location;
        const matchingMesh = predefinedMeshes.find(
            ( mesh ) => mesh.nameImg === `image-${location}`
        );
        if ( matchingMesh ) {

            const texture = textures[`image-${location}`];
            if ( texture ) {
                const sizeX = oeuvre.sizeX || 1;
                const sizeY = oeuvre.sizeY || 1;
                const fondBlanc = oeuvre.fondBlanc

                return (
                    <group key={location}>
                        <mesh
                            position={[
                                matchingMesh.position[0],
                                matchingMesh.position[1],
                                matchingMesh.position[2] + 0.0001,
                            ]}
                            rotation={[
                                matchingMesh.rotation[0],
                                matchingMesh.rotation[1],
                                matchingMesh.rotation[2],
                            ]}
                            onClick={() => handleMeshClick( matchingMesh.side, oeuvre._id )}
                        >
                            <boxGeometry args={[0, sizeX, sizeY]} />
                            <meshStandardMaterial map={texture} /> {/* Utilisation de la texture */}
                        </mesh>
                        <Cadre
                            position={[
                                matchingMesh.position[0],
                                matchingMesh.position[1],
                                matchingMesh.position[2]
                            ]}
                            rotation={[
                                matchingMesh.rotation[0],
                                matchingMesh.rotation[1],
                                matchingMesh.rotation[2],
                            ]}
                            scale={[
                                1, sizeX + fondBlanc / 1, sizeY + fondBlanc / 1
                            ]}
                        />
                    </group>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    } );

    return <>{meshElements}</>;
}
