import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "./../components/Header";
import TrendingTags from "./../components/TagsBox";
import Post from "./../components/Post";

export default function TagPage() {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const { hashtag } = useParams();

  useEffect(() => {
    (async () => {
      try {
        axios
          .get(`https://projeto17-linkr-back-end.herokuapp.com/hashtag/${hashtag}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
          .then((response) => {
            const { data } = response;
            setPosts(data);
          })
          .catch((e) => console.log(e));
      } catch (e) {
        alert("Erro ao receber dados dos posts");
        console.log(e.response);
      }
    })();
  }, [hashtag]);

  return (
    <>
      <Header />
      <Main>
        <Topo>
          <h1># {hashtag}</h1>
        </Topo>
        <Container>
          <Posts>{posts ? posts.map((post) => Post(post)) : <Loading />}</Posts>
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
  }
`;

const Topo = styled.div`
  width: 100%;
  height: 158px;

  h1 {
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
  width: 613px;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-right: 25px;
`;

const Loading = styled.div`
  animation: is-rotating 1s infinite;
  width: 25px;
  height: 25px;
  border: 4px solid #1877f2;
  border-top-color: #ffffff;
  border-radius: 50%;
  margin-left: 300px;
`;
