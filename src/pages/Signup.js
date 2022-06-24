import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const POSTURL = 'https://projeto17-linkr-back-end.herokuapp.com/signup';

export default function Signup(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState({email:'', password:'', username:'', pictureURL:''});

    function postSignUp(e){
        setLoading(true);
        e.preventDefault();
        const promise = axios.post(POSTURL, signUp);
        promise.then(res => {
            setLoading(false);
            navigate("/");
        })
        promise.catch((e) => {
            alert(e)
            setLoading(false);
        })
    }

    function Button(){
        if(!loading){
            return(
                <button type='submit'>Sign Up</button>
            )
        }
        if(loading){
            return(
                <button>
                    <div className='loading' />
                </button>        
            )
        }
    }

    return(
        <Container>
            <div className="logo-box">
                <h1>linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </div>
            <div className="form-box">
                <form onSubmit={postSignUp}>
                    <input 
                        type="email" 
                        placeholder="e-mail"
                        onChange={(e) => setSignUp({...signUp, email: e.target.value})}
                        value={signUp.email}
                        required
                    ></input>
                    <input 
                        type="password" 
                        placeholder="password"
                        onChange={(e) => setSignUp({...signUp, password: e.target.value})}
                        value={signUp.password}
                        required
                    ></input>
                    <input 
                        type="text"
                        placeholder="username"
                        onChange={(e) => setSignUp({...signUp, username: e.target.value})}
                        value={signUp.username}
                        required
                    ></input>
                    <input 
                        type="url"
                        placeholder="picture url"
                        onChange={(e) => setSignUp({...signUp, pictureURL: e.target.value})}
                        value={signUp.pictureURL}
                        required
                    ></input>
                    <Button />
                    <Link to='/'>
                        <h3>Switch back to log in</h3>
                    </Link>
                </form>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #151515;
    display: flex;
    .logo-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-right: 535px;
        h1{
            color: white;
            font-size: 106px;
            font-family: Passion One;
            width: 442px;
        }
        h2{
            color: white;
            font-size: 43px;
            font-family: Oswald;
            max-width: 442px;
        }
    }
    .form-box{
        background-color: #333333;
        height: 100%;
        width: 535px;
        position: absolute;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        form{
            display: flex;
            flex-direction: column;
        }
        input{
            width: 429px;
            height: 65px;
            border: none;
            border-radius: 6px;
            margin-bottom: 13px;
            font-size: 27px;
            font-family: oswald;
        }
        input::placeholder{
            padding-left: 17px;
        }
        button{
            color: white;
            background-color: #1877F2;
            border: none;
            width: 429px;
            height: 65px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 27px;
            font-family: oswald;
        }
        .loading {
            animation: is-rotating 1s infinite;
            width: 25px;
            height: 25px;
            border: 4px solid #1877F2;
            border-top-color: #ffffff;
            border-radius: 50%;
            margin: 15px;
        }
        @keyframes is-rotating {
            to {
                transform: rotate(1turn);
            }
        }
        h3{
            font-family: lato;
            text-decoration: underline;
            color: #ffffff;
            text-align: center;
            margin-top:14px;
        }
    }
    @media (max-width: 1000px){
        flex-direction: column;
        .logo-box{
            margin: 27px 0;
            h1{
                color: white;
                font-size: 76px;
                width: 237px;
                text-align: center;
            }
            h2{
                color: white;
                font-size: 23px;
                max-width: 237px;
                line-height: 34.09px
            }
        }
        .form-box{
            position: relative;
            width: 100%;
            align-items: baseline;
            form{
                margin-top: 40px;
            }
            input{
                width: 330px;
                height: 55px;
                font-size: 22px;
            }
            button{
                width: 330px;
                height: 55px;
                font-size: 22px;
            }
        }
    }
`