import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
/**
 * Setup parsers for the applcation
 * @param {*} app
 */
const setupParser = (app) => {
    // create application/x-www-form-urlencoded parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
};
export default setupParser;
//# sourceMappingURL=setupParser.js.map