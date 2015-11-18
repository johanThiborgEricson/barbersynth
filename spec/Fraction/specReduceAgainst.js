describe("Fraction(a, b).reduceAgainst(0, [c, d], 1)", function() {
  
  it("calls greatestCommonDivisor with a and d", function() {
    var fraction = Fraction("a", "b");
    spyOn(fraction, "greatestCommonDivisor");
    fraction.reduceAgainst(0, ["c", "d"], 1);
    expect(fraction.greatestCommonDivisor).toHaveBeenCalledWith("a", "d");
  });
  
  it("returns [a / gcd, d / gcd], where gcd is the result of " +
  "greatestCommonDivisor", function(){
    var fraction = Fraction(2, "b");
    spyOn(fraction, "greatestCommonDivisor").and.returnValue(2);
    expect(fraction.reduceAgainst(0, ["c", 4], 1)).toEqual(Fraction(1, 2));
  });
  
});

describe("Fraction(a, b).reduceAgainst(1, [c, d], 0)", function() {
  
  it("calls greatestCommonDivisor with b and c", function() {
    var fraction = Fraction("a", "b");
    spyOn(fraction, "greatestCommonDivisor");
    fraction.reduceAgainst(1, ["c", "d"], 0);
    expect(fraction.greatestCommonDivisor).toHaveBeenCalledWith("b", "c");
  });
  
  it("returns [b / gcd, c / gcd], where gcd is the result of " +
  "greatestCommonDivisor", function(){
    var fraction = Fraction("a", 4);
    spyOn(fraction, "greatestCommonDivisor").and.returnValue(2);
    expect(fraction.reduceAgainst(1, [2, "d"], 0)).toEqual(Fraction(1, 2));
  });
  
});
