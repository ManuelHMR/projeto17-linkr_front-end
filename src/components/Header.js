import styled from 'styled-components';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SearchComponent from './SearchComponent';

const GETURL = "https://projeto17-linkr-back-end.herokuapp.com/userpic";

export default function Header() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    let ref = useRef();

    let token = localStorage.getItem('token')

    function signOut(){
        localStorage.removeItem('token');
        navigate("/");
    };

    useEffect(() => {
        function OutsideClick(e) {
            if (selected && ref.current && !ref.current.contains(e.target)) {
              setSelected(false)
            }
        }
        document.addEventListener("mousedown", OutsideClick)
        return () => {
            document.removeEventListener("mousedown", OutsideClick)
        }
    }, [selected]);

    useEffect(() => {
        axios.get(GETURL, { headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                const {pictureURL} = res.data
                setProfilePic(pictureURL)
            })
            .catch(e => console.log(e))
    }, [token]);


    return(
        <HeaderContainer>
            <h1>linkr</h1>
            <SearchComponent/>
            <UserImg ref={ref}>
                {
                    selected ? 
                        <>
                            <ion-icon name="chevron-up-outline" onClick={() => setSelected(!selected)}></ion-icon>
                            <div className='log-out' onClick={() => signOut()}>
                                <h3>Logout</h3>
                            </div>
                        </>
                        :
                        <ion-icon name="chevron-down-outline" onClick={() => setSelected(!selected)}></ion-icon>
                } 
                <img src={profilePic} onClick={() => setSelected(!selected)} alt="profile"></img>
            </UserImg>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    height: 72px;
    width: 100%;
    background: #151515;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    h1{
        font-family: 'Passion One', cursive;
        font-weight: 700; 
        color: #FFFFFF;
        font-size: 49px;
    }
    .log-out{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 47px;
        background-color: #151515;
        position: absolute;
        top:72px;
        right: -15px;
        border-radius: 0 0 20px 20px;
    }
    h3{
        font-size: 17px;
        color: #FFFFFF;
        font-family: lato;
    }

    h4{
        margin-left: 12px;
        color: #515151;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
    }
    a{
        text-decoration: none;
        color: #515151;
        height: 100px;
        background-color: #E7E7E7;
        border-radius: 8px 8px 0 0;
    }
`

const UserImg = styled.div`
    display: flex;
    align-items: center;
    ion-icon{
        color: white;
        font-size: 26px;
        margin: 16px;
    }
    img{
        height: 53px;
        width: 53px;
        border-radius: 26.5px;
    }
`