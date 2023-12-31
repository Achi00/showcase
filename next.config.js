/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    },
    experimental: {
        serverComponentsExternalPackages: ['cloudinary', 'grahpql-request']
    }
}

module.exports = nextConfig
