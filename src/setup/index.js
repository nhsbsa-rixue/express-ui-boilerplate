import setupSecurity from "./setupSecurity.js";
import setupTemplat from "./setupTemplate.js";
import setupParser from "./setupParser.js";
import setupSession from "./setupSession.js";
import setupLanguage from "./setupLanguage.js";
import setupPages from "./setupPages.js";

/**
 * 1. Configure to load heavy sync tasks once
 * 2. Register router here so handler can reuse those task
 *
 * @param {ExpressApp} app
 *
 */
export default (app) => {
  setupSecurity(app);
  setupTemplat(app);
  setupParser(app);
  setupSession(app);
  setupLanguage(app);

  setupPages(app);
};
