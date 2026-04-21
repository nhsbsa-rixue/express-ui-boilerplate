import * as esbuild from "esbuild";

// Configuration
const entryFile = "src/server.ts"; // Replace with your entry file
const outfile = "dist/src/server.js"; // Replace with your output file
const platform: esbuild.Platform = "node"; // Required for AWS Lambda
const target = "node20"; // Match your Lambda runtime version

esbuild
  .build({
    entryPoints: [entryFile],
    outfile,
    bundle: true,
    platform,
    target,
    minify: true,
    sourcemap: true,
    external: ["aws-sdk"], // Exclude AWS SDK, already available in Lambda
    logLevel: "info",
  })
  .then(() => {
    console.log(`Build successful! Output: ${outfile}`);
  })
  .catch((error: Error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
