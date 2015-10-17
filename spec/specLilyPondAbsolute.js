describe("lilyPondAbsolute", function() {
  var readerStub;
  beforeEach(function() {
    readerStub = LilyPondReader();
  });
  
  // FIXME: change description text
  xit("with no start-tone, assumes the reference octav of the first tone to " + 
  "be the LilyPond base octav, that is, the seven tones of C major, starting " + 
  "from the C below the middle C on a piano. This is equivalent to picking f " + 
  "as the start tone. The return value is the number of steps in the C major " + 
  "scale from A above the middle C, the one usually 440 hz", function() {
    //      a    b    c    d    e   f   g   a   b   c   d   e   f   g   a_440Hz
    //    -14  -13  -12  -11  -10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0
    var input =    [ "c", "d", "e","f","g","a","b"];
    var expected = [-12, -11, -10, -9, -8, -7, -6];
    for(var i = 0; i < input.length; i++){
      expect(readerStub.lilyPondAbsolute(input[i], "", "")).toBe(expected[i]);
    }
    
  });
  
  it("calls cMajor with both its arguments and returns the result minus 12", function() {
    readerStub.cMajor = jasmine.createSpy("cMajor").and.returnValue(1);
    expect(readerStub.lilyPondAbsolute("tone name", "octave string")).toBe(-11);
    expect(readerStub.cMajor).toHaveBeenCalledWith("tone name", "octave string");
  });
  
});
