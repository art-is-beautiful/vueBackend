require('dotenv').config()

module.exports = {
    server: {
      baseUrl: 'http://localhost:3002',
    },
    sendGrid: {
      baseEmail: 'no-reply@fix-me-bruh.com',
      apiKey: process.env.API_KEY,,
      emailValidation: process.env.EMAIL_VALIDATION,
      resetPassword: process.env.RESET_PASSWORD,
    },
    aws: {
      accessKeyId: process.env.SACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      bucketName: 'artem.db2-lecture',
      userPhotoFolder: 'users',
    },
  };
