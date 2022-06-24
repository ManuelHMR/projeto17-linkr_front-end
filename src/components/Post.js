import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Hashtag from "./Hashtag";
import EditIcons from "./EditIcons";
import Like from "./Like";
import DeleteModal from "./DeleteModal";
import { BsChatDots } from "react-icons/bs";
import PostComment from "./CommentPost";
import Comments from "./CommentBox";
import Repost from "./Repost";
import RepostModal from "./RepostModal";

export default function Post({ infos }) {
  const {
    id,
    username,
    url,
    pictureURL,
    userId,
    text,
    title,
    image,
    description,
    repostUser
  } = infos;
  let postId = id || 1;

  const URL = "https://projeto17-linkr-back-end.herokuapp.com";
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [repostModalBool, setRepostModalBool] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [comments, setComments] = useState(false);
  const [postText, setPostText] = useState(
    // <Hashtag>{text}</Hashtag>
    text ||
    "Muito maneiro este Material UI com React, deem uma olhada! #react #material"
  );
  const [reposts, setReposts] = useState([]);

  useEffect(async () => {
    try {
      axios.get(`https://projeto17-linkr-back-end.herokuapp.com/reposts/${id}`)
        .then(async (response) => {
          await setReposts(response.data);
        }).catch(e => console.log(e));
    } catch (e) {
      alert("Erro ao receber dados dos reposts");
      console.log(e.response);
    }
  }, [setReposts]);

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
      var el = document.querySelector(".postText");
      el.focus();
      if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
      } else if (typeof el.createTextRange != "undefined") {
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
      }
    }
  }, [editMode]);

  function editPost(e) {
    setLoading(true);
    e.preventDefault();
  }
  const inputRef = useRef(null);

  window.addEventListener("keyup", function (event) {
    if (editMode) {
      if (event.key === "Enter") {
        event.preventDefault();
        setLoading(true);
        axios
          .put(
            `${URL}/post/${postId}`,
            { text: postText },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            setLoading(false);
            setEditMode(false);
          })
          .catch((e) => {
            console.log(e);
            alert("Erro ao editar post");
            setLoading(false);
          });
      } else if (event.key === "Escape") {
        event.preventDefault();
        toggleEditMode();
      }
    }
  });

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function toggleRepostModal() {
    setRepostModalBool(!repostModalBool);
  }

  function toggleEditMode() {
    setEditMode(!editMode);
    setPostText(
      text ||
      "Muito maneiro este Material UI com React, deem uma olhada! #react #material"
    );
  }

  function showComments() {
    if (setComments(false)) {
      setComments(true);
    } else {
      setComments(false);
    }
  }

  function counterComments() {
    const promise = axios.get(
      `https://projeto17-linkr-back-end.herokuapp.com/comments/count/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    promise.then(({ response }) => {
      const { data } = response;
      setTotalComments(data);
    });
    promise.catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    counterComments();
  }, [token]);

  return (
    <>
    {repostUser? (
     <Repostedlook>
       <ion-icon name="repeat"></ion-icon>
      <p>Re-posted by <Link to={`/user/${repostUser}`} key={repostUser}>{repostUser}</Link></p>
     </Repostedlook> 
    ):(<></>)}
      <PostContainer>
        <img src={pictureURL} alt="Foto de perfil"></img>
        <PostInfos edit={editMode}>
          <Link to={`/user/${userId}`} key={userId}>
            <h4>{username || "Anonymous"}</h4>
          </Link>
          {editMode ? (
            <form onSubmit={editPost}>
              <textarea
                className="postText"
                ref={inputRef}
                placeholder="Muito maneiro este Material UI com React, deem uma olhada! #react #material"
                onChange={(e) => setPostText(e.target.value)}
                value={postText}
                required
                disabled={!editMode}
              ></textarea>
            </form>
          ) : (
            <Hashtag>{postText}</Hashtag>
          )}
          <LinkBox>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <h5>{title}</h5>
              <p>{description}</p>
              <p>{url}</p>
              <img src={image} alt="Imagem do Post"></img>
            </a>
          </LinkBox>
        </PostInfos>
        <EditIcons
          infos={infos}
          toggleModal={toggleModal}
          toggleEditMode={toggleEditMode}
        ></EditIcons>
        <Like infos={infos}></Like>
        <Repost
          infos={infos}
          reposts={reposts}
          toggleRepostModal={toggleRepostModal}
          token={token} />
        <RepostModal
          infos={infos}
          toggleRepostModal={toggleRepostModal}
          repostModalBool={repostModalBool}
          setLoading={setLoading}
        />
        <ChatIcon onClick={showComments} />
        <QntComments>{totalComments} comments </QntComments>
        <DeleteModal
          infos={infos}
          toggleModal={toggleModal}
          isOpen={isOpen}
          setLoading={setLoading}
        ></DeleteModal>
        {loading ? (
          <Loading>
            <ion-icon name="cloud-upload"></ion-icon>
            Carregando ...
          </Loading>
        ) : (
          <></>
        )}
      </PostContainer>
      {comments ? (
        <>
          <Comments postId={postId} />
        </>
      ) : (
        <></>
      )}
      <PostComment postId={postId} />
    </>
  );
}

const PostContainer = styled.div`
  position: relative;
  width: 611px;
  height: auto;
  padding: 17px 18px;
  background: #171717;
  display: flex;
  border-radius: 16px;
  margin: 0 0 8px 0;
  color: #ffffff;
  font-family: "Lato", sans-serif;
  font-weight: 300;

  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: none;
    cursor: pointer;
  }

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
  textarea {
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.edit ? "white" : "transparent")};
    color: ${(props) => (props.edit ? "black" : "white")};
    font-size: 19px;
    font-family: "Lato", sans-serif;
    border: none;
    resize: none;
    border-radius: 5px;
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

  a {
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

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(200, 200, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  font-size: 27px;
`;
const ChatIcon = styled(BsChatDots)`
  position: absolute;
  top: 155px;
  left: 35px;
  color: #ffffff;
  font-size: 22px;
`;
const QntComments = styled.p`
  position: absolute;
  top: 180px;
  left: 18px;
  color: #ffffff;
  font-size: 11px;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  line-height: 13.2px;
`;

const Repostedlook = styled.div`
  heigth: 33px;
  background: #1E1E1E;
  color: #FFFFFF;
  display: flex;
  font-size: 16px;
  align-items: center;
  padding-bottom: 12px;
  border-radius: 16px 16px 0 0;
  margin: 8px 0 -12px 0;
  font-family: "Lato", sans-serif;
  font-weight: 400;

  a:link,
  a:visited,
  a:active{
    text-decoration: none;
    color: inherit;
    font-weight: 700;
  }

  ion-icon{
    margin: 0 8px;
    font-size: 25px; 
  }
`
