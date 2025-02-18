import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useSkillsApi } from "../../../skills/api/skills.api";
import { SkillResponseModel, SkillRequestModel } from "../../../skills/models/skills.model";


const SkillsTab: React.FC = () => {
  const { getAllSkills, getSkillById, addSkill, updateSkill, deleteSkill } = useSkillsApi();
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | "delete">("create");
  const [selectedSkill, setSelectedSkill] = useState<SkillResponseModel | null>(null);
  const [formData, setFormData] = useState<SkillRequestModel>({
    name: "",
    proficiencyLevel: "",
    category: ""
  });
  const [viewingSkill, setViewingSkill] = useState<SkillResponseModel | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getAllSkills();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleViewSkill = async (skillId: string) => {
    try {
      const skill = await getSkillById(skillId);
      setViewingSkill(skill);
    } catch (error) {
      console.error("Error fetching skill details:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (modalType === "create") {
        await addSkill(formData);
      } else if (modalType === "update" && selectedSkill) {
        await updateSkill(formData, selectedSkill.skillId);
      }
      setShowModal(false);
      await fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedSkill) {
        await deleteSkill(selectedSkill.skillId);
        setShowModal(false);
        await fetchSkills();
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div>
      {viewingSkill ? (
        <div>
          <Button variant="link" className="text-primary mb-3" onClick={() => setViewingSkill(null)}>
            <span>&larr;</span> Back to List
          </Button>
          <h3>{viewingSkill.name}</h3>
          <p><strong>Proficiency Level:</strong> {viewingSkill.proficiencyLevel}</p>
          <p><strong>Category:</strong> {viewingSkill.category}</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Skills</h3>
            <Button variant="primary" onClick={() => {
              setModalType("create");
              setFormData({ name: "", proficiencyLevel: "", category: "" });
              setShowModal(true);
            }}>
              Create Skill
            </Button>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Proficiency Level</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.skillId}>
                    <td onClick={() => handleViewSkill(skill.skillId)} style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}>
                      {skill.name}
                    </td>
                    <td>{skill.proficiencyLevel}</td>
                    <td>{skill.category}</td>
                    <td>
                      <Button variant="outline-primary" onClick={() => {
                        setSelectedSkill(skill);
                        setModalType("update");
                        setFormData({
                          name: skill.name,
                          proficiencyLevel: skill.proficiencyLevel,
                          category: skill.category
                        });
                        setShowModal(true);
                      }}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" className="ms-2" onClick={() => {
                        setSelectedSkill(skill);
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
          <Modal.Title>{modalType === "create" ? "Create Skill" : modalType === "update" ? "Edit Skill" : "Delete Skill"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Are you sure you want to delete this skill?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Proficiency Level</Form.Label>
                <Form.Control type="text" value={formData.proficiencyLevel} onChange={(e) => setFormData({ ...formData, proficiencyLevel: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant={modalType === "delete" ? "danger" : "primary"} onClick={modalType === "delete" ? handleDelete : handleSave}>
            {modalType === "delete" ? "Confirm" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SkillsTab;
