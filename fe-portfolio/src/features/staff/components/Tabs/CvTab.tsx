import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useCVsApi } from "../../../cv/api/cv.api";
import { CVResponseModel, CVRequestModel } from "../../../cv/models/cv.model";


const CVsTab: React.FC = () => {
  const { getCV, updateCV } = useCVsApi();
  const [cvs, setCVs] = useState<CVResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState< "update" >("update");
  const [selectedCV, setSelectedCV] = useState<CVResponseModel | null>(null);
  const [formData, setFormData] = useState<CVRequestModel>({
    fileName: "",
    fileUrl: "",
    uploadedAt: "",
  });

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const data = await getCV();
      setCVs([data]); // Assuming that the API only returns a single CV
    } catch (error) {
      console.error("Error fetching CVs:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (modalType === "update" && selectedCV) {
        await updateCV(formData);
      }
      setShowModal(false);
      await fetchCVs();
    } catch (error) {
      console.error("Error saving CV:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>CVs</h3>
      </div>
      <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
        <Table bordered hover responsive className="rounded" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <thead className="bg-light">
            <tr>
              <th>File Name</th>
              <th>File URL</th>
              <th>Uploaded At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cvs.map((cv) => (
              <tr key={cv.cvId}>
                <td>{cv.fileName}</td>
                <td>{cv.fileUrl}</td>
                <td>{cv.uploadedAt}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setSelectedCV(cv);
                      setModalType("update");
                      setFormData({
                        fileName: cv.fileName,
                        fileUrl: cv.fileUrl,
                        uploadedAt: cv.uploadedAt,
                      });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit CV
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>File Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fileName}
                onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Uploaded At</Form.Label>
              <Form.Control
                type="text"
                value={formData.uploadedAt}
                onChange={(e) => setFormData({ ...formData, uploadedAt: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CVsTab;
