function Player(audioCtx) {
  this.audioCtx = audioCtx;
  this.bpm = 60;
  this.concertPitch = 440;
}

Player.prototype
.playChoir = function(choir) {
  this.setReferenceTime();
  var chordAndBeat = choir.advanceChord();
  var chord = chordAndBeat[0];
  var startTime = this.asSeconds(chordAndBeat[1]);
  this.prepareOscillators(chord.length, startTime);
  while(chord.length > 0) {
    this.playChord(chord, startTime);
    chordAndBeat = choir.advanceChord();
    chord = chordAndBeat[0];
    startTime = this.asSeconds(chordAndBeat[1]);
  }
  
  this.endTime(startTime);  
};

Player.prototype
.prepareOscillators = function(oscillatorCount, startTime) {
  this.oscillators = [];
  var gain = this.audioCtx.createGain();
  gain.gain.value = 1/oscillatorCount;
  gain.connect(this.audioCtx.destination);
  
  while(this.oscillators.length < oscillatorCount) {
    var oscillator = this.audioCtx.createOscillator();
    this.oscillators.push(oscillator);
    oscillator.connect(gain);
    oscillator.start(startTime);
  }
};

Player.prototype
.setReferenceTime = function() {
  this.referenceTime = this.audioCtx.currentTime;
};

Player.prototype
.asSeconds = function(fraction) {
  return (fraction[0]/fraction[1])*(60/this.bpm)+this.referenceTime+0.25;
};

Player.prototype
.playChord = function(chord, startTime) {
  for(i = 0; i < chord.length; i++) {
    var justFrequency = chord[i].getJustFrequency(this.concertPitch);
    this.oscillators[i].frequency.setValueAtTime(justFrequency, startTime);
  }
};

Player.prototype
.endTime = function(time) {
  this.oscillators.map(function(oscillator) {
    oscillator.stop(time);
  });
};

Player.prototype
.setFrequencies = function(baseTone, partials, time) {
  var osc = this.audioCtx.createOscillator();
  this.oscillators = [osc];
  osc.frequency.value = this.concertPitch*Math.pow(2, baseTone/12)*partials[0];
  osc.connect(this.audioCtx.destination);
  osc.start();
};

Player.prototype
.panic = function() {
  this.oscillators.map(function(oscillator) {
    oscillator.stop();
    oscillator.disconnect();
  });
};