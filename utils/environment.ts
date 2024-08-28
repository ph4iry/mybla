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
      : "https://mybla-server-30f658414629.herokuapp.com";

  return server_url;
}