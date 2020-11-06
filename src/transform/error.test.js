import { formatError } from "./error";

describe("format error", () => {
  test("invalid STR modifier", () =>
    expect(formatError({ name: "STR", property: "modifier", value: "bad" })).toBe("Error: invalid STR modifier: bad"));
});
