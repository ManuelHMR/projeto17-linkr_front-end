import styled from "styled-components";
import { GoSync } from "react-icons/go";

export default function ButtonNewPosts(props){
    return(
        <Container>
            <p>{props.qntNewPosts} new posts, load more!</p>
            <GoSync className='icon'/>
        </Container>
    )
}

const Container = styled.div`
    width: 611px;
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;

    p{
        margin-right: 14px
    }

    icon{
        color: #FFFFFF;
        font-size: 16px;
    }
  
`