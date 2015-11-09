describe("Fraction(n1, d1).multiply([n2, d2])", function() {
  
  it("calls reduceInplace with [n1, d2] and [n2, d1]", function() {
    var fraction = Fraction(1, 2);
    spyOn(fraction, "reduceInplace");
    fraction.multiply([3, 4]);
    expect(fraction.reduceInplace).toHaveBeenCalledWith([1, 4]);
    expect(fraction.reduceInplace).toHaveBeenCalledWith([3, 2]);
  });
  
  it("multiplies values set by reduceInplace element-wise and makes a new " +
  "Fraction of the products", function() {
    var fraction = Fraction();
    fraction.reduceInplace = (function() {
      var i = 0;
      var numerators = [2, 5];
      var denominators = [3, 7];
      return function(fraction) {
        fraction[0] = numerators[i];
        fraction[1] = denominators[i];
        i++;
      };
    })();
    
    spyOn(fraction, "Fraction");
    fraction.multiply([]);
    expect(fraction.Fraction).toHaveBeenCalledWith(10, 21);
  });
  
  it("returns the result of Fraction", function() {
    var fraction = Fraction();
    spyOn(fraction, "Fraction").and.returnValue("fraction");
    expect(fraction.multiply([])).toEqual("fraction");
  });
  
});
