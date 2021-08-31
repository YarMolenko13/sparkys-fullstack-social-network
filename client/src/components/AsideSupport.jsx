import React, {useContext, useState} from 'react';
import {Button, Col, FormControl, ListGroup, Form, Accordion} from "react-bootstrap";
import {NavLink, useHistory} from 'react-router-dom'
import {FEED_URL, MY_PROFILE_URL} from "../utils/consts";
import {createPostNoPhoto} from "../http/postAPI";
import {Context} from "../index";

const AsideSupport = () => {
    const [content, setContent] = useState('')
    const {user} = useContext(Context)

    const history = useHistory()

    const submitHandler = async (e) => {
        e.preventDefault()

        const res = await createPostNoPhoto(user.user.id, {
            heading: '',
            content: content.trim()
        })
        console.log(res)
        if (res.status === 500) {
            alert('Ошибка создания поста')
        }
        if (res.status === 200 || res.status === 201) {
            history.push(MY_PROFILE_URL)
        }
    }

    return (
        <Col md={3} className="aside-support d-none d-md-block" >
            <Col md={12} style={{position: 'sticky', top: '45px'}}>
                <ListGroup className="pt-4 aside__group" >
                    <Accordion flush className="aside-support__accordion" defaultActiveKey="0">
                        <Accordion.Item  className="rounded-3 " eventKey="0">
                            <Accordion.Header className="h5">Новый пост</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={submitHandler}>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Что у вас нового ?"
                                        value={content}
                                        onInput={(e) => setContent(e.target.value)}
                                    />
                                    <Button className="ms-auto d-block mt-2" variant="info" type="submit">Создать</Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    {/*<FormControl*/}
                    {/*    className="text-info btn-info info aside-support__input mt-1 mb-2"*/}
                    {/*    placeholder="Что у вас нового ..."*/}
                    {/*/>*/}
                    {/*<div className="d-flex flex-column">*/}
                    {/*    <Form.Control placeholder="Файл" className="aside-support__file-input mb-3" type="file" />*/}
                    {/*    <Button className="w-50 ms-auto text-secondary" variant="primary">Создать</Button>*/}
                    {/*</div>*/}
                </ListGroup>
            </Col>
        </Col>
    );
};

export default AsideSupport;