let baseUrl = "";
if (process.env.NODE_ENV === "production") {
  baseUrl = window.location.origin + "/bara-inovasi/public/api";
  // baseUrl = 'https://innov.id/bara-inovasi/public/api';
} else {
  var localhost = "http://localhost";
  baseUrl = localhost + "/bara-inovasi/public/api";
}
export const baseUri = baseUrl;
