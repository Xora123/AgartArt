import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  currentProjectId: null,
  imageName: null,
  imageId: null,
  open: false,
  clickedSide: null,
  oeuvreId: null,
  listingInterface: false,
};

export const authSlice = createSlice( {
  name: "auth",
  initialState,
  reducers: {
    setMode: ( state ) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: ( state, action ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: ( state ) => {
      state.user = null;
      state.token = null;
    },
    setCurrentProjectId: ( state, action ) => {
      state.currentProjectId = action.payload;
    },
    setImageName: ( state, action ) => {
      state.imageName = action.payload; // Définition du nom de l'image
    },
    setImageId: ( state, action ) => {
      state.imageId = action.payload
    },
    setInterfaceOpen: ( state, action ) => {
      state.open = action.payload;
    },
    setClickedSide: ( state, action ) => {
      state.clickedSide = action.payload;
    },
    setOeuvreId: ( state, action ) => {
      state.oeuvreId = action.payload;
    },
    setListingInterfaceOpen: (state, action ) => {
      state.listingInterface = action.payload;
    }
  },
} );



export const { setMode, setLogin, setLogout, setCurrentProjectId, setImageName, setInterfaceOpen, setImageId, setClickedSide, setOeuvreId,setListingInterfaceOpen } =
  authSlice.actions;
export default authSlice.reducer;
