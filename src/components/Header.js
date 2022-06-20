import styled from 'styled-components';
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {DebounceInput} from 'react-debounce-input';
import {MdSearch} from "react-icons/md";

const GETURL = "https://projeto17-linkr-back-end.herokuapp.com/userpic";
const SEARCH_URL = "http://127.0.0.1:4000/search-user"

export default function Header() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const [search, setSearch] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [userArr, setUserArr] = useState([]);
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

    useEffect (() => {
        if(search.length < 3){return}
        let objSearch = {search}
        axios.post(SEARCH_URL, objSearch, { headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(userArr)
                setUserArr(res.data)
            }) 
            .catch(e => console.log(e))
    }, [search]);

    return(
        <HeaderContainer>
            <h1>linkr</h1>
            <div 
                className='search-box'
                style={{backgroundColor: (userArr.length > 0) ? "#E7E7E7" : "none" }}
            >        
                <Search 
                    type="text" 
                    placeholder="Search for people"
                    minLength={3}
                    debounceTimeout={300}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <Md></Md>
                <div className='results'>
                    {userArr.map(element => {
                        return(
                            <Link to ={`/user/${element.id}`}>
                                <div className='user'>
                                <div className='profilePicture'>
                                    <img src={element.pictureURL}  alt='profilePicture'/>
                                </div>
                                <h4>{element.username}</h4>
                                </div>
                            </Link>
                        )
                    })}  
                </div>      
            </div>
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
    .search-box{
        margin-top: 3px;
        border-radius: 8px 8px 0 0;
        position: relative;
    }
    .results {
        background-color: #E7E7E7;
        border-radius: 0 0 8px 8px;
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
    .user{
        width: 100%;
        height: 47px;
        display: flex;
        align-items: center;
    }
    .profilePicture{
        margin-left: 10px;
        height: 39px;
        width: 39px;
        border-radius: 304px;
    }
    .profilePicture img{
        width: 100%;
        height: 100%;
        border-radius: 304px;
        object-fit: cover;
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

export const Search = styled(DebounceInput)`
    width: 563px;
    height: 45px;
    padding-left: 15px;
    background-color: #FFFFFF;
    border-radius: 8px;
    border: none;
    font-size: 19px;

   &::placeholder {
      color: #C6C6C6;
      font-family: 'Lato', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 22.8px;
   }
`;

const Md = styled(MdSearch)`
    position: absolute;
    top: 11px;
    right: 15px;
    color: #C6C6C6;
    font-size: 22px;
`