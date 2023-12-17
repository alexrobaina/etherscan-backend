import dotenv from 'dotenv';
dotenv.config();

export const config = {
  APP_NAME: 'Securitize',
  HOST: process.env.HOST || 'http://localhost',
  PORT: process.env.PORT || '3011',
  EXPIRES_IN: 86400,
  JWT_SEED: process.env.JWT_SEED || 'key-desarollo-secrets-yes',
};
