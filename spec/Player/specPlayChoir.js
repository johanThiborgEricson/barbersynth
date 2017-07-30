describe("(new Player()).playChoir(choir)", function() {
  
  var player;
  var choir;
  
  beforeEach(function() {
    player = new Player();
    choir = new Choir();
    spyOn(player, "setReferenceTime");
    spyOn(player, "playChord");
    spyOn(player, "prepareOscillators");
    spyOn(player, "endTime");
  });
  
  it("calls setReferenceTime", function() {
    spyOn(player, "asSeconds");
    spyOn(choir, "advanceChord").and.returnValues([[],]);
    
    player.playChoir(choir);
    
    expect(player.setReferenceTime).toHaveBeenCalled();
  });
  
  it("calls advanceChord() and calls asSeconds with the second element of " + 
  "the result", function() {
    spyOn(player, "asSeconds");
    spyOn(choir, "advanceChord").and.returnValues(
      ["chord", "start time"], [[],]);
    
    player.playChoir(choir);
    
    expect(player.asSeconds).toHaveBeenCalledWith("start time");
  });
  
  it("calls prepareOscillators with the number of notes in the first chord " + 
  "and the result of asSeconds", 
  function() {
    spyOn(player, "asSeconds").and.returnValue("start time");
    spyOn(choir, "advanceChord").and.returnValues(
      [["n1", "n2", "n3"],], [[],]);
    
    player.playChoir(choir);
    
    expect(player.prepareOscillators).toHaveBeenCalledWith(3, "start time");
  });
  
  it("calls playChord() with the result chord-part of the result of advance " + 
  "chord and the result of asSeconds", 
  function() {
    spyOn(choir, "advanceChord").and.returnValues(
      ["chord", "beat"], [[],]);
    spyOn(player, "asSeconds").and.returnValue("start time");
    
    player.playChoir(choir);
    
    expect(player.playChord).toHaveBeenCalledWith("chord", "start time");
  });
  
  it("calls player.endTime with start time instead of calling playChord " + 
  "if advanceChord returns null as chord", function() {
    spyOn(choir, "advanceChord").and.returnValues([[], "end beat"]);
    spyOn(player, "asSeconds").and.returnValue("start(?) time");
    player.playChoir(choir);
    
    expect(player.playChord).not.toHaveBeenCalled();
    expect(player.endTime).toHaveBeenCalledWith("start(?) time");
  });
  
  it("calls advanceChord until it returns null as chord, but not after", 
  function() {
    spyOn(choir, "advanceChord").and.returnValues(
      ["c1", "b1"], ["c2", "b2"], [[], "b3"], ["c4", "b4"]);
    spyOn(player, "asSeconds").and.returnValues("s1", "s2", "s3", "s4");
    
    player.playChoir(choir);
    
    expect(player.playChord).toHaveBeenCalledWith("c2", "s2");
    expect(player.playChord).not.toHaveBeenCalledWith("c4", "s4");
    expect(player.endTime).toHaveBeenCalledWith("s3");
  });
  
});
  
