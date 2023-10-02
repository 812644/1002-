function Orbiter(x, y, diam){
  this.loc = new JSVector(x, y);
  this.vel =new JSVector(Math.random()*2 - 1, Math.random()*2 - 1);
  this.acc = new JSVector(0,0);
  this.diam = diam;
  this.clr = "rgba(255,255,0,255)";
  this.isOverlapping = false;
  return this;
}

Orbiter.prototype.run = function () {
    this.checkEdges();
    this.checkOverlapping()
    this.update();
    this.render();
  }
  
  //  Check to see if buuble leaves canvas area and reposition in necessary
  Orbiter.prototype.checkEdges = function () {
    if(this.loc.x > canvas.width){
      this.vel.x = 0 - this.vel.x;
    }
    if(this.loc.x < 0){
      this.vel.x = 0 - this.vel.x;
    }
    if(this.loc.y > canvas.height){
      this.vel.y = 0 - this.vel.y;
    }
    if(this.loc.y < 0){
      this.vel.y = 0 - this.vel.y;
    }
  }
  
  //  Sets "this.isOverlapping" to true if bubbles are overlapping
  Orbiter.prototype.checkOverlapping = function () {
    this.isOverlapping = false;
    for (let i = 0; i < movers.length; i++) {
      if (this !== movers[i]) {
        let dx = this.x - movers[i].x;
        let dy = this.y - movers[i].y;
        let d = Math.sqrt(dx * dx + dy * dy)
        if (d < this.diam) {
          this.isOverlapping = true;
          return;
        }
  
      }
    }
  }
  
  // renders a bubble to the canvas
  Orbiter.prototype.render = function () {
    if (this.isOverlapping) {
      context.strokeStyle = "DarkSeaGreen";  // color to fill
      context.fillStyle = "DarkSeaGreen";     // color to stroke
    } else {
      context.strokeStyle = "DarkSlateGray";  // color to fill
      context.fillStyle = "DarkSlateGray";     // color to stroke
    }
    // create the circle path
    context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.arc(this.loc.x, this.loc.y, this.diam, 0, 2 * Math.PI);
  
    context.fill();     // render the fill
    context.stroke();   // render the stroke
  }

  Orbiter.prototype.update = function (){
    let theta =  this.arr[0].loc.getDirection();
    this.arr[0].loc.x = this.or.getMagnitude()*Math.cos(theta+this.acc.x);
    this.arr[0].loc.y = this.or.getMagnitude()*Math.sin(theta+this.acc.y);
  }