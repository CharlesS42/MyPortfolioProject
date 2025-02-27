import React, { useState } from "react";
import { Tab, Nav, Row, Col, Card, Dropdown } from "react-bootstrap";
import MessagesTab from "./Tabs/MessagesTab";
import CommentsTab from "./Tabs/CommentsTab";
import SkillsTab from "./Tabs/SkillsTab";
import ProjectsTab from "./Tabs/ProjectsTab";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center p-3" style={{ backgroundColor: "#AFCBD5", minHeight: "100vh" }}>
      <Card className="rounded shadow border-0 w-100 h-auto" style={{ maxWidth: "1200px", minHeight: "80vh" }}>
        <Card.Body className="p-0 d-flex flex-column">
          <Tab.Container activeKey={activeTab}>
            <Row className="g-0 flex-grow-1">
              
              {/* Mobile Sidebar Toggle */}
              <Col xs={12} className="d-md-none p-2">
                <Dropdown className="text-center">
                  <Dropdown.Toggle variant="dark" id="dashboard-dropdown">
                    {t("dashboard.title")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item onClick={() => setActiveTab("messages")}>{t('dashboard.tabs.messages')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => setActiveTab("comments")}>{t('dashboard.tabs.comments')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => setActiveTab("skills")}>{t('dashboard.tabs.skills')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => setActiveTab("projects")}>{t('dashboard.tabs.projects')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              {/* Sidebar - Visible on Medium and Larger Screens */}
              <Col md={2} className="bg-dark text-white d-none d-md-flex flex-column p-3">
                <h4 className="text-center mb-3 fw-bold">{t('dashboard.title')}</h4>
                <Nav className="flex-column text-center">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="messages" 
                      onClick={() => setActiveTab("messages")}
                      className={`text-white px-3 py-2 ${activeTab === "messages" ? "bg-secondary" : ""}`}
                      style={{ fontWeight: activeTab === "messages" ? "bold" : "normal", borderRadius: "10px" }}
                    >
                      {t('dashboard.tabs.messages')}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="comments" 
                      onClick={() => setActiveTab("comments")}
                      className={`text-white px-3 py-2 ${activeTab === "comments" ? "bg-secondary" : ""}`}
                      style={{ fontWeight: activeTab === "comments" ? "bold" : "normal", borderRadius: "10px" }}
                    >
                      {t('dashboard.tabs.comments')}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="skills" 
                      onClick={() => setActiveTab("skills")}
                      className={`text-white px-3 py-2 ${activeTab === "skills" ? "bg-secondary" : ""}`}
                      style={{ fontWeight: activeTab === "skills" ? "bold" : "normal", borderRadius: "10px" }}
                    >
                      {t('dashboard.tabs.skills')}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="projects" 
                      onClick={() => setActiveTab("projects")}
                      className={`text-white px-3 py-2 ${activeTab === "projects" ? "bg-secondary" : ""}`}
                      style={{ fontWeight: activeTab === "projects" ? "bold" : "normal", borderRadius: "10px" }}
                    >
                      {t('dashboard.tabs.projects')}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              {/* Main Content */}
              <Col md={10} xs={12} className="bg-white p-3 overflow-auto" style={{ minHeight: "75vh" }}>
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
