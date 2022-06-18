import styled from "styled-components";

export default function TrendingTags(props) {
  return (
    <>
      <Box>
        <h1>trending</h1>
        <Tags>
          <p># javascript</p>
          <p># react</p>
          <p># react-native</p>
          <p># material</p>
          <p># web-dev</p>
          <p># mobile</p>
          <p># css</p>
          <p># html</p>
          <p># node</p>
          <p># sql</p>
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
    font-family: 'Oswald', sans-serif;
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
    font-family: 'Lato', sans-serif;
    font-style: normal;
    line-height: 0px;
    letter-spacing: 5%;
    color: #ffffff;
    margin: 15px 0px;
  }
`;
