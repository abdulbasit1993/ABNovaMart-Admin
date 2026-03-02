const isDevelopment = import.meta.env.MODE === "development";
const isProduction = import.meta.env.MODE === "production";

console.log("current environment is ==>> ", import.meta.env.MODE); // 'development' or 'production'

const apiUrls = {
  local: "http://localhost:3002/api",
  production_old: "https://psychological-codi-abm-apps-150283cd.koyeb.app/api",
  production: "https://abnovamart-backend.onrender.com/api",
};

export const BASE_URL = isDevelopment
  ? apiUrls.local
  : isProduction
    ? apiUrls.production
    : apiUrls.local;
