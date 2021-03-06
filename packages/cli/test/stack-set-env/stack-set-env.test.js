const { runBuildCommand, clearBuildOutput } = require("../helpers");

beforeEach(async () => {
  await clearBuildOutput(__dirname);
});

afterAll(async () => {
  await clearBuildOutput(__dirname);
});

/**
 * Test that the synth command ran successfully
 */
test("stack-set-env", async () => {
  const result = await runBuildCommand(__dirname);

  expect(result).toMatch(/Do not directly set the environment for a stack/);
});
