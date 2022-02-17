export const post = async (url, body) => {
    const result = await fetch(url, {
        method : 'post',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(body)
    }).then(response => response.json())

    return result
}

export const put = async (url, body) => {
    const result = await fetch(url, {
        method : 'put',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(body)
    }).then(response => response.json())

    return result
}
