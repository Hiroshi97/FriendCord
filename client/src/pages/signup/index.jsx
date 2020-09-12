import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./signup.scss";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signupRequest,
  signupSuccess,
  signupFailure,
} from "../../actions/registration.action";
import { triggerAlert } from "../../utils/trigger-alert";

export default function Signup() {
  const isLoggedIn = useSelector((state) => state.authState.result);
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  let name,
    username,
    email,
    password,
    password2 = useRef(null);
  if (isLoggedIn) return <Redirect to="/chat" />;

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.id;
    setInfo({
      ...info,
      [key]: e.target.value,
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const userInfo = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };

    {
      dispatch(signupRequest());
      axios
        .post("/auth/signup", {
          ...userInfo,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setTimeout(() => {
            dispatch(signupSuccess());
            axios.get("user/friends", { _id: userInfo.auth_id }).then((res) => {
              localStorage.setItem("friends", JSON.stringify(res.data.friendships));
            });
            triggerAlert(
              "success",
              "SIGN UP SUCCESS",
              "You have successfully signed up!"
            );
          }, 2000);
          history.push('/chat');
        })
        .catch((error) => {
          dispatch(signupFailure());
          if (error.response) setErrors(error.response.data.errors);
        });
    }
  };
  return (
    <Container fluid={true} tag="div" className="signup-page">
      <Container className="signup-content">
        <Row className="mt-5">
          <Col md="6" className="signup-image px-0"></Col>
          <Col md="6" className="signup-form">
            <h1 className="text-center">SIGN UP</h1>
            <Form onSubmit={handleSubmission}>
              <Form.Group>
                <label htmlFor="name">Full name</label>
                <Form.Control
                  id="name"
                  placeholder="Full name"
                  ref={(ref) => {
                    name = ref;
                  }}
                  isInvalid={(errors[0] && !info.name) || errors[6]}
                  onChange={handleChange}
                />
                <small id="usernameError" className="form-text text-danger">
                  {errors.length > 0 &&
                    ((errors[0] && !info.name ? errors[0] : null) || errors[6])}
                </small>
              </Form.Group>
              <Form.Group>
                <label htmlFor="username">Username</label>
                <Form.Control
                  id="username"
                  placeholder="Username"
                  ref={(ref) => {
                    username = ref;
                  }}
                  isInvalid={(errors[0] && !info.username) || errors[5]}
                  onChange={handleChange}
                />
                <small id="usernameError" className="form-text text-danger">
                  {errors.length > 0 &&
                    ((errors[0] && !info.username ? errors[0] : null) ||
                      errors[5])}
                </small>
              </Form.Group>
              <Form.Group>
                <label htmlFor="email">Email</label>
                <Form.Control
                  id="email"
                  placeholder="Email"
                  ref={(ref) => {
                    email = ref;
                  }}
                  onChange={handleChange}
                  isInvalid={
                    (errors[0] && !info.email) || errors[1] || errors[4]
                  }
                />
                <small id="emailError" className="form-text text-danger">
                  {errors.length > 0 &&
                    ((errors[0] && !info.email ? errors[0] : null) ||
                      errors[4] ||
                      errors[1])}
                </small>
              </Form.Group>

              <Form.Group>
                <label htmlFor="password">Password</label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Password"
                  ref={(ref) => {
                    password = ref;
                  }}
                  isInvalid={(errors[0] && !info.password) || errors[2]}
                  onChange={handleChange}
                />
                <small id="passwordError" className="form-text text-danger">
                  {errors.length > 0 &&
                    ((errors[0] && !info.password ? errors[0] : null) ||
                      errors[2])}
                </small>
              </Form.Group>
              <Form.Group>
                <label htmlFor="password2">Confirm password</label>
                <Form.Control
                  type="password"
                  id="password2"
                  placeholder="Confirm password"
                  ref={(ref) => {
                    password2 = ref;
                  }}
                  isInvalid={(errors[0] && !info.password2) || errors[3]}
                  onChange={handleChange}
                />
                <small id="cfmpasswordError" className="form-text text-danger">
                  {errors.length > 0 &&
                    ((errors[0] && !info.password2 ? errors[0] : null) ||
                      errors[3])}
                </small>
              </Form.Group>
              <Button className="d-block mx-auto" type="submit">
                Register
              </Button>
            </Form>
            <p className="text-center">
              Already had an account?{" "}
              <Link className="d-inline-block mx-auto mt-3" to="/login">
                Log in
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
