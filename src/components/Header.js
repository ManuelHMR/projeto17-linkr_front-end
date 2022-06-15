import styled from 'styled-components';


export default function Header() {
    return(
        <HeaderContainer>
            <h1>linkr</h1>
            <UserImg>
                <ion-icon name="chevron-down-outline"></ion-icon>
                <img></img>
            </UserImg>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    height: 72px;
    width: 100%;
    background: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1{
        margin:28px;
        font-family: 'Passion One', cursive;
        font-weight: 700; 
        color: #FFFFFF;
        font-size: 49px;
    }
`

const UserImg = styled.div`
    margin: 17px; 
    display: flex;
    align-items: center;
    ion-icon{
        color: white;
        font-size: 26px;
        margin: 16px;
    }
    img{
        height: 53px;
        width: 53px;
        border-radius: 26.5px;
    }
`