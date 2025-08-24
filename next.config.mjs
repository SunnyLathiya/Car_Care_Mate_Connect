/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["firebasestorage.googleapis.com"],
    },
    experimental: {
      optimizeCss: false, // disable font download at build time
    },
  };
  
  export default nextConfig;
  