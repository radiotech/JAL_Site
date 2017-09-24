var back = function(tv,ta,tn){
	this.v = tv;
	this.a = ta;
	this.n = tn;
}

back.prototype.setup = function(){
	this.p = [];
	for(var i = 0; i < this.n; i++){
		this.p[i] = Math.random()*TWO_PI;
	}
}

back.prototype.update = function(){}

back.prototype.draw = function(){
	g.fillStyle = "rgb(0,0,0,"+this.a+")";
	this.v.wiggleRect(0,0,1,1,this.p);
}