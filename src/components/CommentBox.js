import styled from "styled-components"
import { IoIosSend } from "react-icons/io"
import { useState, useEffect, useContext} from "react"
import HeaderComment from "./CommentHeader"

export default function Comments({ postId, userId }) {
    const token = localStorage.getItem("token");
    const [text, setText] = useState()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function handleInputChange(e) {
        setText(e.target.value);
    }

    function handlePostComment() {
        api.createComment(user?.token, text, postId, user?.id).then(() => {
            setText("")
            window.location.reload()
        }).catch((error) => {
            console.log(error)
        })
    }

    function getComments() {
        setIsLoading(true)
        api.getComments(user?.token, postId, user?.id).then((res) => {
            setComments(res.data);
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <CommentsContent>
            {isLoading ?
                <Loading />
                :
                comments?.map((comment) =>
                    <Comment key={comment.id}>
                        <CommentContent>
                            <img src={comment.image} />
                            <SeparateMessages>
                                <HeaderComment comment={comment} />
                                <div className="coment">{comment.text}</div>
                            </SeparateMessages>
                        </CommentContent>
                    </Comment>
                )
            }
            <InputCommentContent>
                <img src={user?.image} />
                <InputComment
                    id="userComment"
                    name="userComment"
                    placeholder="write a comment..."
                    type="text"
                    onChange={handleInputChange}
                />
                <button id="commentButton" className="ioioSend" onClick={handlePostComment} ><IoIosSend size="20px" /></button>
            </InputCommentContent>
        </CommentsContent>
    )
}

const InputComment = styled.input`
    width: 100%;
    height: 39px;
    background-color: #252525;
    border: none;
    border-radius: 8px;
    padding: 10px;
    color:#575757;
    
`
const InputCommentContent = styled.div`
display: flex;
    position: relative;
img{
    width: 40px;
    height: 40px;
    border-radius: 70%;
    margin-bottom: 20px;
    margin-right: 18px;
    position: relative;
}
.ioioSend{
    all: unset;
    float: right;
    position: absolute;
    z-index: 3;
    right: 10px;
    top: 10px;
    color: white;
    cursor: pointer;
}
`

const CommentsContent = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 0 17px;
    padding-top: 45px;
    margin-top: -24px;
    border-radius: 16px;
    background-color: #1E1E1E;
    font-family: "Lato", sans-serif;
    position: relative;
    z-index: 0;
    @media (max-width: 610px) {
        width: 100%;
        border-radius: 0;
        padding-top: 50px
    }
    @media (min-width: 912px) {
        width: 100%
    }
`

const Comment = styled.div`
min-width: 100%;
border-bottom:#353535 solid 1px ;
margin-bottom: 10px;
img{
    width: 40px;
    height: 40px;
    border-radius: 70%;
    margin-bottom: 20px;
    margin-right: 18px;
}
`

const CommentContent = styled.div`
    display: flex;
    
`

const SeparateMessages = styled.div`
.username{
    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;
    color: #F3F3F3;
    margin-bottom: 5px;
}
.coment{
    font-family: 'Lato';
    font-weight: 400;
    font-size: 14px;
    color: #ACACAC;
}
`

const User = styled.div`
    display: flex;
    .follow{
        margin-left: 4px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 14px;
        color: #565656;
    }
`