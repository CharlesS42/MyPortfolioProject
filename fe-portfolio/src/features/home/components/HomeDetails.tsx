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
    <div className="portfolio-container">
      <ToastContainer />
      <div className="intro-cv-container">
        <section className="intro-section">
          <img src="/assets/my_profile.jpg" alt={t("home.profileAlt", { name: "Charles Séguin" })} className="profile-picture" />
          <div className="intro-details">
            <h1 className="intro-desc">{t("home.name")}</h1>
            <h3 className="intro-desc">{t("home.title")}</h3>
            <p className="intro-desc">{t("home.introduction")}</p>
          </div>
        </section>
        <section className="cv-section">
          {i18n.language === "fr" ? (
            <a href="/Charles_Seguin_CV_francais.pdf" download className="cv-link">
              {t("home.downloadCV")}
            </a>
          ) : (
            <a href="/Charles_Seguin_Resume_english.pdf" download className="cv-link">
              {t("home.downloadCV")}
            </a>
          )}
        </section>
      </div>

      <section className="portfolio-section" id="projects">
        <h2>{t("home.projects.title")}</h2>
        <div className="grid-container">
          {projects.map((project) => (
            <div key={project.projectId} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>{t("home.projects.technologies")}:</strong> {project.programmingLanguages.join(", ")}</p>
              <p><small>{new Date(project.date).toLocaleDateString()}</small></p>
              {project.repositoryUrl !== "" &&
                <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">{t("home.projects.repository")}</a>
              }
              {project.liveDemoUrl !== "" &&
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">{t("home.projects.liveDemo")}</a>
              }
            </div>
          ))}
        </div>
      </section>

      <div className="skills-comments-container">
        <section className="portfolio-section" id="skills">
          <h2>{t("home.skills.title")}</h2>
          <div className="grid-container">
            {skills.map((skill) => (
              <div key={skill.skillId} className="card">
                <h3>{skill.name}</h3>
                <p>{t("home.skills.proficiencyLevel")}: {t(`proficiency.${skill.proficiencyLevel}`)}</p>
                <p>{t("home.skills.category")}: {t(`skillCategory.${skill.category}`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio-section" id="comments">
          <h2>{t("home.comments.title")}</h2>
          <div className="comments-container" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {comments.map((comment) => (
              <div key={comment.commentId} className="comment">
                <p><strong>{comment.userName}</strong>: {comment.content}</p>
                <p className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="comment-form">
            <input
              type="text"
              name="userName"
              value={newComment.userName}
              onChange={handleInputChange}
              placeholder={t("home.comments.placeholderName")}
              required
            />
            <textarea
              name="content"
              value={newComment.content}
              onChange={handleInputChange}
              placeholder={t("home.comments.placeholderComment")}
              required
            />
            <button type="submit">{t("home.comments.submit")}</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HomeDetails;