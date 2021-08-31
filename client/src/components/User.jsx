import React, {useContext} from 'react';
import {formatDate} from "../utils/funcs";
import {AiOutlinePlusCircle, FaUserCircle, FiUserPlus} from "react-icons/all";
import {Card} from "react-bootstrap";
import {Context} from "../index";

const User = ({userData, sendFriendRequest, isFriend, isRequest=false}) => {
    const {user} = useContext(Context)

    return (
        <Card className="post px-2 px-sm-4 py-3 mb-3 rounded-3 user-line flex-row flex-nowrap align-items-center justify-content-between">
            <div className="flex-nowrap flex-column flex-sm-row post__author post-author d-flex align-items-center justify-content-start">
                { user.avatar === 'unknown' ?
                    <FaUserCircle className="h1 mb-2 mb-sm-0 me-3 user-line__avatar-wrapper_un"/>
                    :
                    <div style={{background: `url("${process.env.REACT_APP_AVATARS_STORAGE_URL + userData.avatar}") center`,
                    backgroundSize: 'cover'}}
                         className="user-line__avatar-wrapper mb-2 mb-sm-0 me-3">
                    </div>
                }
                <div className="d-inline-flex flex-column">
                    <span className="user-line__name">{userData.name} {userData.surname}</span>
                    <span className="user-line__sub">{userData.email}</span>
                    <span className="user-line__sub">зарегистрирован {formatDate(userData.createdAt)}</span>
                    {/*<span className="author-post__date">{formatDate(post.createdAt)}</span>*/}
                </div>
            </div>
            { !isFriend &&
                <div>
                    {isRequest ?
                        <AiOutlinePlusCircle className="fs-4 pointer"
                                    onClick={() => sendFriendRequest(userData.id, user.user.id)}/>
                        :
                        <FiUserPlus className="fs-4 pointer"
                                    onClick={() => sendFriendRequest(user.user.id, userData.id)}/>
                    }
                </div>
            }
        </Card>
    );
};

export default User;