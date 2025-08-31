import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
        hostname: "github.com", // Eski GitHub avatar URL'leri
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com", // ✅ Fake Store ürün görselleri
      },
    ],
  },
};

// next-intl plugin ile wrap et
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
