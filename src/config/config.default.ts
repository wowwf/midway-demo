import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1656037847362_8662',
  koa: {
    port: 7001,
  },
  orm: {
    default: {
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: ['src/entity/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false
    }
  },
  jwt: {
    secret: 'secret',
    expiresIn: '2d'
  }
} as MidwayConfig;
