import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useMessagesApi } from "../../../messages/api/messages.api";
import { MessageResponseModel, MessageRequestModel } from "../../../messages/models/messages.model";
import { useTranslation } from 'react-i18next';

const MessagesTab: React.FC = () => {
  const { t } = useTranslation();
  const { getAllMessages, getMessageById, addMessage, deleteMessage } = useMessagesApi();

  const [messages, setMessages] = useState<MessageResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "delete">("create");
  const [selectedMessage, setSelectedMessage] = useState<MessageResponseModel | null>(null);
  const [formData, setFormData] = useState<MessageRequestModel>({ name: "", email: "", message: "", sentAt: "" });
  const [viewingMessage, setViewingMessage] = useState<MessageResponseModel | null>(null);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

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

  const handleSave = async () => {
    const isNameValid = formData.name.trim() !== "";
    const isEmailValid = formData.email.trim() !== "";
    const isMessageValid = formData.message.trim() !== "";

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setMessageError(!isMessageValid);

    if (!isNameValid || !isEmailValid || !isMessageValid) return;

    try {
      if (modalType === "create") {
        await addMessage(formData);
      }
      setShowModal(false);
      await fetchMessages();
    } catch (error) {
      console.error(t("messages.errors.save"), error);
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
          <h3>{viewingMessage.name}</h3>
          <p><strong>{t("messages.email")}:</strong> {viewingMessage.email}</p>
          <p><strong>{t("messages.content")}:</strong> {viewingMessage.message}</p>
          <p><strong>{t("messages.sentAt")}:</strong> {new Date(viewingMessage.sentAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{t("messages.title")}</h3>
            <Button
              variant="primary"
              onClick={() => {
                setModalType("create");
                setFormData({ name: "", email: "", message: "", sentAt: "" });
                setShowModal(true);
              }}
            >
              {t("messages.create")}
            </Button>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <thead className="bg-light">
                <tr>
                  <th>{t("messages.name")}</th>
                  <th>{t("messages.email")}</th>
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
                      {message.name}
                    </td>
                    <td>{message.email}</td>
                    <td>{message.message}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => {
                          setSelectedMessage(message);
                          setModalType("delete");
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
            {modalType === "create" ? t("messages.modal.createTitle") : t("messages.modal.deleteTitle")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>{t("messages.modal.deleteConfirmation")}</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{t("messages.name")}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setNameError(false);
                  }}
                  isInvalid={nameError}
                  placeholder={t("messages.placeholders.name")}
                />
                <div className="invalid-feedback">{t("messages.errors.nameRequired")}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("messages.email")}</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setEmailError(false);
                  }}
                  isInvalid={emailError}
                  placeholder={t("messages.placeholders.email")}
                />
                <div className="invalid-feedback">{t("messages.errors.emailRequired")}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("messages.content")}</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    setMessageError(false);
                  }}
                  isInvalid={messageError}
                  placeholder={t("messages.placeholders.message")}
                />
                <div className="invalid-feedback">{t("messages.errors.messageRequired")}</div>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("messages.modal.cancel")}
          </Button>
          <Button
            variant={modalType === "delete" ? "danger" : "primary"}
            onClick={modalType === "delete" ? handleDelete : handleSave}
          >
            {modalType === "delete" ? t("messages.modal.confirm") : t("messages.modal.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MessagesTab;
