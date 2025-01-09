import { useNavigate } from "react-router-dom";

import "./header.css";

export default function Header() {
    const navigate = useNavigate()
    const goToHomePage = () => navigate('/')
    return <header className="header d-flex align-center">
        <div className="header__container container d-flex align-center">
            <div className="header__logo">
                <span style={{cursor: 'pointer'}} onClick={goToHomePage}>CoinSwap</span>
            </div>
        </div>
    </header>;
}
