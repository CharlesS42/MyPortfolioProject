/*
import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useUsersApi } from "../../../users/api/users.api";
import { UserResponseModel, UserRequestModel } from "../../../users/models/users.model";
*/

const UsersTab: React.FC = () => {
  /*
  const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = useUsersApi();
  const [users, setUsers] = useState<UserResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | "delete">("create");
  const [selectedUser, setSelectedUser] = useState<UserResponseModel | null>(null);
  const [formData, setFormData] = useState<UserRequestModel>({
    fullName: "",
    email: "",
    company: "",
    role: ""
  });
  const [viewingUser, setViewingUser] = useState<UserResponseModel | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleViewUser = async (userId: string) => {
    try {
      const user = await getUserById(userId);
      setViewingUser(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (modalType === "create") {
        await addUser(formData);
      } else if (modalType === "update" && selectedUser) {
        await updateUser(selectedUser.userId, formData);
      }
      setShowModal(false);
      await fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedUser) {
        await deleteUser(selectedUser.userId);
        setShowModal(false);
        await fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      {viewingUser ? (
        <div>
          <Button
            variant="link"
            className="text-primary mb-3"
            onClick={() => setViewingUser(null)}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <span>&larr;</span> Back to List
          </Button>
          <h3>{viewingUser.fullName}</h3>
          <p><strong>Email:</strong> {viewingUser.email}</p>
          <p><strong>Company:</strong> {viewingUser.company}</p>
          <p><strong>Role:</strong> {viewingUser.role}</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Users</h3>
            <Button
              variant="primary"
              onClick={() => {
                setModalType("create");
                setFormData({ fullName: "", email: "", company: "", role: "" });
                setShowModal(true);
              }}
            >
              Create User
            </Button>
          </div>
          <div className="dashboard-scrollbar" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <Table bordered hover responsive className="rounded" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <thead className="bg-light">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td onClick={() => handleViewUser(user.userId)} style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}>
                      {user.fullName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.company}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setSelectedUser(user);
                          setModalType("update");
                          setFormData({
                            fullName: user.fullName,
                            email: user.email,
                            company: user.company,
                            role: user.role,
                          });
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => {
                          setSelectedUser(user);
                          setModalType("delete");
                          setShowModal(true);
                        }}
                      >
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
          <Modal.Title>
            {modalType === "create" ? "Create User" : modalType === "update" ? "Edit User" : "Delete User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Are you sure you want to delete this user?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
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
  */
  return <div />;
};

export default UsersTab;