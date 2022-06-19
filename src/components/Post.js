import styled from "styled-components";
import urlMetadata from "url-metadata";
import ReactTooltip from "react-tooltip";
import ReactModal from "react-modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Post(infos) {
  const { id, username, url, pictureURL, text } = infos;
  let postId = 1;
  const [liked, setLiked] = useState(false);
  const URL = "https://projeto17-linkr-back-end.herokuapp.com/";
  const token = localStorage.getItem("token");
  metadata(url);

  function likePost() {
    let newURL = URL;
    if (!liked) {
      newURL = URL + "like/" + postId;
    } else {
      newURL = URL + "dislike/" + postId;
    }
    setLiked(!liked);
    console.log(newURL);
    axios
      .post(newURL, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  return (
    <PostContainer>
      <img src={pictureURL} alt="Foto de perfil"></img>
      <PostInfos>
        <Link to={`/user/${id}`} key={id}>
          <h4>{username}</h4>
        </Link>
        <p>{text}</p>
        <LinkBox>
          <div>
            <h5>Como aplicar o Material UI em um projeto React</h5>
            <p>
              Hey! I have moved this tutorial to my personal blog. Same content,
              new location. Sorry about making you click through to another
              page.
            </p>
            <p>{url}</p>
          </div>
          <img src={pictureURL} alt="Foto de perfil"></img>
        </LinkBox>
      </PostInfos>
      <ion-icon name="trash"></ion-icon>
      <Heart onClick={likePost} liked={liked} data-tip="1000 curtidas">
        {liked ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
        <p>1000 likes</p>
      </Heart>
      <ReactTooltip place="bottom" type="light" effect="solid" />
    </PostContainer>
  );
}

function metadata(url) {
  urlMetadata("http://bit.ly/2ePIrDy").then((result) => console.log(result));
}

const PostContainer = styled.div`
  position: relative;
  width: 611px;
  height: auto;
  padding: 17px 18px;
  background: #171717;
  display: flex;
  border-radius: 16px;
  margin: 8px 0;
  color: #ffffff;
  font-family: "Lato", sans-serif;
  font-weight: 300;

  img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    margin-right: 18px;
  }
  & > ion-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    size: 20px;
  }
`;

const PostInfos = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin-bottom: 7px;
    font-weight: 400;
  }

  p {
    color: #b7b7b7;
    padding-right: 30px;
  }
`;

const LinkBox = styled.div`
  height: 155px;
  width: 503px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  margin: 20px 0 10px 0;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  position: relative;

  div {
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  p {
    font-size: 11px;
    margin-bottom: 13px;
  }
  h5 {
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 5px;
  }
  img {
    border-radius: 0px 9px 13px 0px;
    width: 153.44px;
    height: 155px;
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
  }
`;

const Heart = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 18px;
  position: absolute;
  left: 0;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p{
    margin-top: 5px;
    font-size: 11px;
  }

  ion-icon {
    font-size: 30px;
    color: ${(props) => (props.liked ? "red" : "#FFFFFF")};
  }
  :hover {
    cursor: pointer;
  }
`;
