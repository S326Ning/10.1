import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap'

function NewTaskForm() {
    const [Task, setTask] = useState({
        taskType: '',
        taskTitle: '',
        taskDesc: '',
        Suburb: '',
        Date: '',
        budgetType: '',
        budgetMoney: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setTask ((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const handleDate = (e) => {
        const value = e.target.value
        Task.Date = value
    }

    const handleSuburb = (e) => {
        const value = e.target.value
        Task.Suburb = value
    }


    const RenderSettingTask = () => {
        if (Task.taskType === "online") {
            return (
                <Form.Group as={Row} className="mb-3 my-items">
                    <Col sm={12}><h5>Setting up your task</h5></Col>
                    <Form.Label column sm={3}>
                        Date
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text" placeholder="Enter a date" name="Date" onChange={handleDate} />
                    </Col>
                    <Col sm={2}></Col>
                </Form.Group>
            );
          } else {
            return (
                <Form.Group as={Row} className="mb-3 my-items">
                    <Col sm={12}><h5>Setting up your task</h5></Col>
                    <Form.Label column sm={3}>
                        Suburb
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text" placeholder="Enter a suburb" name="Suburb" onChange={handleSuburb}  />
                    </Col>
                    <Col sm={2}></Col>
                    <Form.Label column sm={3}>
                        Date
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text" placeholder="Enter a date" name="Date" onChange={handleDate} />
                    </Col>
                    <Col sm={2}></Col>
                </Form.Group>
            );
          }
    }

    const handlePostTask = (e) => {
        fetch('http://localhost:8080/posttask', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Task)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log("Error: " + err)
        })
    }

    return (
    <div>
      <Container as={Row}>
        <Col sm={3}></Col>
        <Col sm={9}>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={12}><h3>New Task</h3></Col>
                    <Form.Label as="legend" column sm={3}>
                        Select Task Type
                    </Form.Label>
                    <Col className="radios" sm={8}>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="In person"
                                name="taskType"
                                type="radio"
                                value="person"
                                onChange={handleChange}
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                inline
                                label="Online"
                                name="taskType"
                                type="radio"
                                value="online"
                                onChange={handleChange}
                                id={`inline-radio-2`}
                            />
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 my-items">
                    <Col sm={12}><h5>Describe your task to Experts</h5></Col>
                    <Form.Label column sm={3}>
                        Task Title
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text" placeholder="Enter task title" name="taskTitle" onChange={handleChange} />
                    </Col>
                    <Col sm={2}></Col>
                    <Form.Label column sm={3}>
                        Description
                    </Form.Label>
                    <Col sm={7}>
                        <FloatingLabel controlId="floatingTextarea2" label="Enter task description">
                            <Form.Control
                            as="textarea"
                            placeholder="Enter task description"
                            style={{ height: '100px' }}
                            name="taskDesc" onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col sm={2}></Col>
                </Form.Group>
                <RenderSettingTask />
                <Form.Group as={Row} className="mb-3 my-items">
                    <Col sm={12}><h5>Suggest how much</h5></Col>
                    <Form.Label column sm={3}>
                        What is your budget?
                    </Form.Label>
                    <Col className="radios" sm={4}>
                        <div key={`inline-radio`} className="mb-3 radios">
                            <Form.Check
                                inline
                                label="Total"
                                name="budgetType"
                                type="radio"
                                value="Total"
                                onChange={handleChange}
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                inline
                                label="Hourly rate"
                                name="budgetType"
                                type="radio"
                                value="Hourly Rate"
                                onChange={handleChange}
                                id={`inline-radio-2`}
                            />
                        </div>
                    </Col>
                    <Col sm={3}>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>$</InputGroup.Text>
                        <FormControl id="inlineFormInputGroup" name="budgetMoney" onChange={handleChange} />
                    </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={10}>
                        <Button variant="primary" className="float-right" onClick={handlePostTask}>
                            Post a task
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Col>
      </Container>
    </div>
  );
}

export default NewTaskForm;
