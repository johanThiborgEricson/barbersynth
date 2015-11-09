describe("Fraction().greatestCommonDivisor(a, b)", function() {
  var fraction;
  beforeEach(function() {
    fraction = Fraction();
  });
  
  it("calls _orderedGcd with (a, b) if a < b", function() {
    spyOn(fraction, "_orderedGcd");
    fraction.greatestCommonDivisor(1, 2);
    expect(fraction._orderedGcd).toHaveBeenCalledWith(1, 2);
  });
  
  it("calls ordered with (b, a) if a > b", function() {
    spyOn(fraction, "_orderedGcd");
    fraction.greatestCommonDivisor(2, 1);
    expect(fraction._orderedGcd).toHaveBeenCalledWith(1, 2);
  });
  
  it("calls ordered with (a, a) if a == b", function() {
    spyOn(fraction, "_orderedGcd");
    fraction.greatestCommonDivisor(1, 1);
    expect(fraction._orderedGcd).toHaveBeenCalledWith(1, 1);
  });
  
  it("returns return value of greatestCommonDivisor.ordered", function() {
    fraction["_orderedGcd"] = function() {
      return "ordered";
    };
    expect(fraction.greatestCommonDivisor(1, 1)).toEqual("ordered");
  });
  
});

describe("Fraction()._orderedGcd(a, b), a <= b", function() {
  var gcd;
  var fraction;
  
  beforeEach(function() {
    gcd = Fraction([1, 1]).greatestCommonDivisor;
    fraction = Fraction();
  });
  
  it("returns a if a divides b", function() {
    expect(fraction._orderedGcd(2, 4)).toBe(2);
  });
  
  it("calls itself recursively with (b%a, a) if a doesn't divide b", function() {
    spyOn(fraction, "_orderedGcd").and.callThrough();
    fraction._orderedGcd(2, 3);
    expect(fraction._orderedGcd).toHaveBeenCalledWith(1, 2);
  });
  
  it("returns result of recursive call if a doesn't divide b", function() {
    fraction.oldOrdered = fraction._orderedGcd;
    spyOn(fraction, "_orderedGcd").and.returnValue("recursive result");
    expect(fraction.oldOrdered(2, 3)).toEqual("recursive result");
    expect(fraction._orderedGcd).toHaveBeenCalled();
  });
  
});
