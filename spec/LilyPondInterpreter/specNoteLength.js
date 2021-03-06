describe("(new LilyPondInterpreter()).noteLength", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = new LilyPondInterpreter();
  });
  
  it("when called with a power of 2 between 1 and 128, sets the denominator " + 
  "of lengthFraction to the parsed value and the numerator to 1", 
  function() {
    var powersOfTwo = [1, 2, 4, 8, 16, 32, 64, 128];
    var expecteds = powersOfTwo.map(function(powerOfTwo) {
      return new Fraction(1, powerOfTwo);
    });
    
    var actualls = powersOfTwo.map(function(powerOfTwo) {
      return interpreter.noteLength(String(powerOfTwo));
    });
    
    expect(actualls).toEqual(expecteds);
  });
  
  it("when called with an empty string, if lengthFraction is defined, " +
  "returns it", 
  function() {
    interpreter.lengthFraction = "length fraction";
    expect(interpreter.noteLength("")).toEqual("length fraction");
  });
  
  it("when called with an empty string, if lenghtFraction is undefined, " +
  "returns one quater", function() {
    expect(interpreter.noteLength("")).toEqual(new Fraction(1, 4));
  });
  
  it("when called with a power of two and a dot, returns the reciprocal " +
  "value of power times 3/2", function() {
    expect(interpreter.noteLength("2.")).toEqual(new Fraction(3, 4));
  });
  
  it("when called with a power of two and two dots, returns the reciprocal " +
  "value of power times 7/4", function() {
    expect(interpreter.noteLength("2..")).toEqual(new Fraction(7, 8));
  });
  
  it("saves the last value to lenghtFraction", function() {
    interpreter.noteLength("2.");
    expect(interpreter.lengthFraction).toEqual(new Fraction(3, 4));
  });
  
});
