import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource{
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    
    const { name, email, password } = registerUserDto;

    try {
      
      // 1 verificar el correo existe
      // 2 hasg de contrasena
      // 3 Mapear la respuesta a nuesta entidad
      // if('josenatividadcv@gmail.com' === email){
      //   throw CustomError.badRequest('Correo ya existe');
      // }

      return new UserEntity(
        "1",
        name,
        email,
        password,
        ['Admin_Role']
      )

    } catch (error) {
      
      if(error instanceof CustomError){
        throw error;
      }

      throw CustomError.internalServerError();
      
    }

  }
}
