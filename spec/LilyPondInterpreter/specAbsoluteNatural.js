describe("absoluteNatural(naturalName)", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
  });
  
  it("returns {natural} as the natural with naturalName in the " + 
  "LilyPond absolute c-scale i. e. the C major scale that starts at C two " +
  "octavs below concert pitch A", function() {
    //      a    b    c    d    e   f   g   a   b   c   d   e   f   g   a_440Hz
    //    -14  -13  -12  -11  -10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0
    var naturalNames = ["c", "d", "e", "f", "g", "a", "b"];
    var expecteds = [-12, -11, -10, -9, -8, -7, -6];
    var actualls = naturalNames.map(function(naturalName) {
      return interpreter.absoluteNatural(naturalName);
    });
    
    expect(actualls).toEqual(expecteds);
  });
  
});
