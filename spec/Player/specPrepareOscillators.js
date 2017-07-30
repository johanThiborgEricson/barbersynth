describe("(new Player(audioCtx))" + 
".prepareOscillators(oscillatorCount, startTime)",
function() {
  
  it("creates a gain node and sets its gain to 1/oscillatorCount and " + 
  "connects it to destination", function() {
    var audioCtx = new AudioContext();
    var gain = audioCtx.createGain();
    spyOn(gain, "connect");
    spyOn(audioCtx, "createGain").and.returnValue(gain);
    var player = new Player(audioCtx);
    
    player.prepareOscillators(2, 0);
    
    expect(gain.gain.value).toBe(0.5);
    expect(gain.connect).toHaveBeenCalledWith(audioCtx.destination);
    audioCtx.close();
  });
  
  it("creates oscillators untill there are oscillatorCount oscillators, "  + 
  "connects them to the gain and schedules them to start at startTime", 
  function() {
    var audioCtx = new AudioContext();
    var osc1 = audioCtx.createOscillator();
    spyOn(osc1, "connect");
    spyOn(osc1, "start");
    var osc2 = audioCtx.createOscillator();
    spyOn(osc2, "connect");
    spyOn(osc2, "start");
    spyOn(audioCtx, "createOscillator").and.returnValues(osc1, osc2);
    var gain = audioCtx.createGain();
    spyOn(audioCtx, "createGain").and.returnValue(gain);
    var player = new Player(audioCtx);
    
    player.prepareOscillators(2, "start time");
    
    expect(player.oscillators[0]).toBe(osc1);
    expect(player.oscillators[1]).toBe(osc2);
    
    expect(osc1.connect).toHaveBeenCalledWith(gain);
    expect(osc2.connect).toHaveBeenCalledWith(gain);
    
    expect(osc1.start).toHaveBeenCalledWith("start time");
    expect(osc2.start).toHaveBeenCalledWith("start time");

    audioCtx.close();
  });
  
});