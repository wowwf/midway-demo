import {Rule} from "@midwayjs/validate";
import {RuleType} from "@midwayjs/validate/dist/decorator/rule";

export class UserCreateDto {

  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
