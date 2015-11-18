describe("Fraction().min(other)", function() {
  
  it("calls lessThan with other", function() {
    var fraction = Fraction();
    spyOn(fraction, "lessThan");
    var other = Fraction();
    fraction.min(other);
    expect(fraction.lessThan).toHaveBeenCalledWith(other);
  });
  
  it("returns this if lessThan returns true", function() {
    var fraction = Fraction();
    spyOn(fraction, "lessThan").and.returnValue(true);
    expect(fraction.min()).toBe(fraction);
  });
  
  it("returns other if lessThan returns false", function() {
    var fraction = Fraction();
    spyOn(fraction, "lessThan").and.returnValue(false);
    var other = Fraction();
    expect(fraction.min(other)).toBe(other);
  });
  
});
