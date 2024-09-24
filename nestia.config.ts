import type SDK from '@nestia/sdk';

export const NESTIA_CONFIG: SDK.INestiaConfig = {
  input: 'src/controllers',
  output: 'src/api',
  swagger: {
    openapi: '3.1',
    output: 'dist/swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost:8005/docs',
        description: 'Local Server',
      },
    ],
    beautify: true,
  },
};
export default NESTIA_CONFIG;
