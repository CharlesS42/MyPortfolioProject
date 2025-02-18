import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useProjectsApi } from "../../../projects/api/projects.api";
import { ProjectResponseModel, ProjectRequestModel } from "../../../projects/models/projects.model";


const ProjectsTab: React.FC = () => {
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
      console.error("Error fetching projects:", error);
    }
  };

  const handleViewProject = async (projectId: string) => {
    try {
      const project = await getProjectById(projectId);
      setViewingProject(project);
    } catch (error) {
      console.error("Error fetching project details:", error);
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
      console.error("Error saving project:", error);
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
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      {viewingProject ? (
        <div>
          <Button variant="link" className="text-primary mb-3" onClick={() => setViewingProject(null)}>
            <span>&larr;</span> Back to List
          </Button>
          <h3>{viewingProject.title}</h3>
          <p><strong>Description:</strong> {viewingProject.description}</p>
          <p><strong>Programming Languages:</strong> {viewingProject.programmingLanguages.join(", ")}</p>
          <p><strong>Date:</strong> {viewingProject.date}</p>
          <p><strong>Repository URL:</strong> <a href={viewingProject.repositoryUrl} target="_blank" rel="noopener noreferrer">{viewingProject.repositoryUrl}</a></p>
          <p><strong>Live Demo URL:</strong> <a href={viewingProject.liveDemoUrl} target="_blank" rel="noopener noreferrer">{viewingProject.liveDemoUrl}</a></p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Projects</h3>
            <Button variant="primary" onClick={() => {
              setModalType("create");
              setFormData({ title: "", description: "", programmingLanguages: [], date: "", repositoryUrl: "", liveDemoUrl: "" });
              setShowModal(true);
            }}>
              Create Project
            </Button>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded">
              <thead className="bg-light">
                <tr>
                  <th>Title</th>
                  <th>Programming Languages</th>
                  <th>Actions</th>
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
                      <Button variant="outline-primary" onClick={() => {
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
                      }}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" className="ms-2" onClick={() => {
                        setSelectedProject(project);
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
          <Modal.Title>{modalType === "create" ? "Create Project" : modalType === "update" ? "Edit Project" : "Delete Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Are you sure you want to delete this project?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
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

export default ProjectsTab;
