var effect_fog = function(tv){
	E.todo.push(this);
	
	this.v = tv;
	this.arc = 0;
	this.dArc = PI/30/60;
	this.amp = .3;
	this.dx = .0005;
	this.pts = [];
	this.genPt = new this.pt(this.v,1,1,undefined);
}

effect_fog.prototype.update = function(){
	for(var i = 0; i < this.pts.length; i++){
		this.pts[i].x -= this.dx;
		
		if(this.pts[i].x<=0){
			this.pts.splice(i, 1);
			i--;
			if(this.pts.length <= 1){
				return false;
			}
		}
	}
	
	if(this.arc <= PI){
		this.arc += this.dArc;
		this.genPt.y = 1-sqrt(sin(this.arc))*this.amp;
		this.genPt.x = 1;
		
		if(this.pts.length == 0 || dist(this.pts[this.pts.length-1].x,this.pts[this.pts.length-1].y,this.genPt.x,this.genPt.y)>=this.v.wl){
			this.pts.push(this.genPt.clone());
			if(this.pts.length > 1){
				this.pts[this.pts.length-2].setNext(this.pts[this.pts.length-1]);
			}
		}
	} else {
		this.genPt.y = 1;
		this.genPt.x -= this.dx;
	}
	
	return true;
}

effect_fog.prototype.draw = function(){
	
	g.fillStyle = "rgb(255,255,255,"+this.a+")";
	g.beginPath();
	
	this.v.lineTo(this.pts[0].x,1);
	for(var i = 0; i < this.pts.length; i++){
		this.v.lineTo(this.pts[i].getX(),this.pts[i].getY());
	}
	this.v.lineTo(this.genPt.x,1);
	
	g.closePath();
	g.fill();
	
}

effect.prototype.fog = effect_fog;