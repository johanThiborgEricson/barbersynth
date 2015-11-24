describe("Song().connectRadioEventHandler(lilyPondsForm) puts an event-" +
"handler on _radio that, when dispatched,", function() {
  
  it("removes all children of lilyPondsForm", function() {
    var song = Song("", []);
    var lilyPondsForm = document.createElement("FORM");
    lilyPondsForm.appendChild(document.createElement("INPUT"));
    lilyPondsForm.appendChild(document.createElement("INPUT"));

    song.connectRadioEventListener(lilyPondsForm);
    expect(lilyPondsForm.firstChild).toBeTruthy();
    song._radio.dispatchEvent(new MouseEvent("click"));
    
    expect(lilyPondsForm.firstChild).toBeFalsy();
  });
  
  it("adds each element in _lilyPonds to lilyPondsForm", function() {
    var song = Song("", []);
    var input1 = document.createElement("INPUT");
    var input2 = document.createElement("INPUT");
    expect(song._lilyPonds).toBeDefined();
    song._lilyPonds = [input1, input2];
    var lilyPondsForm = document.createElement("FORM");

    song.connectRadioEventListener(lilyPondsForm);
    song._radio.dispatchEvent(new MouseEvent("click"));
    
    expect(lilyPondsForm.firstChild).toBe(input1);
    expect(lilyPondsForm.lastChild).toBe(input2);
  });
  
});
