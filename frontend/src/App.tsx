import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AuthRoute from "./routes/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthRoute />}>
          <Route path="sign-in" element={<h1>sign in</h1>} />
          <Route path="sign-up" element={<h1>sign up</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
