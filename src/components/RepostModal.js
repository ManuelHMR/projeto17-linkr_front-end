import ReactModal from "react-modal";
import axios from "axios";

export default function RepostModal({ infos, toggleRepostModal, repostModalBool, setLoading }) {
    const { id } = infos;
    const token = localStorage.getItem("token");


    function finishRepost() {
        setLoading(true);
        axios.post(`https://projeto17-linkr-back-end.herokuapp.com/repost/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setLoading(false);
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
                alert("Erro ao re-postar");
                toggleRepostModal();
                setLoading(false);
            });
    }

    return (
        <ReactModal
            isOpen={repostModalBool}
            onRequestClose={toggleRepostModal}
            contentLabel="Do you want to re-post this link?"
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
            Do you want to re-post this link?
            </h1>
            <div className="buttons">
                <button onClick={toggleRepostModal}>No, cancel</button>
                <button onClick={finishRepost}>Yes, share!</button>
            </div>
        </ReactModal>
    );
}
