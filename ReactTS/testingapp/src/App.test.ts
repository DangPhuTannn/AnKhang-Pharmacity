import { add, divide } from "./math/math";

test("1 + 1 = 2", () => {
  expect(add(1, 1)).toBe(2);
});

test("4 / 2 = 2", () => {
  expect(divide(4, 2)).toBe(2);
});

test("Dividing by zero error", () => {
  expect(() => divide(4, 0)).toThrow("Cannot divide by zero.");
});
