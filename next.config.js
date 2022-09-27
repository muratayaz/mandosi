module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.terzimapp.com/:path*",
      },
    ];
  },
};
