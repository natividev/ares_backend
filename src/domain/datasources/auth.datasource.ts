import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

//Datasource regla de negocio
//Abstacto porque no quiero crear instancias de esta clase, solo servira para expandirlo o para implementarla
export abstract class AuthDatasource {
  // todo:
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

  abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>;
} 