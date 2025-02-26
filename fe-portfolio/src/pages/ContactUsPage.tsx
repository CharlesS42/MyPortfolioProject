import React, { useState } from "react";
import { useMessagesApi } from "../features/messages/api/messages.api";
import { MessageRequestModel } from "../features/messages/models/messages.model";
import { Form, Button, Container, Card, Alert, Spinner } from "react-bootstrap";

const ContactUsPage: React.FC = () => {
  const { sendMessage } = useMessagesApi(); // Use API Hook

  const [formData, setFormData] = useState<Omit<MessageRequestModel, "sentAt">>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const requestData: MessageRequestModel = {
        ...formData,
        sentAt: new Date().toISOString(),
      };
      await sendMessage(requestData);
      setSuccess("Your message has been sent successfully.");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });

    } catch (err) {
      setError("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#AFCBD5", minHeight: "100vh" }}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="w-100 shadow-lg p-4" style={{ maxWidth: "500px", borderRadius: "12px" }}>
          <h2 className="text-center mb-4">Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="firstname">First Name</Form.Label>
              <Form.Control
                id="firstname"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="lastname">Last Name</Form.Label>
              <Form.Control
                id="lastname"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="message">Subject</Form.Label>
              <Form.Control
                id="subject"
                type="text"
                name="subject"
                placeholder="Enter the subject of your message"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="message">Message</Form.Label>
              <Form.Control
                as="textarea"
                id="message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="dark" className="w-100" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" /> : "Submit"}
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default ContactUsPage;