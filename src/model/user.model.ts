import {InjectEntityModel} from "@midwayjs/orm";
import {UserEntity} from "../entity/user.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/decorator";
import {UserCreateDto} from "../dto/userCreate.dto";

@Provide()
export class UserModel {

  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username: string, password: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: {username, password}});
  }

  async onModuleInit(): Promise<void> {
    await this.userRepo.save({
      username: 'jack',
      password: 'redballoon'
    });
  }

  async createOne(user: UserCreateDto): Promise<UserEntity> {
    return await this.userRepo.save(user);
  }
}
