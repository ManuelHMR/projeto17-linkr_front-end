import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/Header";
import NewPost from "../components/NewPost";
import Post from "../components/Post";

export default function Timeline() {
    const token = localStorage.getItem('token');
    const [posts, setPosts] = useState()

    useEffect(() => {
        (async () => {
            try {
                axios.get("https://projeto17-linkr-back-end.herokuapp.com/posts", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then((response) => {
                        setPosts(response.data);
                    }).catch(e => {
                        console.log(e)
                        alert("An error occured while trying to fetch the posts, please refresh the page");
                    });


            } catch (e) {
                alert("Erro ao receber dados de posts");
                console.log(e.response);
            }
        })();
    }, [setPosts]);


    return (
        <Container>
            <Header></Header>
            <AllPosts>
                <h2>timeline</h2>
                <NewPost></NewPost>
                {posts ? (
                    posts.length > 0 ?
                        posts.map(post => Post(post)
                        ) : <p className="no-posts">There are no posts yet</p>
                ) : <div className='loading' />}
            </AllPosts>
        </Container>
    )
}

const Container = styled.div`
    height: auto;
    width: 100vw;
    background: #333333;
    display:flex;
    flex-direction: column;
    align-items: center;
    h2{
        margin-top: 125px;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: #FFFFFF;
    }
    .no-posts{
        width: 611px;
        font-size: 30px;
        color: white; 
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
    .loading {
        animation: is-rotating 1s infinite;
        width: 25px;
        height: 25px;
        border: 4px solid #1877F2;
        border-top-color: #ffffff;
        border-radius: 50%;
        margin-left: 300px;
    }
`

const AllPosts = styled.div`
    >div:last-child{
        margin-bottom: 100px;
    }
`
