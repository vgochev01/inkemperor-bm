async function request(path, data, token) {
    let options = {
        method: data ? 'POST' : 'GET',
        headers: {
            'content-type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
    };

    if(token){
        options.headers['X-Authorization'] = token;
    }

    const response = await fetch(`http://localhost:3030/users${path}`, options);


    const resData = await response.json();
    if(!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export const login = async (email, password) => {
    return request('/login', { email, password });

};

export const register = (email, username, password) => {
    return request('/register', { email, username, password });
}

export const getProfile = (token) => {
    return request('/profile', null, token);
}