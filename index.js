import express from "express";
import setup from "./src/setup/index.js";

const app = express();
setup(app);

export default app;
