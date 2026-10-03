import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AuthRoute from "./routes/AuthRoute";
import AppRoute from "./routes/AppRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { UserContextProvider } from "./contexts/UserContext";
import { RoutesContextProvider } from "./contexts/RoutesContext";

function App() {
  return (
    <BrowserRouter>
     <RoutesContextProvider>
       <UserContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthRoute />}>
            <Route path="sign-in" element={<h1>sign in</h1>} />
            <Route path="sign-up" element={<h1>sign up</h1>} />
          </Route>

          <Route path="app" element={<AppRoute />}></Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserContextProvider>
     </RoutesContextProvider>
    </BrowserRouter>
  );
}

export default App;
