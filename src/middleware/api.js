const baseUrl = process.env.REACT_APP_REST_API_URL;
// const { token } = JSON.parse(
//     localStorage.getItem('auth'),
// );

const apiHeaders = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + token
}

export { baseUrl, apiHeaders }