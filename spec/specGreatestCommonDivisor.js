describe("Fraction().greatestCommonDivisor(a, b)", function() {
  var gcd;
  beforeEach(function() {
    gcd = Fraction().greatestCommonDivisor;
  });
  
  it("calls ordered with (a, b) if a < b", function() {
    spyOn(gcd, "ordered");
    gcd(1, 2);
    expect(gcd.ordered).toHaveBeenCalledWith(1, 2);
  });
  
  it("calls ordered with (b, a) if a > b", function() {
    spyOn(gcd, "ordered");
    gcd(2, 1);
    expect(gcd.ordered).toHaveBeenCalledWith(1, 2);
  });
  
  it("calls ordered with (a, a) if a == b", function() {
    spyOn(gcd, "ordered");
    gcd(1, 1);
    expect(gcd.ordered).toHaveBeenCalledWith(1, 1);
  });
  
  it("returns return value of greatestCommonDivisor.ordered", function() {
    gcd.ordered = function() {
      return "ordered";
    };
    expect(gcd(1, 1)).toEqual("ordered");
  });
  
});

describe("Fraction().greatestCommonDivisor.ordered(a, b)", function() {
  var gcd;
  beforeEach(function() {
    gcd = Fraction([1, 1]).greatestCommonDivisor;
  });
  
  it("returns a if a divides b", function() {
    expect(gcd.ordered(2, 4)).toBe(2);
  });
  
  it("calls itself recursively with (b%a, a) if a doesn't divide b", function() {
    spyOn(gcd, "ordered").and.callThrough();
    gcd.ordered(2, 3);
    expect(gcd.ordered).toHaveBeenCalledWith(1, 2);
  });
  
  it("returns ordered(b%a, a) if a doesn't divide b", function() {
    var oldOrdered = gcd.ordered;
    spyOn(gcd, "ordered").and.returnValue("recursive result");
    expect(oldOrdered(2, 3)).toEqual("recursive result");
    expect(gcd.ordered).toHaveBeenCalled();
  });
  
});
