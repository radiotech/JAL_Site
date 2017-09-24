var sin = Math.sin;
var cos = Math.cos;
var sin3 = function(x){var y = sin(x);return y*y*y;}
var PI = Math.PI;
var TWO_PI = PI*2;
var rand = Math.random;
var dist = function(x1,y1,x2,y2){return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))}
var sqrt = Math.sqrt;
var angle = function(x){return x<0?angle(x+360):x>=360?angle(x-360):x;};

var main = function(){
	this.t = 0;
	this.s = 1;
	this.p = 0;
	this.c = c;
	this.views = [];
	this.todo = [];
	this.todo.add = function(e){
		this.todo.push(e);
		this.todo.sort(function(a,b){return (a.d||0)==(b.d||0)?0:(a.d||0)<(b.d||0)?-1:1;});
	}
}

main.prototype.setup = function(){
	this.resize(true);
	
	var backView = new view(
			function(y,w,h){return c.width/2;},
			function(x,w,h){return c.height/2+M.s*2;},
			function(x,y,h){return Math.max(h/2,Math.min(c.width-M.s*5,Math.max(c.width/2,h)));},
			function(x,y,w){return Math.max(c.height-M.s*20,c.height/2);},
			true);
	var backs = 3;
	var backN = 65;
	var backA = .75;
	var backLayerA = 1-Math.pow(1-backA,1/backs);
	for(var i = 0; i < backs; i++){
		this.todo.push(new back(backView,backLayerA,backN+i));
	}
	
	for(var i = 0; i < this.todo.length; i++){
		if(this.todo[i].setup != undefined){
			this.todo[i].setup();
		}
	}
	
	this.resize(true);
}

main.prototype.update = function(){
	this.resize();
	this.t++;
	this.p = this.t*TWO_PI/60;
	
	for(var i = 0; i < this.todo.length; i++){
		this.todo[i].update();
	}
}

main.prototype.draw = function(){
	g.fillStyle = "rgb(0,0,0)";
	g.fillRect(0, 0, c.width, c.height);
	
	for(var i = 0; i < this.todo.length; i++){
		this.todo[i].draw();
	}
}

main.prototype.resize = function(force){
	if(c.width !== window.innerWidth || c.height !== window.innerHeight || force === true){
		c.width = window.innerWidth;
		c.height = window.innerHeight;
		this.s = Math.sqrt(c.width*c.width+c.height*c.height)/100;
		
		for(var i = 0; i < this.views.length; i++){
			this.views[i].resize();
		}
	}
}

var M = new main();