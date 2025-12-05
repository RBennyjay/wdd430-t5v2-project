import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        formats: ['image/webp'], // Explicitly allows WEBP image format
    },
};

export default nextConfig;