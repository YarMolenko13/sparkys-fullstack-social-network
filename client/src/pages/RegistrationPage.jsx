import React, {useContext, useRef, useState} from 'react';
import {Alert, Button, Col, Container, Form, InputGroup, Row, Spinner} from "react-bootstrap";
// import ReactCSSTransitionGroup from 'react-transition-group';
import ReactCSSTransitionGroup from 'react-transition-group'
import '../assets/styles/animations.scss'
import img from '../assets/images/registration1.svg'
import {NavLink, useHistory} from "react-router-dom";
import {FEED_URL, LOGIN_URL, UNCONFIRMED_EMAIL_URL} from "../utils/consts";
import {register, registerNoAvatar} from "../http/userAPI";
import {Context} from "../index";


const isFormValid = (target) => {
    for (let i = 0; i < target.length; i++) {
        if (target[i].tagName === 'INPUT' && target[i].classList.contains('is-invalid')) {
            return false
        }
    }
    return true
}

const RegistrationPage = () => {
    const {user} = useContext(Context)

    const avatar = useRef(null)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')

    const [validMessages, setValidMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const form = new FormData()

    const responseHandler = (respone) => {
        const status = respone.status
        const message = respone.data.message
        if (status === 200 || status === 201) {

            history.push(LOGIN_URL)
        }
        if (status === 401) {
            setValidMessages([message])
        }
        if (status === 422) {
            console.log(respone)
            setValidMessages(respone.data.message)
        }
        if (status === 500) {
            setValidMessages(['Ошибка регистрации. Попробуйте позже'])
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = isFormValid(event.target)
        if (!isValid) {
            return false
        }
        setIsLoading(true)

        form.append('email', email)
        form.append('password', password)
        form.append('name', name)
        form.append('surname', surname)

        let response
        if (avatar.current.files[0] === undefined) {
            response = await registerNoAvatar(form).finally(() => setIsLoading(false))
        } else {
            form.append('image', avatar.current.files[0])
            response = await register(form).finally(() => setIsLoading(false))
        }

        responseHandler(response)
    };

    return (
        <Container style={{height: '100vh', marginTop: '-70px'}} className="d-flex align-items-center">
            { isLoading &&
                <Col className="d-flex justify-content-center align-items-center spinner">
                    <Spinner style={{width: '50px', height: '50px'}} variant="info" animation="border" />
                </Col>
            }
            { validMessages.length === 0 ?
                ''
                :
                <div className="valid-messages-wrapper">
                    { validMessages.map(msg =>
                        <Alert className="d-flex justify-content-between align-items-center py-1 px-2" key={msg}>
                            {msg} <Button
                            style={{whiteSpace: 'nowrap'}}
                            className="ms-1 button" variant="danger"
                            onClick={() => setValidMessages([])}
                        >Закрыть все</Button>
                        </Alert>
                    )}
                </div>
            }
            <Row className="w-100 justify-content-between  align-items-center auth__row auth__row_reg">
                <Col className="auth__col-image auth__col-image_reg" xs={7} sm={7} md={6}>
                    <img className="auth__image" src={img} alt=""/>
                </Col>
                <Col md={5}>
                    <Col md={11}>
                        <Form className="text-center" noValidate onSubmit={handleSubmit}>
                            <h4 className="mb-1">Регистрация</h4>
                            <Form.Text className="mb-4 d-block">Уже зарегистрированы ? <NavLink to={LOGIN_URL}>Войдите</NavLink></Form.Text>
                            <Form.Group className="mb-3 mt-1">
                                <Form.Control placeholder="Фото профиля" type="file"
                                ref={avatar}/>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-1" controlId="validationCustom01">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    isInvalid={email.length === 0 ? true : false}
                                    required
                                    type="email"
                                    placeholder="Ваш email"
                                />
                                {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                            </Form.Group>
                            <Form.Group className="mb-3 mt-1" controlId="validationCustom02">
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    isInvalid={name.length === 0 ? true : false}
                                    required
                                    type="text"
                                    placeholder="Ваше имя"
                                />
                                {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Control
                                    onChange={(e) => setSurname(e.target.value)}
                                    value={surname}
                                    isInvalid={surname.length === 0 ? true : false}
                                    required
                                    type="text"
                                    placeholder="Ваша фамилия"
                                />
                            </Form.Group>
                            <Form.Group className="">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    isInvalid={password.length< 6 || password.length === 0 ? true : false}
                                    type="password"
                                    placeholder="И пароль"
                                />
                            </Form.Group>
                            <Form.Text className="d-block text-start mb-3">От 6 до 30 символов</Form.Text>
                            <Button className="d-block mx-auto mt-4" variant="info" type="submit">Зарегистрироваться</Button>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationPage;