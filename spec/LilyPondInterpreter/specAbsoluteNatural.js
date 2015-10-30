describe("absoluteNatural(naturalName)", function() {
  it("returns {natural} as the natural with naturalName in the " + 
  "LilyPond absolute c-scale", function() {
    var interpreter = LilyPondInterpreter();
    var naturalNames = ["c", "d", "e", "f", "g", "a", "b"];
    var expecteds = [-12, -11, -10, -9, -8, -7, -6];
    var actualls = naturalNames.map(function(naturalName) {
      interpreter.interpret(interpreter.absoluteNatural, naturalName);
      return interpreter.natural;
    });
    
    expect(actualls).toEqual(expecteds);
  });
  
});
