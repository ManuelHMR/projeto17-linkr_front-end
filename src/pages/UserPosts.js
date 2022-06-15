import styled from "styled-components";

import Header from "../components/Header";
import TrendingTags from "../components/tagsBox";

function UserPage(props) {
  return (
    <>
      <Header />
      <Main>
        <Topo>
          <h1># Juvenal Juvencio's posts</h1>
        </Topo>
        <Container>
          <Posts></Posts>
          <TrendingTags />
        </Container>
      </Main>
    </>
  );
}

export default UserPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 72px;
  }
`;

const Topo = styled.div`
  width: 100%;
  height: 158px;

  img{
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-top: 53px;
    margin-bottom: 41px;
    margin-right: 18px;
  }

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