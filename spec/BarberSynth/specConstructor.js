describe("BarberSynth({title1: lilyPonds1, ... , titleN: lilyPondsN})", 
function(){
  
  it("adds n songs to _songs with _title = titleK and _lilyPonds = lilyPondsK", 
  function() {
    var songs = {};
    songs["title 1"] = ["lily pond 1"];
    songs["title 2"] = ["lily pond 2"];
    
    var barberSynth = BarberSynth(songs);
    
    var expected1 = Song("title 1", ["lily pond 1"]);
    var expected2 = Song("title 2", ["lily pond 2"]);
    expect(barberSynth._songs).toEqual([expected1, expected2]);
  });
  
  it("sets _titleForm and lilyPondsForm to two new form-elements", function() {
    var barberSynth = BarberSynth({});
    
    expect(barberSynth._titleForm instanceof HTMLFormElement).toBe(true);
    expect(barberSynth._lilyPondsForm instanceof HTMLFormElement).toBe(true);
  });
  
  it("sets _playJust to a new button-element", function() {
    var barberSynth = BarberSynth({});
    
    expect(barberSynth._playJust instanceof HTMLButtonElement).toBe(true);
  });
  
});
