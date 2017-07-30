describe("(new Fraction(n1, d1)).lessThan(new Fraction(n2, d2))", function() {
  it("creates a new fraction that is the negative of the argument", function() {
    var fraction = new Fraction(2, 3);
    var other = new Fraction(5,7);
    var negative = new Fraction(-5, 7);
    spyOn(window, "Fraction").and.returnValue(negative);
    
    fraction.lessThan(other);
    
    expect(Fraction).toHaveBeenCalledWith(-5, 7);
  });
  
  it("adds this and the negative", function() {
    var fraction = new Fraction(2, 3);
    var other = new Fraction(5,7);
    var negative = new Fraction(-5, 7);
    spyOn(window, "Fraction").and.returnValue(negative);
    spyOn(fraction, "add").and.returnValue(new Fraction(-1, 14));
    
    fraction.lessThan(other);
    
    expect(fraction.add).toHaveBeenCalledWith(negative);
  });
  
  it("gives the correct results for some fraction pairs", function() {
    expect(new Fraction(1, 2).lessThan(new Fraction(1, 1))).toBe(true);
    expect(new Fraction(1, 2).lessThan(new Fraction(1, 2))).toBe(false);
    expect(new Fraction(1, 2).lessThan(new Fraction(2, 3))).toBe(true);
  });
  
});