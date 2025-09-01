import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "s.gravatar.com" },
      { protocol: "https", hostname: "*.auth0.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "fakestoreapi.com" },
    ],
    formats: ["image/avif", "image/webp"], // ✅ modern formatlar
    deviceSizes: [320, 480, 640, 768, 1024], // ✅ responsive optimizasyon
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
};

// next-intl plugin ile wrap et
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
