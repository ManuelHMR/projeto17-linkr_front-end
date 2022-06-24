import styled from "styled-components"

export default function HeaderComment({ comment }) {
    const name = localStorage.getItem("name");

    return (
        <User>
            <div className="username">{comment.username}</div>
            <div className="follow">
                {comment.username === name ?
                    "• post's author"
                    : 
                    "• following"
                }
            </div>
        </User>
    )
}

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