function barbersynth(lilyPondStrings, player) {
  //  TODO: Is it really necessary to pass the Note constructor as an argument?
  var interpreter = new LilyPondInterpreter(Note);
  var voices = lilyPondStrings.map(function(lilyPondString) {
    var notes = interpreter.melody(lilyPondString);
    return new Voice(notes);
  });
  
  var choir = new Choir(voices);
  player.playChoir(choir);

}