var effect = function(){
	M.todo.push(this);
	
	this.mkX = function(o){return function(x){return c.width*(o.x+o.w*x);};};
	this.mkY = function(o){return function(y){return c.height*(o.y+o.h*y);};};
	
	this.fView = {};
	this.fView.mkX = this.mkX(this.fView);
	this.fView.mkY = this.mkY(this.fView);
	
	this.l = {};
	this.l.mkX = this.mkX(this.fView);
	this.l.mkY = this.mkY(this.fView);
	
	this.waveH = 1;
	this.waveW = 4;
	this.a = .25;
	this.todo = [];
	this.lasers = 0;
	this.fogs = 0;
}

effect.prototype.setup = function(){
	this.laserView = new view(
			function(y,w,h){return 0;},
			function(x,w,h){return 0;},
			function(x,y,h){return c.width;},
			function(x,y,w){return c.height;});
	var fv = {};
	fv = new view(
			function(y,w,h){return fv.amp;},
			function(x,w,h){return c.height-x-h;},
			function(x,y,h){return c.width-2*x;},
			function(x,y,w){return w;});
	this.fogView = fv;
	this.fogView.amp = .03;
	this.fogView.wl = .03;
}

effect.prototype.update = function(){
	
	this.xPad = (E.waveH+E.waveW)*M.s*2/c.width;
	this.yPad = (E.waveH+E.waveW)*M.s*2/c.height;
	this.xMin = -this.xPad;
	this.yMin = -this.yPad;
	this.xMax = 1+this.xPad;
	this.yMax = 1+this.yPad;
	this.width = this.xMax-this.xMin;
	this.height = this.yMax-this.yMin;
	this.dMax = this.width+this.height;
	
	//yMin,height
	this.heightF = this.w;
	this.yMinF = this.yMax-this.heightF;
	
	if(this.lasers < 5 && rand()<.02){
		new this.laser(this.laserView);
		this.lasers++;
	}
	
	if(this.fogs < 5 && rand()<.005){
		new this.fog(this.fogView);
		this.fogs++;
	}
	
	this.laserASum = 0;
	for(var i = 0; i < this.todo.length; i++){
		if(this.todo[i].update() === false){
			this.todo.splice(i,1);
		}
	}
}

effect.prototype.draw = function(){
	g.fillStyle = "rgb(255,255,255,"+(.15+this.laserASum/60)+")";
	g.fillRect(0,0,c.width,c.height);
	this.todo.forEach(function(e){
		e.draw();
	});
}

effect.prototype.smoothTo = function(p1,p2,p3){
	var x1 = p1.getX(p2);
	var y1 = p1.getY(p2);
	var x2 = p2.getX(p3);
	var y2 = p2.getY(p3);
	var x_mid = (x1+x2)/2;
	var y_mid = (y1+y2)/2;
	var cp_x1 = (x_mid + x1) / 2;
	var cp_y1 = (y_mid + y1) / 2;
	var cp_x2 = (x_mid + x2) / 2;
	var cp_y2 = (y_mid + y2) / 2;
	g.quadraticCurveTo(cp_x1,y1 ,x_mid, y_mid);
	g.quadraticCurveTo(cp_x2,y2 ,x2,y2);
}

var E = new effect();