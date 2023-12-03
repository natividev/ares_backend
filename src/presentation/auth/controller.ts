import { Request, Response} from "express";
import { AuthRepository, CustomError, LoginUserUser, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";


export class AuthController {
  //Inyenccion de dependencia
  constructor (
    private readonly authRepositoy: AuthRepository
  ) {};

  private handleError = (error: unknown, res: Response) => {
    if(error instanceof CustomError){
      return res.status(error.statusCode).json({error: error.message})
    }
    console.log(error);
    return res.status(500).json({error: 'Internal Server Error'})
  }
  
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if(error) return res.status(400).json({error})

    new RegisterUser(this.authRepositoy)
    .execute(registerUserDto!)
    .then(data => res.json(data))
    .catch(error => this.handleError(error, res));

  };

  logiUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if(error) return res.status(400).json({error});

    new LoginUserUser(this.authRepositoy)
    .execute(loginUserDto!)
    .then(data => res.json(data))
    .catch(error => this.handleError(error, res));
  }

  getUser = (req: Request, res: Response) => {
    UserModel.find()
    .then( users => res.json({
      // users,
      user: req.body.user
    }) )
    .catch( () => res.status(500).json({error:'Internal server error'}) )
  }



}