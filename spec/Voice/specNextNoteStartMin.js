describe("Voice().nextNoteStartMin(fraction)", function() {
  it("calls min on _startTime with fraction and returns the result", 
  function() {
    var voice = Voice([]);
    spyOn(voice._nextNoteStart, "min").and.returnValue("next note start min");
    
    expect(voice.nextNoteStartMin("fraction")).toEqual("next note start min");
    
    expect(voice._nextNoteStart.min).toHaveBeenCalledWith("fraction");
  });
});