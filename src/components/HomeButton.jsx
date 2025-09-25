import { useNavigate } from "react-router-dom";
import './HomeButton.css';

export function HomeButton() {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <button className="home-btn" type="submit" onClick={handleHomeClick}>🏠</button>
    );
}