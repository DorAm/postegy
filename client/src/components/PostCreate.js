import React, {useState} from 'react';
import {POST} from "../services/http";
import {ServicePort} from "../services/ports";

export default () => {
    const [title, setTitle] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        await POST(ServicePort.POSTS, 'posts', {title})
        setTitle('')
    }
    return (
        <div>
            <pre>{title}</pre>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title}
                           onChange={e => setTitle(e.target.value)}
                           className="form-control"
                           type="text"
                           placeholder="What do you have in mind ?"/>
                </div>
                <button className="btn btn-primary"
                        type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
