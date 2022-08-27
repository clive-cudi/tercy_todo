/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    SECRET: process.env.SECRET,
    NEXTAUTH_URL: `http://localhost:3000`,
  },
};

module.exports = nextConfig;
