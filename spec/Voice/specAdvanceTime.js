describe("Voice(notes).advanceTime(time)", function() {
  
  // TODO: move this functionallity to Voice.start()
  xit("(initially, _startTime is Fraction(0, 1))", function() {
    var voice = Voice();
    expect(voice._startTime).toEqual(Fraction(0, 1));
  });
  
  xit("calls notes[0].hasEnded with _startTime and time", function() {
    var note0 = Note();
    spyOn(note0, "hasEnded");
    var voice = Voice([note0]);
    voice._startTime = "start time";
    voice.advanceTime("time");
    expect(note0.hasEnded).toHaveBeenCalledWith("start time", "time");
  });
  
  xit("returns notes[0] if notes[0].hasEnded returns false", function() {
    var note0 = Note();
    spyOn(note0, "hasEnded").and.returnValue(false);
    var voice = Voice([note0]);
    expect(voice.advanceTime()).toBe(note0);
  });
  
  xit("if notes[0].hasEnded returns true, removes notes[0] from _notes, sets " +
  "_startTime to time and returns notes[1]", 
  function() {
    var note0 = Note();
    var note1 = Note();
    spyOn(note0, "hasEnded").and.returnValue(true);
    var voice = Voice([note0, note1]);
    expect(voice.advanceTime("advanced time")).toBe(note1);
    expect(voice._startTime).toEqual("advanced time");
    expect(voice._notes.indexOf(note0)).toBe(-1);
  });
  
});
