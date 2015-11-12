describe("Voice(notes).advanceTime(time, playing)", function() {
  
  it("(initially, _time is Fraction(0, 1))", function() {
    var voice = Voice([]);
    expect(voice._time).toEqual(Fraction(0, 1));
  });
  
  it("calls lessThan on time with _time", function() {
    var time = Fraction();
    spyOn(time, "lessThan").and.returnValue(true);
    var voice = Voice([]);
    voice._time = "voice time";
    voice.advanceTime(time);
    expect(time.lessThan).toHaveBeenCalledWith("voice time");
  });
  
  it("returns playing if lessThan returns true", function() {
    var time = Fraction();
    spyOn(time, "lessThan").and.returnValue(true);
    var voice = Voice([]);
    expect(voice.advanceTime(time, "playing")).toEqual("playing");
  });
  
  it("returns notes[0] and removes it from _unsungNotes if lessThan returns " +
  "false", function() {
    var time = Fraction();
    spyOn(time, "lessThan").and.returnValue(false);
    var note0 = Note();
    var voice = Voice([note0]);
    expect(voice.advanceTime(time, "playing")).toBe(note0);
    expect(voice._unsungNotes.indexOf("note 0")).toBe(-1);
  });
  
  xit("doesn't affect notes", 
  function() {
    var note0 = Note();
    var notes = [note0];
    var time = Fraction();
    spyOn(time, "lessThan").and.returnValue(false);
    var voice = Voice(notes);
    voice.advanceTime(time);
    expect(notes[0]).toBe(note0);
  });
  
  it("calls addTime on notes[0] with _time and sets _time to the result if " +
  "lessThan returns false", function() {
    var note0 = Note();
    spyOn(note0, "addTime").and.returnValue("time sum");
    var time = Fraction();
    spyOn(time, "lessThan").and.returnValue(false);
    var voice = Voice([note0]);
    voice._time = "_time";
    
    voice.advanceTime(time, "playing");
    
    expect(note0.addTime).toHaveBeenCalledWith("_time");
    expect(voice._time).toEqual("time sum");
  });
  
});
