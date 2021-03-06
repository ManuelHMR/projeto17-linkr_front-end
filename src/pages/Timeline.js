import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/Header";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import TrendingTags from "../components/TagsBox";
import InfiniteScroll from "react-infinite-scroller";

export default function Timeline() {
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [followings, setFollowings] = useState([]);
  const URL = "https://projeto17-linkr-back-end.herokuapp.com/posts";
  
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
    }, [setPosts, token]);

  
  function getPosts() {
    axios
    .get(`${URL}/${pageCount}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.data.length === 0) {
        setHasMore(false);
      }
      setPosts([...posts, ...response.data]);
      setPageCount(pageCount + 1);
    })
    .catch((e) => {
      console.log(e);
      alert("Erro ao carregar posts");
    });
  }

  function getFollowings() {
    axios
    .get("https://projeto17-linkr-back-end.herokuapp.com/following", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setFollowings(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    getFollowings();
    getPosts();
  }, []);
  
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
              <InfiniteScroll
                pageStart={0}
                loadMore={getPosts}
                hasMore={hasMore}
                loader={<div className="loading" />}
              >
                {posts ? (
                  posts.length > 0 ? (
                    posts.map((post, index) => (
                      <Post key={index} infos={post} />
                    ))
                  ) : (
                    followings.length > 0 ? 
                      <p className="no-posts">No posts found from your friends</p>
                      :
                      <p className="no-posts">You don't follow anyone yet. Search for new friends!</p>
                  )
                ) : (
                  <></>
                )}
              </InfiniteScroll>
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
  @media (max-width: 1000px) {
    margin-left: 17px;
    h2 {
      font-size: 33px;
      line-height: 48.91px;
      margin: 19px 0px;
    }
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
  @media (max-width: 1000px) {
    width: 375px;
    height: 232px;
    margin: 0px 0px;
  }
`;

const AllPosts = styled.div`
  > div:last-child {
    margin-bottom: 100px;
  }
`;
