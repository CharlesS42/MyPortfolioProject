import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useCommentsApi } from "../../../comments/api/comments.api";
import { CommentResponseModel } from "../../../comments/models/comments.model";
import { useTranslation } from 'react-i18next';

const CommentsTab: React.FC = () => {
  const { t } = useTranslation();
  const { getAllComments, getCommentById, deleteComment, approveComment } = useCommentsApi();
  const [comments, setComments] = useState<CommentResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
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
      console.error(t("comments.errors.fetch"), error);
    }
  };

  const handleViewComment = async (commentId: string) => {
    try {
      const comment = await getCommentById(commentId);
      setViewingComment(comment);
    } catch (error) {
      console.error(t("comments.errors.view"), error);
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
      console.error(t("comments.errors.delete"), error);
    }
  };

  const handleApprove = async (commentId: string) => {
    try {
      await approveComment(commentId);
      await fetchComments();
    } catch (error) {
      console.error(t("comments.errors.approve"), error);
    }
  };

  return (
    <div>
      {viewingComment ? (
        <div>
          <Button variant="link" className="text-primary mb-3" onClick={() => setViewingComment(null)}>
            <span>&larr;</span> {t("comments.backToList")}
          </Button>
          <h3>{viewingComment.userName}</h3>
          <p><strong>{t("comments.content")}:</strong> {viewingComment.content}</p>
          <p><strong>{t("comments.createdAt")}:</strong> {new Date(viewingComment.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{t("comments.title")}</h3>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded">
              <thead className="bg-light">
                <tr>
                  <th>{t("comments.user")}</th>
                  <th>{t("comments.content")}</th>
                  <th>{t("comments.approved")}</th>
                  <th>{t("comments.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.commentId}>
                    <td>{comment.userName}</td>
                    <td
                      onClick={() => handleViewComment(comment.commentId)}
                      style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
                    >
                      {comment.content}
                    </td>
                    <td>{comment.approved ? t("comments.approvedYes") : t("comments.approvedNo")}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        className="ms-2"
                        onClick={() => handleApprove(comment.commentId)}
                      >
                        {comment.approved ? t("comments.disapprove") : t("comments.approve")}
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => {
                          setSelectedComment(comment);
                          setShowModal(true);
                        }}
                      >
                        {t("comments.delete")}
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
          <Modal.Title>
            {t("comments.modal.deleteTitle")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("comments.modal.deleteConfirmation")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("comments.modal.cancel")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t("comments.modal.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentsTab;