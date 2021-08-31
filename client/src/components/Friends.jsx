import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Navbar} from "react-bootstrap";
import AllUsers from "./AllUsers";
import {Context} from "../index";
import MyFriends from "./MyFriends";
import FriendReqs from "./FriendReqs";


const Friends = () => {
    const {user} = useContext(Context)
    const [tabI, setTabI] = useState(0)

    const items = [
            'Мои друзья',
            'Все пользователи',
            'Заявки в друзья'
    ]

    return (
        <Col xs={12} sm={9} md={7} className="p-0 mt-2 mt-sm-4 px-2">
            <Navbar className="py-0 px-2 d-flex justify-content-end align-items-center mb-3">
                { items.map((item, i) =>
                    <div key={i}>
                        { tabI == i ?
                            <Navbar.Brand key={i} className={"fs-6 fw-bolder h5 text-info pointer"}>{item}</Navbar.Brand>
                            :
                            <Navbar.Brand key={i} onClick={() => setTabI(i)} className={"fs-6 h5 text-info pointer"}>{item}</Navbar.Brand>
                        }
                    </div>
                )}

            </Navbar>
            { tabI == 0 &&
                <MyFriends />
            }
            { tabI == 1 &&
                <AllUsers />
            }
            { tabI == 2 &&
                <FriendReqs />
            }
        </Col>
    );
};

export default Friends;