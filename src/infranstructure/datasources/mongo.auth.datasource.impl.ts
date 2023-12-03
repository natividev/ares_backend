import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => Boolean;

export class AuthDatasourceImpl implements AuthDatasource{
  //Inyencion de funcion como dependencia, no es mas que definir una funcion que voy a recibir en mi constructor para hash la contraña

  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
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
      // Todo: falta un mapper
      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      
      if(error instanceof CustomError){
        throw error;
      }

      throw CustomError.internalServerError();
      
    }

  }

  async login(loginuserDte: LoginUserDto): Promise<UserEntity>{
    const { email, password } = loginuserDte;

    try {
      const user = await UserModel.findOne({email});

      if(!user) throw CustomError.badRequest('User does no exist')
      
      const isMatching = this.comparePassword(password,user.password);

      if(!isMatching) throw CustomError.badRequest('Usuario o contraña incorrectos')

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if(error instanceof CustomError){
        throw error;
      }
      throw CustomError.internalServerError();      
    }

  }
}
