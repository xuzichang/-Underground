(function(){
	//创建敌人对象
	var Enemy=window.Enemy=function(x,y,type){
		this.x = x;
		this.y = y;
		this.dx=0;
		this.dy=0;
		this.width = 50;
		this.height = 50;
		this.step = 20;
		this.type = type;
		if(this.type == "type3"){
			this.angle = 0;
		}
		this.f = 0; 
		game.enemys.push(this);
	};
	//绘制图像
	Enemy.prototype.render = function(){
	if(this.type == "type1"){
		game.ctx.drawImage(game.sprite,320,720,160,180,this.x-30,this.y-30,this.width,this.height);
	}
	if(this.type == "type2"){  
		game.ctx.drawImage(game.sprite,636,900,160,180,this.x-30,this.y-30,this.width,this.height);
	}	
	if(this.type == "type3"){  
		game.ctx.drawImage(game.sprite,480,900,160,180,this.x-30,this.y-30,this.width,this.height);
	}
	};

	//根据Game.progress传入的敌人类型 选择对应的攻击子弹
	Enemy.prototype.update = function(){
		if(this.type == "type1"){ //圆形散射
			if(game.f%20 == 0)
				for(var i=0; i<10; i++){ 
					new Bullet(this.x,this.y,i*2*Math.PI/10,"type1");//子弹开始的范围 
				}		
		}
 		if(this.type == "type2"){ //自狙击
 			if(game.f%20 == 0)
 					new Bullet(this.x,this.y,Math.atan2(game.player.y-this.y,game.player.x-this.x),"type1");
 		}
 		if(this.type == "type3"){ //弧形
 			if(game.f%5==0){
 				this.angle+=20;//控制子弹的间距
 				new Bullet(this.x, this.y,this.angle*Math.PI/180,"type1");
 			}		
 		}
		//敌人被player子弹击中
		for(var i=game.playerBullets.length-1;i>=0;i--){
			if(Math.abs(this.x-game.playerBullets[i].x)<(15+12)/2 &&
				Math.abs(this.y-game.playerBullets[i].y+27.5)<(15+55)/2){
					game.deleteEnemy(this);
			}
		}	
	};
})();