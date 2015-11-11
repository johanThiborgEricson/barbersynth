describe("Choir().lowest(notes)", function() {
  
  var choir;
  
  beforeEach(function() {
    choir = Choir();
  });
  
  it("calls toneMin on notes[0] with Note(infinity)", function() {
    var note0 = Note();
    spyOn(note0, "toneMin");
    choir.lowest([note0]);
    expect(note0.toneMin).toHaveBeenCalledWith(Note(Infinity));
  });
  
  it("calls toneMin on notes[1] with the result of toneMin on notes[0], and " +
  "so on", function() {
    var note0 = Note();
    spyOn(note0, "toneMin").and.returnValue("min 0");
    var note1 = Note();
    spyOn(note1, "toneMin").and.returnValue("min 1");
    var note2 = Note();
    spyOn(note2, "toneMin");
    
    choir.lowest([note0, note1, note2]);
    
    expect(note1.toneMin).toHaveBeenCalledWith("min 0");
    expect(note2.toneMin).toHaveBeenCalledWith("min 1");
  });
  
  it("returns the result of the last call", function() {
    var note0 = Note();
    var note1 = Note();
    var note2 = Note();
    spyOn(note2, "toneMin").and.returnValue("lowest");
    
    expect(choir.lowest([note0, note1, note2])).toEqual("lowest");
  });
  
});
