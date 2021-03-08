
import axios from 'axios';

export const post = async (port, route, body) => {
    debugger;
    const url = `http://localhost:${port}/${route}`;
    await axios.post(url, body)
}
