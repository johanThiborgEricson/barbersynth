describe("(new Player(audioCtx))" + 
".playChord(notes, startTime)", function() {
  it("calls getJustFrequency on the first note with this.concertPitch", 
  function() {
    var audioCtx = new OfflineAudioContext(1, 100, 44100);
    var player = new Player(audioCtx);
    player.prepareOscillators(1);
    var note = new Note();
    spyOn(note, "getJustFrequency").and.returnValue(0);
    
    player.concertPitch = "concert pitch";
    player.playChord([note], 0);
    
    expect(note.getJustFrequency).toHaveBeenCalledWith("concert pitch");
  });
  
  it("schedules oscillators[0] frequency to to change to the result of " + 
  "getJustFrequency", function(done) {
    var audioCtx = new OfflineAudioContext(1, 100, 44100);
    var oscillator = audioCtx.createOscillator();
    spyOn(oscillator.frequency, "setValueAtTime").and.callThrough();
    spyOn(audioCtx, "createOscillator").and.returnValue(oscillator);
    var player = new Player(audioCtx);
    player.prepareOscillators(1);
    var note = new Note();
    spyOn(note, "getJustFrequency").and.returnValue(441);
    
    player.playChord([note], 0);

    expect(oscillator.frequency.setValueAtTime)
    .toHaveBeenCalledWith(441, 0);
    player.audioCtx.startRendering().then(function(buffer) {
      expect(player.oscillators[0].frequency.value).toBe(441);
      done();
    });
  });
  
  it("makes a sound", function(done) {
    var audioCtx = new OfflineAudioContext(1, 100, 44100);
    var player = new Player(audioCtx);
    var note = new Note();
    spyOn(note, "getJustFrequency").and.returnValue(441);
    player.prepareOscillators(1);
    
    player.concertPitch = 441;
    player.playChord([note], 0);

    player.audioCtx.startRendering().then(function(buffer) {
      var pcm = buffer.getChannelData(0);
      expect(pcm[25]).not.toBe(0);
      done();
    });
  });
  
  it("schedules oscilator to change at start time", function() {
    var audioCtx = new OfflineAudioContext(1, 100, 44100);
    var player = new Player(audioCtx);
    var note = new Note();
    spyOn(note, "getJustFrequency").and.returnValue(440);
    var osc = audioCtx.createOscillator();
    spyOn(osc.frequency, "setValueAtTime");
    spyOn(audioCtx, "createOscillator").and.returnValue(osc);
    player.prepareOscillators(1);
    
    player.playChord([note], 1.0);
    
    expect(osc.frequency.setValueAtTime).toHaveBeenCalledWith(440, 1.0);
  });
  
  it("plays all the notes in the chord", function() {
    var audioCtx = new OfflineAudioContext(1, 100, 44100);
    var player = new Player(audioCtx);
    var notes = [new Note(), new Note()];
    notes.map(function(note) {
      spyOn(note, "getJustFrequency");
    });
    
    player.prepareOscillators(2);
    player.oscillators.map(function(oscillator) {
      spyOn(oscillator.frequency, "setValueAtTime");
    });

    player.playChord(notes, 2.0);
    
    notes.map(function(note) {
      expect(note.getJustFrequency).toHaveBeenCalled();
    });
    
    player.oscillators.map(function(oscillator) {
      expect(oscillator.frequency.setValueAtTime).toHaveBeenCalled();
    });
    
  });
  
});