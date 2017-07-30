describe("(new Voice()).nextNoteStartTimeMin(fraction)", function() {
  it("calls min on _startTime with fraction and returns the result", 
  function() {
    var voice = new Voice([]);
    spyOn(voice._nextNoteStart, "min").and.returnValue("next note start min");
    
    expect(voice.nextNoteStartTimeMin("fraction")).toEqual("next note start min");
    
    expect(voice._nextNoteStart.min).toHaveBeenCalledWith("fraction");
  });
});