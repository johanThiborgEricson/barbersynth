describe("absoluteNatural(naturalName)", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
  });
  
  it("returns {natural} as the natural with naturalName in the " + 
  "LilyPond absolute c-scale", function() {
    var naturalNames = ["c", "d", "e", "f", "g", "a", "b"];
    var expecteds = [-12, -11, -10, -9, -8, -7, -6];
    var actualls = naturalNames.map(function(naturalName) {
      return interpreter.absoluteNatural(naturalName);
    });
    
    expect(actualls).toEqual(expecteds);
  });
  
});
