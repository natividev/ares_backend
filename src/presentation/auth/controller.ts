import { Request, Response} from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


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

    this.authRepositoy.register(registerUserDto!)
    .then(async (user) => res.json({
      user,
      token: await JwtAdapter.generateToken({id: user.id})
    }))
    .catch( error => this.handleError(error, res));

    
  };

  logiUser = (req: Request, res: Response) => {
    res.json(req.body)
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