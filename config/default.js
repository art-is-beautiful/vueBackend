require('dotenv').config()

module.exports = {
    server: {
      baseUrl: 'http://localhost:3002',
    },
    sendGrid: {
      baseEmail: 'no-reply@fix-me-bruh.com',
      apiKey: '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',
      emailValidation: 'd-62e46a1c5a4047f1b676ec1bcee514ac',
      resetPassword: 'd-fe97a71b6e774530b14b5d5271bdef08',
    },
    aws: {
      accessKeyId: 'AKIA2GXQ2LUNX5RX46G5',
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      bucketName: 'artem.db2-lecture',
      userPhotoFolder: 'users',
    },
  };