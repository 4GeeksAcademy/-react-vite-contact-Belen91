
import { useNavigate } from "react-router-dom";
import { pages } from '../utils/pages';
import { NavLink } from "react-router-dom";



export const NavBar = () => {
    
    //Opción 2: Usar Link de react en vez de UseNavigate.
    
    const navigate = useNavigate(); 

    return (
        
        <div className="container-fluid flex-row-1">
            <nav className="navbar navbar-expand-lg navbar-dark bg-success p-3">
                <NavLink className="navbar-brand" to="/"> 🌱 Mi Jardín Interactivo</NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                        {pages
                            .filter((page) => page.showNavigation)
                            .map((page, i) => (
                                <li key={i} className="nav-item">
                                    <NavLink className="btn btn-light mx-1 my-1" to={page.route}>  
                                        {page.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
        </div>
    );
};

