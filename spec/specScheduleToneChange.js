describe("scheduleToneChange", function(){
  it("calls the computation-methods", function(){
    var bsStub = new Barbersynth();
    bsStub.computeBaseToneAndPartials = jasmine
    .createSpy("computeBaseToneAndPartials").and.returnValue({
      partials: "partials",
    });
    bsStub.normalizePartials = jasmine.createSpy("normalizePartials");
    bsStub.computeStartTime = jasmine.createSpy("computeStartTime");
    
    bsStub.scheduleToneChange({
      tones: "tones",
      duration: "duration",
    });
    
    expect(bsStub.computeBaseToneAndPartials).toHaveBeenCalledWith("tones");
    expect(bsStub.normalizePartials).toHaveBeenCalledWith("partials");
    expect(bsStub.computeStartTime).toHaveBeenCalledWith("duration");
  });
  
  xit("doesn't make heavy computations between computeStartTime and schedulilńg", function(){
    
  });
});
