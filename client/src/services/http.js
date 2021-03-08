import axios from 'axios';

export const POST = async (port, route, body) => {
    const url = `http://localhost:${port}/${route}`;
    await axios.post(url, body)
};

export const GET = async (port, route) => {
    const url = `http://localhost:${port}/${route}`;
    return await axios.get(url)
};
