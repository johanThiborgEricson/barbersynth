describe("lilyPondAbsolute", function() {
  var readerStub;
  beforeEach(function() {
    readerStub = LilyPondReader();
    readerStub.octaveChange = function() {
      return arguments[0];
    };
    
  });
  
  it("calls cMajor with its supplied tone name", function() {
    readerStub.cMajor = jasmine.createSpy("cMajor");
    readerStub.lilyPondAbsolute("tone name", "octave string");
    expect(readerStub.cMajor).toHaveBeenCalledWith("tone name");
  });
  
  it("calls octave change with the result of cMajor and octaveString", function(){
    readerStub.cMajor = jasmine.createSpy("cMajor").and.returnValue("c major");
    readerStub.octaveChange = jasmine.createSpy("octaveChange");
    readerStub.lilyPondAbsolute("tone name", "octave string");
    expect(readerStub.octaveChange).toHaveBeenCalledWith("c major", "octave string");
  });
  
  it("returns the result of changeOctave minus 12", function(){
    readerStub.cMajor = jasmine.createSpy("cMajor").and.returnValue("c major");
    readerStub.octaveChange = jasmine.createSpy("octaveChange").and
    .returnValue(1);
    expect(readerStub.lilyPondAbsolute("c", "octave string")).toBe(-11);
  });
  
  it("when called with an empty octave string, returns a tone from the " + 
  "LilyPond base octav, that is, the seven tones of C major, starting " + 
  "from the C below the middle C on a piano. The return value is the number " + 
  "of steps in the A minor scale from A above the middle C, the one usually 440 hz", function() {
    //      a    b    c    d    e   f   g   a   b   c   d   e   f   g   a_440Hz
    //    -14  -13  -12  -11  -10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0
    var input =    [ "c", "d", "e","f","g","a","b"];
    var expected = [-12, -11, -10, -9, -8, -7, -6];
    var reader = LilyPondReader();
    for(var i = 0; i < input.length; i++){
      expect(reader.lilyPondAbsolute(input[i], "")).toBe(expected[i]);
    }
    
  });
});
