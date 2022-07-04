import { useState, useContext, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../context/UserContext"

export default function Extract(){
    const { userInfo } = useContext(UserContext);
    const [extract, setExtract] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{const config = {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    };
    const promise = axios.get("https://projetomywalletback.herokuapp.com/extract", config);
    promise.then(response=>setExtract(response.data))
    },[])
    
    function logOut(){
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        };
        const promise = axios.delete("https://projetomywalletback.herokuapp.com/sessions", config);
        promise.then(()=>navigate("/"));
    }

    function renderTransactions(){
        if(extract.length>0){
            return(extract.map(transaction =><Transaction date={transaction.date} description={transaction.description} value={transaction.value} type={transaction.type}/>))
        }
        else{
            return(<Message>Não há registros de entrada ou saída</Message>)
        }
    }

    function renderBalance(){
        let balance=0;
        for(let i of extract){
            if(i.type==="deposit"){
                balance+=Number(i.value)
            }
            else{
                balance-=Number(i.value)
            }
        }

        if(extract.length===0){
            return(<BalanceBar/>)
        }
        else{
            return(
                <BalanceBar>
                    SALDO
                    <ColorSpan color={balance>0?"#03AC00":"#000000"}>
                        {balance}
                    </ColorSpan>
                </BalanceBar>
            )
        }
    }

    function Transaction({date, description, value, type}){
        return (
            <TransactionBar>
                <div>
                    <ColorSpan color="#C6C6C6">
                        {date}
                    </ColorSpan>
                    <ColorSpan color="#000000">
                        {description}
                    </ColorSpan>
                </div>
                <ColorSpan color={type==="deposit"?"#03AC00":"#C70000"}>
                    {value}
                </ColorSpan>
            </TransactionBar>
        )
    }

    return(
        <Main>
            <HeaderBar>
                <span>{`Olá, ${userInfo.name}`}</span>
                <ion-icon name="log-out-outline" onClick={()=>logOut()}></ion-icon>
            </HeaderBar>
            <ExtractContainer>
            <TransactionBar/>
                {renderTransactions()}
            </ExtractContainer>
            {renderBalance()}
            <NavegationBar>
                <TransactionButton onClick={()=>navigate("/deposit")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <div>Nova entrada</div>
                </TransactionButton>
                <TransactionButton onClick={()=>navigate("/withdraw")}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <div>Nova saída</div>
                </TransactionButton>
            </NavegationBar>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    min-width:100vw;
    min-height: 100vh;
    align-items: center;
    background-color: #8C11BE;
`
const HeaderBar = styled.header`
    display: flex;
    width: 85%;
    height: 78px;
    justify-content: space-between;
    align-items: center;

    span{
        font-weight: 700;
        font-size: 26px;
        color: #ffffff;
    }

    ion-icon{
        font-size: 30px;
        color: #ffffff;
    }
`
const ExtractContainer = styled.main`
    width: 85%;
    height: 60vh;
    border-radius: 5px 5px 0px 0px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`
const TransactionBar = styled.div`
    width: 100%;
    margin-top: 20px;
    display:flex;
    justify-content: space-between;
    padding-left: 10px;

    div{
        width: 70%;
    }

    span{
        margin-right: 10px;
    }
`

const BalanceBar = styled.div`
    width: 85%;
    height: 40px;
    border-radius: 0px 0px 5px 5px;
    background-color: #ffffff;
    display: flex;
    align-items:center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 700;
    font-size: 17px;
    color: #000000;
`
const ColorSpan= styled.span`
    color:${props => props.color};
    font-weight: 400;
    font-size: 16px;
`
const Message= styled.div`
    width: 60%;
    font-weight: 400;
    font-size: 20px;
    color: #868686;
    margin:auto;
    display:flex;
    justify-content: center;
    text-align:center;
`
const NavegationBar= styled.div`
    display:flex;
    justify-content: space-between;
    margin-top:14px;
    height: 16vh;
    width: 85%;
`
const TransactionButton=styled.button`
    background-color: #A328D6;
    border-radius: 5px;
    height:100%;
    width:48%;
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding:12px;
    border:hidden;

    ion-icon{
        position:absolute;
        top: 12px;
        left: 12px;
        font-size:22px;
        color:#ffffff;
    }
    
    div{
        width:40%;
        font-weight: 700;
        font-size: 17px;
        color: #ffffff
    }
`