describe("(new LilyPondInterpreter()).octaveSpaceRound(lastNatural, " +
"scaleNumber)", function() {
  
  var interpreter = new LilyPondInterpreter();
  
  it("with scaleNumber = 0 and lastNatural modulo 7 = 0, returns lastNatural",
  function() {
    var lastNaturals = [-14, -7, 0, 7, 14];
    var actualls = lastNaturals.map(function(lastNatural) {
      return interpreter.octaveSpaceRound(lastNatural, 0);
    });
    
    expect(actualls).toEqual(lastNaturals);
  });
  
  it("with scaleNumber = 0 and lastNatural modulo 7 != 0, returns the " +
  "closest A", function() {
    expect(interpreter.octaveSpaceRound(1, 0)).toEqual(0);
  });
  
  it("with lastNatural = scaleNumber = 1, returns 1", function() {
    expect(interpreter.octaveSpaceRound(1, 1)).toEqual(1);
  });
  
});
