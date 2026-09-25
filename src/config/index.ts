const secretKey = import.meta.env.VITE_SECURE_KEY?.trim();

if (!secretKey) {
  throw new Error(
    "Missing VITE_SECURE_KEY. Add it to the active Vite environment file before starting the application."
  );
}

const config = {
    baseUrl: import.meta.env.VITE_API_URL_PREFIX || "http://127.0.0.1:8080/api/v1",
    expireIn: 10080,
    secretKey,
    adminExpireIn:  3 * 24 * 60 * 60 * 1000,
    userExpireIn:  1 * 24 * 60 * 60 * 1000,
  };
  
  export default config;
