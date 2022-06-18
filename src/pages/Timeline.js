import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/Header";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import TrendingTags from "../components/TagsBox";

export default function Timeline() {

  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState();
  
    useEffect(() => {
        (async () => {
          try {
            axios.get("https://projeto17-linkr-back-end.herokuapp.com/posts", {
                headers: { Authorization: `Bearer ${token}` }
            })
              .then((response) => {
                setPosts(response.data);
              }).catch(e => console.log(e));
          } catch (e) {
            alert("Erro ao receber dados dos posts");
            console.log(e.response);
          }
        })();
    }, [setPosts]);


  return (
    <>
      <Header />
      <Main>
        <Topo>
          <h2>timeline</h2>
        </Topo>
        <Container>
          <Posts>
            <AllPosts>
              <NewPost></NewPost>
              {posts ? (
                posts.length > 0 ? (
                  posts.map((post) => Post(post))
                ) : (
                  <p className="no-posts">There are no posts yet</p>
                )
              ) : (
                <div className="loading" />
              )}
            </AllPosts>
          </Posts>
          <TrendingTags />
        </Container>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 72px;
`;

const Topo = styled.div`
  width: 100%;
  height: 158px;

  h2 {
    font-size: 43px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-style: normal;
    line-height: 63.73px;
    color: #ffffff;
    margin-top: 53px;
    margin-bottom: 41px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Posts = styled.div`
  height: auto;
  width: 613px;
  background: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 25px;
  .no-posts {
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
    border: 4px solid #1877f2;
    border-top-color: #ffffff;
    border-radius: 50%;
    margin-left: 300px;
  }
`;

const AllPosts = styled.div`
  > div:last-child {
    margin-bottom: 100px;
  }
`;
