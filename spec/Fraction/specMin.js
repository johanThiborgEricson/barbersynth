describe("(new Fraction()).min(other)", function() {
  
  it("calls lessThan with other", function() {
    var fraction = new Fraction();
    spyOn(fraction, "lessThan");
    var other = new Fraction();
    fraction.min(other);
    expect(fraction.lessThan).toHaveBeenCalledWith(other);
  });
  
  it("returns this if lessThan returns true", function() {
    var fraction = new Fraction();
    spyOn(fraction, "lessThan").and.returnValue(true);
    expect(fraction.min()).toBe(fraction);
  });
  
  it("returns other if lessThan returns false", function() {
    var fraction = new Fraction();
    spyOn(fraction, "lessThan").and.returnValue(false);
    var other = new Fraction();
    expect(fraction.min(other)).toBe(other);
  });
  
});
