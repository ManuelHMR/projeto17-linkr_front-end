import styled from "styled-components";
import axios from "axios";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input';
import {MdSearch} from "react-icons/md";

const SEARCH_URL = "https://projeto17-linkr-back-end.herokuapp.com/search-user";

export default function SearchComponent(){
    let token = localStorage.getItem('token')

    const [search, setSearch] = useState("");
    const [userArr, setUserArr] = useState([]);

    useEffect (() => {
        if(search.length < 3){return setUserArr([])}
        let objSearch = {search}
        axios.post(SEARCH_URL, objSearch, { headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(userArr)
                setUserArr(res.data)
            }) 
            .catch(e => console.log(e))
    }, [search]);

    return(
        <Container
            style={{backgroundColor: (userArr.length > 0) ? "#E7E7E7" : "none" }}
        >   
            <div className="mediaQ">
                <div className="search-box">
                    <Search 
                        type="text" 
                        placeholder="Search for people"
                        minLength={3}
                        debounceTimeout={300}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <Md></Md>
                </div>  
                <div className='results'>
                    {userArr.map(element => {
                        return(
                            <Link key={element.id} to ={`/user/${element.id}`}>
                                <div className='user'>
                                <div className='profilePicture'>
                                    <img src={element.pictureURL}  alt='profilePicture'/>
                                </div>
                                <h4>{element.username}</h4>
                                {
                                    element.following ? 
                                    <p> • following</p>
                                    :
                                    <p></p>
                                }
                                </div>
                            </Link>
                        )
                    })}  
                </div>
            </div>      
        </Container>
    )
};

const Container = styled.div`
    margin-top: 3px;  
    border-radius: 8px 8px 0 0;
    .mediaQ{
        position: relative;
    }
    .search-box{
        position: relative;
        width: 563px;
    }
    .results {
        background-color: #E7E7E7;
        border-radius: 8px;
        padding-top: 45px;
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
    p{
        padding-left: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C5C5C5;
    }
    @media (max-width: 1000px) {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        margin-top: 90px;
    }
`

export const Search = styled(DebounceInput)`
position: absolute;
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
`

const Md = styled(MdSearch)`
position: absolute;
top: 11px;
right: 15px;
color: #C6C6C6;
font-size: 22px;
`