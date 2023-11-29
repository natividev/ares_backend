import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource{
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    
    const { name, email, password } = registerUserDto;

    try {
      
      // 1 verificar el correo existe
      const existe = await UserModel.findOne({email})
      if(existe) throw CustomError.badRequest('User already exists')
      // 2 hasg de contrasena
      const user = await UserModel.create({
        name,
        email,
        password
        })
      
        await user.save()
      // 3 Mapear la respuesta a nuesta entidad
      // Todo: falta un mapper

      return new UserEntity(
        user.id,
        name,
        email,
        password,
        user.roles
      )

    } catch (error) {
      
      if(error instanceof CustomError){
        throw error;
      }

      throw CustomError.internalServerError();
      
    }

  }
}
