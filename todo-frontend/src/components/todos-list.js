import React,{useState, useEffect} from 'react';
import TodoDataService from '../services/todos';
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';


const TodosList = props => {
    const[todos, setTodos] = useState([]);

    useEffect(() => {
        retrieveTodos();
    }, [props.token]);

    const retrieveTodos = () => {
        TodoDataService.getAll(props.token)
            .then(response=> {
                setTodos(response.data);

            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteTodo = (id) => {
        TodoDataService.deleteTodo(id, props.token)
            .then(response => {
                console.log(response.data);
                retrieveTodos();
            })
            .catch(e => {
                console.log(e);
            })
    }

    const completeTodo = (id) => {
        TodoDataService.completeTodo(id, props.token)
            .then(response => {
                console.log(response.data);
                retrieveTodos();
            })
            .catch(e => {
                console.log(e);
            })
    }

    return(
        <Container>
            { props.token === null || props.token ==="" ? (
                <Alert variant="warning">
                    You must be logged in to view this page.
                </Alert>
            ) : (
                <div>
                    <Link to={"/todos/create"}>
                        <Button variant={"outline-info"} className="mb-3">Add Todo</Button>
                    </Link>
            {todos.map((todo) => {
                return(
                    <Card key={todo.id} className="mb-3">
                        <Card.Body>
                            <div className={`${todo.completed ? "text-decoration-line-through" : ""}`}>
                                <Card.Title>{todo.title}</Card.Title>
                                <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
                                <Card.Text>Date Created: { moment (todo.created).format("DD MMMM YYYY")} </Card.Text>
                            </div>

                            {!todo.completed &&
                            <Link
                                to={"/todos/" + todo.id}
                                state={{currentTodo: todo}}
                            >
                                <Button variant="outline-info" className="me-2">Edit</Button>
                            </Link>
                            }
                            <Button variant="outline-danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                            <b>&nbsp;</b>
                            <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>Complete</Button>
                        </Card.Body>
                    </Card>
                )
            })}
                </div>
            )}
        </Container>
    );
}



export default TodosList;