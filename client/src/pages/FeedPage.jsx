import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Row, Spinner} from "react-bootstrap";
import Aside from "../components/Aside";
import Posts from "../components/Posts";
import AsideSupport from "../components/AsideSupport";
import {Context} from './../index'
import {getAllPosts, getPostsForUser} from "../http/postAPI";
import {observer} from "mobx-react-lite";


const FeedPage = observer(() => {
    const {posts, user} = useContext(Context)
    const [isLoaded, setIsLoaded] = useState(false)
    const [validMessages, setValidMessages] = useState([])

    const getAndSetPosts = async () => {
        let response = user.isAuth ? await getPostsForUser(user.user.id) : await getAllPosts()
        if (response.status === 500) {
            setValidMessages(['Ошибка получения постов'])
            return false
        }
        posts.setPosts(response.data)
        setIsLoaded(true)
    }

    useEffect(() => {
        getAndSetPosts()
    }, [])

    return (
        <Container>
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
            <Row className="d-flex justify-content-between position-relative mb-5 mb-sm-0">
                <Aside />
                { isLoaded ?
                    <Posts posts={posts.posts} />
                    :
                    <Col className="d-flex justify-content-center align-items-center">
                        <Spinner style={{width: '50px', height: '50px'}} variant="info" animation="border" />
                    </Col>
                }
                <AsideSupport />
            </Row>
        </Container>
    );
});

export default FeedPage;