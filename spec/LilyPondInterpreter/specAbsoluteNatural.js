xdescribe("absoluteNatural(naturalName)", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
  });
  
  it("returns {natural} as the natural with naturalName in the " + 
  "LilyPond absolute c-scale", function() {
    var naturalNames = ["c", "d", "e", "f", "g", "a", "b"];
    var expecteds = [-12, -11, -10, -9, -8, -7, -6];
    var actualls = naturalNames.map(function(naturalName) {
      interpreter.absoluteNatural(naturalName);
      return interpreter.natural;
    });
    
    expect(actualls).toEqual(expecteds);
  });
  
  it("calls natural2tone with the natural and sets tone to the result", 
  function() {
    spyOn(interpreter, "natural2tone").and.returnValue("tone");
    interpreter.absoluteNatural("c");
    expect(interpreter.natural2tone).toHaveBeenCalledWith(-12);
    expect(interpreter.tone).toEqual("tone");
  });
  
});
