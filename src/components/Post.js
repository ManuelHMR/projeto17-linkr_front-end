import styled from "styled-components";

export default function Post(){
    return(
        <PostContainer>
            <img></img>
            <PostInfos>
                <h4>Juvenal Juvêncio</h4>
                <p>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</p>
            </PostInfos>
        </PostContainer>
    )
}




const PostContainer = styled.div`
    width: 575px;
    height: auto;
    padding: 17px 18px;
    background: #171717;
    display: flex;
    border-radius: 16px;
    margin: 8px 0;
    color: #FFFFFF;
    font-family: 'Lato', sans-serif;
    font-weight: 300;

    img{
        height: 50px;
        width: 50px;
        border-radius: 25px;
        margin-right: 18px;
    }
`

const PostInfos = styled.div`
    display: flex;
    flex-direction: column;

    h4{
        margin-bottom: 7px;
        font-weight: 400;
    }

    p{
        color: #B7B7B7;
        padding-right: 30px;
    }
`