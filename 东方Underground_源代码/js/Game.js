(function(){
	var Game=window.Game=function(){
	//1. 公共变量声明块...........................................................
		this.canvas = document.getElementById("canvas"),
		this.ctx = canvas.getContext("2d");//绘制游戏背景
		this.iCanvasWidth = 408;
		this.iCanvasHeight = 438;
		this.player = new Player();
		this.state = "开始界面";
		this.f = 0,
		this.level = 1,
		this.life = 5;
		this.offset = 0;
		this.start(); //游戏开始
		this.playerBullets=[],
		this.bossstate = false; 
		this.enemys=[],
		this.enemyBullets=[];
		this.boss=null;
		this.controlL=0; //键盘事件默认false 0
		this.controlR=0;
		this.controlU=0;
		this.controlD=0;
		this.controlZ=0;
		
	};

	//2. 函数定义块...........................................................
	Game.prototype.run = function(){
		var self = this;
		this.player=new Player();
		this.updatePane();
		this.bindEvent();
		this.timer=requestAnimationFrame(self.mainLoop);
	};
	//右侧生命值数据更新
	Game.prototype.updatePane = function(){
		game.ctx.drawImage(game.sprite,408,0,613,438,408,0,613,438);
		game.ctx.font = "23px Arial";
		game.ctx.fillStyle = "black";
		game.ctx.strokeRect(408,0,613,438);//外边框
		game.ctx.strokeRect(426,18,169,201);//生命值边框
		game.ctx.fillText("LIFE",440,50);
		
		for(var i = 0; i < game.player.life; i++){
			game.ctx.drawImage(game.sprite,636,720,160,180,430+i*30,55,45,45);
		}

		game.ctx.fillText("东方Underground",420,340);
		game.ctx.font = "18px Arial";
		game.ctx.fillText("操作说明：",440,120);
		game.ctx.fillText("←↑→↓  移动",440,150);
		game.ctx.fillText("Z  射击",440,180);
		game.ctx.fillText("Enter  进入",440,210);
		
	
	};	
	//绘制场景的背景
	Game.prototype.drawStage = function(){
		if(game.state == "开始界面"){
			// game.ctx.fillStyle = "white";
			game.ctx.drawImage(game.sprite,0,0,613,438,0,0,613,438);
			this.updatePane();
			game.ctx.fillStyle = game.level==1?"yellow":"black";
			game.ctx.fillText("简单",184,109);
			game.ctx.fillStyle = game.level==2?"yellow":"black";
			game.ctx.fillText("普通",184,159);
			game.ctx.fillStyle = game.level==3?"yellow":"black";
			game.ctx.fillText("困难",184,209);
		}
		else if(game.state == "游戏中"){
			game.offset = game.offset < game.iCanvasHeight ? game.offset+2 : 0 ;
			game.ctx.drawImage(game.sprite,636,0,613,416,0,game.offset,game.iCanvasWidth,game.iCanvasHeight);//游戏界面
			game.ctx.drawImage(game.sprite,636,0,613,416,0,game.offset-game.iCanvasHeight,game.iCanvasWidth,game.iCanvasHeight);//游戏界面
			if(game.bossstate){
				game.offset = game.offset < game.iCanvasHeight ? game.offset+2 : 0 ;
			game.ctx.drawImage(game.sprite,1280,0,613,416,0,game.offset,game.iCanvasWidth,game.iCanvasHeight);//游戏界面
			game.ctx.drawImage(game.sprite,1280,0,613,416,0,game.offset-game.iCanvasHeight,game.iCanvasWidth,game.iCanvasHeight);//游戏界面
			}
		}	
		else if(game.state == "结束"){
			game.reset(); //重新开始 但是没有显示分数什么的
		}
	};
	//键盘事件
	Game.prototype.bindEvent=function(){
		document.onkeydown=function(event){
			if(game.state == "开始界面"){
				if(event.keyCode == 38){ //上方向键
					game.level -= 1; //默认难度为1
					if(game.level < 1){
						game.level = 3; 
					}
				}
				else if(event.keyCode == 40){//下方向键
						game.level += 1; 
						if(game.level > 3){
							game.level = 1;
						}
					}
				else if(event.keyCode == 13){ //enter键
						game.state="游戏中";
					}
			}
			else if(game.state == "游戏中"){
					if(event.keyCode == 37){ //左方向键
						game.controlL=1;
					}
					if(event.keyCode==38){ //上方向键
						game.controlU=1;
					}
					if(event.keyCode==39){ //右箭头
						game.controlR=1;
					}
					if(event.keyCode==40){ //下箭头
						game.controlD=1;
					}
					if(event.keyCode==90){ //z 射击左右两个分散子弹
						game.controlZ=1;
					}
			}
		};
		document.onkeyup=function(event){
				if(game.state=="游戏中"){
					if(event.keyCode == 37){ //左
						game.controlL=0;
					}
					if(event.keyCode==38){ //上
						game.controlU=0;
					}
					if(event.keyCode==39){ //右
						game.controlR=0;
					}
					if(event.keyCode==40){ //下
						game.controlD=0;
					}
					
					if(event.keyCode==90){ //z
						game.controlZ=0;
					}
				}
			};
	};
	//主函数
	Game.prototype.mainLoop=function(){
		game.timer=requestAnimationFrame(game.mainLoop);
		if(game.state == "开始界面") 
			game.drawStage();//场景一选关背景
		else{
			//game.bgmEnemy.play();
	        //game.bgmBoss.pause();
			game.drawStage();//场景二敌人背景
			game.f++;//控制敌人出现时间

			game.controlL && game.player.goLeft(); //按下左方向键时左移
			game.controlR && game.player.goRight();
			game.controlU && game.player.goUp();
			game.controlD && game.player.goDown();

			game.player.render();//生成角色
			game.progress();//生成敌人

			for(var i=0;i<game.playerBullets.length;i++){
					game.playerBullets[i].update();
					game.playerBullets[i] && game.playerBullets[i].render();
			}

		 	for(var i=0;i<game.enemyBullets.length;i++){
					game.enemyBullets[i].update();
					game.enemyBullets[i] && game.enemyBullets[i].render();
			}

			for(var i=0;i<game.enemys.length;i++){
					game.enemys[i].update();
					game.enemys[i] && game.enemys[i].render();
			}

			if(game.boss){
			
					game.boss.update();
					game.boss&&game.boss.render();
					
			}	
		}
	};
	//生成敌人函数
	Game.prototype.progress=function(){
		//敌人1
		if(game.f == 180)
			for(var i = 0; i < game.level*2; i++){
				var enemy1 = new Enemy(game.iCanvasWidth/(2*game.level+1)*(i+1), 100, "type1");
			}
		//敌人2	
		if(game.f == 480)
			for(var i = 0; i < game.level * 2; i++){
				var enemy2 = new Enemy(game.iCanvasWidth / (2*game.level +1)*(i+1),100,"type2");
			}
		//敌人3
		if(game.f == 780)
			for(var i = 0; i < game.level *2;i++){
				var enemy3 = new Enemy(game.iCanvasWidth /(2*game.level +1)*(i+1),100,"type3" );
			}
		//Boss
		if(game.f == 1000){
			game.bossstate = true;
			game.offset = 0;
			game.bgmEnemy.pause();
			game.bgmBoss.play();
			game.boss = new Boss(194,150,"Boss");			 
		}
	};
	//清除角色子弹 避免子弹绘制到右侧的信息面板
	Game.prototype.deletePlayerBullet=function(o){
		for(var i = game.playerBullets.length; i >= 0; i--){
				game.playerBullets.splice(i,1)
		}
	};
	//清除敌人子弹
	Game.prototype.deleteEnemyBullet=function(o){
		for(var i=game.enemyBullets.length;i>=0;i--){
			 if(game.enemyBullets[i]===o){
				game.enemyBullets.splice(i,1)
			 }
		}
	};
	//清除敌人 敌人被子弹射中时清除敌人
	Game.prototype.deleteEnemy=function(o){
		for(var i=game.enemys.length;i>=0;i--){
			if(game.enemys[i]===o){
				game.enemys.splice(i,1)
			}
		}
	};
	//游戏重置
	Game.prototype.reset=function(){
		this.iCanvasWidth = 408;
		this.iCanvasHeight = 438;
		this.player = new Player();
		this.state = "开始界面";
		this.f = 0,
		this.level = 1,
		this.life = 5;
		this.boss=null;
		this.bossstate = false; 
		this.playerBullets=[],
		this.enemys=[],
		this.enemyBullets=[];
		this.bgmEnemy.play();
		this.bgmBoss.pause();

		this.controlL=0; //键盘事件默认false 0
		this.controlR=0;
		this.controlU=0;
		this.controlD=0;
		this.controlZ=0;
		
	};
//3. 事件注册块...........................................................



//4. 初始化块............................................................
Game.prototype.start = function(){
	this.sprite = new Image();
	this.sprite.src = "images/sprite.png";
	this.bgmEnemy = document.getElementById('bgmEnemy');
	this.bgmBoss = document.getElementById('bgmBoss');
	this.bgmEnemy.play();
	this.bgmBoss.pause();
	this.sprite.onload = function(e){ 
		game.run();//游戏运行
	}
}

})();