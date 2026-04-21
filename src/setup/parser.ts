import bodyParser from "body-parser";

/**
 * Setup parsers for the applcation
 * @param {*} app
 */
const setupParser = (app: App) => {
  // create application/x-www-form-urlencoded parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

export default setupParser;
