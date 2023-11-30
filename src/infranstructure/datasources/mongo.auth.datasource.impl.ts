import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => Boolean;

export class AuthDatasourceImpl implements AuthDatasource{
  //Inyencion de funcion como dependencia, no es mas que definir una funcion que voy a recibir en mi constructor para hash la contraña


  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly compareFunction: CompareFunction = BcryptAdapter.compare,
  ){}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    
    const { name, email, password } = registerUserDto;
    
    try {  
      // 1 verificar el correo existe
      const existe = await UserModel.findOne({email})
      if(existe) throw CustomError.badRequest('Por favor reintente nuevamente')
      // 2 hasg de contrasena
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
        })
      
        await user.save()
      // 3 Mapear la respuesta a nuesta entidad
      // Todo: falta un mapper
      return UserMapper.userEntityFromObject(user);
      // return new UserEntity(
      //   user.id,
      //   name,
      //   email,
      //   user.password,
      //   user.roles
      // )

    } catch (error) {
      
      if(error instanceof CustomError){
        throw error;
      }

      throw CustomError.internalServerError();
      
    }

  }
}
