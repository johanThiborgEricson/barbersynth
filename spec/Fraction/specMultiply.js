describe("Fraction(n1, d1).multiply([n2, d2])", function() {
  
  it("calls reduceAgainst twice, first with ([n1, d1], 0, [n2, d2], 1) and " +
  "then with ([n1, d1], 1, [n2, d2], 0)", function() {
    var fraction = Fraction(2, 3);
    spyOn(fraction, "reduceAgainst").and.returnValue([]);
    fraction.multiply([5, 7]);
    expect(fraction.reduceAgainst).toHaveBeenCalledWith(0, [5, 7], 1);
    expect(fraction.reduceAgainst).toHaveBeenCalledWith(1, [5, 7], 0);
  });
  
  it("returns a new Fraction equal to the result of multiplying the " +
  "elements of the results of reduceAgainst", function() {
    var fraction = Fraction();
    spyOn(fraction, "reduceAgainst").and.returnValues([2, 3], [5, 7]);
    var actuall = fraction.multiply();
    expect(actuall).toEqual(Fraction(10, 21));
    expect(actuall).not.toBe(fraction);
  });
  
});
