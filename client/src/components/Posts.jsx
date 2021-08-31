import React from 'react';
import {Col} from "react-bootstrap";
import Post from "./Post";
import AsideSupport from "./AsideSupport";

const Posts = ({posts}) => {
    return (
        <Col xs={12} sm={9} md={7} className="p-0 mt-2 mt-sm-4">
            { posts.map(post =>
                <Post key={post.id} post={post} />
            )}
        </Col>
    );
};

export default Posts;