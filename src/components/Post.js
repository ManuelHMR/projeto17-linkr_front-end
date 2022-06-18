import styled from "styled-components";
import urlMetadata from "url-metadata";

export default function Post(infos) {
    const { username, url, pictureURL, text } = infos;
    metadata(url);
    return (
        <PostContainer>
            <img src={pictureURL} alt="Foto de perfil"></img>
            <PostInfos>
                <h4>{username}</h4>
                <p>{text}</p>
                <Link>
                    <div>
                        <h5>Como aplicar o Material UI em um projeto React</h5>
                        <p>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</p>
                        <p>{url}</p>
                    </div>
                    <img src={pictureURL} alt="Foto de perfil"></img>
                </Link>
            </PostInfos>
        </PostContainer>
    )
}

function metadata(url) {
    urlMetadata("http://bit.ly/2ePIrDy").then((result) => console.log(result));
}



const PostContainer = styled.div`
    width: 611px;
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

const Link = styled.div`
    height: 155px;
    width: 503px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    margin: 20px 0 10px 0;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    position: relative;

    div{
        width: 300px;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }
    p{
        font-size: 11px;
        margin-bottom: 13px;

    }
    h5{

        font-size:  16px;
        margin-top: 24px;
        margin-bottom: 5px;
    }
    img{
        border-radius: 0px 9px 13px 0px;
        width: 153.44px;
        height: 155px;
        position: absolute;
        right: 0;
        top: 0;
        margin: 0;
    }
`