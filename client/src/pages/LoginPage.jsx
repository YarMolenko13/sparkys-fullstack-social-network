import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import img from "../assets/images/login1.svg";
import {NavLink, useHistory} from "react-router-dom";
import {FEED_URL, LOGIN_URL, REGISTER_URL, UNCONFIRMED_EMAIL_URL} from "../utils/consts";
import {login, register} from "../http/userAPI";
import {Context} from "../index";

const isFormValid = (target) => {
    for (let i = 0; i < target.length; i++) {
        if (target[i].tagName === 'INPUT' && target[i].value.length === 0) {
            return false
        }
    }
    return true
}

const LoginPage = () => {
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [validMessages, setValidMessages] = useState([])

    const history = useHistory()


    const responseHandler = (respone) => {
        let status = respone.status
        let message = respone.data.message
        if (status === 200 || status === 201) {
            localStorage.setItem('token', respone.data.token)
            user.setUser(respone.data.user)
            user.setIsAuth(true)
            history.push(FEED_URL)
            history.go(0)
        }
        if (status === 401) {
            setValidMessages([message])
        }
        if (status === 403) {
            history.push(UNCONFIRMED_EMAIL_URL)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (isFormValid(event.target)) {
            setIsLoading(true)
            const response = await login({email, password}).finally(() => setIsLoading(false))
            responseHandler(response)
        }
        return false
    };

    return (
        <Container style={{height: '100vh', marginTop: '-70px'}} className="d-flex align-items-center">
            { isLoading &&
            <Col className="d-flex justify-content-center align-items-center spinner">
                <Spinner style={{width: '50px', height: '50px'}} variant="info" animation="border" />
            </Col>
            }
            { validMessages &&
                <div className="valid-messages-wrapper">
                    { validMessages.map(msg =>
                        <Alert className="d-flex justify-content-between align-items-center py-1 px-2" key={msg}>
                            {msg} <Button
                            style={{whiteSpace: 'nowrap'}}
                            className="ms-3" variant="danger"
                            onClick={() => setValidMessages([])}
                        >Закрыть все</Button>
                        </Alert>
                    )}
                </div>
            }
            <Row className="w-100 justify-content-between  align-items-center auth__row">
                <Col className="auth__col-form" sm={12} md={6} lg={5}>
                    <Col xs={12} md={11}>
                        <Form className="text-center" noValidate onSubmit={handleSubmit}>
                            <h4 className="mb-1">Логин</h4>
                            <Form.Text className="mb-4 d-block">Нет аккаунта ? <NavLink to={REGISTER_URL}>Зарегистрируйтесь</NavLink></Form.Text>
                            <Form.Group className="mb-3 mt-1">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    placeholder="Ваш email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-1">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    placeholder="Ваше пароль"
                                />
                            </Form.Group>
                            <Button type={"submit"} className="d-block mx-auto mt-4" variant="info">Авторизироваться</Button>
                        </Form>
                    </Col>
                </Col>
                <Col className="auth__col-image" xs={7} sm={7} md={6}>
                    <img className="auth__image" src={img} alt=""/>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;