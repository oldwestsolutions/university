'use client';

import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaGraduationCap, FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      router.replace('/university');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // University-specific credentials
    if (email === 'student@university.edu' && password === 'student123') {
      localStorage.setItem('userSession', 'student');
      router.replace('/university');
    } else if (email === 'professor@university.edu' && password === 'professor123') {
      localStorage.setItem('userSession', 'professor');
      router.replace('/university');
    } else if (email === 'admin@university.edu' && password === 'admin123') {
      localStorage.setItem('userSession', 'admin');
      router.replace('/university');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <div className="login-bubble">
                <div className="bubble-content">
                  <div className="text-center mb-4">
                    <FaGraduationCap size={48} className="mb-3 text-primary" />
                    <h2>University Portal</h2>
                    <p className="text-muted">Sign in to access your university dashboard</p>
                  </div>

                  {error && (
                    <Alert variant="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FaUser className="me-2" /> University Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your university email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FaLock className="me-2" /> Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        id="remember-me"
                        label="Remember me"
                      />
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100"
                    >
                      Sign In
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <p className="mb-2">Need help?</p>
                    <Button variant="link" className="text-decoration-none">
                      Forgot Password?
                    </Button>
                    <span className="mx-2">|</span>
                    <Button variant="link" className="text-decoration-none">
                      Contact IT Support
                    </Button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-muted small">
                      Test Credentials:<br />
                      Student: student@university.edu / student123<br />
                      Professor: professor@university.edu / professor123<br />
                      Admin: admin@university.edu / admin123
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
} 