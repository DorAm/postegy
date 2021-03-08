import React, {useState} from "react";
import {POST} from "../services/http";
import {ServicePort} from "../services/ports";

export default ({postId}) => {
    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault()
        await POST(ServicePort.COMMENTS, `posts/${postId}/comments`, {content})
        setContent('');
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input type="text"
                           value={content}
                           onChange={e => setContent(e.target.value)}
                           className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}