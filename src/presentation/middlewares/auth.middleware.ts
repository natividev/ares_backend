import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class authMiddleware {
  
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const autorization = req.header('Authorization');

    if(!autorization) return res.status(401).json({
        message: 'No token provided'
      });
    

    if(!autorization.startsWith('Bearer ')) return res.status(401).json({
      message: 'Invalid Bearer token'
    });

    const token = autorization.split(' ').at(1) ?? '';

    try {
      
      const payload = await JwtAdapter.validateToken<{ id:string }>(token);
      if(!payload) return res.status(401).json({
        message: 'Invalid token'
      })

      const user = await UserModel.findById(payload.id);

      if(!user) return res.status(500).json({
        message: 'Invalid token'
      })
      
      req.body.user = user;



      next(); 
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Internal Server Error'
      })
    }
    
  
  }

}