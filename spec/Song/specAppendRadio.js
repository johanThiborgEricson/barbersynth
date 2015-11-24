describe("Song().appendRadio(titleForm)", function() {
  
  it("appends _radio to titleForm", function() {
    var song = Song("", []);
    var titleForm = document.createElement("FORM");

    song.appendRadio(titleForm);
    
    expect(titleForm.firstChild).toBe(song._radio);
  });
  
});
