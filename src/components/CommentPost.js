import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';
import { FiSend } from "react-icons/fi";

export default function PostComment({ postId }) {
  let token = localStorage.getItem('token')
  const [profilePic, setProfilePic] = useState("");
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://projeto17-linkr-back-end.herokuapp.com/userpic", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { pictureURL } = res.data;
        setProfilePic(pictureURL);
      })
      .catch((e) => console.log(e));
  }, [token]);

  function handleComment() {
    axios.post(`https://projeto17-linkr-back-end.herokuapp.com/comments/${postId}`, { text }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setLoading(false);
        window.location.reload(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        alert("Houve um erro ao publicar seu comentário");
      });
  }

  return (
    <>
      <Main>
        <Author src={profilePic} alt="profilePicture" />
        {loading ? (
          <Comment class='disabled' disabled type="text" placeholder="write a comment..." value={text} onChange={e => setText(e.target.value)}/>
        ) : (
          <Comment type="text" placeholder="write a comment..." value={text} onChange={e => setText(e.target.value)} />
        )}

        <Send
          onClick={() => {
            handleComment();
          }}
        />
      </Main>
    </>
  );
}

const Main = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 611px;
    height: 83px;
    background-color: #1E1E1E;
    border-radius: 16px;
    margin-bottom: 30px;
`
const Author = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    margin-right: 14px;
`

const Comment = styled.input`
  width: 510px;
  height: 39px;
  padding-left: 15px;
  background-color: #252525;
  border-radius: 8px;
  border: none;
  font-size: 14px;

  &::placeholder {
    color: #575757;
    font-family: "Lato", sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.8px;
  }
  .disabled{
    opacity: 0.7;
}
`;

const Send = styled(FiSend)`
    position: absolute;
    top: 33px;
    right: 40px;
    color: #F3F3F3;
    font-size: 16px;
`