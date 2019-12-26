export default {
    getAuthHeader() {
        let data = JSON.parse(window.localStorage.getItem('lbUser'));
        const headers = {
            'Authorization': 'Bearer ' + data.token
        };
        return headers;
    },
    getToken() {
        let data = JSON.parse(window.localStorage.getItem('lbUser'));
        return 'Bearer ' + data.token;
    },
    getAuthData() {
        return window.localStorage.getItem('lbUser');
    }
};
