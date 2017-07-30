describe("(new Fraction(a, b)).add([c, d])", function() {
  var MockFraction = function() {
    Fraction.apply(this, arguments);
    this.greatestCommonDivisor = function() {
      return 1;
    };
    
    this.reduce = function() {
      return arguments[0];
    };
  };
  
  MockFraction.prototype = new Fraction();
  
  it("returns the sum of the numerators if the nominators are equal", 
  function() {
    var num1 = 1;
    var num2 = 1;
    var equalDenom = 1;
    expect((new MockFraction(num1, equalDenom)).add([num2, equalDenom]))
    .toEqual((new Fraction(num1 + num2, equalDenom)));
  });
  
  it("multiplies the first numerator by the second denominator and vice versa", 
  function() {
    expect((new MockFraction(2, 1)).add([1, 2])[0]).toBe(5);
    expect((new MockFraction(1, 3)).add([3, 1])[0]).toBe(10);
  });
  
  it("multiplies the denominators if they are relatively prime", function() {
    expect((new MockFraction(1, 2)).add([1, 3])[1]).toBe(6);
  });
  
  it("divides the numerator by the value returned by gcd", function() {
    var num1 = 1;
    var num2 = 2;
    var denom = 1;
    var gcd = 2;
    var mock = new MockFraction(num1, denom);
    mock.greatestCommonDivisor = function(denominator1, denominator2) {
      return gcd;
    };
    
    expect(mock.add([num2, denom])[0])
    .toBe((num1 * denom + num2 * denom) / gcd);
  });
  
  it("divides the denominator by the value returned by gcd", function() {
    var denom1 = 3;
    var denom2 = 5;
    
    // Johan can haz math!!1!
    var gcd = 2;
    var mock = new MockFraction(1, denom1);
    mock.greatestCommonDivisor = function(denominator1, denominator2) {
      return gcd;
    };
    
    expect(mock.add([1, denom2])[1]).toBe(denom1 * denom2 / gcd);
  });
  
  it("returns a Fraction-object that is niether the object itself, nor the " +
  "term", function() {
    var itself = new MockFraction(0, 1);
    var term = new MockFraction(0, 1);
    var sum = itself.add(term);
    expect(sum instanceof Fraction).toBe(true);
    expect(sum).not.toBe(itself);
    expect(sum).not.toBe(term);
  });
  
  it("can handle numbers close to zero", function() {
    var mock = new MockFraction(1, Number.MAX_VALUE);
    mock.greatestCommonDivisor = function(denominator1, denominator2) {
      return Number.MAX_VALUE;
    };
    
    expect(mock.add([1, Number.MAX_VALUE]))
    .toEqual(new Fraction(2, Number.MAX_VALUE));
  });
  
  it("calls gcd with the denominators", function() {
    var mock = new MockFraction(1, "first denominator");
    mock.greatestCommonDivisor = jasmine.createSpy("greatestCommonDivisor")
    .and.returnValue(1);
    mock.add([1, "second denominator"]);
    expect(mock.greatestCommonDivisor)
    .toHaveBeenCalledWith("first denominator", "second denominator");
  });
  
});
