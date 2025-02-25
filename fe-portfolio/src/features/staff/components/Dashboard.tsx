import React, { useState } from "react";
import { Tab, Nav, Row, Col, Card } from "react-bootstrap";
import MessagesTab from "./Tabs/MessagesTab";
import CommentsTab from "./Tabs/CommentsTab";
import SkillsTab from "./Tabs/SkillsTab";
import ProjectsTab from "./Tabs/ProjectsTab";

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState("messages");
  
    return (
      <div
        className="d-flex justify-content-center align-items-center p-4"
        style={{ backgroundColor: "#AFCBD5", minHeight: "100vh" }}
      >
        <Card
          className="rounded shadow border-0"
          style={{
            width: "1600px",
            height: "800px",
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <Card.Body className="p-0 d-flex flex-column">
            <Tab.Container activeKey={activeTab}>
              <Row className="g-0 flex-grow-1">
                {/* Sidebar  */}
                <Col
                  sm={2}
                  className="bg-dark text-white d-flex flex-column"
                  style={{
                    padding: "20px",
                    maxWidth: "170px",
                  }}
                >
                  {/* Dashboard Title */}
                  <h4 className="text-center mb-3" style={{ fontWeight: "bold" }}>
                    Dashboard
                  </h4>
                    {/* Tab List */}
                    <Nav className="flex-column text-center">
                    <Nav.Item>
                        <Nav.Link
                        eventKey="messages"
                        onClick={() => setActiveTab("messages")}
                        className={`text-white px-3 py-2 ${
                            activeTab === "messages" ? "bg-secondary" : ""
                        }`}
                        style={{
                            fontWeight: activeTab === "messages" ? "bold" : "normal",
                            borderRadius: "10px",
                        }}
                        >
                            Messages
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                        eventKey="comments"
                        onClick={() => setActiveTab("comments")}
                        className={`text-white px-3 py-2 ${
                            activeTab === "comments" ? "bg-secondary" : ""
                        }`}
                        style={{
                            fontWeight: activeTab === "comments" ? "bold" : "normal",
                            borderRadius: "10px",
                        }}
                        >
                            Comments
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                        eventKey="skills"
                        onClick={() => setActiveTab("skills")}
                        className={`text-white px-3 py-2 ${
                            activeTab === "skills" ? "bg-secondary" : ""
                        }`}
                        style={{
                            fontWeight: activeTab === "skills" ? "bold" : "normal",
                            borderRadius: "10px",
                        }}
                        >
                            Skills
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                        eventKey="projects"
                        onClick={() => setActiveTab("projects")}
                        className={`text-white px-3 py-2 ${
                            activeTab === "projects" ? "bg-secondary" : ""
                        }`}
                        style={{
                            fontWeight: activeTab === "projects" ? "bold" : "normal",
                            borderRadius: "10px",
                        }}
                        >
                            Projects
                        </Nav.Link>
                    </Nav.Item>
                
                  </Nav>
              </Col>

              {/* Main Content */}
              <Col
                sm={10}
                className="bg-white"
                style={{
                  padding: "20px",
                  overflowY: "auto",
                  height: "100%",
                }}
              >
                <Tab.Content>
                  <Tab.Pane eventKey="messages">
                    <MessagesTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="comments">
                    <CommentsTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="skills">
                    <SkillsTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="projects">
                    <ProjectsTab />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
