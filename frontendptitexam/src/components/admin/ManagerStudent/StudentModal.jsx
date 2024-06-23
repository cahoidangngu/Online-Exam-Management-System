import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { saveUser } from "../../../services/userServices";

const StudentModal = ({ show, onClose, student, onUpdate }) => {
  const [studentState, setStudentState] = useState(student);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setStudentState({ ...student, [id]: value });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await saveUser(studentState);
      if (response.status === 200) {
        onUpdate("success", "Người dùng đã được cập nhật thành công."); // Invoke the callback on successful deletion
      } else {
        throw new Error("Failed to update the user.");
      }
    } catch (error) {
      onUpdate(
        "error",
        "Có lỗi xảy ra, không thể cập nhật người dùng: \n" + error.message
      );
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>
          {" "}
          {studentState.role.id === 2 ? "Sinh viên" : "Admin"} {studentState.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateUser} noValidate>
          <h4 className="mb-3">Thông tin cá nhân</h4>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="fullName">Họ và tên</Form.Label>
            <Form.Control
              type="text"
              id="fullName"
              value={studentState.fullName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Họ và tên không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="studyClass">Lớp học</Form.Label>
            <Form.Control
              type="text"
              id="studyClass"
              value={studentState.studyClass}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Lớp không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="username">Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={studentState.username}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Tên đăng nhập không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="password">Mật khẩu</Form.Label>
            <Form.Control
              type="text"
              id="password"
              value={studentState.password}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Mật khẩu không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="email">
              Địa chỉ <span className="text-muted">(Tùy chọn)</span>
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={studentState.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="phone">
              Điện thoại <span className="text-muted">(Tùy chọn)</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="phone"
              value={studentState.phone}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập số điện thoại đúng định dạng.
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" variant="success">
              Lưu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

StudentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default StudentModal;
