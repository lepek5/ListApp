const API_URL = process.env.NODE_ENV === "production"
  ? process.env.REACT_APP_REMOTE_BACKEND_URL as string
  : process.env.REACT_APP_LOCAL_BACKEND_URL as string;
export const API_BASE_URL = API_URL;
