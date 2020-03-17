import formatMoney from "./formatMoney";

describe("formatMoney() function", () => {
  test("it handles the base case", () => {
    expect(formatMoney(12343223)).toEqual("$123432.23");
    expect(formatMoney(888)).toEqual("$8.88");
    expect(formatMoney(199)).toEqual("$1.99");
  })
  test("it handles values less than a dollar", () => {
    expect(formatMoney(99)).toEqual("$0.99");
    expect(formatMoney(1)).toEqual("$0.01");
    expect(formatMoney(0)).toEqual("$0.00");
  })
  test("it handles even dollars", () => {
    expect(formatMoney(3200)).toEqual("$32.00");
    expect(formatMoney(100)).toEqual("$1.00");
  })
})
