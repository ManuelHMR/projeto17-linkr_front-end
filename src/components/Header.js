import styled from 'styled-components';


export default function Header() {
    return(
        <HeaderContainer>
            <h1>linkr</h1>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    height: 72px;
    width: 100%;
    background: #151515;
    display: flex;
    align-items: center;

    h1{
        font-family: 'Passion One', cursive;
        font-weight: 700; 
        color: #FFFFFF;
        font-size: 49px;
    }
`