import React, { useState } from 'react';
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './css/CodeEditor.css'; 

const CodeEditor = () => {
  const [language, setLanguage] = useState('Choose...');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRun = () => {
    // Implement run logic
    console.log('Running code');
  };

  const handleShare = () => {
    // Implement share logic
    console.log('Sharing code');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="landingpage">
        <div className="image">
          <h1>Welcome to KBS ONLINE CODE EDITOR</h1>
          <h2>Let's Code</h2>
        </div>
      </div>

      <Container fluid className="maincode">
        <Row>
          <Col>
            <div className="controls">
              <Form.Select 
                value={language} 
                onChange={handleLanguageChange}
              >
                <option>Choose...</option>
                <option value="HTML">HTML</option>
                <option value="Java">Java</option>
                <option value="Cpp">C++</option>
                <option value="Python">Python</option>
              </Form.Select>

              <div className="buttons">
                <Button 
                  variant="success" 
                  onClick={handleRun}
                >
                  Run
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleShare}
                >
                  Share
                </Button>
                <Button variant="info">
                  [::]
                </Button>
                <Button 
                  variant={isDarkMode ? 'dark' : 'light'}
                  onClick={toggleTheme}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </Button>
              </div>
            </div>

            <Form.Control
              as="textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="textarea-editor"
            />

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Input</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="textarea-input"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Output</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={output}
                    readOnly
                    className="textarea-output"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CodeEditor;