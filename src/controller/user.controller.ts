import {Body, Controller, Inject, Post} from "@midwayjs/decorator";
import {UserLoginDto} from "../dto/userLogin.dto";
import {Context} from "koa";
import {ResponseDto} from "../dto/response.dto";
import {UserEntity} from "../entity/user.entity";
import {JwtService} from "@midwayjs/jwt";
import {UserModel} from "../model/user.model";
import {UserCreateDto} from "../dto/userCreate.dto";

@Controller('/api/user')
export class UserController {

  @Inject()
  ctx: Context;

  @Inject()
  jwtService: JwtService;

  @Inject()
  userModel: UserModel;

  @Post('/login')
  async userLogin(@Body() body: UserLoginDto): Promise<ResponseDto> {
    const user: UserEntity = await this.userModel.getUserByUsernameAndPassword(body.username, body.password);
    if (user) {
      return new ResponseDto(200, 'success', '登录成功', {
        token: await this.jwtService.sign({username: body.username})
      })
    }
    return new ResponseDto(400, 'error', '账号或密码不正确');
  }

  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<ResponseDto> {
    await this.userModel.createOne(user);
    return new ResponseDto(200, 'success', '注册成功');
  }

}
