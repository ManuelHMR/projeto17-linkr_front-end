import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Repost({ infos, toggleRepostModal, reposts, token }) {
    const { id } = infos;

    
    function deleteRepost() {
        axios.delete(`https://projeto17-linkr-back-end.herokuapp.com/repost/${id}`,  {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                window.location.reload();
            })
            .catch((e) => console.log(e));
    }
    
      const filter = reposts.filter((repost) => repost.userId == localStorage.getItem("userId"));
      const reposted = (filter.length>0)

    return (
        <>
            <RepostIcon onClick={reposted?deleteRepost:toggleRepostModal} reposted={reposted}>
                <ion-icon name="repeat"></ion-icon>
                <p>{reposts.length} re-posts</p>
            </RepostIcon>
        </>
    )
}

const RepostIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 18px;
  position: absolute;
  left: 0;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 5px;
    font-size: 11px;
  }

  ion-icon {
    font-size: 30px;
    color: ${(props) => (props.reposted ? "green" : "#FFFFFF")};
  }
  :hover {
    cursor: pointer;
  }
`;