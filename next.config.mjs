/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile photos
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com", // Gravatar
      },
      {
        protocol: "https",
        hostname: "*.auth0.com", // Auth0 hosted avatars
      },
    ],
  },
};

export default nextConfig;
