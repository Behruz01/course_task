export default () => ({
  port: process.env.PORT,
  databaseUrl: process.env.POSTGRES_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
  },
});
