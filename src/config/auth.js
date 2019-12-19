export default {
    getAuthHeader() {
        let data = JSON.parse(window.localStorage.getItem('lbUser'));
        const headers = {
            'Authorization': 'Bearer ' + data.token
        };
        return headers;
    },
    getAuthData() {
        return window.localStorage.getItem('lbUser');
    }
};
