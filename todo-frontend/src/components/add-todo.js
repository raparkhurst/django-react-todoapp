import React, { useState, useEffect } from 'react';
import TodoDataService from '../services/todos';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";


const AddTodo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [memo, setMemo] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [editing, setEditing] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState(null);

    useEffect(() => {
        if (location.state && location.state.currentTodo) {
            setEditing(true);
            setTitle(location.state.currentTodo.title);
            setMemo(location.state.currentTodo.memo);
            setCurrentTodoId(location.state.currentTodo.id);
        }
    }, [location.state]);

    const onChangeTitle = e => {
        const title = e.target.value;
        setTitle(title);
    }

    const onChangeMemo = e => {
        const memo = e.target.value;
        setMemo(memo);
    }

    const saveTodo = () => {
        let data = {
            title: title,
            memo: memo,
            completed: false
        };

        if (editing) {
            TodoDataService.updateTodo(currentTodoId, data, token)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    setError("An error occurred while updating the todo.");
                });
        } else {
            TodoDataService.createTodo(data, token)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    setError("An error occurred while creating the todo.");
                });
        }
    }

    return (
        <Container>
            <Alert variant="info">
                location state: {JSON.stringify(location)}
            </Alert>
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <Link to="/todos" className="btn btn-primary">
                        Back to Todos
                    </Link>
                </div>
            ) : (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{editing ? "Edit" : "Create"} Todo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={memo}
                            placeholder="Enter memo"
                            onChange={onChangeMemo}
                        />
                    </Form.Group>

                    <Button variant="info" onClick={saveTodo}>
                        {editing ? "Edit" : "Add"} Todo
                    </Button>
                </Form>
            )}
        </Container>
    );
}

export default AddTodo;