import styled from "styled-components"

export default function HeaderComment({ username }) {
    const name = localStorage.getItem("name");

    return (
        <User>
            <div className="username">{username}</div>
            <div className="follow">
                {username === name ?
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
    .username{
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        color: #F3F3F3;
        margin-bottom: 5px;
        margin-left: 70px;
        margin-top: 10px;
    }
    .follow{
        margin-left: 4px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 14px;
        color: #565656;
        margin-top: 10px;
    }
`