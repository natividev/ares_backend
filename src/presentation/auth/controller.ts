import { Request, Response} from "express";
import { RegisterUserDto } from "../../domain";


export class AuthController {
  //Inyenccion de dependencia
  constructor () {};
  
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if(error) return res.status(400).json({error})

    res.json(registerUserDto)
    
  };

  logiUser = (req: Request, res: Response) => {
    res.json(req.body)
  }



}