import express, { Router } from "express";

interface IOptions{
 port?: number,
 routes: Router,
}

export class Server {
  public readonly app = express();
  private readonly port:number;
  private readonly routes:Router;

  constructor( options: IOptions ){
    const { port = 3000, routes } = options;

    this.port = port;
    this.routes = routes;
  };

  async start(){

    //Midleware
    this.app.use(express.json())

    //Usar las rutas defidas
    this.app.use(this.routes);
    
    this.app.listen(this.port, () =>{
      console.log('Server running on port ',this.port)
    });
  }


}