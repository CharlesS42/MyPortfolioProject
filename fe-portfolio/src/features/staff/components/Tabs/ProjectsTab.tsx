import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useProjectsApi } from "../../../projects/api/projects.api";
import { ProjectResponseModel, ProjectRequestModel } from "../../../projects/models/projects.model";
import { useTranslation } from 'react-i18next';
import './ProjectsTab.css'; // Import the CSS file

const ProjectsTab: React.FC = () => {
  const { t } = useTranslation();
  const { getAllProjects, getProjectById, addProject, updateProject, deleteProject } = useProjectsApi();
  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | "delete">("create");
  const [selectedProject, setSelectedProject] = useState<ProjectResponseModel | null>(null);
  const [formData, setFormData] = useState<ProjectRequestModel>({
    title: "",
    imageFileName: "",
    description_EN: "",
    description_FR: "",
    programmingLanguages: [],
    date: "",
    repositoryUrl: "",
    liveDemoUrl: ""
  });
  const [viewingProject, setViewingProject] = useState<ProjectResponseModel | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error(t("projects.errors.fetch"), error);
    }
  };

  const handleViewProject = async (projectId: string) => {
    try {
      const project = await getProjectById(projectId);
      setViewingProject(project);
    } catch (error) {
      console.error(t("projects.errors.view"), error);
    }
  };

  const handleSave = async () => {
    try {
      const updatedFormData = { ...formData, date: new Date().toISOString() };
      if (modalType === "create") {
        await addProject(updatedFormData);
      } else if (modalType === "update" && selectedProject) {
        await updateProject(updatedFormData, selectedProject.projectId);
      }
      setShowModal(false);
      await fetchProjects();
    } catch (error) {
      console.error(t("projects.errors.save"), error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedProject) {
        await deleteProject(selectedProject.projectId);
        setShowModal(false);
        await fetchProjects();
      }
    } catch (error) {
      console.error(t("projects.errors.delete"), error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProgrammingLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      programmingLanguages: value.split(",").map((lang) => lang.trim()),
    }));
  };

  return (
    <div>
      {viewingProject ? (
        <div className="project-details-container">
          <Button variant="link" className="text-primary mb-3" onClick={() => setViewingProject(null)}>
            <span>&larr;</span> {t("projects.backToList")}
          </Button>
          <h3>{viewingProject.title}</h3>
          <p><strong>{t("projects.description_EN")}:</strong></p>
          <p className="pre-wrap">{viewingProject.description_EN}</p>
          <p><strong>{t("projects.description_FR")}:</strong></p>
          <p className="pre-wrap">{viewingProject.description_FR}</p>
          <p><strong>{t("projects.programmingLanguages")}:</strong> {viewingProject.programmingLanguages.join(", ")}</p>
          <p><strong>{t("projects.date")}:</strong> {viewingProject.date}</p>
          <p><strong>{t("projects.repositoryUrl")}: </strong>
          {viewingProject.repositoryUrl !== "" ? (
            <a href={viewingProject.repositoryUrl} target="_blank" rel="noopener noreferrer">{viewingProject.repositoryUrl}</a>
          ) : (
            t("none")
          )}
          </p>
          <p><strong>{t("projects.liveDemoUrl")}: </strong>
          {viewingProject.liveDemoUrl !== "" ? (
            <a href={viewingProject.liveDemoUrl} target="_blank" rel="noopener noreferrer">{viewingProject.liveDemoUrl}</a>
          ) : (
            t("none")
          )}
          </p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{t("projects.title")}</h3>
            <Button
              variant="primary"
              onClick={() => {
                setModalType("create");
                setFormData({ title: "", imageFileName: "", description_EN: "", description_FR: "", programmingLanguages: [], date: "", repositoryUrl: "", liveDemoUrl: "" });
                setShowModal(true);
              }}
            >
              {t("projects.create")}
            </Button>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded">
              <thead className="bg-light">
                <tr>
                  <th>{t("projects.titleHeader")}</th>
                  <th>{t("projects.programmingLanguages")}</th>
                  <th>{t("projects.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.projectId}>
                    <td onClick={() => handleViewProject(project.projectId)} style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}>
                      {project.title}
                    </td>
                    <td>{project.programmingLanguages.join(", ")}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setSelectedProject(project);
                          setModalType("update");
                          setFormData({
                            title: project.title,
                            imageFileName: project.imageFileName,
                            description_EN: project.description_EN,
                            description_FR: project.description_FR,
                            programmingLanguages: project.programmingLanguages,
                            date: project.date,
                            repositoryUrl: project.repositoryUrl,
                            liveDemoUrl: project.liveDemoUrl
                          });
                          setShowModal(true);
                        }}
                      >
                        {t("projects.edit")}
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => {
                          setSelectedProject(project);
                          setModalType("delete");
                          setShowModal(true);
                        }}
                      >
                        {t("projects.delete")}
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
            {modalType === "create"
              ? t("projects.modal.createTitle")
              : modalType === "update"
              ? t("projects.modal.updateTitle")
              : t("projects.modal.deleteTitle")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>{t("projects.modal.deleteConfirmation")}</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{t("projects.title")}</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t("projects.placeholders.title")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("projects.description_EN")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description_EN"
                  value={formData.description_EN}
                  onChange={handleInputChange}
                  placeholder={t("projects.placeholders.description_EN")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("projects.description_FR")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description_FR"
                  value={formData.description_FR}
                  onChange={handleInputChange}
                  placeholder={t("projects.placeholders.description_FR")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("projects.programmingLanguages")}</Form.Label>
                <Form.Control
                  type="text"
                  name="programmingLanguages"
                  value={formData.programmingLanguages.join(", ")}
                  onChange={handleProgrammingLanguagesChange}
                  placeholder={t("projects.placeholders.programmingLanguages")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("projects.repositoryUrl")}</Form.Label>
                <Form.Control
                  type="text"
                  name="repositoryUrl"
                  value={formData.repositoryUrl}
                  onChange={handleInputChange}
                  placeholder={t("projects.placeholders.repositoryUrl")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("projects.liveDemoUrl")}</Form.Label>
                <Form.Control
                  type="text"
                  name="liveDemoUrl"
                  value={formData.liveDemoUrl}
                  onChange={handleInputChange}
                  placeholder={t("projects.placeholders.liveDemoUrl")}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("projects.modal.cancel")}
          </Button>
          <Button
            variant={modalType === "delete" ? "danger" : "primary"}
            onClick={modalType === "delete" ? handleDelete : handleSave}
          >
            {modalType === "delete" ? t("projects.modal.confirm") : t("projects.modal.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectsTab;