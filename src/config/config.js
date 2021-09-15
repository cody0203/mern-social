const config = {
  server:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "https://evening-brook-56461.herokuapp.com"
      : "https://evening-brook-56461.herokuapp.com",
};

export default config;
