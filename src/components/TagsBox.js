import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function TrendingTags() {
  const [trendings, setTrendings] = useState();

  useEffect(() => {
    (async () => {
      try {
        axios
          .get(`https://projeto17-linkr-back-end.herokuapp.com/trending`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const { data } = response;
            setTrendings(data);
          })
          .catch((e) => console.log(e));
      } catch (e) {
        alert("Erro ao receber tags em trending");
        console.log(e.response);
      }
    })();
  }, []);

  return (
    <>
      <Box>
        <h1>trending</h1>
        <Tags>
          {trendings ? (
            trendings.map((trending) => {
              const { hashtag } = trending;
              return (
                <Link to={`/hashtag/${hashtag}`} key={hashtag}>
                  <p># {hashtag}</p>
                </Link>
              );
            })
          ) : (
            <Loading />
          )}
        </Tags>
      </Box>
    </>
  );
}

const Box = styled.div`
  width: 301px;
  height: 406px;
  display: flex;
  flex-direction: column;
  background-color: #171717;
  border-radius: 16px;

  h1 {
    font-size: 25px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-style: normal;
    line-height: 25.01px;
    color: #ffffff;
    border-radius: 16px;
    margin-top: 15px;
    margin-bottom: 14px;
    margin-left: 16px;
  }
`;

const Tags = styled.div`
  width: 300px;
  height: 335px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #171717;
  border-top: solid 1px #484848;
  padding: 15px 16px;

  p {
    font-size: 19px;
    font-weight: 700;
    font-family: "Lato", sans-serif;
    font-style: normal;
    line-height: 0px;
    letter-spacing: 5%;
    color: #ffffff;
    margin: 15px 0px;
  }
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
