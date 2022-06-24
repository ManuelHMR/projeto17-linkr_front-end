import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function NewPost() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const token = localStorage.getItem('token');

    function publishPost(e) {
        setLoading(true);
        e.preventDefault();
        axios.post("https://projeto17-linkr-back-end.herokuapp.com/post", { url, text }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            alert("Post publicado com sucesso");
            setLoading(false);
            window.location.reload(false);
        }).catch((e) => {
            setLoading(false);
            console.log(e);
            alert("Houve um erro ao publicar seu link");
        });
    }

    return (
        <NewPostContainer>
            <img></img>
            <PublicationForm>
                <h4>What are you going to share today?</h4>
                {loading ? (
                    <form onSubmit={publishPost}>
                        <input class='disabled' disabled type="url" placeholder="http://..." value={url} onChange={e => setUrl(e.target.value)} />
                        <textarea class='disabled' disabled type="text" placeholder="Awesome article about #javascript" value={text} onChange={e => setText(e.target.value)} />
                        <button class='disabled' disabled >Publishing...</button>
                    </form>
                ) : (
                    <form onSubmit={publishPost}>
                        <input type="url" placeholder="http://..." value={url} onChange={e => setUrl(e.target.value)} />
                        <textarea type="text" placeholder="Awesome article about #javascript" value={text} onChange={e => setText(e.target.value)} />
                        <button type='submit'>Publish</button>
                    </form>
                )}
            </PublicationForm>
        </NewPostContainer>
    )
}

const NewPostContainer = styled.div`
    width: 611px;
    height: 209px;
    background: #FFFFFF;
    border-radius: 16px;
    display: flex;
    position: relative;
    margin-bottom: 21px;

    img{
        height: 50px;
        width: 50px;
        border-radius: 25px;
        margin: 18px;
    }
`

const PublicationForm = styled.div`
    margin-top: 21px;

    h4{
        font-size: 20px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        color: #707070;
        margin-bottom: 10px;
    }

    form{
        display: flex;
        flex-direction: column;

        .disabled{
            opacity: 0.7;
        }

        input,
        textarea{
            width: 477px;
            height: 30px;
            margin: 2.5px 0;
            background: #EFEFEF;
            border-radius: 5px;
            border: none;
            padding: 0 13px;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 15px;

            ::placeholder{
                position: absolute;
                top: 5px;
                left: 13px;
            }
        }
    
        textarea {
            resize: none;
            height: 58px;
            padding: 5px 13px;
        }

        button{
            background: #1877F2;
            border-radius: 5px;
            border: none;
            width: 112px;
            height: 31px;
            color: #FFFFFF;
            position: absolute;
            bottom: 16px;
            right:22px;
        }
    }
`