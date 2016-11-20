let NectarObstacle = function (ionIconName, className, startX, startY, idCounter) {
  this.className = className;
  this.ionIconName = ionIconName;
  this.x = startX;
  this.y = startY;
  this.startX = startX;
  this.startY = startY;
  this.id = idCounter;
};

NectarObstacle.prototype.changePosition = function (deltaX, deltaY) {
  this.x = this.x + deltaX;
  this.y = this.y + deltaY;
};

export default NectarObstacle;