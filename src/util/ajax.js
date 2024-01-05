export const request = async (path, method = 'GET', data, token) => {
    let options = {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
    };

    if(token){
        options.headers['X-Authorization'] = token;
    }

    const response = await fetch(`http://localhost:3030${path}`, options);

    const resData = await response.json();
    if(!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export const requestMultipart = async (path, method = 'POST', data, token) => {
    let options = {
        method: method,
        headers: {},
        body: data
    };

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    // If data is an instance of FormData, do not set the 'Content-Type' header.
    if (!(data instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`http://localhost:3030${path}`, options);

    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}