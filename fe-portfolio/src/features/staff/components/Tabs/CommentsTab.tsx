import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useCommentsApi } from "../../../comments/api/comments.api";
import { CommentResponseModel } from "../../../comments/models/comments.model";


const CommentsTab: React.FC = () => {
  const { getAllComments, getCommentById, deleteComment } = useCommentsApi();
  const [comments, setComments] = useState<CommentResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | "delete">("create");
  const [selectedComment, setSelectedComment] = useState<CommentResponseModel | null>(null);
  const [viewingComment, setViewingComment] = useState<CommentResponseModel | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await getAllComments();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleViewComment = async (commentId: string) => {
    try {
      const comment = await getCommentById(commentId);
      setViewingComment(comment);
    } catch (error) {
      console.error("Error fetching comment details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedComment) {
        await deleteComment(selectedComment.commentId);
        setShowModal(false);
        await fetchComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      {viewingComment ? (
        <div>
          <Button variant="link" className="text-primary mb-3" onClick={() => setViewingComment(null)}>
            <span>&larr;</span> Back to List
          </Button>
          <h3>{viewingComment.userName}</h3>
          <p><strong>Content:</strong> {viewingComment.content}</p>
          <p><strong>Created At:</strong> {viewingComment.createdAt}</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Comments</h3>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded">
              <thead className="bg-light">
                <tr>
                  <th>User</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.commentId}>
                    <td>{comment.userName}</td>
                    <td onClick={() => handleViewComment(comment.commentId)} style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}>
                      {comment.content}
                    </td>
                    <td>
                      <Button variant="outline-danger" className="ms-2" onClick={() => {
                        setSelectedComment(comment);
                        setModalType("delete");
                        setShowModal(true);
                      }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "delete" ? "Delete Comment" : "View Comment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Are you sure you want to delete this comment?</p>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          {modalType === "delete" && <Button variant="danger" onClick={handleDelete}>Confirm</Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentsTab;
