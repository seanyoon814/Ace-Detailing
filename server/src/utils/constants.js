const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const clientUrl = process.env.ENV == "prod" ? `https://${projectId}.uw.r.appspot.com` : "http://localhost:3000";

module.exports = {
    clientUrl
}