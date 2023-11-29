import { Request, Response} from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";


export class AuthController {
  //Inyenccion de dependencia
  constructor (
    private readonly authRepositoy: AuthRepository
  ) {};
  
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if(error) return res.status(400).json({error})

    this.authRepositoy.register(registerUserDto!)
    .then(user => res.json(user))
    .catch( error => {
      console.log(error)
      res.status(500).json(error) 
    })

    
  };

  logiUser = (req: Request, res: Response) => {
    res.json(req.body)
  }



}