import styled from "styled-components";
import urlMetadata from "url-metadata";
import ReactTooltip from "react-tooltip";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Modal.setAppElement(".icons");

export default function Post(infos) {
  const { id, username, url, pictureURL, text } = infos;
  let postId = id || 1;
  const [infoText, setInfoText] = useState("ninguém curtiu este post");
  const [likesInfo, setLikesInfo] = useState({
    likesUsers: [{ username: "Você" }, { username: "Fulano" }],
    liked: false,
    likes: 0,
  });
  const URL = "https://projeto17-linkr-back-end.herokuapp.com";
  //const URL = "https://127.0.0.1:4000/";
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  metadata(url);

  useEffect(() => {
    axios
      .get(`${URL}/likes/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const info = res.data;
          setLikesInfo(info);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [likesInfo.liked]);

  useEffect(() => {
    if (likesInfo.likes == 0) {
      setInfoText("Ninguém curtiu este post");
    } else if (likesInfo.likes == 1) {
      setInfoText(likesInfo.likesUsers[0].username + " curtiu este post");
    } else if (likesInfo.likes == 2) {
      setInfoText(
        `${likesInfo.likesUsers[0].username} e ${likesInfo.likesUsers[1].username} curtiram este post`
      );
    } else if (likesInfo.likes > 2) {
      setInfoText(
        `${likesInfo.likesUsers[0].username}, ${
          likesInfo.likesUsers[1].username
        } e outras ${likesInfo.likes * 1 - 2} pessoas`
      );
    }
  }, [likesInfo.likesUsers]);

  function likePost() {
    let newURL = URL;
    if (!likesInfo.liked) {
      newURL = URL + "/like/" + postId;
    } else {
      newURL = URL + "/dislike/" + postId;
    }
    setLikesInfo({ ...likesInfo, liked: !likesInfo.liked });
    console.log(newURL);
    axios
      .post(newURL, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  function deletePost() {
    axios
      .delete(`${URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert("Erro ao deletar post");
        toggleModal();
      });
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
      <Icons className="icons">
        <ion-icon name="create"></ion-icon>
        <ion-icon name="trash" onClick={toggleModal}></ion-icon>
      </Icons>
      <Heart onClick={likePost} liked={likesInfo.liked} data-tip={infoText}>
        {likesInfo.liked ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
        <p>{likesInfo.likes} likes</p>
      </Heart>
      <ReactTooltip place="bottom" type="light" effect="solid" />

      <ReactModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Are you sure you want to delete this post?"
        //className="mymodal"
        //overlayClassName="myoverlay"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            zIndex: "10",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "white",
          },
          content: {
            inset: "0px",
            position: "relative",
            backgroundColor: "#333333",
            borderRadius: "5vh",
            width: "40%",
            height: "30%",
            border: "none",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: "35px",
            padding: "0 7%",
          },
        }}
      >
        <h1 className="deleteModal">
          Are you sure you want to delete this post?
        </h1>
        <div className="buttons">
          <button onClick={toggleModal}>No, go back</button>
          <button onClick={deletePost}>Yes, delete it</button>
        </div>
      </ReactModal>
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
  p {
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

const Icons = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  & > ion-icon {
    font-size: 20px;
    margin-left: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;
