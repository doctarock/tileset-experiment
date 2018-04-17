	var tout, isMobile = true;
	if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {	isMobile = false;}

	
var game = {
	loaded: false,
	canvas: document.getElementById('main'),
	canvas2: document.getElementById('fx'),
	ctx: null,
	ctx2: null,
	screen: "main menu",
	achievements: [],
	notifications: [],
	combinations: [],
	entities: [],
	events: [],
	camera: {
		x: 0,
		y: 0
	},
	wait: function(value,outcome){},
	pixies:[],
	init: function(){
		loadimg = new Image();
		loadimg.src = 'img/load.png';
		this.ctx = this.canvas.getContext('2d');
		this.ctx2 = this.canvas2.getContext('2d');
		images.init();
		audio.init();
		map.init();
		environment.init();
		ui.init();
		input.init(isMobile);
		// shim layer with setTimeout fallback
		window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
		})();
		this.combinations[5] = [];
		this.combinations[5][5] = 40;
		this.combinations[6] = [];
		this.combinations[6][6] = 2;

		this.achievements[0] = {completed: false, timeout: 1000, reward: 50000, text: "Keep at least 1 glum alive."};
		this.achievements[1] = {completed: false, timeout: 1000, reward: 50, 	text: "Use the rain tool to grow grass."};
		this.achievements[2] = {completed: false, timeout: 1000, reward: 100, 	text: "Use the sun tool to destroy a plant."};
		this.achievements[3] = {completed: false, timeout: 1000, reward: 200, 	text: "Grow a coffee plant."};
		this.achievements[4] = {completed: false, timeout: 1000, reward: 200, 	text: "Grow a flower."};
		this.achievements[5] = {completed: false, timeout: 1000, reward: 400, 	text: "Use upgrade tool combine matched plants."};
		this.achievements[6] = {completed: false, timeout: 1000, reward: 500, 	text: "Grow a tree."};
		this.achievements[7] = {completed: false, timeout: 1000, reward: 1000, 	text: "Grow a berry bush."};
		this.achievements[8] = {completed: false, timeout: 1000, reward: 1000, 	text: "Upgrade a rock."};

		this.entities[0] = newGlum();
		this.entities[1] = newGlum();
		ui.glums = 2;

		for (var i = 0; i < 100; i++) {
			this.pixies.push(new Circle());
			this.pixies[i].reset();
		}
	
		$(window).resize(function(){
			clearTimeout(tout);
			tout = setTimeout("doResize()", 500);
		});
		doResize();
		
		(function animloop(){
			requestAnimFrame(animloop);
			game.run();
		})();
	},
	run: function(){
		if(this.loaded){
			switch(this.screen) {
				case "main menu":
					//update
					game.runMainMenu();
					
					//render
					environment.drawMainMenu();
				break;
				case "game":
					//update
					game.runActions();
					ui.setCameraPos();
					
					//render
					environment.drawScene();
					game.runEvents();
					environment.drawLighting();
					game.showMessages();
					game.showObjectives();
					ui.draw();
					game.cleanup();
				break;
				case "ingame menu":
				break;
			}
		} else {
			game.ctx.clearRect(0,0,map.stage.w,map.stage.h);
			game.ctx2.clearRect(0,0,map.stage.w,map.stage.h);
			
			environment.drawMenuBGShade();
			environment.drawPixies();
            //if (images.loaded > 1) {
              //  game.ctx.drawImage(loadimg, 0,0, map.w,map.h);
            //}
			//load screen
			if(audio.loaded === true && audio.loaded === true) {
				this.loaded = true;
				jQuery("#fx").removeClass("loading");
				audio.playMusic('song1');
				console.log('play');
			}
		}
	},
	runActions: function(){
		var ai = game.entities.length
		while (ai--) {
			if (game.entities[ai].type == 1){
				runGlum(ai);
			} else if (game.entities[ai].type == 2) {
				runHuman(ai);
			} else if (game.entities[ai].type == 3){
				runBunny(ai);
			}
		}
		
	},
	runMainMenu: function(){
		if(input.lclick){
			console.log("click");
			input.lclick = false;
			this.screen = "game";
			audio.stopMusic('song1');
			audio.playMusic('song2');
			
		}

	},
	runEvents: function(){

		var startrow 	= Math.floor(game.camera.y / map.tileSize);
		var startcol 	= Math.floor(game.camera.x / map.tileSize);
		var mapoffsetx 	= map.tileSize * startcol;
		var mapoffsety 	= map.tileSize * startrow;
		var coloffset	= Math.floor(game.camera.x - mapoffsetx);
		var rowoffset 	= Math.floor(game.camera.y - mapoffsety);


		//mouse tile highlight
		input.mousePos.row 	= Math.floor((input.mousePos.y+startrow+mapoffsety+rowoffset) / map.tileSize);
		input.mousePos.col 	= Math.floor((input.mousePos.x+startcol+mapoffsetx+coloffset) / map.tileSize);
		colstart = (input.mousePos.col * map.tileSize)-(map.tileSize*startcol);
		rowstart = (input.mousePos.row *  map.tileSize)-(map.tileSize*startrow);
		game.ctx.strokeStyle = "rgba(255, 255, 255, .3)";
		game.ctx.strokeRect(colstart-coloffset,rowstart-rowoffset,50,50);
	
		if (typeof game.entities[ui.selected] != 'undefined'){
			game.ctx.fillStyle = "rgba(0, 255, 0, .2)";
			game.ctx.fillRect(game.entities[ui.selected].stagex-15,game.entities[ui.selected].stagey-15,30,25);
		}
		if (typeof game.entities[ui.hover] != 'undefined'){
			game.ctx.fillStyle = "rgba(255, 255, 255, .2)";
			game.ctx.fillRect(game.entities[ui.hover].stagex-15,game.entities[ui.hover].stagey-15,30,25);
		}
		if(input.lclick && (input.mousePos.x > 400 || input.mousePos.y > 60)){
			ui.rowselected = input.mousePos.row;
			ui.colselected = input.mousePos.col;
			if (ui.action > -1 && ui.power > 0 && ui.rowselected > -1 && ui.colselected > -1 && map.impassibleTerrain.indexOf(map.ground[ui.rowselected][ui.colselected]) == -1){
				ui.actions(ui.action);	
			}
			input.lclick = false;
		}
			

		var i = game.events.length
		while (i--) {
			colstart = (game.events[i].col * map.tileSize)-(map.tileSize*startcol)-coloffset;
			rowstart = (game.events[i].row * map.tileSize)-(map.tileSize*startrow)-rowoffset;
			if (game.events[i].triggered){	
				switch(game.events[i].type){
					case 0:
						//game.events[i].skin.animate(images.tick);
						//game.events[i].frame = game.events[i].skin.getSprite();
						//game.ctx.drawImage(images.sprites['rain'], game.events[i].frame.x, game.events[i].frame.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
						game.events[i].qty -= 1;
						if(game.events[i].qty < 1){

							if(map.ground[game.events[i].row][game.events[i].col] == 1){ //if dirt, grow grass
								map.ground[game.events[i].row][game.events[i].col] = 120;
							} else if (map.grassTiles.indexOf(map.ground[game.events[i].row][game.events[i].col]) != -1){
								if(map.center_layer[game.events[i].row][game.events[i].col] == 4){
									if (map.top_layer[game.events[i].row][game.events[i].col] == -1){
										map.top_layer[game.events[i].row][game.events[i].col] = 10;
									} else if (map.bottom_layer[game.events[i].row][game.events[i].col] == -1){
										map.bottom_layer[game.events[i].row][game.events[i].col] = 10;
									}
								} else if(map.top_layer[game.events[i].row][game.events[i].col] == -1){
									map.top_layer[game.events[i].row][game.events[i].col] = 9;
								} else if (map.bottom_layer[game.events[i].row][game.events[i].col] == -1){
									map.bottom_layer[game.events[i].row][game.events[i].col] = 9;
								}
							}					
						}
						images.rain(colstart, rowstart,i);
					break;
					case 1:
						game.events[i].skin.animate(images.tick);
						game.events[i].frame = game.events[i].skin.getSprite();
						game.ctx.drawImage(images.sprites['lightning'], game.events[i].frame.x, game.events[i].frame.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
						game.events[i].qty -= 1;
						if(game.events[i].qty < 1){
							
							if (map.center_layer[game.events[i].row][game.events[i].col] != -1){
								map.center_layer[game.events[i].row][game.events[i].col] = -1;
							} else if (map.bottom_layer[game.events[i].row][game.events[i].col] != -1){
								map.bottom_layer[game.events[i].row][game.events[i].col] = -1;
							} else if(map.top_layer[game.events[i].row][game.events[i].col] != -1){
								map.top_layer[game.events[i].row][game.events[i].col] = -1;
							} else if(map.ground[game.events[i].row][game.events[i].col] == 1){
								map.center_layer[game.events[i].row][game.events[i].col] = 1;
							} else if (map.grassTiles.indexOf(map.ground[game.events[i].row][game.events[i].col]) != -1){
								map.ground[game.events[i].row][game.events[i].col] = 1;
								if (map.grassTiles.indexOf(map.ground[game.events[i].row-1][game.events[i].col]) != -1) map.ground = map.blendGrassTile(map.ground,game.events[i].row-1,game.events[i].col,false);
								if (map.grassTiles.indexOf(map.ground[game.events[i].row+1][game.events[i].col]) != -1) map.ground = map.blendGrassTile(map.ground,game.events[i].row+1,game.events[i].col,false);
								if (map.grassTiles.indexOf(map.ground[game.events[i].row][game.events[i].col-1]) != -1) map.ground = map.blendGrassTile(map.ground,game.events[i].row,game.events[i].col-1,false);
								if (map.grassTiles.indexOf(map.ground[game.events[i].row][game.events[i].col+1]) != -1) map.ground = map.blendGrassTile(map.ground,game.events[i].row,game.events[i].col+1,false);
							}
							
							if (!this.achievements[2].completed){
								this.achievements[2].completed = true;
								ui.points += this.achievements[2].reward;
								game.notifications.push({time: 2000, text: "+"+this.achievements[2].reward+" passed this.achievement "+this.achievements[2].text});
								audio.playSound('levelup');
							}
						} else if(game.events[i].qty < 0){
							game.events.splice(i,1); 
						}
					break;
					case 2:
						// game.events[i].skin.animate(images.tick);
						// game.events[i].frame = game.events[i].skin.getSprite();
						// game.ctx.drawImage(images.sprites['magic'], game.events[i].frame.x, game.events[i].frame.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
						
						game.ctx.save();
						game.ctx.fillStyle = "RGBA(255,255,0,0.5)";
						game.ctx.beginPath();
						game.ctx.arc(colstart+25,rowstart+25,25, 0, 2 * Math.PI, false);
						game.ctx.fill();
						game.ctx.restore();
						grd = game.ctx.createLinearGradient(150.000, 0.000, 150.000, 300.000);
      
						// Add colors
						grd.addColorStop(0.000, 'rgba(255, 110, 2, 0.000)');
						grd.addColorStop(0.169, 'rgba(255, 255, 255, 0.402)');
						grd.addColorStop(1.000, 'rgba(255, 255, 0, 0.4600)');
						
						// Fill with gradient
						game.ctx.fillStyle = grd;
						game.ctx.beginPath();
						game.ctx.moveTo(colstart-50, 0);
						game.ctx.lineTo(colstart,rowstart+25);
						game.ctx.lineTo(colstart+50, rowstart+25);
						game.ctx.lineTo(colstart, 0);
						game.ctx.lineTo(colstart-50, 0);
						game.ctx.closePath();
						game.ctx.fill();
						game.events[i].qty -= 1;
						if(game.events[i].qty < 1){
							if(
							map.top_layer[game.events[i].row][game.events[i].col] 	 	> -1 && 
							map.bottom_layer[game.events[i].row][game.events[i].col] 	> -1 && 
							typeof game.combinations[map.top_layer[game.events[i].row][game.events[i].col]] != 'undefined' &&
							game.combinations[map.top_layer[game.events[i].row][game.events[i].col]][map.bottom_layer[game.events[i].row][game.events[i].col]] > -1){
								map.center_layer[game.events[i].row][game.events[i].col] = game.combinations[map.top_layer[game.events[i].row][game.events[i].col]][map.bottom_layer[game.events[i].row][game.events[i].col]];
								map.bottom_layer[game.events[i].row][game.events[i].col] = -1;
								map.top_layer[game.events[i].row][game.events[i].col] = -1;
								
								if (!this.achievements[5].completed){
									this.achievements[5].completed = true;
									ui.points += this.achievements[5].reward;
									game.notifications.push({time: 2000, text: "+"+this.achievements[5].reward+" passed achevement "+this.achievements[5].text});
									audio.playSound('levelup');
								}
								if (!this.achievements[6].completed && map.center_layer[game.events[i].row][game.events[i].col] == 4){
									this.achievements[6].completed = true;
									ui.points += this.achievements[6].reward;
									game.notifications.push({time: 2000, text: "+"+this.achievements[6].reward+" passed achevement "+this.achievements[6].text});
									audio.playSound('levelup');
								}
								if (!this.achievements[7].completed && map.center_layer[game.events[i].row][game.events[i].col] == 2){
									this.achievements[7].completed = true;
									ui.points += this.achievements[7].reward;
									game.notifications.push({time: 2000, text: "+"+this.achievements[7].reward+" passed achevement "+this.achievements[7].text});
									audio.playSound('levelup');
								}
							} else if(map.center_layer[game.events[i].row][game.events[i].col] == 1 && map.top_layer[game.events[i].row][game.events[i].col] != 1) {
								map.top_layer[game.events[i].row][game.events[i].col] = 1;
								if (!this.achievements[8].completed){
									this.achievements[8].completed = true;
									ui.points += this.achievements[8].reward;
									game.notifications.push({time: 2000, text: "+"+this.achievements[7].reward+" passed achevement "+this.achievements[8].text});
									audio.playSound('levelup');
								}
							} else if(map.center_layer[game.events[i].row][game.events[i].col] == 1 && map.bottom_layer[game.events[i].row][game.events[i].col] != 1) {
								map.bottom_layer[game.events[i].row][game.events[i].col] = 1;
								if (!this.achievements[8].completed){
									this.achievements[8].completed = true;
									ui.points += this.achievements[8].reward;
									game.notifications.push({time: 2000, text: "+"+this.achievements[7].reward+" passed achevement "+this.achievements[8].text});
									audio.playSound('levelup');
								}

							}
						}
					break;
					case 3:
						game.events[i].qty -= 1;
						if(game.events[i].qty < 10){
							game.ctx.fillStyle = "RGBA(255,255,0,.1)";
							
						} else if(game.events[i].qty < 100){
							game.ctx.fillStyle = "RGBA(255,0,0,."+game.events[i].qty+")";
							
						} else {
							game.ctx.fillStyle = "yellow";
							
						}
						game.ctx.font="20px Georgia";
						game.ctx.fillText(game.events[i].text,colstart,rowstart);
						if(game.events[i].qty < 0){
							game.events.splice(i,1); 
						}
					break;
						
				}
			} else {
			game.ctx.fillStyle = game.events[i].highlight;
			game.ctx.fillRect(colstart,rowstart,map.tileSize,map.tileSize);
			}
		}
	},
	showMessages: function(){
		var i = game.notifications.length
		while (i--) {
			game.notifications[i].time -= 1;
			if(game.notifications[i].time < 100){
				game.ctx2.fillStyle = "RGBA(255,0,0,0."+game.notifications[i].time+")";
				
			} else {
				game.ctx2.fillStyle = "yellow";
				
			}
			game.ctx2.font="18px 'Indie Flower'";
			game.ctx2.fillText(game.notifications[i].text,10,230+(i*20));
			if(game.notifications[i].time < 10){
				game.notifications.splice(i,1); 
			}
		}

	},
	showObjectives: function(){
		game.ctx2.fillStyle = "RGBA(0,0,0,.5)";
		game.ctx2.fillRect(0,0,395,200);
		var i = 0,p = 0;
		while (i < this.achievements.length) {
			if(this.achievements[i].timeout > 10){
				game.ctx2.fillStyle = "white";
				if(this.achievements[i].completed == 1){
					game.ctx2.fillStyle = "RGB(0,0,0)";
					game.ctx2.fillRect(0,90+(p*21),380,25);
					game.ctx2.strokeStyle = "yellow";
					game.ctx2.strokeRect(0,0,395,200);
					this.achievements[i].timeout -= 1;
					
					game.ctx2.fillStyle = "RGB(150,255,150)";
					if(this.achievements[i].timeout < 105){
						game.ctx2.fillStyle = "RGBA(150,255,150,0."+this.achievements[i].timeout+")";
						
					}
					game.ctx2.fillText("✓",360,105+(p*21))
				}
				game.ctx2.font="16px 'Indie Flower'";
				game.ctx2.fillText(this.achievements[i].text,10,105+(p*21));
				p++;
			}
			i++;
			if (p >= 5) break;
		}
	},
	newRain: function(rowselected, colselected){
		return {
			row: rowselected,
			col: colselected,
			type: 0,
			triggered: true,
			assigned: false,
			w: 50,
			h: 50,
			qty: 1000,
			highlight: 'RGBA(0,0,255,0.2)',
			frame: null
		};
	},
	newLightning: function(rowselected, colselected){
		return {
			row: rowselected,
			col: colselected,
			type: 1,
			triggered: false,
			assigned: false,
			w: 50,
			h: 50,
			qty: 100,
			highlight: 'RGBA(255,0,0,0.2)',
			frame: null,
			skin: new Animation([
					{ sprite: 'lightning_1', time: waterspeed/2 },
					{ sprite: 'lightning_2', time: waterspeed/2 },
					{ sprite: 'lightning_3', time: waterspeed/2 },
				], lightningSprites)
		};
	},
	newMagic: function(rowselected, colselected){
		return {
			row: rowselected,
			col: colselected,
			type: 2,
			triggered: true,
			assigned: false,
			w: 50,
			h: 50,
			qty: 1000,
			highlight: 'RGBA(0,255,0,0.2)',
			frame: null,
			skin: new Animation([
					{ sprite: 'magic_1', time: waterspeed/2 },
					{ sprite: 'magic_2', time: waterspeed/2 },
					{ sprite: 'magic_3', time: waterspeed/2 },
					{ sprite: 'magic_4', time: waterspeed/2 },
				], magicSprites)
		};
	},
	
	newMessage: function(text, rowselected, colselected){
		return {
			row: rowselected,
			col: colselected,
			type: 3,
			triggered: true,
			assigned: true,
			w: 50,
			h: 50,
			qty: 500,
			frame: null,
			text: text
		};
	},
	cleanup: function(){
		var i = game.events.length
		while (i--) {
			if(game.events[i].qty <= 0) {
				game.events.splice(i,1);
			}
		}
	}
}

