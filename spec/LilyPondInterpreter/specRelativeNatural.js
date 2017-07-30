describe("(new LilyPondInterpreter()).relativeNatural", function() {
  
  var interpreter;
  beforeEach(function() {
    interpreter = new LilyPondInterpreter();
  });
  
  it("calls moduloMagic and octaveSpaceRound with lastNatural and the parsed" +
  "value minus 'a'", function() {
    spyOn(interpreter, "moduloMagic");
    spyOn(interpreter, "octaveSpaceRound");
    
    interpreter.lastNatural = "last natural";
    interpreter.relativeNatural("b");
    expect(interpreter.moduloMagic).toHaveBeenCalledWith("last natural", 1);
    expect(interpreter.octaveSpaceRound)
    .toHaveBeenCalledWith("last natural", 1);
  });
  
  it("throws an error if moduloMagic and octaveSpaceRound return different " +
  "results", function() {
    interpreter.moduloMagic = function() {
      return "modulo magic";
    };
    
    interpreter.octaveSpaceRound = function() {
      return "octave space round";
    };

    interpreter.lastNatural = "last natural";
    var errorString = "relative natural failed for lastNatural = last " +
    "natural and naturalName = 'b'. octaveSpaceRound said octave space round " +
    "and moduloMagic said modulo magic.";
    expect(interpreter.relativeNatural.bind(interpreter, "b"))
    .toThrowError(errorString);
  });
  
  it("returns the result if moduloMagic and octaveSpaceRound return equal " +
  "results", function() {
    interpreter.moduloMagic = function() {
      return "redundant";
    };
    
    interpreter.octaveSpaceRound = function() {
      return "redundant";
    };

    expect(interpreter.relativeNatural("b")).toEqual("redundant");
  });
  
  it("doesn't throw when lastNatural is any natural on a grand piano and the" +
  "parsed value is any natural name", function() {
    var naturalNames = ["a", "b", "c", "d", "e", "f", "g"];
    var acceptanceTest = function() {
      naturalNames.map(function(naturalName) {
        for(var lastNatural = -28; lastNatural <= 23; lastNatural++) {
          interpreter.lastNatural = lastNatural;
          interpreter.relativeNatural(naturalName);
        }
      });
    };
    
    expect(acceptanceTest).not.toThrow();
  });
  
});
