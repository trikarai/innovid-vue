let baseUrl = "";
if (process.env.NODE_ENV === 'production') {
    baseUrl = window.location.origin + '/bara-inovasi/public/api';
    // baseUrl = 'https://innov.id/bara-inovasi/public/api';
    // baseUri = 'http://192.168.100.2/api'
} else {
    baseUrl = 'http://localhost:8001/api';
    // baseUrl = 'https://innov.id/bara-inovasi/public/api';

}
export const baseUri = baseUrl;
