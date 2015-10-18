
describe("ParseLilyPondTerm", function() {
  var readerStub;
  var expected;
  beforeEach(function(){
    readerStub = LilyPondReader();
    expected = ["a", "", "", "", ""];
  });
  
  it("recognizes tones a to g", function(){
    var tones = ["a", "b", "c", "d", "e", "f", "g"];
    tones.map(function(tone) {
      expected[0] = tone;
      expect(readerStub.parseLilyPondTerm(tone)).toEqual(expected);
    });
    
  });
  
  it("reads accidentals es, eses, is and isis", function(){
    var accidentals = ["es", "eses", "is", "isis"];
    accidentals.map(function(accidental) {
      expected[1] = accidental;
      expect(readerStub.parseLilyPondTerm("a" + accidental)).toEqual(expected);
    });
  });
  
  it("reads multiple commas as signs of ocavation down", function() {
    var octavations = [",", ",,", "'", "''"];
    octavations.map(function(octavation) {
      expected[2] = octavation;
      expect(readerStub.parseLilyPondTerm("a" + octavation)).toEqual(expected);
    });
  });
  
  it("reads powers of two as reciprocal length of note", function() {
    var powersOfTwo = ["1", "2", "4", "8", "16", "32", "64", "128"];
    powersOfTwo.map(function(powerOfTwo) {
      expected[3] = powerOfTwo;
      expect(readerStub.parseLilyPondTerm("a" + powerOfTwo)).toEqual(expected);
    });
    
  });
  
  it("reads dots as 2-2^(-n) length, where n is number of dots", function() {
    expected[4] = ".";
    expect(readerStub.parseLilyPondTerm("a.")).toEqual(expected);
    expected[4] = "..";
    expect(readerStub.parseLilyPondTerm("a..")).toEqual(expected);
    
  });
  
});
