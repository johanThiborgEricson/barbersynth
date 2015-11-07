describe("moduloMagicRelativeNatural(lastNatural, scaleNumber)", function() {
  
  var interpreter = LilyPondInterpreter();

  describe("with scaleNumber - lastNatural =", function(){  

    it("between 1 and 3, steps up", function() {
      var scaleNumbers = [1, 2, 3];
      var actualls = scaleNumbers.map(function(scaleNumber) {
        return interpreter.moduloMagic(0, scaleNumber);
      });
      
      var expecteds = [1, 2, 3];
      expect(actualls).toEqual(expecteds);
    });
    
    it("between 4 and 6, steps down", function() {
      var scaleNumbers = [4, 5, 6];
      var actualls = scaleNumbers.map(function(scaleNumber) {
        return interpreter.moduloMagic(0, scaleNumber);
      });
      
      var expecteds = [-3, -2, -1];
      expect(actualls).toEqual(expecteds);
    });
    
    it("zero, returns lastNatural", function() {
      var scaleNumbers = [0, 1, 2, 3, 4, 5, 6];
      var actualls = scaleNumbers.map(function(scaleNumber) {
        return interpreter.moduloMagic(scaleNumber, scaleNumber);
      });
      
      expect(actualls).toEqual(scaleNumbers);
    });
    
  });
  
  it("with lastNatural = 4 and scaleNumber = 0, returns 7", function() {
    expect(interpreter.moduloMagic(4, 0)).toBe(7);
  });
  
});
