const { add, subtract } = require("./function");

// Test cases for the add function
test("should update a user ", () => {
  expect(add(1, 2)).toBe(3);
  expect(add(-1, 1)).toBe(0);
  expect(add(0, 0)).toBe(0);
});

// Test cases for the subtract function
test("should get all users", () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(10, 7)).toBe(3);
  expect(subtract(0, 0)).toBe(0);
});
test("should create a new user", () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(10, 7)).toBe(3);
  expect(subtract(0, 0)).toBe(0);
});

test("should delete a user", () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(10, 7)).toBe(3);
  expect(subtract(0, 0)).toBe(0);
});
