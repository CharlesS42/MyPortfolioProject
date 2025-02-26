import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useProjectsApi } from "../../../projects/api/projects.api";
import { ProjectResponseModel, ProjectRequestModel } from "../../../projects/models/projects.model";
import { useTranslation } from 'react-i18next';

const ProjectsTab: React.FC = () => {
  const { t } = useTranslation();
  const { getAllProjects, getProjectById, addProject, updateProject, deleteProject } = useProjectsApi();
  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | "delete">("create");
  const [selectedProject, setSelectedProject] = useState<ProjectResponseModel | null>(null);
  const [formData, setFormData] = useState<ProjectRequestModel>({
    title: "",
    description: "",
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
      if (modalType === "create") {
        await addProject(formData);
      } else if (modalType === "update" && selectedProject) {
        await updateProject(formData, selectedProject.projectId);
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

  return (
    <div>
      {viewingProject ? (
        <div>
          <Button variant="link" className="text-primary mb-3" onClick={() => setViewingProject(null)}>
            <span>&larr;</span> {t("projects.backToList")}
          </Button>
          <h3>{viewingProject.title}</h3>
          <p><strong>{t("projects.description")}:</strong> {viewingProject.description}</p>
          <p><strong>{t("projects.programmingLanguages")}:</strong> {viewingProject.programmingLanguages.join(", ")}</p>
          <p><strong>{t("projects.date")}:</strong> {viewingProject.date}</p>
          <p><strong>{t("projects.repositoryUrl")}:</strong> <a href={viewingProject.repositoryUrl} target="_blank" rel="noopener noreferrer">{viewingProject.repositoryUrl}</a></p>
          <p><strong>{t("projects.liveDemoUrl")}:</strong> <a href={viewingProject.liveDemoUrl} target="_blank" rel="noopener noreferrer">{viewingProject.liveDemoUrl}</a></p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{t("projects.title")}</h3>
            <Button
              variant="primary"
              onClick={() => {
                setModalType("create");
                setFormData({ title: "", description: "", programmingLanguages: [], date: "", repositoryUrl: "", liveDemoUrl: "" });
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
                            description: project.description,
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t("projects.placeholders.title")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("projects.description")}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t("projects.placeholders.description")}
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
