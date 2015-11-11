describe("Choire(voices).advanceCord(f0suggestor)", function() {
  it("calls advanceTime on all voices with argument _time and " +
  "returns an array of the results", 
  function() {
    var voice0 = Voice();
    spyOn(voice0, "advanceTime");
    var voice1 = Voice();
    spyOn(voice1, "advanceTime");
    var choir = Choir([voice0, voice1]);
    choir._time = "time";
    spyOn(choir, "getFrequencies");
    choir.advanceChord();
    
    expect(voice0.advanceTime).toHaveBeenCalledWith("time");
    expect(voice1.advanceTime).toHaveBeenCalledWith("time");
  });
  
  it("calls getFrequecies with an array of the results of advanceTime", 
  function() {
    var voice0 = Voice();
    spyOn(voice0, "advanceTime").and.returnValue("note 0");
    var voice1 = Voice();
    spyOn(voice1, "advanceTime").and.returnValue("note 1");
    var choir = Choir([voice0, voice1]);
    spyOn(choir, "getFrequencies");
    choir.advanceChord();
    expect(choir.getFrequencies).toHaveBeenCalledWith(["note 0", "note 1"]);
  });
  
  it("calls playFrequencies with the result of getFrequencies", function() {
    var choir = Choir([]);
    spyOn(choir, "getFrequencies").and.returnValue("frequencies");
    spyOn(choir, "playFrequencies");
    choir.advanceChord();
    expect(choir.playFrequencies).toHaveBeenCalledWith("frequencies");
  });
  
});