function Circle() {
    this.settings = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

    this.reset = function() {
        this.x = (this.settings.random ? map.w*Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? map.h*Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax-1)*Math.random()) + 1;
        this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl/60)*(this.r/this.settings.rmax);
        this.rt = Math.random()*this.hl;
        this.settings.rt = Math.random()+1;
        this.stop = Math.random()*.2+.4;
        this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }

    this.fade = function() {
        this.rt += this.settings.rt;
    }

    this.draw = function() {
        if(this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.settings.rt = this.settings.rt*-1;
        } else if(this.rt >= this.hl) {
            this.reset();
        }

        var newo = 1-(this.rt/this.hl);
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        game.ctx.closePath();

        var cr = this.r*newo;
        gradient = game.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        gradient.addColorStop(0.0, 'rgba(255,255,0,'+newo+')');
        gradient.addColorStop(this.stop, 'rgba(255,255,255,'+(newo*.6)+')');
        gradient.addColorStop(1.0, 'rgba(0,0,0,0)');
        game.ctx.fillStyle = gradient;
        game.ctx.fill();
    }

    this.move = function() {
        this.x += (this.rt/this.hl)*this.dx;
        this.y += (this.rt/this.hl)*this.dy;
        if(this.x > game.canvas.width || this.x < 0) this.dx *= -1;
        if(this.y > game.canvas.height || this.y < 0) this.dy *= -1;
    }

    this.getX = function() { return this.x; }
    this.getY = function() { return this.y; }
}
	function doResize(){
		
		map.stage.w = window.innerWidth, 
		map.stage.h = window.innerHeight;
		game.canvas.width = map.stage.w;
		game.canvas.height = map.stage.h;
		game.canvas2.width = map.stage.w;
		game.canvas2.height = map.stage.h;
		
		$(".fullpage").css("height", map.stage.h);
	}
	
	
	
$(window).load(function() {game.init();})
	