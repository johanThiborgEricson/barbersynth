describe("(new Choir(voices)).advanceCord()", function() {
  
  it("calls nextNoteStartTimeMin on voices[0] with Fraction(Infinity, 1)", 
  function() {
    var voice0 = new Voice([]);
    spyOn(voice0, "nextNoteStartTimeMin");
    spyOn(voice0, "advanceTime");
    var choir = new Choir([voice0]);
    spyOn(choir, "lowest").and.returnValue("lowest note");
    spyOn(choir, "asPartials");
    choir.advanceChord();
    expect(voice0.nextNoteStartTimeMin)
    .toHaveBeenCalledWith(new Fraction(Infinity, 1));
  });
  
  it("calls nextNoteStartTimeMin on voices[1] with the result of voices[0]" +
  "nextNoteStartTimeMin, and so on", 
  function() {
    var voice0 = new Voice([]);
    spyOn(voice0, "nextNoteStartTimeMin").and.returnValue("next note start 0");
    spyOn(voice0, "advanceTime");
    var voice1 = new Voice([]);
    spyOn(voice1, "nextNoteStartTimeMin").and.returnValue("next note start 1");
    spyOn(voice1, "advanceTime");
    var choir = new Choir([voice0, voice1]);
    spyOn(choir, "lowest").and.returnValue("lowest note");
    spyOn(choir, "asPartials");
    
    choir.advanceChord();
    
    expect(voice1.nextNoteStartTimeMin)
    .toHaveBeenCalledWith("next note start 0");
  });
  
  it("calls advanceTime on all voices with the result of calling " +
  "nextNoteStartTimeMin on the last voice", 
  function() {
    var voice0 = new Voice([]);
    spyOn(voice0, "advanceTime");
    spyOn(voice0, "nextNoteStartTimeMin");
    var voice1 = new Voice([]);
    spyOn(voice1, "advanceTime");
    spyOn(voice1, "nextNoteStartTimeMin").and.returnValue("last voice start min");
    var choir = new Choir([voice0, voice1]);
    choir._time = "time";
    spyOn(choir, "lowest");
    spyOn(choir, "asPartials");
    choir.advanceChord();
    
    expect(voice0.advanceTime).toHaveBeenCalledWith("last voice start min");
    expect(voice1.advanceTime).toHaveBeenCalledWith("last voice start min");
  });
  
  it("calls lowest with an array of the results of advanceTime", function() {
    var voice0 = new Voice([]);
    spyOn(voice0, "advanceTime").and.returnValue("note 0");
    spyOn(voice0, "nextNoteStartTimeMin");
    var voice1 = new Voice([]);
    spyOn(voice1, "advanceTime").and.returnValue("note 1");
    spyOn(voice1, "nextNoteStartTimeMin");
    var choir = new Choir([voice0, voice1]);
    spyOn(choir, "lowest");
    spyOn(choir, "asPartials");
    choir.advanceChord();
    expect(choir.lowest)
    .toHaveBeenCalledWith(["note 0", "note 1"]);
  });
  
  it("calls getFrequecies with an array of the results of advanceTime and " +
  "the result of lowest", 
  function() {
    var voice0 = new Voice([]);
    spyOn(voice0, "advanceTime").and.returnValue("note 0");
    spyOn(voice0, "nextNoteStartTimeMin");
    var voice1 = new Voice([]);
    spyOn(voice1, "advanceTime").and.returnValue("note 1");
    spyOn(voice1, "nextNoteStartTimeMin");
    var choir = new Choir([voice0, voice1]);
    spyOn(choir, "lowest").and.returnValue("lowest note");
    spyOn(choir, "asPartials");
    choir.advanceChord();
    expect(choir.asPartials)
    .toHaveBeenCalledWith(["note 0", "note 1"], "lowest note");
  });
  
  it("returns the notes returned by the voices and earliest start time", 
  function() {
    var voice0 = new Voice([]);
    spyOn(voice0, "advanceTime").and.returnValue("note 0");
    var voice1 = new Voice([]);
    spyOn(voice1, "advanceTime").and.returnValue("note 1");
    var choir = new Choir([voice0, voice1]);
    spyOn(voice0, "nextNoteStartTimeMin").and.returnValue("chord start");
    spyOn(voice1, "nextNoteStartTimeMin").and.returnValue("chord start");
    spyOn(choir, "lowest");
    spyOn(choir, "asPartials");

    expect(choir.advanceChord()).toEqual([["note 0", "note 1"], "chord start"]);
  });
  
  it("returns an empty chord if the only voice returns null for advanceTime", 
  function() {
    var voice = new Voice([]);
    spyOn(voice, "advanceTime").and.returnValue(null);
    spyOn(voice, "nextNoteStartTimeMin");
    var choir = new Choir([voice]);
    spyOn(choir, "lowest");
    spyOn(choir, "asPartials");
    
    var emptyChord = choir.advanceChord()[0];
    
    expect(emptyChord).toEqual([]);
  });
  
});
