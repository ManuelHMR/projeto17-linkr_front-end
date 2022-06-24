import ReactModal from "react-modal";
import axios from "axios";

export default function DeleteModal({ infos, toggleModal, isOpen, setLoading }) {
  const { id } = infos;
  let postId = id || 1;

  const URL = "https://projeto17-linkr-back-end.herokuapp.com";
  const token = localStorage.getItem("token");

  function deletePost() {
    setLoading(true);
    axios
      .delete(`${URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert("Erro ao deletar post");
        toggleModal();
        setLoading(false);
      });
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="Are you sure you want to delete this post?"
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          zIndex: "10",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "white",
        },
        content: {
          inset: "0px",
          position: "relative",
          backgroundColor: "#333333",
          borderRadius: "5vh",
          width: "40%",
          height: "30%",
          border: "none",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          fontSize: "35px",
          padding: "0 7%",
        },
      }}
    >
      <h1 className="deleteModal">
        Are you sure you want to delete this post?
      </h1>
      <div className="buttons">
        <button onClick={toggleModal}>No, go back</button>
        <button onClick={deletePost}>Yes, delete it</button>
      </div>
    </ReactModal>
  );
}
