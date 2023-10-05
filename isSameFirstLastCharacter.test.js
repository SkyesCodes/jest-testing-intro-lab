const isSameFirstLastCharacter = require("./isSameFirstLastCharacter");

// Base Cases

/* A test case for a string that does have the same first and last 
   character and is 4+ characters long
*/
test("it should return true when the first and last character are the same", () => {
  expect(isSameFirstLastCharacter("abbbbba")).toBe(true);
});

/* A test case for a string that does NOT have the same first and last 
   character and is 4+ characters long
*/
test("If 4+ characters long, and does not have same first and last, expected to be false", () => {
   expect(isSameFirstLastCharacter('abbbc')).toBe(false)
});

// Edge Cases
// A test case for a string with only 2 characters that are different
test("2 characters are different expected to be false", () => {
   expect(isSameFirstLastCharacter('ab')).toBe(false)
});

// A test case for a string with only 2 characters that are the same
test("2 characters are the same expected to be true", () => {
   expect(isSameFirstLastCharacter('aa')).toBe(true)
});

// A test case for a string with only 1 character
test("only one character expected true", () => {
   expect(isSameFirstLastCharacter('a')).toBe(true)
});

// A test case for an empty string
test("Empty string expected true", () => {
   expect(isSameFirstLastCharacter('')).toBe(true)
});
