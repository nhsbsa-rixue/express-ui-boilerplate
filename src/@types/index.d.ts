/// <reference types="vitest/globals" />
import type { Express as ExpressApp, NextFunction, Request, RequestHandler, Response } from "express";
import type { ValidationChain } from "express-validator";

declare global {
  // Augment Express.Request so all handlers (including RequestHandler) see custom fields
  namespace Express {
    interface Request {
      users: User[];
      products: Product[];
      watching: WatchEntry[];
      contextPath: string;
      session: Record<string, any>;
    }
    interface Response {
      renderPage: () => void;
      redirectPageTo: (page: string) => void;
    }
  }

  interface User {
    id: string;
    email: string;
  }

  interface Product {
    id: string;
    name: string;
    price: number;
  }

  interface WatchEntry {
    userEmail: string;
    productId: string;
    desiredPrice: number;
    fullDayAlert: boolean;
    nightAlert: boolean;
    dayAlert: boolean;
    [key: string]: string | number | boolean;
  }

  interface App extends ExpressApp {}

  // Req/Res still available for explicit use in controllers
  interface Req extends Request {}

  interface Res extends Response {}

  interface Next extends NextFunction {}

  interface EmailTemplate {
    to: string;
    subject: string;
    body: string;
  }

  type AlertType = "day" | "night";

  type Controller = (req: Req, res: Res, next: Next) => Res | void | Promise<Res | void>;
  type Middleware = RequestHandler;

  interface Page {
    path: string;
    title?: string;
    get: Controller;
    post?: Controller;
    getSchema?: ValidationChain[];
    postSchema?: ValidationChain[];
  }
}
