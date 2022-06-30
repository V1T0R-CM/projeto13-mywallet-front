import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";

export default function Register(){
    const [registerInfo, setRegisterInfo]=useState({name:'',email:'', password:'', repeatPassword:''})
    const [disable, setDisable]=useState(false)

    function submitData(event){
        event.preventDefault();
        console.log(registerInfo)
    }

    return (
        <Main>
            <h1>MyWallet</h1>
            <form onSubmit={submitData}>
                <input 
                type="text" 
                id="name" 
                value={registerInfo.name} 
                required
                onChange={(e) => setRegisterInfo({...registerInfo, name: e.target.value})}
                placeholder="Nome"
                disabled = {disable}/>
        
                <input 
                type="email" 
                id="email" 
                value={registerInfo.email} 
                required
                onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})}
                placeholder="E-mail"
                disabled = {disable}/>

                <input 
                type="password" 
                id="password" 
                value={registerInfo.password}
                required
                onChange={(e) => setRegisterInfo({...registerInfo,password: e.target.value})}
                placeholder="Senha"
                disabled = {disable}/>

                <input 
                type="password" 
                id="password" 
                value={registerInfo.repeatPassword}
                required
                onChange={(e) => setRegisterInfo({...registerInfo,repeatPassword: e.target.value})}
                placeholder="Confirme a senha"
                disabled = {disable}/>

                <button type="submit" disabled = {disable}>{disable?<ThreeDots color="#FFFFFF" width={52} height={14}/>:"Cadastrar"}</button>
            </form>
            <Link to="/"><span>Já tem uma conta? Entre agora!</span></Link>
        </Main>)
}


const Main = styled.div`
    display: flex;
    flex-direction: column;
    min-width:100vw;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #8C11BE;

    h1{
        font-family: 'Saira Stencil One';
        font-weight: 400;
        font-size: 32px;
        color: #ffffff;
        margin-bottom: 30px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 30px;
    }

    input{
        width: 85%;
        height: 60px;
        border: hidden;
        border-radius: 5px;
        margin-bottom: 13px;
        padding: 17px;
        font-weight: 400;
        font-size: 20px;
        color:#000000
    }

    input::placeholder{
        font-weight: 400;
        font-size: 20px;
        color:#000000
    }

    button{
        background-color: #A328D6;
        border-radius: 5px;
        border: hidden;
        width: 85%;
        height: 45px;
        font-weight: 700;
        font-size: 20px;
        color: #FFFFFF;
        display: flex;
        align-items:center;
        justify-content: center;
    }

    span{
        font-weight: 700;
        font-size: 15px;
        color: #ffffff;
        margin-top: 30px;
    }
`