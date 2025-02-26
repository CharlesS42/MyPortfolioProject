import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useMessagesApi } from "../../../messages/api/messages.api";
import { MessageResponseModel } from "../../../messages/models/messages.model";
import { useTranslation } from 'react-i18next';

const MessagesTab: React.FC = () => {
  const { t } = useTranslation();
  const { getAllMessages, getMessageById, deleteMessage } = useMessagesApi();

  const [messages, setMessages] = useState<MessageResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageResponseModel | null>(null);
  const [viewingMessage, setViewingMessage] = useState<MessageResponseModel | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await getAllMessages();
      setMessages(data);
    } catch (error) {
      console.error(t("messages.errors.fetch"), error);
    }
  };

  const handleViewMessage = async (messageId: string) => {
    try {
      const message = await getMessageById(messageId);
      setViewingMessage(message);
    } catch (error) {
      console.error(t("messages.errors.view"), error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedMessage) {
        await deleteMessage(selectedMessage.contactMessageId);
        setShowModal(false);
        await fetchMessages();
      }
    } catch (error) {
      console.error(t("messages.errors.delete"), error);
    }
  };

  return (
    <div>
      {viewingMessage ? (
        <div>
          <Button
            variant="link"
            className="text-primary mb-3"
            onClick={() => setViewingMessage(null)}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <span>&larr;</span> {t("messages.backToList")}
          </Button>
          <h3>{`${viewingMessage.firstName} ${viewingMessage.lastName}`}</h3>
          <p><strong>{t("messages.email")}:</strong> {viewingMessage.email}</p>
          <p><strong>{t("messages.subject")}:</strong> {viewingMessage.subject}</p>
          <p><strong>{t("messages.content")}:</strong> {viewingMessage.message}</p>
          <p><strong>{t("messages.sentAt")}:</strong> {new Date(viewingMessage.sentAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{t("messages.title")}</h3>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <thead className="bg-light">
                <tr>
                  <th>{t("messages.name")}</th>
                  <th>{t("messages.email")}</th>
                  <th>{t("messages.subject")}</th>
                  <th>{t("messages.content")}</th>
                  <th>{t("messages.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.contactMessageId}>
                    <td
                      onClick={() => handleViewMessage(message.contactMessageId)}
                      style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
                    >
                      {`${message.firstName} ${message.lastName}`}
                    </td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td>{message.message}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => {
                          setSelectedMessage(message);
                          setShowModal(true);
                        }}
                      >
                        {t("messages.delete")}
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
            {t("messages.modal.deleteTitle")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("messages.modal.deleteConfirmation")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("messages.modal.cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
          >
            {t("messages.modal.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MessagesTab;