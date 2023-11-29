import { configureStore, createSlice } from "@reduxjs/toolkit";
import * as THREE from "three";

// Slice Redux pour la gestion de l'état des ours
const cameraMovement = createSlice({
  name: "cameraMovement",
  initialState: {
    cameraMovement: false,
  },
  reducers: {
    setCameraMovementTrue: (state) => {
      state.cameraMovement = true;
    },
    setCameraMovementFalse: (state) => {
      state.cameraMovement = false;
    },
  },
});

// Slice Redux pour la gestion de l'index
const indexSlice = createSlice({
  name: "index",
  initialState: {
    index: 22,
  },
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setIndexForward: (state) => {
      state.index += 1;
    },
    setIndexBackward: (state) => {
      state.index -= 1;
    },
  },
});

// Slice Redux pour la gestion de l'état des objets 3D dans une application Three.js
const objectsSlice = createSlice({
  name: "objects",
  initialState: {
    cubePosition: new THREE.Vector3(0, 0, 0),
  },
  reducers: {
    setCubePosition: (state, action) => {
      state.cubePosition = action.payload;
    },
  },
});

// Configurez le store Redux en combinant les trois slices
const store = configureStore({
  reducer: {
    camera: cameraMovement.reducer,
    index: indexSlice.reducer,
    objects: objectsSlice.reducer,
  },
});

// Exportez les actions pour chaque slice
export const {
  setCameraMovementTrue,
  setCameraMovementFalse,
} = cameraMovement.actions;

export const {
  setIndex,
  setIndexForward,
  setIndexBackward,
} = indexSlice.actions;

export const {
  setCubePosition,
} = objectsSlice.actions;

export default store;
