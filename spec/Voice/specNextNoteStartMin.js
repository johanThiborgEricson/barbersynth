describe("Voice().nextNoteStartMin(fraction)", function() {
  it("calls min on _startTime with fraction and returns the result", 
  function() {
    var voice = Voice();
    spyOn(voice._startTime, "min").and.returnValue("start time min");
    
    expect(voice.nextNoteStartMin("fraction")).toEqual("start time min");
    
    expect(voice._startTime.min).toHaveBeenCalledWith("fraction");
  });
});