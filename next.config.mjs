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
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub profile photos
      },
      {
        protocol: "https",
        hostname: "github.com", // (bazı eski GitHub avatar URL'leri için)
      },
    ],
  },
};

export default nextConfig;
