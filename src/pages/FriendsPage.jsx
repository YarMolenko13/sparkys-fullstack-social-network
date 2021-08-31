import React from 'react';
import MainWrapper from "../components/MainWrapper";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Aside from "../components/Aside";
import Posts from "../components/Posts";
import AsideSupport from "../components/AsideSupport";
import Friends from "../components/Friends";

const FriendsPage = () => {
    return (
        <Container>
            <Row className="d-flex justify-content-between position-relative mb-5 mb-sm-0">
                <Aside />
                <Friends />
                <AsideSupport />
            </Row>
        </Container>
    );
};

export default FriendsPage;