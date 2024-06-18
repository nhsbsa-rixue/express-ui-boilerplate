import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Express } from "express";
/**
 * Setup parsers for the applcation
 * @param {*} app
 */
const setupParser = (app: Express) => {
  // create application/x-www-form-urlencoded parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
};

export default setupParser;
