describe("Voice(notes).advanceTime(time)", function() {
  it("if _pointer = 0, calls notes[1].hasStarted with time", function() {
    var note0 = Note();
    var note1 = Note();
    spyOn(note1, "hasStarted");
    var voice = Voice([note0, note1]);
    voice.advanceTime("time");
    expect(note1.hasStarted).toHaveBeenCalledWith("time");
  });
  
  it("if _pointer = 0, returns notes[pointer] if notes[1].hasStarted " +
  "returns false", function() {
    var note0 = Note();
    var note1 = Note();
    spyOn(note1, "hasStarted").and.returnValue(false);
    var voice = Voice([note0, note1]);
    expect(voice.advanceTime()).toBe(note0);
  });
  
  it("if _pointer = 0 and if notes[1].hasStarted returns true, returns " +
  "notes[1] and increments _pointer", function() {
    var note0 = Note();
    var note1 = Note();
    spyOn(note1, "hasStarted").and.returnValue(true);
    var voice = Voice([note0, note1]);
    expect(voice.advanceTime()).toBe(note1);
    expect(voice._pointer).toBe(1);
  });
  
  it("if _pointer = 1, calls notes[2].hasStarted", function() {
    var note0 = Note();
    var note1 = Note();
    var note2 = Note();
    spyOn(note2, "hasStarted");
    var voice = Voice([note0, note1, note2]);
    voice._pointer = 1;
    voice.advanceTime();
    expect(note2.hasStarted).toHaveBeenCalled();
  });
  
  it("if _pointer = 1, returns notes[1] if notes[2].hasStarted " +
  "returns false", function() {
    var note0 = Note();
    var note1 = Note();
    var note2 = Note();
    spyOn(note2, "hasStarted").and.returnValue(false);
    var voice = Voice([note0, note1, note2]);
    voice._pointer = 1;
    expect(voice.advanceTime()).toBe(note1);
  });
  
  it("if _pointer = 1 and if notes[2].hasStarted returns true, returns " +
  "notes[2]", function() {
    var note0 = Note();
    var note1 = Note();
    var note2 = Note();
    spyOn(note2, "hasStarted").and.returnValue(true);
    var voice = Voice([note0, note1, note2]);
    voice._pointer = 1;
    expect(voice.advanceTime()).toBe(note2);
  });
  
});
