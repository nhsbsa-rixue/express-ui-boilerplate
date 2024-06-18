import * as express from "express"; 

import { ValidationChain } from "express-validator";

declare global {

  interface Request extends express.Request {
  CONTEXT_PATH: string;
  session: any;
  apiClient: any;
  }
  
   interface Response extends express.Response {
    redirectPageTo: (page: string) => void;
  }
  
   interface Handler extends express.Handler {
    (req: Request , res: Response, next: express.NextFunction): void;
  }

  interface App extends express.Express {}

  interface schema extends ValidationChain {}

  interface Page {
    path: string;
    heading?: string;
    schema?: ValidationChain[];
    get: Handler;
    post?: Handler;
  }





  
}
