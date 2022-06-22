import styled from "styled-components";

export default function EditIcons({ infos, toggleModal, toggleEditMode }) {
  const { userId } = infos;
  let enableEdit = userId == localStorage.getItem("userId");

  return enableEdit ? (
    <Icons>
      <ion-icon name="create" onClick={toggleEditMode}></ion-icon>
      <ion-icon name="trash" onClick={toggleModal}></ion-icon>
    </Icons>
  ) : (
    <></>
  );
}

const Icons = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  & > ion-icon {
    font-size: 20px;
    margin-left: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;
