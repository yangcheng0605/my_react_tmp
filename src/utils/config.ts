function apiurl ():string {
    let apiUrl = ''
    if (window.location.host.indexOf('localhost') != -1 || window.location.host.indexOf('10.75.24.61') != -1) {
        apiUrl = 'http://localhost:5555'
    } else {
        apiUrl = window.location.protocol+'//'+window.location.host
    }
    return apiUrl
}
// 线上
export default {
  apiUrl: apiurl()
}; 