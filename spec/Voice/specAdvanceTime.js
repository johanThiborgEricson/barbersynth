describe("(new Voice(notes)).advanceTime(time, playing)", function() {
  
  it("(initially, _nextNoteStart is new Fraction(0, 1))", function() {
    var voice = new Voice([]);
    expect(voice._nextNoteStart).toEqual(new Fraction(0, 1));
  });
  
  it("(initially, _singing is Note.nullObjectStart)", function() {
    var voice = new Voice([]);
    expect(voice._singing).toBe(Note.nullObjectStart);
  });
  
  it("calls lessThan on time with _nextNoteStart", function() {
    var time = new Fraction();
    spyOn(time, "lessThan").and.returnValue(true);
    var voice = new Voice([]);
    voice._nextNoteStart = "next note start";
    voice.advanceTime(time);
    expect(time.lessThan).toHaveBeenCalledWith("next note start");
  });
  
  it("returns _singing if lessThan returns true", function() {
    var time = new Fraction();
    spyOn(time, "lessThan").and.returnValue(true);
    var voice = new Voice([]);
    voice._singing = "singing";
    expect(voice.advanceTime(time)).toEqual("singing");
  });
  
  it("returns notes[0] , sets _singing to it, and removes it from " +
  "_unsungNotes if lessThan returns false", function() {
    var time = new Fraction();
    spyOn(time, "lessThan").and.returnValue(false);
    var note0 = new Note();
    spyOn(note0, "addTime");
    var voice = new Voice([note0]);
    expect(voice._unsungNotes.indexOf(note0)).toBe(0);
    expect(voice.advanceTime(time)).toBe(note0);
    expect(voice._unsungNotes.indexOf(note0)).toBe(-1);
    expect(voice._singing).toBe(note0);
  });
  
  it("doesn't affect notes", 
  function() {
    var note0 = new Note();
    spyOn(note0, "addTime");
    var notes = [note0];
    var time = new Fraction();
    spyOn(time, "lessThan").and.returnValue(false);
    var voice = new Voice(notes);
    voice.advanceTime(time);
    expect(notes[0]).toBe(note0);
  });
  
  it("calls addTime on notes[0] with _nextNoteStart and sets _nextNoteStart " +
  "to the result if lessThan returns false", function() {
    var note0 = new Note();
    spyOn(note0, "addTime").and.returnValue("time sum");
    var time = new Fraction();
    spyOn(time, "lessThan").and.returnValue(false);
    var voice = new Voice([note0]);
    voice._nextNoteStart = "next note start";
    
    voice.advanceTime(time, "playing");
    
    expect(note0.addTime).toHaveBeenCalledWith("next note start");
    expect(voice._nextNoteStart).toEqual("time sum");
  });
  
  it("returns null if notes is empty", function() {
    var voice = new Voice([]);
    
    var end = voice.advanceTime(new Fraction(0, 1));
    
    expect(end).toBe(null);
  });
  
});
