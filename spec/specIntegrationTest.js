describe("barbersynth(lilyPondStrings, audioCtx)", function() {
  it("doesn't crash", function() {
    var audioCtx = new OfflineAudioContext(1, 100, 44100);
    var player = new Player(audioCtx);
    expect(function() {
      barbersynth(["a"], player);
    }).not.toThrow();
    
  });
});

describe("barbersynth(lilyPondStrings, audioCtx)", function() {
  
  var audioCtx;
  var player;
  var oscillators = [];
  
  beforeEach(function() {
    audioCtx = new AudioContext();
    var f = function() {
      var oscillator = audioCtx.createOscillator();
      spyOn(oscillator.frequency, "setValueAtTime");
      return oscillator;
    };
    
    oscillators = [f(), f()];
    spyOn(audioCtx, "createOscillator").and
    .returnValues(oscillators[0], oscillators[1]);
    player = new Player(audioCtx);
  });
  
  afterEach(function() {
    audioCtx.close();
  });
  
  it("plays concert pitch a at 440 Hz", function() {

    barbersynth(["a'1"], player);
    
    var startTime = player.referenceTime + 0.25;
    expect(oscillators[0].frequency.setValueAtTime)
    .toHaveBeenCalledWith(440, startTime);
  });
  
  it("plays octavs correctly", function() {
    barbersynth(["a1", "a'1"], player);
    
    var startTime = player.referenceTime + 0.25;
    expect(oscillators[0].frequency.setValueAtTime)
    .toHaveBeenCalledWith(220, startTime);
    expect(oscillators[1].frequency.setValueAtTime)
    .toHaveBeenCalledWith(440, startTime);
  });
  
  it("plays fifths correctly", function() {
    barbersynth(["a1", "e'1"], player);
    
    var startTime = player.referenceTime + 0.25;
    expect(oscillators[0].frequency.setValueAtTime)
    .toHaveBeenCalledWith(220, startTime);
    expect(oscillators[1].frequency.setValueAtTime)
    .toHaveBeenCalledWith(330, startTime);
  });
  
});