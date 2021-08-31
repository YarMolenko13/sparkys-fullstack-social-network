import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Alert, Button, Col, Spinner} from "react-bootstrap";
import User from "./User";
import {getAllUsers, login, sendFriendRequest} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {FEED_URL, UNCONFIRMED_EMAIL_URL} from "../utils/consts";
import {useHistory} from "react-router-dom";

const AllUsers = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(true)
    const [validMessages, setValidMessages] = useState([])

    const getAndSetAllUsers = () => {
        setIsLoaded(false)
        getAllUsers().then(data => user.setAllUsers(data)).finally(() => setIsLoaded(true))
    }

    const responseHandler = (response) => {
        let status = response.status
        let message = response.data.message
        if (status === 409) {
            setValidMessages(['Ошибка. Возомжно вы уже друзья или уже отправили пользователю запрос'])
        }
    }

    const sendRequest = async (userF, userS) => {
        setIsLoaded(false)
        const response = await sendFriendRequest(userF, userS).finally(() => setIsLoaded(true))
        responseHandler(response)
    }

    useEffect(() => {
        if (!user.allUsers.length) {
            getAndSetAllUsers()
        }
    }, [])

    return (
        <div>
            { isLoaded ?
                <div>
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
                    { user.allUsers.map(userItem =>
                        <div key={userItem.id}>
                            { userItem.id !== user.user.id ?
                                <User userData={userItem} sendFriendRequest={sendRequest} />
                                :
                                ''
                            }
                        </div>
                    )}
                </div>
                :
                <Col className="d-flex mt-5 justify-content-center align-items-center">
                    <Spinner style={{width: '50px', height: '50px'}} variant="info" animation="border" />
                </Col>
            }
        </div>
    );
});

export default AllUsers;