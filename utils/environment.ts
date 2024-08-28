export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://mybla.app";

  return base_url;
};

export const useServer = () => {
  let server_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3030"
      : "https://server.mybla.app";

  return server_url;
}