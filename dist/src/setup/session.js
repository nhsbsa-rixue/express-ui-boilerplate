"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_redis_1 = require("connect-redis");
const express_session_1 = __importStar(require("express-session"));
const redis_1 = require("redis");
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../logger"));
// Save the session error to the local variable
const sessionToLocal = (req, res, next) => {
    const sess = req.session;
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
const setupSession = (app) => {
    // Default to in-memory store
    const sessionConfig = {
        secret: config_1.default.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new express_session_1.MemoryStore(),
    };
    // If REDIS_URL is provided, use Redis for session storage
    if (config_1.default.REDIS_URL) {
        const redisClient = (0, redis_1.createClient)({
            url: config_1.default.REDIS_URL,
        });
        redisClient.connect().catch(logger_1.default.error);
        // Initialize store.
        const redisStore = new connect_redis_1.RedisStore({
            client: redisClient,
        });
        sessionConfig.store = redisStore;
    }
    app.use((0, express_session_1.default)(sessionConfig));
    app.use(sessionToLocal);
};
exports.default = setupSession;
//# sourceMappingURL=session.js.map