import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    environment: "node",
    setupFiles: ["./test-setup/setup.ts"],
    include: ["**/*.test.ts"],
    exclude: ["dist/**"],
    globals: true,
  },
});
