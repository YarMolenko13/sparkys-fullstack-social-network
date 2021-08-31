import React, {useState} from 'react';
import {Card, Row} from "react-bootstrap";
import {formatDate} from "../utils/funcs";
import {AiFillLike, BiLike, FaUserCircle, FcLike} from "react-icons/all";


const Post = ({post}) => {
    const [isLiked, setIsLiked] = useState(false)

    const parseContent = (content) => {
        if (!content) {
            return []
        }
        return content.split('</br>')
    }

    const like = () => {
        setIsLiked(!isLiked)
    }

    return (
        <Card className="post px-2 px-sm-4 py-3 mb-3 rounded-3">
            <div className="flex-nowrap post__author post-author d-flex align-items-center justify-content-start">
                { post.author.avatar === 'unknown' ?
                    <FaUserCircle className="h1 mb-2 mb-sm-0 me-3 user-line__avatar-wrapper_un"/>
                    :
                    <div style={{background: `url("${process.env.REACT_APP_AVATARS_STORAGE_URL + post.author.avatar}") center`,
                        backgroundSize: 'cover'}}
                         className="user-line__avatar-wrapper mb-2 mb-sm-0 me-3">
                    </div>
                }                <div className="d-inline-flex flex-column">
                    <span className="author-post__name">{post.author.name} {post.author.surname}</span>
                    <span className="author-post__date">{formatDate(post.createdAt)}</span>
                </div>
            </div>
            <div className="mt-3">
                <h5 className="mb-2">{post.heading}</h5>
                <span>
                    { parseContent(post.content).map(p =>
                        <p className="mb-2" key={p}>{p}</p>
                    )}
                </span>
                { post.photos &&
                <div className="post__img">
                    <img className="rounded-1" src={process.env.REACT_APP_AVATARS_STORAGE_URL + post.photos} alt=""/>
                </div>
                }
                <div className="d-flex flex-nowrap mt-3 justify-content-between">
                    <div className="fs-5 fw-bold d-inline-flex align-items-center">
                        <div className="me-1">{post.likes}</div>
                        <FcLike />
                    </div>
                    <div style={{cursor: 'pointer'}} className="no-blue" onClick={like}>
                        { isLiked ?
                            <AiFillLike className="fs-4" />
                            :
                            <BiLike className="fs-4" />
                        }
                    </div>
                </div>
            </div>
            <div>

            </div>
        </Card>
    );
};

export default Post;