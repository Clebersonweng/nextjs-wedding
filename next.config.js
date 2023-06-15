const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`;
//Para usar variaveis gloabis do dotenv e necesario colocar no next.config
module.exports = {
   reactStrictMode: true,
   images: {
      loader: 'cloudinary',
      domains: ['res.cloudinary.com'],
      unoptimized: false,
      path: cloudinaryBaseUrl
   },
   env: {
      CLOUDINARY_URL: process.env.CLOUDINARY_URL,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
   }
}