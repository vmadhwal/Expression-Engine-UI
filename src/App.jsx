import  { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function App() {
  const [connectorType, setConnectorType] = useState('AND');
  const [expressions, setExpressions] = useState([]);
  const [newExpression, setNewExpression] = useState({
    ruleType: 'Age',
    operator: '>=',
    value: '',
    score: ''
  });
  const [jsonData, setJsonData] = useState(null);

  const handleChangeConnector = (selectedConnector) => {
    setConnectorType(selectedConnector);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  const handleChangeExpression = (e, field) => {
    setNewExpression({
      ...newExpression,
      [field]: e.target.value
    });
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ...newExpression }]);
    setNewExpression({
      ruleType: 'Age',
      operator: '>=',
      value: '',
      score: ''
    });
  };

  const handleSubmit = () => {
    const output = generateOutput();
    setJsonData(JSON.stringify(output, null, 2));
  };

  const generateOutput = () => {
    const rules = expressions.map(expression => ({
      key: expression.ruleType.toLowerCase().replace(/ /g, '_'),
      output: {
        value: Number(expression.value),
        operator: expression.operator,
        score: Number(expression.score)
      }
    }));

    return {
      rules: rules,
      combinator: connectorType.toLowerCase()
    };
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-4">
      <div>
        <h1 className="text-center mb-4">Expression List</h1>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column xs="4" sm="2">Connector Type:</Form.Label>
            <Col xs="8" sm="4">
              <Form.Control as="select" value={connectorType} onChange={(e) => setConnectorType(e.target.value)}>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </Form.Control>
            </Col>
           
          
          </Form.Group>
        </Form>
        <Form className="mb-4">
          <h3>Add Expression</h3>
          <Row className="mb-3">
            <Col xs="6" sm="2">
              <Form.Label>Rule Type:</Form.Label>
              <Form.Control as="select" value={newExpression.ruleType} onChange={(e) => handleChangeExpression(e, 'ruleType')}>
                <option value="Age">Age</option>
                <option value="Credit Score">Credit Score</option>
                <option value="Account Balance">Account Balance</option>
              </Form.Control>
            </Col>
            <Col xs="6" sm="2">
              <Form.Label>Operator:</Form.Label>
              <Form.Control as="select" value={newExpression.operator} onChange={(e) => handleChangeExpression(e, 'operator')}>
                <option value=">">{">"}</option>
                <option value="<">{"<"}</option>
                <option value="≥">{"≥"}</option>
                <option value="≤">{"≤"}</option>
                <option value="=">{"="}</option>
              </Form.Control>
            </Col>
            <Col xs="6" sm="2">
              <Form.Label>Value:</Form.Label>
              <Form.Control type="text" value={newExpression.value} onChange={(e) => handleChangeExpression(e, 'value')} />
            </Col>
            <Col xs="6" sm="2">
              <Form.Label>Score:</Form.Label>
              <Form.Control type="text" value={newExpression.score} onChange={(e) => handleChangeExpression(e, 'score')} />
            </Col>
            <Col xs="12" className="mt-3">
              <Button block variant="primary" onClick={handleAddExpression}>Add Expression</Button><span>&nbsp;</span>
              <Button block variant="success" onClick={handleSubmit}>Submit</Button>
            </Col>
           
          </Row>
        </Form>

        <h2 className="text-center mb-3">Added Expressions</h2>
        {expressions.map((expression, index) => (
          <div key={index} className="mb-3">
            <Form className="mb-4">
              <Row className="mb-4">
                <Col xs="6" sm="2">
                  <Form.Label>Rule Type:</Form.Label>
                  <Form.Control type="text" value={expression.ruleType} readOnly />
                </Col>
                <Col xs="6" sm="2">
                  <Form.Label>Operator:</Form.Label>
                  <Form.Control type="text" value={expression.operator} readOnly />
                </Col>
                <Col xs="6" sm="2">
                  <Form.Label>Value:</Form.Label>
                  <Form.Control type="text" value={expression.value} readOnly />
                </Col>
                <Col xs="6" sm="2">
                  <Form.Label>Score:</Form.Label>
                  <Form.Control type="text" value={expression.score} readOnly />
                </Col>
                
                <Col xs="12" className="mt-3">
                <Button  variant='danger' onClick={() => handleDeleteExpression(index)}>Delete</Button>
              </Col>
                
              </Row>
            </Form>
          </div>
        ))}
        {jsonData && (
          <div className="mt-4">
            <h2 className="text-center">Output JSON</h2>
            <pre>{jsonData}</pre>
          </div>
        )}
      </div>
    </Container>
  );
}