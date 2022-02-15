import * as express from 'express';
import catsRouter from './cats/cats.route';

class Server {
  public app: express.Application;

  constructor() {
    const app :express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    //* logging middleware
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.rawHeaders[1]);
      console.log('this is middlewares');
      next(); 
  });

    //* json middleware
    this.app.use(express.json())

    this.setRoute();

    //* 404 middleware
    this.app.use((req, res, next) => {
      res.send({ error: '404 not found' });
      });
  }

  public listen(){
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log(`server is on...`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();



