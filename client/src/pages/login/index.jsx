import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { Link, useHistory, Redirect } from "react-router-dom";
import { login } from "../../actions/auth.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const isLoggedIn = useSelector((state) => state.authState.result);
  const isLoading = useSelector((state) => state.authState.loading);
  const dispatch = useDispatch();
  if (isLoggedIn) return <Redirect to="/chat" />;

  const handleSubmission = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    dispatch(login(username, password));
  };

  const renderForm = () => {
    return (
      <>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control type="text" id="username" placeholder="Username" />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="password" id="password" placeholder="Password" />
        </Form.Group>
        {isLoading ? (
          <div className="spinner-border text-primary d-block m-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Button className="d-block mx-auto" type="submit">
            Login
          </Button>
        )}
        <p className="text-center">
          Do not have an account yet?{" "}
          <Link className="d-inline-block mx-auto mt-3" to="/signup">
            Register
          </Link>
        </p>
      </>
    );
  };

  return (
    <Container fluid={true} tag="div" className="login-page">
      <Container className="login-content">
        <Row className="mt-5">
          <Col md="6" className="login-image px-0"></Col>
          <Col md="6" className="login-form pt-auto">
            <h1 className="text-center">LOGIN</h1>
            <Form onSubmit={handleSubmission} className="position-relative">
              {renderForm()}
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
