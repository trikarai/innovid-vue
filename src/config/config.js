let baseUrl = "";
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://103.23.22.223/bara-taskforce/public';
    // baseUri = 'http://192.168.100.2/api'
} else {
    baseUrl = 'http://localhost:8001/api';
}
export const baseUri = baseUrl;
