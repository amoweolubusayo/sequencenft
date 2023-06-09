/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "ipfs.io",
      "imgur.com",
      "plus.unsplash.com",
      "i.imgur.com",
      "ipfs.sequence.info"
    ],
  },
}

module.exports = nextConfig
