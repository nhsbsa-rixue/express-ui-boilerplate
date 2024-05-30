import express from "express";
import setup from "./setup/index.js";

const app = express();
setup(app);

export default app;
