import React, { useState } from "react";
import { useMessagesApi } from "../features/messages/api/messages.api";
import { MessageRequestModel } from "../features/messages/models/messages.model";
import { Form, Button, Container, Card, Alert, Spinner } from "react-bootstrap";

const ContactUsPage: React.FC = () => {
  const { addMessage } = useMessagesApi(); // Use API Hook

  const [formData, setFormData] = useState<Omit<MessageRequestModel, "sentAt">>({
    name: "",
    email: "",
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
      await addMessage(requestData);
      setSuccess("Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });

      // Open system email client
      const mailtoLink = `mailto:charles.seg42@gmail.com?subject=${requestData.message}&body=Name: ${requestData.name}%0D%0AEmail: ${requestData.email}`;
      window.location.href = mailtoLink;
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
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
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
                id="message"
                type="text"
                name="message"
                placeholder="Enter the subject of your message"
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