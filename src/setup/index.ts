import setupController from "./controllers";
import setupDBClient from "./db-client";
import setupErrorHandlers from "./error-handler";
import setupLanguage from "./language";
import setupPages from "./pages";
import setupParser from "./parser";
import setupSecurity from "./security";
import setupSession from "./session";
import setupTemplate from "./template";

/**
 * 1. Configure to load heavy sync tasks once
 * 2. Register router here so handler can reuse those task
 *
 * @param {ExpressApp} app
 *
 */
export default (app: App) => {
  setupSecurity(app);
  setupParser(app);

  setupSession(app);
  setupDBClient(app);

  setupTemplate(app);
  setupLanguage(app);

  setupController(app);
  setupPages(app);

  // make sure this is the last one
  setupErrorHandlers(app);
};
