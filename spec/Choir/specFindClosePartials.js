describe("(new Choir()).findClosePartials(suggestedFundamental, notes)", 
function() {
  
  it("calls findClosePartial on each note with the suggested fundamental", 
  function() {
    var notes = [new Note(), new Note()];
    notes.map(function(note) {
      spyOn(note, "findClosePartial").and.returnValue(true);
    });
    var choir = new Choir();
    
    choir.findClosePartials("the suggested fundamental", notes);
    
    notes.map(function(note) {
      expect(note.findClosePartial)
      .toHaveBeenCalledWith("the suggested fundamental");
    });
  });
  
  it("returns true if all notes succed", function(){
    var notes = [new Note(), new Note()];
    notes.map(function(note) {
      spyOn(note, "findClosePartial").and.returnValue(true);
    });
    var choir = new Choir();
    
    expect(choir.findClosePartials("fundamental", notes)).toBe(true);
  });
  
  it("returns false if sone note returns false, subsequent notes shouldn't " + 
  "be called", function(){
    var notes = [new Note(), new Note(), new Note()];
    spyOn(notes[0], "findClosePartial").and.returnValues(true);
    spyOn(notes[1], "findClosePartial").and.returnValues(false);
    spyOn(notes[2], "findClosePartial").and.returnValues(true);
    
    var choir = new Choir();
    
    expect(choir.findClosePartials("fundamental", notes)).toBe(false);
    expect(notes[2].findClosePartial).not.toHaveBeenCalled();
  });
  
  it("resets fundamental and partial on all notes if one fails", function() {
    var notes = [new Note(), new Note()];
    spyOn(notes[0], "findClosePartial").and.returnValues(true);
    spyOn(notes[1], "findClosePartial").and.returnValues(false);
    notes[0].fundamental = "fundamental";
    notes[0].partial = "partial";
    var choir = new Choir();
    
    choir.findClosePartials("fundamental", notes);
    
    expect(notes[0].fundamental).toBe(undefined);
    expect(notes[0].partial).toBe(undefined);
  });
  
});
