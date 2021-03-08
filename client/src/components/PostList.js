import React, {useState, useEffect} from 'react';
import {GET} from "../services/http";
import {ServicePort} from "../services/ports";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const posts = await GET(ServicePort.POSTS, 'posts');
        setPosts(posts.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div key={post.id}
                 className="card">
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList postId={post.id}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        );
    })

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}
