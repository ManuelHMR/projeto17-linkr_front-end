import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

import Header from "../components/Header";
import TrendingTags from "../components/tagsBox";
import Post  from "./../components/Post"

function TagPage(props) {
  const [posts, setPosts] = useState([]);
  const {hashtag} = useParams();

  useEffect(() => {
    const promise = axios.get(`http://localhost:4000/hashtag/${hashtag}`);

    promise.then((response) => {
      const { data } = response;
      setPosts(data);
    });
    promise.catch((err) => console.log(err.response));
  }, [hashtag]);

  return (
    <>
      <Header />
      <Main>
        <Topo>
          <h1># {hashtag}</h1>
        </Topo>
        <Container>
          <Posts>
          {posts.map((post) => {
            const { url, text } = post;
                return (
                    <Post
                    url={url}
                    text={text}
                    />
                );
              })}
          </Posts>
          <TrendingTags />
        </Container>
      </Main>
    </>
  );
}

export default TagPage;

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
