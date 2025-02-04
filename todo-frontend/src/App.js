import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "react-bootstrap";

import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Signup from './components/signup';

import TodoDataService from './services/todos';

function App() {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const [error, setError] = React.useState("");

    async function login(user = null) {
        TodoDataService.login(user)
            .then(response => {
                setToken(response.data.token);
                setUser(user.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', user.username);
                setError("");
            })
            .catch(e => {
                console.log(e);
                setError("Invalid username or password");
            });
    }

    async function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    async function signup(user = null) {
        TodoDataService.signup(user)
            .then(response => {
                setToken(response.data.token);
                setUser(user.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', user.username);
                setError("");
            })
            .catch(e => {
                console.log(e);
                setError("Invalid username or password");
            });
    }

    return (
        <div className="App">
            <Navbar bg="primary" variant="dark">
                <div className="container-fluid">
                    <Navbar.Brand>ToDos App</Navbar.Brand>
                    <Nav className="mr-auto">
                        {user ? (
                            <>
                                <Link className="nav-link" to="/todos">Todos</Link>
                                <Link className="nav-link" onClick={logout}>Logout({user})</Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link" to="/login">Login</Link>
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </>
                        )}
                    </Nav>
                </div>
            </Navbar>

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Login login={login} />} />
                    <Route path="/todos" element={<TodosList token={token} />} />
                    <Route path="/todos/create" element={<AddTodo />} />
                    <Route path="/todos/:id" element={<AddTodo />} />
                    <Route path="/login" element={<Login login={login} />} />
                    <Route path="/signup" element={<Signup signup={signup} />} />
                </Routes>
            </div>

            <footer className="text-center text-lg-start bg-light text-muted mt-4">
                <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                    © 2025 Todos App:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/"> MDBootstrap.com</a>
                </div>
            </footer>
        </div>
    );
}

export default App;