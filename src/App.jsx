import { NavBar } from "./components/Navbar"

import { Routes, Route } from "react-router-dom";
import { pages } from "./utils/pages";
import { GardenPage } from "./pages/GardenPage";
import "./index.css"


export const App = () => {
    return (
        <>
            <NavBar />
            <main className="app-container"> 
                <Routes>
                    {pages.map((page) => {
                        return (
                            <Route path={page.route} key={page.route} element={page.component} />
                        )
                    })}
                    
                    {/* fallback */}

                    <Route path="*" element={<GardenPage />} />
                </Routes>
            </main>
        </>
    );
};