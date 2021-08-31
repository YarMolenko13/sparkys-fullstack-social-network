import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Col, Spinner} from "react-bootstrap";
import User from "./User";
import {confirmFriendRequest, getAllUsers, getFriendReqs, getUsersFriends, sendFriendRequest} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const FriendReqs = observer(() => {
    const {user} = useContext(Context)
    const [isLoaded, setIsLoaded] = useState(false)

    const getAndSetFriendsReqs = () => {
        getFriendReqs(user.user.id).then(res => {
            user.setFriendReqs(res.data)
        }).finally(() => setIsLoaded(true))
    }

    const confirmFriend = async (userF, userS) => {
        setIsLoaded(false)
        const response = await confirmFriendRequest(userF, userS).finally(() => setIsLoaded(true))
        getAndSetFriendsReqs()
    }

    useEffect(() => {
        getAndSetFriendsReqs()
    }, [])

    return (
        <div>
            { isLoaded ?
                <div>
                    { !user.friendReqs.length ?
                        <h3 style={{opacity: '.6'}} className="d-flex justify-content-center ms-auto pt-3">У вас нет заявок</h3>
                        :
                        <div>
                            { user.friendReqs.map(userItem =>
                                <User isRequest={true} key={userItem.id} userData={userItem} sendFriendRequest={confirmFriend} />
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

export default FriendReqs;