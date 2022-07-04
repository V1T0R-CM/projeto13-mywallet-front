import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserContext from "../context/UserContext";
import { useState } from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Extract from "./Extract.jsx";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

export default function App(){
    const [userInfo, setUserInfo] = useState({})
    
    return(
        <BrowserRouter>
            <UserContext.Provider value={{ userInfo, setUserInfo}}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/cadastro" element={<Register/>}/>
                    <Route path="/extract" element={<Extract/>}/>
                    <Route path="/deposit" element={<Deposit/>}/>
                    <Route path="/withdraw" element={<Withdraw/>}/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
