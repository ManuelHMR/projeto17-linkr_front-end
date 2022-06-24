import styled from "styled-components"
import axios from "axios";
import { useState, useEffect } from "react"
import HeaderComment from "./CommentHeader"

export default function Comments({ postId }) {
  const token = localStorage.getItem("token");
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(0);
  const [userComment, setUserComment] = useState({});
  const { username, pictureURL } = userComment;

  useEffect(() => {
    (async () => {
      try {
        axios
          .get(
            `https://projeto17-linkr-back-end.herokuapp.com/comments/${postId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            const { data } = response;
            const { userId } = data;
            setComments(data);
            setCommentId(userId);
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e.response);
      }
    })();
  }, [token, postId]);

  useEffect(() => {
    axios
      .get(
        `https://projeto17-linkr-back-end.herokuapp.com/comment/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const { data } = response;
        setUserComment(data);
      })
      .catch((e) => console.log(e));
  }, [token, commentId]);

  return (
    <>
      {comments ? (
        comments.map((comment) => {
          const { text } = comment;
          return (
            <CommentsContent>
              <HeaderComment username={username} />
              <UserComment src={pictureURL} alt="User comment picture" />
              <CommentContent>
                <textarea>{text}</textarea>
              </CommentContent>
              <SeparateMessages />
            </CommentsContent>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
}


const CommentsContent = styled.div`
    width: 611px;
    height: 91px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;
    padding-top: 15px;
    margin-top: -7px;
    background-color: #1E1E1E;
    font-family: "Lato", sans-serif;
    position: relative;
    z-index: -1;

    @media (max-width: 1000px) {
        width: 375px;
      }
    }
`

const UserComment = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 70%;
    margin-bottom: 20px;
    margin-right: 18px;
    position: absolute;
    top: 15px;
    left: 25px;
}
`

const CommentContent = styled.div`
  display: flex;
  textarea {
    width:450px;
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    color: #acacac;
    background-color: #1E1E1E;
    border: none;
    resize: none;
    border-radius: 5px;
    margin-bottom: 25px;
    margin-left: 70px;
  }
`;

const SeparateMessages = styled.div`
  width: 571px;
  height: 1px;
  background-color: #353535;
  position: absolute;
  bottom:7px;
  margin-left: 5px;
  z-index: 1;
`

const Loading = styled.div`
  animation: is-rotating 1s infinite;
  width: 25px;
  height: 25px;
  border: 4px solid #1877f2;
  border-top-color: #ffffff;
  border-radius: 50%;
`;