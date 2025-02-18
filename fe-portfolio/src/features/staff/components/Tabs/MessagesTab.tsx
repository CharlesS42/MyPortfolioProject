import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useMessagesApi } from "../../../messages/api/messages.api";
import { MessageResponseModel, MessageRequestModel } from "../../../messages/models/messages.model";


const MessagesTab: React.FC = () => {
  const { getAllMessages, getMessageById, addMessage, deleteMessage } = useMessagesApi(); // Use Hook
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
      console.error("Error fetching messages:", error);
    }
  };

  const handleViewMessage = async (messageId: string) => {
    try {
      const message = await getMessageById(messageId);
      setViewingMessage(message);
    } catch (error) {
      console.error("Error fetching message details:", error);
    }
  };

  const handleSave = async () => {
    const isNameValid = formData.name.trim() !== "";
    const isEmailValid = formData.email.trim() !== "";
    const isMessageValid = formData.message.trim() !== "";
    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setMessageError(!isMessageValid);

    try {
      if (modalType === "create") {
        await addMessage(formData);
      }
      setShowModal(false);
      await fetchMessages();
    } catch (error) {
      console.error("Error saving message:", error);
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
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div>
      {/* Viewing a Single Message */}
      {viewingMessage ? (
        <div>
          <Button
            variant="link"
            className="text-primary mb-3"
            onClick={() => setViewingMessage(null)}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>&larr;</span> Back to message list
          </Button>
          <h3>{viewingMessage.name}</h3>
          <p><strong>Email:</strong> {viewingMessage.email}</p>
          <p><strong>Message:</strong> {viewingMessage.message}</p>
          <p><strong>Sent At:</strong> {viewingMessage.sentAt}</p>
        </div>
      ) : (
        <>
          {/* List of Messages */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Messages</h3>
            <Button
              variant="primary"
              onClick={() => {
                setModalType("create");
                setFormData({ name: "", email: "", message: "", sentAt: "" });
                setShowModal(true);
              }}
            >
              Create Message
            </Button>
          </div>
          <div
            className="dashboard-scrollbar"
            style={{ maxHeight: "700px", overflowY: "auto" }}
          >
            <Table
              bordered
              hover
              responsive
              className="rounded"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.contactMessageId}>
                    <td
                      onClick={() => handleViewMessage(message.contactMessageId)}
                      style={{
                        cursor: "pointer",
                        color: "#007bff",
                        textDecoration: "underline",
                      }}
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
                        Delete Message
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

      {/* Modals for Create, and Delete */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "create"
              ? "Create Message"
              : "Delete Message"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Are you sure you want to delete this message?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setNameError(false);
                  }}
                  isInvalid={nameError}
                />
                <div className="invalid-feedback">
                  Name is required.
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setEmailError(false);
                  }}
                  isInvalid={emailError}
                />
                <div className="invalid-feedback">
                  A valid email is required.
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    setMessageError(false);
                  }}
                  isInvalid={messageError}
                />
                <div className="invalid-feedback">
                  Message content is required.
                </div>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant={modalType === "delete" ? "danger" : "primary"}
            onClick={modalType === "delete" ? handleDelete : handleSave}
          >
            {modalType === "delete" ? "Confirm" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MessagesTab;
