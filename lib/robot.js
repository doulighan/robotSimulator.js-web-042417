'use strict';
 const directions = ['north', 'east', 'south', 'west']

function Robot() {
  this.coordinates = [0, 0]
  this.numDir = 0
  this.bearing = 'north'
}

Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y]
}
Robot.prototype.advance = function () {

  if (this.bearing === 'north') {
    this.coordinates[1] += 1;
  } else if (this.bearing === 'south') {
    this.coordinates[1] -= 1;
  } else if (this.bearing === 'east') {
    this.coordinates[0] += 1;
  } else if (this.bearing === 'west') {
    this.coordinates[0] -= 1;
  }
}


Robot.prototype.orient = function(direction) {
  if (directions.includes(direction)) {
    this.bearing = direction
    this.numDir = directions.indexOf(direction)
  } else {
    throw new Error('Invalid Robot Bearing')
  }
}

Robot.prototype.turnRight = function() {
  this.numDir = (this.numDir + 1).mod(4)
  this.bearing = directions[this.numDir]
}

Robot.prototype.turnLeft = function() {
  this.numDir = (this.numDir - 1).mod(4)
  this.bearing = directions[this.numDir]
}

Robot.prototype.instructions = function(structs) {
  var out = []
  structs.split('').forEach(function(s) {
    if (s === 'R') {
      out.push('turnRight')
    } else if (s === 'L') {
      out.push('turnLeft')
    } else if (s === 'A') {
      out.push('advance')
    }
  }, this)
  return out
}

Robot.prototype.place = function(obj) {
  console.log(obj)
  this.at(obj.x, obj.y)
  this.orient(obj.direction)
}

Robot.prototype.evaluate = function(structs) {
  var out = this.instructions(structs)
  out.forEach(function(m) {
    this[m]()
  }, this)
}

Number.prototype.mod = function(n) {
  return ((this % n) + n) % n
}
