var effect_laser = function(tv){
	E.todo.push(this);
	
	this.v = tv;
	this.side = rand()<.5 ? 1 : -1;
	this.x = 0;
	this.y = 0;
	this.p = rand()*TWO_PI;
	this.on = false;
	this.pair = rand()<.5?true:false;
	this.a = 0;
	this.c = rand()<.33?0:rand()<.5?120:-120;
	this.strength = rand()*.9;
}

effect_laser.prototype.update = function(){
	
	this.x = .5+.5*this.side;
	this.y = .5+.5*sin3(M.p/100+this.p);
	this.dir = sin(PI/2+M.p/41+this.p)*PI/4-(this.y-.5)*PI/4;
	
	
	this.a = sin(M.p/150+this.p);
	if(this.a < 0){
		this.on = false;
	} else {
		if(this.strength < rand()){
			this.on = !this.on;
		}
		if(this.on){
			E.laserASum += this.a;
		}
	}
	
	return true;
}

effect_laser.prototype.draw = function(){
	
	if(this.on){
		g.lineWidth=M.s/2;
		
		g.strokeStyle="hsla("+angle(this.c)+",100%,50%,"+this.a+")";
		this.v.line(this.x,this.y,-cos(this.dir)*E.dMax*this.side,sin(this.dir)*E.dMax,0);
		
		if(this.pair){
			g.strokeStyle="hsla("+angle(this.c+120)+",100%,50%,"+this.a+")";
			this.v.line(this.x,this.y,-cos(this.dir)*E.dMax*this.side,sin(this.dir)*E.dMax,1);
		}
	}
}

effect.prototype.laser = effect_laser;