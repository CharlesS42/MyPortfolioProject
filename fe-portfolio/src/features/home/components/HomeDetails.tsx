import React, { useEffect, useState } from "react";
import "./HomeDetails.css";
import { useProjectsApi } from "../../projects/api/projects.api";
import { useSkillsApi } from "../../skills/api/skills.api";
import { useCommentsApi } from "../../comments/api/comments.api";
import { ProjectResponseModel } from "../../projects/models/projects.model";
import { SkillResponseModel } from "../../skills/models/skills.model";
import { CommentResponseModel, CommentRequestModel } from "../../comments/models/comments.model";

const HomeDetails: React.FC = () => {
  const { getAllProjects } = useProjectsApi();
  const { getAllSkills } = useSkillsApi();
  const { getAllComments, addComment } = useCommentsApi();

  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [comments, setComments] = useState<CommentResponseModel[]>([]);
  const [newComment, setNewComment] = useState<CommentRequestModel>({
    userId: "", // You can generate a unique ID or leave it empty if not needed
    userName: "",
    content: "",
    createdAt: new Date().toISOString(),
  });

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const skillsData = await getAllSkills();
      setSkills(skillsData);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsData = await getAllComments();
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
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
      const addedComment = await addComment(newComment);
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment({
        userId: "",
        userName: "",
        content: "",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchComments();
  }, []); // Only fetch once on mount

  return (
    <div className="portfolio-container">
      <div className="intro-cv-container">
        <section className="intro-section">
          <img src="/assets/my_profile.jpg" alt="Charles Séguin" className="profile-picture" />
          <div className="intro-details">
            <h1 className="intro-desc">Charles Séguin</h1>
            <h3 className="intro-desc">Aspiring Software Engineer</h3>
            <p className="intro-desc">
              Welcome to my portfolio! I am a third year Computer Science student at the Champlain College Saint Lambert. I am passionate about software development and I am always looking for new opportunities to learn and grow. 
              My expertise is in application development and software engineering. I am currently working as an intern at Multidev Technologies Inc. where I am developing a new application for the company.
              Feel free to check out my projects, skills, and CV below! Please leave a comment if you have any feedback or questions. To contact me, feel free to send me an email through my contact form.
            </p>
          </div>
        </section>
        <section className="cv-section">
          <h2>My CV</h2>   
          <a href="/Charles_Seguin_Master_Resume_english.pdf" download="Charles_Seguin_Master_Resume_english.pdf" className="cv-link">
            <button>Download CV</button>
          </a>
        </section>
      </div>

      <section className="portfolio-section" id="projects">
        <h2>Projects</h2>
        <div className="grid-container">
          {projects.map(project => (
            <div key={project.projectId} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Technologies:</strong> {project.programmingLanguages.join(", ")}</p>
              <p><small>{new Date(project.date).toLocaleDateString()}</small></p>
              <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">Repository</a>
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
            </div>
          ))}
        </div>
      </section>

      <div className="skills-comments-container">
        <section className="portfolio-section" id="skills">
          <h2>Skills</h2>
          <div className="grid-container">
            {skills.map(skill => (
              <div key={skill.skillId} className="card">
                <h3>{skill.name}</h3>
                <p>Proficiency Level: {skill.proficiencyLevel}</p>
                <p>Category: {skill.category}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio-section" id="comments">
          <h2>Comments</h2>
          <div className="comments-container">
            {comments.map(comment => (
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
              placeholder="Your Name"
              required
            />
            <textarea
              name="content"
              value={newComment.content}
              onChange={handleInputChange}
              placeholder="Your Comment"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HomeDetails;