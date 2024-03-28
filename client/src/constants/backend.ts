const service = process.env.REACT_APP_GOOGLE_CLOUD_BACKEND_SERVICE_NAME;
const projectId = process.env.REACT_APP_GOOGLE_CLOUD_PROJECT_ID;
const apiUrl = process.env.REACT_APP_ENV == "prod" ? `https://${service}-dot-${projectId}.uw.r.appspot.com` : "http://localhost:5000";
const clientUrl = process.env.REACT_APP_ENV == "prod" ? `https://${projectId}.uw.r.appspot.com` : "http://localhost:3000";

export default {
    apiUrl,
    clientUrl
};