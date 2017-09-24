var effect_fog_pt = function(tv,tx,ty,tn){
	this.v = tv;
	this.x = tx;
	this.y = ty;
	this.next = tn;
	
	this.p = rand()*TWO_PI;
	this.speed = 1/10;
	
	this.setNext = function(n){this.next = n;};
	this.clone = function(){return new effect_fog_pt(this.v,this.x,this.y,this);};
	
	this.getX = function(){
		return this.x-(1+sin(this.p+M.p*this.speed))/2*this.v.amp*(this.y-this.next.y)/dist(this.x,this.y,this.next.x,this.next.y)*this.v.fixX;
	};
	this.getY = function(){
		return this.y+(1+sin(this.p+M.p*this.speed))/2*this.v.amp*(this.x-this.next.x)/dist(this.x,this.y,this.next.x,this.next.y)*this.v.fixY;
	};
	
}

effect.prototype.fog.prototype.pt = effect_fog_pt;