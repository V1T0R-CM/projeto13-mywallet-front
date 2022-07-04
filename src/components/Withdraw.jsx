import { useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../context/UserContext"
import {Puff} from "react-loader-spinner"

export default function Withdraw(){
    const { userInfo } = useContext(UserContext)
    const [withdrawInfo, setWithdrawInfo]=useState({value:'', description:''});
    const [disable, setDisable]=useState(false);
    const navigate = useNavigate()

    function submitData(event){
        event.preventDefault();
        setDisable(true);

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        };
        const promise = axios.post("https://projetomywalletback.herokuapp.com/withdraw", withdrawInfo, config);
        promise.then(()=>{
            navigate("/extract")
        });

        promise.catch(()=>{
            setDisable(false)
            setLoginInfo({email:'', password:''})
            alert("Não foi possivel fazer o withdrawo!");
        });
    }

    return(
        <Main>
            <HeaderBar>
                <span>Nova saída</span>
            </HeaderBar>
            <form onSubmit={submitData}>
                <input 
                type="number" 
                id="value"
                value={withdrawInfo.value} 
                required
                onChange={(e) => setWithdrawInfo({...withdrawInfo, value: e.target.value.replace(",",".")})}
                placeholder="Valor"
                disabled = {disable}/>

                <input 
                type="text" 
                id="description" 
                value={withdrawInfo.description}
                required
                onChange={(e) => setWithdrawInfo({...withdrawInfo,description: e.target.value})}
                placeholder="Descrição"
                disabled = {disable}/>

                <button type="submit" disabled = {disable}>{disable?<Puff color="#FFFFFF" width={40} height={40}/>:"Salvar saída"}</button>
            </form>
        </Main>)
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    min-width:100vw;
    min-height: 100vh;
    align-items: center;
    background-color: #8C11BE;

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
`

const HeaderBar = styled.header`
    display: flex;
    width: 85%;
    height: 78px;
    justify-content: flex-start;
    align-items: center;

    span{
        font-weight: 700;
        font-size: 26px;
        color: #ffffff;
    }
`