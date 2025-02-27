import React, { useEffect, useState } from "react";
import "./HomeDetails.css";
import { useProjectsApi } from "../../projects/api/projects.api";
import { useSkillsApi } from "../../skills/api/skills.api";
import { useCommentsApi } from "../../comments/api/comments.api";
import { ProjectResponseModel } from "../../projects/models/projects.model";
import { SkillResponseModel } from "../../skills/models/skills.model";
import { CommentResponseModel, CommentRequestModel } from "../../comments/models/comments.model";
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeDetails: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { getAllProjects } = useProjectsApi();
  const { getAllSkills } = useSkillsApi();
  const { getCommentsByApproved, addComment } = useCommentsApi();

  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [comments, setComments] = useState<CommentResponseModel[]>([]);
  const [newComment, setNewComment] = useState<CommentRequestModel>({
    userId: "",
    userName: "",
    content: "",
    createdAt: new Date().toISOString(),
  });

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error(t("home.errors.fetchProjects"), error);
    }
  };

  const fetchSkills = async () => {
    try {
      const skillsData = await getAllSkills();
      setSkills(skillsData);
    } catch (error) {
      console.error(t("home.errors.fetchSkills"), error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsByApproved(true);
      setComments(commentsData);
    } catch (error) {
      console.error(t("home.errors.fetchComments"), error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addComment(newComment);
      setNewComment({ userId: "", userName: "", content: "", createdAt: new Date().toISOString() });
      toast.success(t("home.comments.successMessage"));
    } catch (error) {
      console.error(t("home.errors.addComment"), error);
      toast.error(t("home.comments.errorMessage"));
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchComments();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer />

      {/* Profile Section */}
      <div className="row align-items-center mb-4">
        <div className="col-md-4 text-center">
          <img src="/assets/my_profile.jpg" alt={t("home.profileAlt", { name: "Charles Séguin" })} className="profile-picture img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h1>{t("home.name")}</h1>
          <h3>{t("home.title")}</h3>
          <p>{t("home.introduction")}</p>
          <a 
            href={i18n.language === "fr" ? "/Charles_Seguin_CV_francais.pdf" : "/Charles_Seguin_Resume_english.pdf"}
            download
            className="btn btn-primary mt-3"
          >
            {t("home.downloadCV")}
          </a>
        </div>
      </div>

      {/* Projects Section */}
      <section className="portfolio-section">
        <h2 className="text-center">{t("home.projects.title")}</h2>
        <div className="row">
          {projects.map((project) => (
            <div key={project.projectId} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <a href={`/assets/projects/${project.imageFileName}.png`} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={`/assets/projects/${project.imageFileName}_small.png`} 
                    alt={project.title} 
                    className="card-img-top project-image"
                  />
                </a>
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text pre-wrap">{localStorage.getItem("language") === "fr" ? project.description_FR : project.description_EN}</p>
                  <p><strong>{t("home.projects.technologies")}:</strong> {project.programmingLanguages.join(", ")}</p>
                  <p><small>{new Date(project.date).toLocaleDateString()}</small></p>
                  
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      {t("home.projects.repository")}
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    project.liveDemoUrl === "here" ? <p>{t('current')}</p> :
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-sm">
                      {t("home.projects.liveDemo")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Comments Section */}
      <div className="row">
        <div className="col-md-6">
          <section className="portfolio-section">
            <h2>{t("home.skills.title")}</h2>
            <div className="row">
              {skills.map((skill) => (
                <div key={skill.skillId} className="col-md-6">
                  <div className="card p-3">
                    <h5>{skill.name}</h5>
                    <p>{t("home.skills.proficiencyLevel")}: {t(`proficiency.${skill.proficiencyLevel}`)}</p>
                    <p>{t("home.skills.category")}: {t(`skillCategory.${skill.category}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-md-6">
          <section className="portfolio-section">
            <h2>{t("home.comments.title")}</h2>
            <div className="overflow-auto" style={{ maxHeight: "300px" }}>
              {comments.map((comment) => (
                <div key={comment.commentId} className="comment card p-2 mb-2">
                  <p><strong>{comment.userName}</strong>: {comment.content}</p>
                  <p className="small text-muted">{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-3">
              <input type="text" name="userName" value={newComment.userName} onChange={handleInputChange} placeholder={t("home.comments.placeholderName")} className="form-control mb-2" required />
              <textarea name="content" value={newComment.content} onChange={handleInputChange} placeholder={t("home.comments.placeholderComment")} className="form-control mb-2" required />
              <button type="submit" className="btn btn-primary">{t("home.comments.submit")}</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;
