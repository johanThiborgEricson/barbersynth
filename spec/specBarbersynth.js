describe("barberSynth(lilyPondStrings, player), where there is just one " + 
"Lily Pond string,", function() {
  
  var interpreter;
  var audioCtx = new AudioContext();
  var choir;
  var player;

  beforeEach(function() {
    interpreter = new LilyPondInterpreter();
    spyOn(interpreter, "melody").and.returnValues("first notes", "second notes");
    spyOn(window, "LilyPondInterpreter").and.returnValue(interpreter);
    // new operator forces non-object return values to be ignored
    spyOn(window, "Voice").and.returnValue({the: "voice"});
    choir = new Choir([]);
    spyOn(window, "Choir").and.returnValue(choir);
    player = new Player(audioCtx);
    spyOn(player, "playChoir");
  });
  
  afterAll(function() {
    audioCtx.close();
  });
  
  it("creates a new LilyPondInterpreter with Note and calls melody on it with" + 
  "the first  Lily Pond string", function() {
    barbersynth(["Lily Pond string"], player);
    
    expect(LilyPondInterpreter).toHaveBeenCalledWith(Note);
    expect(interpreter.melody).toHaveBeenCalledWith("Lily Pond string");
  });
  
  it("creates a new Voice with the result of melody", function() {
    barbersynth(["Lily Pond string"], player);
    
    expect(Voice).toHaveBeenCalledWith("first notes");
  });
  
  it("creates a new Choir with the voice in an array", function() {
    barbersynth(["Lily Pond string"], player);
    
    expect(Choir).toHaveBeenCalledWith([{the: "voice"}]);
  });
  
  it("calls playChoir on player with choir", function() {
    barbersynth(["Lily Pond string"], player);
    
    expect(player.playChoir).toHaveBeenCalledWith(choir);
  });
  
  it("calls melody on interpreter with each of the lily pond strings", 
  function () {
    barbersynth(["lps1", "lps2"], player);
    
    expect(interpreter.melody).toHaveBeenCalledWith("lps2");
  });
  
  it("creates one voice per lily pond string", 
  function () {
    barbersynth(["lps1", "lps2"], player);
    
    expect(Voice).toHaveBeenCalledWith("second notes");
  });
  
});