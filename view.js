var view = function(tfx,tfy,tfw,tfh,tmiddleDef){
	M.views.push(this);
	
	this.fx = tfx;
	this.fy = tfy;
	this.fw = tfw;
	this.fh = tfh;
	this.middleDef = tmiddleDef;
	
	this.resize();
}

view.prototype.resize = function(){
	for(var i = 0; i < 3; i++){
		this.x = this.fx(this.y,this.w,this.h);
		this.y = this.fy(this.x,this.w,this.h);
		this.w = this.fw(this.x,this.y,this.h);
		this.h = this.fh(this.x,this.y,this.w);
	}
	this.s = sqrt(this.w*this.w+this.h*this.h);
	this.fixX = this.s/this.w;
	this.fixY = this.s/this.w;
}

view.prototype.asX = function(x){
	return this.x+this.w*x;
}

view.prototype.asY = function(y){
	return this.y+this.h*y;
}

view.prototype.lineTo = function(x,y){
	g.lineTo(this.asX(x),this.asY(y));
}

view.prototype.wiggleRect = function(x,y,w,h,p){
	x = this.asX(x);
	y = this.asY(y);
	w = w*this.w;
	h = h*this.h;
	s = sqrt(w*w+h*h);
	
	g.beginPath();
	
	for(var i = 0; i < p.length; i++){
		
		var xx = ((i+.51)/p.length)*(w*2+h*2);
		var yy = (sin(p[i]+M.p/10)+1)/2*s*.02;
		if(xx < w){
			g.lineTo(x-w/2+xx,y-h/2-yy);
		} else {
		
			xx-=w;
			if(xx < h){
				g.lineTo(x+w/2+yy,y-h/2+xx);
			} else {
				xx-=h;
				if(xx < w){
					g.lineTo(x+w/2-xx,y+h/2+yy);
				} else {
				
					xx-=w;
					g.lineTo(x-w/2-yy,y+h/2-xx);
				}
			}
		}
	}
	
	g.closePath();
	g.fill();
	
}

view.prototype.line = function(x,y,dx,dy,sideStep){
	var s = sideStep || 0;
	
	g.beginPath();
	
	if(s > 0){
		relMag = g.lineWidth/sqrt(dx*dx*this.w*this.w+dy*dy*this.h*this.h);
		var offX = -dy*this.h*relMag;
		var offY = dx*this.w*relMag;
		g.moveTo(this.asX(x)+offX,this.asY(y)+offY);
		g.lineTo(this.asX(x+dx)+offX,this.asY(y+dy)+offY);
	} else {
		g.moveTo(this.asX(x),this.asY(y));
		g.lineTo(this.asX(x+dx),this.asY(y+dy));
	}
	
	g.stroke();
}