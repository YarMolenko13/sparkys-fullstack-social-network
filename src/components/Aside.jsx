import React from 'react';
import {Col, ListGroup} from "react-bootstrap";
import {NavLink, useHistory} from 'react-router-dom'
import {CREATE_POST_URL, FEED_URL, FRIENDS_URL} from "../utils/consts";
import {
    BiMessageSquareDetail,
    BiNews,
    BsFilePost,
    CgFeed,
    FaUserCircle,
    FaUserFriends,
    IoIosCreate
} from "react-icons/all";

const listItem = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
}

const Aside = () => {
    const items = [
        {
            id: 1,
            value: 'Посты',
            ref: FEED_URL,
            icon: <BsFilePost />
        },
        // {
        //     id: 2,
        //     value: 'Сообщения',
        //     ref: FEED_URL,
        //     icon: <BiMessageSquareDetail />
        // },
        {
            id: 3,
            value: 'Друзья',
            ref: FRIENDS_URL,
            icon: <FaUserFriends />
        },
        {
            id: 4,
            value: 'Профиль',
            ref:  FEED_URL,
            icon: <FaUserCircle />
        },
        {
            id: 5,
            value: 'Создать пост',
            ref:  CREATE_POST_URL,
            icon: <IoIosCreate />
        },
    ]
    const history = useHistory()

    const linkClick = (ref) => {
        history.push(ref)
    }

    return (
        <Col sm={3} md={2} className="aside">
            <Col className="aside__inner pt-4">
                <ListGroup variant="flush" className="aside__group" >
                    { items.map(item =>
                        <div
                            className="aside__item px-3 py-1  my-1 rounded-3"
                            style={listItem}
                            key={item.id}
                            onClick={() => linkClick(item.ref)}
                        >
                            <span className="h6 me-2 text-info aside__icon">{item.icon}</span>
                            <span className="h6 d-none d-sm-block text-info">{item.value}</span>
                        </div>
                    )}
                    <a href="https://github.com/YarMolenko13" target="_blank" className="mt-5 mx-2 d-none d-md-block">
                        <hr className="mt-5"/>
                        <p className="mx-2 text-info" style={{fontSize: '14px', fontWeight: 500}} >Sparkys social network by YarMolenko13</p>
                    </a>
                </ListGroup>
            </Col>
        </Col>
    );
};

export default Aside;