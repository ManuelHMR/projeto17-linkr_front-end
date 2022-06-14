import styled from "styled-components";
import Header from "../Header";


export default function Timeline() {
    // const { user } = useContext(UserContext);
    return (
        <Container>
            <Header></Header>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: #333333;
`
