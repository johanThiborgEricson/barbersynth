describe("noteLength", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
  });
  
  it("when called with a power of 2 between 1 and 128, sets the denominator " + 
  "of lengthFraction to the parsed value and the numerator to 1", 
  function() {
    var powersOfTwo = ["1", "2", "4", "8", "16", "32", "64", "128"];
    var expecteds = 
    [[1, 1], [1, 2], [1, 4], [1, 8], [1, 16], [1, 32], [1, 64], [1, 128]];
    
    var actualls = powersOfTwo.map(function(powerOfTwo) {
      interpreter.reciprocalLength(powerOfTwo);
      return interpreter.lengthFraction;
    });
    
    expect(actualls).toEqual(expecteds);
  });
  
  it("when called with an empty string, if lengthFraction is defined, " +
  "does nothing", 
  function() {
    interpreter.lengthFraction = "length fraction";
    interpreter.noteLength("");
    expect(interpreter.lengthFraction).toEqual("length fraction");
  });
  
  it("when called with an empty string, if lenghtFraction is undefined, " +
  "sets lengthFraction to one quater", function() {
    interpreter.noteLength("");
    expect(interpreter.lengthFraction).toEqual([1, 4]);
  });
  
  it("when called with a power of two and a dot, returns the reciprocal " +
  "value of power times 3/2", function() {
    interpreter.noteLength("2.");
    expect(interpreter.lengthFraction).toEqual([3, 4]);
  });
  
  it("when called with a power of two and two dots, returns the reciprocal " +
  "value of power times 7/4", function() {
    interpreter.noteLength("2..");
    expect(interpreter.lengthFraction).toEqual([7, 8]);
  });
  
});
