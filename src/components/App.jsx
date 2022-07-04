import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserContext from "../context/UserContext";
import { useState } from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Extract from "./Extract.jsx";

export default function App(){
    const [userInfo, setUserInfo] = useState({})
    
    return(
        <BrowserRouter>
            <UserContext.Provider value={{ userInfo, setUserInfo}}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/cadastro" element={<Register/>}/>
                    <Route path="/extract" element={<Extract/>}/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
