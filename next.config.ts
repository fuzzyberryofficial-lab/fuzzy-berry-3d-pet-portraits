import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Old address (printed flyers and QR codes point here). Send visitors
        // to the new domain, keeping the path and ?promo=... query string.
        // /api is left alone so nothing server-to-server breaks.
        source: "/:path((?!api/).*)",
        has: [{ type: "host", value: "fuzzyberry-official.vercel.app" }],
        destination: "https://www.fuzzyberry.de/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
