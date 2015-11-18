describe("Fraction(n1, d1).multiply([n2, d2])", function() {
  
  it("calls greatestCommonDivisor twice, first with n1 and d2 and then with " +
  "n2 and d1", function() {
    var fraction = Fraction("n1", "d1");
    spyOn(fraction, "greatestCommonDivisor");
    fraction.multiply(["n2", "d2"]);
    expect(fraction.greatestCommonDivisor).toHaveBeenCalledWith("n1", "d2");
    expect(fraction.greatestCommonDivisor).toHaveBeenCalledWith("n2", "d1");
  });
  
  it("returns Fraction(n1 * n1 / gcd1 / gcd2, d1 * d2 / gcd1 / gcd2) where " +
  "gcd1 is the result of calling greatestCommonDivisor with n1 and d2 and " +
  "gcd2 is the result of calling greatestCommonDivisor with n2 and d1", 
  function() {
    var fraction = Fraction(2, 3);
    spyOn(fraction, "greatestCommonDivisor").and.returnValues(2, 3);
    expect(fraction.multiply([9, 4])).toEqual(Fraction(3, 2));
  });
  
  it("can handle numbers close to one", function() {
    var large = Number.MAX_VALUE;
    var notSoLarge = large * (1 - Math.pow(2, -52));
    expect(notSoLarge).not.toBe(large);
    var fraction = Fraction(large, notSoLarge);
    expect(fraction.multiply([notSoLarge, large])).toEqual(Fraction(1, 1));
  });
  
});
