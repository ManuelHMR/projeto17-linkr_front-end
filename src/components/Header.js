import styled from 'styled-components';

import {MdSearch} from "react-icons/md";

export default function Header() {
    return(
        <HeaderContainer>
            <h1>linkr</h1>
            <Search type="text" placeholder="Search for people" />
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
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;

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

export const Search = styled.input`
   width: 563px;
   height: 45px;
   padding-left: 15px;
   background-color: #FFFFFF;
   border-radius: 8px;
   border: none;
   font-size: 19px;

   &::placeholder {
      color: #C6C6C6;
      font-family: 'Lato', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 22.8px;
`;