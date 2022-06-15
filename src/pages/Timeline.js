import styled from "styled-components";
import Header from "../components/Header";
import NewPost from "../components/NewPost";
import Post from "../components/Post";

export default function Timeline() {
    // const { user } = useContext(UserContext);
    return (
        <Container>
            <Header></Header>
            <AllPosts>
                <h2>timeline</h2>
                <NewPost></NewPost>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
            </AllPosts>
        </Container>
    )
}

const Container = styled.div`
    height: auto;
    width: 100vw;
    background: #333333;
    display:flex;
    flex-direction: column;
    align-items: center;
    h2{
        margin-top: 125px;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: #FFFFFF;
    }
`

const AllPosts = styled.div`
    >div:last-child{
        margin-bottom: 100px;
    }
`
