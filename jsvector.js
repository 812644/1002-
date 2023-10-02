// JSVector -- a Javascript 2D vector class

// The class constructor
function JSVector(x = 0,y = 0){
        // called with two arguments
        this.x = x;
        this.y = y;
}

// Set the magnitude of the vector,
// retaining the angle (direction).
JSVector.prototype.setMagnitude = function(mag){
  let theta = this.getDirection();
  this.x = Math.cos(theta)*mag
  this.y = Math.sin(theta)*mag;

}

// Get the magnitude of the vector using pythagorean theorem
JSVector.prototype.getMagnitude = function(){
  return Math.sqrt(this.x*this.x + this.y*this.y);
}

// Set the angle (direction) of the vector,
// retaining the magnitude.
JSVector.prototype.setDirection = function(angle){
  let mag = this.getMagnitude()
  this.x = Math.cos(angle)*mag;
  this.y = Math.sin(angle)*mag;

}

// Get the direction (angle) of the vector
JSVector.prototype.getDirection = function(){
  return Math.atan2(this.y , this.x);
}

// Add another vector to this vector
JSVector.prototype.add = function(v2){
  this.x += v2.x;
  this.y += v2.y;
}

// Subtract another vector from this vector
JSVector.prototype.sub = function(v2){
  this.x -= v2.x;
  this.y -= v2.y;
}

// Class method to return a new vector that is the sum of two vectors
JSVector.addGetNew = function(v1,v2){
  let v3 = JSVector(v1.JSVector.prototype.add(v2));
  return v3;
}

// Class method to return a new vector that is the difference of two vectors
JSVector.subGetNew = function(v1,v2){
  let v3 = new JSVector(v1.x - v2.x, v1.y - v2.y);
  return v3;
 
}

// Multiply this vector by a scalar
JSVector.prototype.multiply = function(scalar){
  this.x = this.x*scalar;
  this.y = this.y*scalar;

}

// Divide this vector by a scalar
JSVector.prototype.divide = function(scalar){
  this.x = this.x / scalar;
  this.y = this.y / scalar;

}

// Normalize this vector so that it has a magnitude of 1
JSVector.prototype.normalize = function(){
  let theta = this.getDirection();
  this.x = Math.cos(theta);
  this.y = Math.sin(theta);


}

// Limit the magnitude of this vector
JSVector.prototype.limit = function(lim){
 if (this.getMagnitude()>lim){
  let mag = this.setMagnitude(lim);
 }
 return this;
}

// Get the distance between this vector and another one
JSVector.prototype.distance = function(v2){
 return Math.sqrt(this.distanceSquared(v2));
}

// Get square of the distance between this vector and another one
JSVector.prototype.distanceSquared = function(v2){
  return (this.x-v2.x)*(this.x-v2.x)+(this.y-v2.y)*(this.y-v2.y);

}

// Rotate this vector by some number of radians
// using the rotation matrix |  cos   -sin  |
//                           |  sin   +cos  |

JSVector.prototype.rotate = function(angle) {
    let x = this.x;
    let y = this.y
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);

    this.x = x*cos - y*sin;
    this.y = x*sin +y*cos;

    return this;
}


// Get the angle between this vector and another one
JSVector.prototype.angleBetween = function(v2){
  return Math.abs(this.getDirection - v2.getDirection);
}

// Make a copy of this vector
JSVector.prototype.copy = function(){
  let x = this.x;
  let y = this.y;
  return new JSVector(x, y);
}

// Override inherited toString() to describe this instance
JSVector.prototype.toString = function() {
   return "x = " + this.x + " y = " + this.y + "  magnitude = " + this.getMagnitude() + "  direction = " + this.getDirection()/Math.PI*180;
}

JSVector.prototype.attract = function (b2){
  let acc = new JSVector.subGetNew(this, b2);
  acc.normalize();
  acc.multiply(.05);
  this.vel.add(this.acc);
  this.loc.add(this.vel);
}
