import setupSecurity from "./setupSecurity";
import setupTemplat from "./setupTemplate";
import setupParser from "./setupParser";
import setupSession from "./setupSession";
import setupLanguage from "./setupLanguage";
import setupApiClient from "./setupApiClient";
import setupPages from "./setupPages";
import setupErrorHandlers from "./errorHandler";
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
    setupApiClient(app); // This should be before setupPages
    setupPages(app);
    setupErrorHandlers(app); // Error handler should be the last msetupApiClientiddleware
};
//# sourceMappingURL=index.js.map