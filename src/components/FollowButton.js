import axios from "axios";
import {useState, useEffect} from "react";
import styled from "styled-components";

const URL_CHECKFOLLOW = "https://projeto17-linkr-back-end.herokuapp.com/checkfollow";
const URL_FOLLOW = "https://projeto17-linkr-back-end.herokuapp.com/follow"
const URL_UNFOLLOW = "https://projeto17-linkr-back-end.herokuapp.com/unfollow"

export default function FollowButton ({id}){
    const token = localStorage.getItem("token");
    const [follow, setFollow] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.post(URL_CHECKFOLLOW, {followedId: id},  { headers: { Authorization: `Bearer ${token}`}})
            .then( res => {
                if(res.data === true){
                    return setFollow(true)
                }
                return setFollow(false)
            }).catch(e => alert(e))
    }, [])

    function postfollow(){
        setLoading(true);
        axios.post(URL_FOLLOW, {followedId: id},  { headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                setLoading(false)
                setFollow(true)
            }).catch(e => alert(e))
    }
    function postunfollow(){
        setLoading(true);
        axios.post(URL_UNFOLLOW, {followedId: id},  { headers: { Authorization: `Bearer ${token}`}})
        .then(res => {
            setLoading(false)
            setFollow(false)
        }).catch(e => alert(e))
    }

    function Button(){
        return(
            <>
                { follow ? 
                    <h2 onClick={() => postunfollow()}>Unfollow</h2> 
                    : 
                    <h2 onClick={() => postfollow()}>Follow</h2> }
            </>
        )
    }

    return(
        <Container className={follow? "followstyle" : "unfollowstyle"}>
            { loading ? <div className='loading' /> : <Button/> }      
        </Container>
    )
}

const Container = styled.div`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 60px;
    .loading {
            animation: is-rotating 1s infinite;
            width: 25px;
            height: 25px;
            border: 4px solid #1877F2;
            border-top-color: #ffffff;
            border-radius: 50%;
            margin: 15px;
        }
    @keyframes is-rotating {
        to {
            transform: rotate(1turn);
        }
    }
    h2{
        cursor: pointer;
    }
`
