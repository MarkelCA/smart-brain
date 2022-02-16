 export default class Utils {
     static post = async (url, headers, body) => {
        const result = await fetch(url, {
            method : 'post',
            headers : headers,
            body : JSON.stringify(body)
        }).then(response => response.json())
         return result
    }
}
