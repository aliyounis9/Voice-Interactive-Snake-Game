class Snake{
  constructor(){
    this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
  }
  
  update(){
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x=(head.x+this.xdir+w)%w;
    head.y=(head.y+this.ydir+h)%h;
    this.body.push(head);
  }
  
  endGame(){
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    // if(x >= w || x < 0 || y >= h || y < 0){
    //   return true;
    // }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if(part.x == x && part.y == y){
        return true;
      }
    }
    return false;
  }
  
  changeDir(x, y){
    this.xdir = x;
    this.ydir = y;
  }
  
  grow(){
    this.body.push(this.body[this.body.length-1].copy());
  }
  
  
  foodAte(pos){
    if(pos.x == this.body[this.body.length-1].x && pos.y == this.body[this.body.length-1].y){
      this.grow();
      return true;
    }
    return false;
  }
  
  show(){
    for(let i = 0; i < this.body.length; i++){
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
    
}
