describe("(new Note(tone, duration)).addTime(time)", function() {
  
  it("calls add on time with duration and returns the result", function() {
    var time = new Fraction();
    spyOn(time, "add").and.returnValue("sum");
    var note = new Note("tone", "duration");
    
    expect(note.addTime(time)).toEqual("sum");
    
    expect(time.add).toHaveBeenCalledWith("duration");
  });
  
});
