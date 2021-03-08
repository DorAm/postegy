import React, {useState, useEffect} from "react";
import {GET} from "../services/http";
import {ServicePort} from "../services/ports";

export default ({postId}) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const comments = await GET(ServicePort.COMMENTS, `posts/${postId}/comments`);
        setComments(comments.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map(comment => {
        return (
            <li key={comment.id}>
                {comment.content}
            </li>
        )
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}
