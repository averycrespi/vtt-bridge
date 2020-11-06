import { isValidAttack, isValidDamage, isValidDescription, isValidMod, isValidName } from "./validate";

describe("validate an attack", () => {
  test("empty", () => expect(isValidAttack("")).toBe(false));
  test("flat d8", () => expect(isValidAttack("1d8")).toBe(true));
  test("d8 with positive mod", () => expect(isValidAttack("1d8+1")).toBe(true));
  test("d8 with negative mod", () => expect(isValidAttack("1d8-1")).toBe(true));
  test("multiple dice with mod", () => expect(isValidAttack("2d12+10")).toBe(true));
  test("negative dice", () => expect(isValidAttack("-1d8")).toBe(false));
  test("missing separator", () => expect(isValidAttack("18")).toBe(false));
  test("missing dice", () => expect(isValidAttack("d8")).toBe(false));
  test("trailing plus", () => expect(isValidAttack("1d8+")).toBe(false));
  test("trailing minus", () => expect(isValidAttack("1d8-")).toBe(false));
});

describe("validate damage", () => {
  test("empty", () => expect(isValidDamage("")).toBe(false));
  test("flat d8", () => expect(isValidDamage("1d8")).toBe(true));
  test("d8 with positive mod", () => expect(isValidDamage("1d8+1")).toBe(true));
  test("d8 with negative mod", () => expect(isValidDamage("1d8-1")).toBe(true));
  test("multiple dice with mod", () => expect(isValidDamage("2d12+10")).toBe(true));
  test("negative dice", () => expect(isValidDamage("-1d8")).toBe(false));
  test("missing separator", () => expect(isValidDamage("18")).toBe(false));
  test("missing dice", () => expect(isValidDamage("d8")).toBe(false));
  test("trailing plus", () => expect(isValidDamage("1d8+")).toBe(false));
  test("trailing minus", () => expect(isValidDamage("1d8-")).toBe(false));
});

describe("validate desciption", () => {
  test("empty", () => expect(isValidDescription("")).toBe(false));
  test("non-empty", () => expect(isValidDescription("Shoot a fireball.")).toBe(true));
});

describe("validate mod", () => {
  test("empty", () => expect(isValidMod("")).toBe(false));
  test("zero", () => expect(isValidMod("0")).toBe(true));
  test("plus one", () => expect(isValidMod("+1")).toBe(true));
  test("minus one", () => expect(isValidMod("-1")).toBe(true));
  test("plus ten", () => expect(isValidMod("+10")).toBe(true));
  test("minus ten", () => expect(isValidMod("-10")).toBe(true));
  test("plus only", () => expect(isValidMod("+")).toBe(false));
  test("minus only", () => expect(isValidMod("-")).toBe(false));
  test("flat d8", () => expect(isValidMod("1d8")).toBe(false));
});

describe("validate name", () => {
  test("empty", () => expect(isValidName("")).toBe(false));
  test("non-empty", () => expect(isValidName("Bart")).toBe(true));
});
