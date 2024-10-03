module.exports = {
  apps: [
    {
      name: "analytics-analysis",
      script: "npm start",
      error_file: "./pm2-error.log",
      out_file: "./pm2-out.log",
    },
  ],
};
