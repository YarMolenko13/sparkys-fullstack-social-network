import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Col, Spinner} from "react-bootstrap";
import User from "./User";
import {getAllUsers, getUsersFriends} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const MyFriends = observer(() => {
    const {user} = useContext(Context)
    const [isLoaded, setIsLoaded] = useState(true)

    const getAndSetFriends = () => {
        setIsLoaded(false)
        getUsersFriends(user.user.id).then(res => user.setUsersFriends(res.data)).finally(() => setIsLoaded(true))
    }

    useEffect(() => {
        getAndSetFriends()
    }, [])

    return (
        <div>
            { isLoaded ?
                <div>
                    { !user.usersFriends.length ?
                        <h3 style={{opacity: '.6'}} className="d-flex justify-content-center ms-auto pt-3">У вас нет друзей</h3>
                        :
                        <div>
                            { user.usersFriends.map(userItem =>
                                <User key={userItem.id} userData={userItem} isFriend={true} />
                            )}
                        </div>
                    }
                </div>
                :
                <Col className="d-flex mt-5 justify-content-center align-items-center">
                    <Spinner style={{width: '50px', height: '50px'}} variant="info" animation="border" />
                </Col>
            }
        </div>
    );
});

export default MyFriends;