import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import CreatePage from "scenes/create";
import Gallery1 from "scenes/widgets/template/Template1";
import Gallery2 from "scenes/widgets/template/Template2";
import ExhibitionPage from "scenes/exhibitionPage";


function App() {
  const mode = useSelector( ( state ) => state.mode );
  const theme = useMemo( () => createTheme( themeSettings( mode ) ), [mode] );
  const isAuth = Boolean( useSelector( ( state ) => state.token ) );

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/home/create/:exhibitionId"
              element={isAuth ? <CreatePage /> : <Navigate to="/" />}
            />
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/exhibition/:exhibitionId"
              element={isAuth ? <ExhibitionPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/home/model/1"
              element={isAuth ? <Gallery1 /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/model/2"
              element={isAuth ? <Gallery2 /> : <Navigate to="/" />}
            />
            <Route path="/model/1" element={<Gallery1 />} />
            <Route path="/model/2" element={<Gallery2 />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
