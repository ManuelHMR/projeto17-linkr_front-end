import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Like({ infos }) {
  const URL = "https://projeto17-linkr-back-end.herokuapp.com";
  const { id } = infos;
  let postId = id || 1;
  const token = localStorage.getItem("token");
  const [infoText, setInfoText] = useState("ninguém curtiu este post");
  const [likesInfo, setLikesInfo] = useState({
    likesUsers: [{ username: "Você" }, { username: "Fulano" }],
    liked: false,
    likes: 0,
  });

  function likePost() {
    let newURL = URL;
    if (!likesInfo.liked) {
      newURL = URL + "/like/" + postId;
    } else {
      newURL = URL + "/dislike/" + postId;
    }
    setLikesInfo({ ...likesInfo, liked: !likesInfo.liked });
    axios
      .post(newURL, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

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
      setInfoText(likesInfo.likesUsers[0]?.username + " curtiu este post");
    } else if (likesInfo.likes == 2) {
      setInfoText(
        `${likesInfo.likesUsers[0]?.username} e ${likesInfo.likesUsers[1]?.username} curtiram este post`
      );
    } else if (likesInfo.likes > 2) {
      setInfoText(
        `${likesInfo.likesUsers[0]?.username}, ${
          likesInfo.likesUsers[1]?.username
        } e outras ${likesInfo.likes * 1 - 2} pessoas`
      );
    }
  }, [likesInfo.likesUsers]);

  return (
    <>
      <Heart onClick={likePost} liked={likesInfo.liked} data-tip={infoText}>
        {likesInfo.liked ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
        <p>{likesInfo.likes} likes</p>
      </Heart>
      <ReactTooltip place="bottom" type="light" effect="solid" />
    </>
  );
}

const Heart = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 18px;
  position: absolute;
  left: 0;
  bottom: 140px;
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
