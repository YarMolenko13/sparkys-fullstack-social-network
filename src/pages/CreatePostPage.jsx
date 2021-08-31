import React, {useContext, useRef, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Navbar, Row, Spinner} from "react-bootstrap";
import Aside from "../components/Aside";
import Friends from "../components/Friends";
import AsideSupport from "../components/AsideSupport";
import AllUsers from "../components/AllUsers";
import {createPost, createPostNoPhoto} from "../http/postAPI";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {LOGIN_URL, MY_PROFILE_URL} from "../utils/consts";

const CreatePostPage = () => {
    const {user} = useContext(Context)

    const [heading, setHeading] = useState('')
    const [content, setContent] = useState('')
    const photo = useRef(null)

    const [validMessages, setValidMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const responseHandler = (respone) => {
        const status = respone.status
        const message = respone.data.message

        if (status === 200 || status === 201) {
            history.push(MY_PROFILE_URL)
        }
        if (status === 500) {
            setValidMessages(['Ошибка регистрации. Попробуйте позже'])
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (photo.current.files[0] === undefined && content.trim().length === 0 && heading.trim().length === 0 ) {
            setValidMessages(['Заполните хотя бы одно поле'])
            setIsLoading(false)
            return false
        }
        let response
        if (photo.current.files[0] === undefined) {
            response = await createPostNoPhoto(user.user.id, {heading, content}).finally(() => setIsLoading(false))
        } else {
            const form = new FormData()

            form.append('image', photo.current.files[0])
            form.append('content', content)
            form.append('heading', heading)

            response = await createPost(user.user.id, form).finally(() => setIsLoading(false))
        }
        setIsLoading(false)
        responseHandler(response)
    }

    return (
        <Container>
            { isLoading &&
                <Col style={{zIndex: 100}} className="d-flex justify-content-center align-items-center spinner">
                    <Spinner style={{width: '50px', height: '50px', zIndex: 1243, position: 'fixed'}} variant="info" animation="border" />
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
            <Row className="d-flex justify-content-between position-relative ">
                <Aside />
                <Col xs={12} sm={9} md={9} lg={7} className="p-0 mt-0 mt-sm-2 mt-sm-4 px-0 px-sm-2">
                    <Card className="post-create">
                        <Card.Header className="fw-bolder fs-5 text-gray">
                            <p className="mb-0">Cоздать новый пост</p>
                            <p className="fw-normal fs-6 mb-1">для того чтобы создать пост, заполните хотя бы одно поле</p>
                        </Card.Header>
                        <Form className="p-3 d-flex flex-column" onSubmit={submitHandler}>
                            <Form.Label>Заголовок поста</Form.Label>
                            <Form.Control
                                className="mb-2"
                                placeholder="заголовок ..."
                                value={heading}
                                onInput={(e) => setHeading(e.target.value)}
                            />
                            <Form.Label>Содержание поста</Form.Label>
                            <Form.Control
                                className="mb-2 post-create__textarea"
                                placeholder="содержание ..."
                                value={content}
                                onInput={(e) => setContent(e.target.value)}
                                as="textarea"
                                // style={{ height: '100px' }}
                            />
                            <Form.Label>Фото</Form.Label>
                            <Form.Control ref={photo} className="mb-3" type="file"></Form.Control>
                            <Button type="submit" className="mx-auto mb-3" variant="info">Создать</Button>
                        </Form>
                    </Card>
                </Col>
                {/*<AsideSupport />*/}
                <Col md={1} lg={3}></Col>
            </Row>
        </Container>
    );
};

export default CreatePostPage;
