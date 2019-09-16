class myLine{
  constructor(a,b,c,d,length){
    this.start = createVector(a,b);
    this.end=createVector(c,d);
    this.children = null;
    this.length=length;
  }
  
  show(){
    line(this.start.x,this.start.y,this.end.x,this.end.y);
  }
  
  initChildren(){
    let ret = [];
    let seg3 = p5.Vector.sub(this.end,this.start).mult(1/3);
    ret[0] = new myLine(0,0,0,0,0);
    ret[0].start = createVector(this.start.x,this.start.y);
    ret[0].end = p5.Vector.add(this.start,seg3);
    
    ret[1] = new myLine(0,0,0,0,0);
    ret[1].start = ret[0].end.copy();
    let diff = seg3.copy();
    diff.rotate(mouseY/height*2*PI) // Plying around with this value leads to other nice fractals :D. Negative values "eat away" at the original, while positive values add to it 
    ret[1].end = p5.Vector.add(ret[1].start,diff);
    ret[2] = new myLine(0,0,0,0,0);
    ret[2].start = ret[1].end.copy();
    ret[2].end = p5.Vector.sub(this.end,seg3)
    
    ret[3] = new myLine(0,0,0,0,0);
    ret[3].start = ret[2].end.copy();
    ret[3].end = createVector(this.end.x,this.end.y);
    
    this.children = ret;
  }
}