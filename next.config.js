/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permette di servire file HTML statici da /public
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
      {
        source: "/designsystem",
        destination: "/designsystem.html",
      },
    ];
  },
  // Ottimizzazioni immagini
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "youtube.com",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "vimeo.com",
      },
    ],
  },
};

module.exports = nextConfig;
