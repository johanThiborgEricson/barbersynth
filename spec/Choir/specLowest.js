describe("(new Choir()).lowest(notes)", function() {
  
  var choir;
  
  beforeEach(function() {
    choir = new Choir();
  });
  
  it("calls toneMin on notes[0] with new Note(infinity)", function() {
    var note0 = new Note();
    spyOn(note0, "toneMin");
    choir.lowest([note0]);
    expect(note0.toneMin).toHaveBeenCalledWith(new Note(Infinity));
  });
  
  it("calls toneMin on notes[1] with the result of toneMin on notes[0], and " +
  "so on", function() {
    var note0 = new Note();
    spyOn(note0, "toneMin").and.returnValue("min 0");
    var note1 = new Note();
    spyOn(note1, "toneMin").and.returnValue("min 1");
    var note2 = new Note();
    spyOn(note2, "toneMin");
    
    choir.lowest([note0, note1, note2]);
    
    expect(note1.toneMin).toHaveBeenCalledWith("min 0");
    expect(note2.toneMin).toHaveBeenCalledWith("min 1");
  });
  
  it("returns the result of the last call", function() {
    var note0 = new Note();
    var note1 = new Note();
    var note2 = new Note();
    spyOn(note2, "toneMin").and.returnValue("lowest");
    
    expect(choir.lowest([note0, note1, note2])).toEqual("lowest");
  });
  
});
