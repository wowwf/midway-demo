import {Inject, Controller, Get, Query, Post} from '@midwayjs/decorator';
import {Context} from '@midwayjs/koa';
import {UserService} from '../service/user.service';
import {MidwayConfigService} from "@midwayjs/core";
import {createConnection} from "typeorm";

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  configService: MidwayConfigService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({uid});
    return {success: true, message: 'OK', data: user};
  }

  @Post('/addConfig')
  async addConfig() {
    await createConnection({
      name: 'scc',
      type: 'postgres',
      entities: ['src/**/*.entity{.ts,.js}'],
      subscribers: ['src/**/*.subscriber{.ts,.js}'],
      url: 'postgres://postgres:123456@localhost:5432/scc',
      logging: true,
      synchronize: true,
      dropSchema: false
    });
    this.configService.addObject({
      orm: {
        scc: {
          type: 'postgres',
          entities: ['src/**/*.entity{.ts,.js}'],
          subscribers: ['src/**/*.subscriber{.ts,.js}'],
          url: 'postgres://postgres:123456@localhost:5432/scc',
          logging: true,
          synchronize: true,
          dropSchema: false
        }
      }
    });
    return this.configService.getConfiguration();
  }


}
