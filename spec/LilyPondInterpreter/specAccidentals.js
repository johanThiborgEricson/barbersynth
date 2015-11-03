xdescribe("accidentals", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
    interpreter.tone = 0;
  });
  
  it("decreases tone by one if called with es", function() {
    interpreter.accidentals("es");
    expect(interpreter.tone).toBe(-1);
  });
  
  it("decreases tone by two if called with eses", function() {
    interpreter.accidentals("eses");
    expect(interpreter.tone).toBe(-2);
  });
  
  it("increases tone by one if called with is", function() {
    interpreter.accidentals("is");
    expect(interpreter.tone).toBe(1);
  });
  
  it("increases tone by two if called with isis", function() {
    interpreter.accidentals("isis");
    expect(interpreter.tone).toBe(2);
  });
  
  it("does nothing successfully if called with the empty string", function() {
    interpreter.accidentals("");
    expect(interpreter.tone).toBe(0);
  });
  
});
