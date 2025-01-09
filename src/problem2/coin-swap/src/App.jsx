import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero, CoinSwapForm, Header } from "./components/";
import "./App.css";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/swap" element={<CoinSwapForm />} />
            </Routes>
        </Router>
    );
}

export default App;
