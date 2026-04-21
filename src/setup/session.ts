import { RedisStore } from "connect-redis";
import session, { MemoryStore } from "express-session";
import { createClient } from "redis";
import config from "../config";
import logger from "../logger";

// Save the session error to the local variable
const sessionToLocal: Middleware = (req, res, next) => {
  const sess = (req as unknown as Req).session;
  if (sess.error) {
    res.locals = {
      ...res.locals,
      error: sess.error,
      body: sess.body || {},
    };
    delete sess.error;
  }
  next();
};

/**
 * Setup session for the applcation
 * @param {*} app
 */
const setupSession = (app: App) => {
  // Default to in-memory store
  const sessionConfig = {
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore() as session.Store,
  };

  // If REDIS_URL is provided, use Redis for session storage
  if (config.REDIS_URL) {
    const redisClient = createClient({
      url: config.REDIS_URL,
    });
    redisClient.connect().catch(logger.error);

    // Initialize store.
    const redisStore = new RedisStore({
      client: redisClient,
    });

    sessionConfig.store = redisStore;
  }

  app.use(session(sessionConfig));
  app.use(sessionToLocal);
};

export default setupSession;
