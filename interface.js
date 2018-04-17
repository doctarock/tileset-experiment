
	var ui = {
		selected:-1,
		hover:-1,
		rowselected:-1,
		colselected:-1,
		action:-1,
		points:0,
		glums:0,
		power:5000,//50
		day:1,
		buttons:[],
		actions: function(id){
			switch(id){
				case 4:
					game.events.push(game.newRain(ui.rowselected, ui.colselected));
					rand = Math.floor((Math.random() * 2));
					if (rand == 1){
						if(map.grassTiles.indexOf(map.ground[ui.rowselected-1][ui.colselected-1]) != -1 || map.ground[ui.rowselected-1][ui.colselected-1] == 1) game.events.push(game.newRain(ui.rowselected-1, ui.colselected-1));
						if( map.grassTiles.indexOf(map.ground[ui.rowselected-1][ui.colselected+1]) != -1 || map.ground[ui.rowselected-1][ui.colselected+1] == 1) game.events.push(game.newRain(ui.rowselected-1, ui.colselected+1));
						if(map.grassTiles.indexOf(map.ground[ui.rowselected+1][ui.colselected-1]) != -1 || map.ground[ui.rowselected+1][ui.colselected-1] == 1) game.events.push(game.newRain(ui.rowselected+1, ui.colselected-1));
						if(map.grassTiles.indexOf(map.ground[ui.rowselected+1][ui.colselected+1]) != -1 || map.ground[ui.rowselected+1][ui.colselected+1] == 1) game.events.push(game.newRain(ui.rowselected+1, ui.colselected+1));
					} else {
						if( map.grassTiles.indexOf(map.ground[ui.rowselected-1][ui.colselected]) != -1 || map.ground[ui.rowselected-1][ui.colselected] == 1) game.events.push(game.newRain(ui.rowselected-1, ui.colselected));
						if(map.grassTiles.indexOf(map.ground[ui.rowselected][ui.colselected-1]) != -1 || map.ground[ui.rowselected][ui.colselected-1] == 1) game.events.push(game.newRain(ui.rowselected, ui.colselected-1));
						if(map.grassTiles.indexOf(map.ground[ui.rowselected][ui.colselected+1]) != -1 || map.ground[ui.rowselected][ui.colselected+1] == 1) game.events.push(game.newRain(ui.rowselected, ui.colselected+1));
						if(map.grassTiles.indexOf(map.ground[ui.rowselected+1][ui.colselected]) != -1 || map.ground[ui.rowselected+1][ui.colselected] == 1) game.events.push(game.newRain(ui.rowselected+1, ui.colselected));

					}

					ui.power -= 1;
				break;
				case 5:
					if (ui.power > 10){
						game.events.push(game.newLightning(ui.rowselected, ui.colselected));
						ui.power -= 10;
					}
				break;
				case 6:
					if (ui.power > 100){
						game.events.push(game.newMagic(ui.rowselected, ui.colselected));
						ui.power -= 100;
					}
				break;
			default:
				
			}
		},
		init: function(){
			var button1 = {	
				x: 140,	
				y: 5,	
				funct: 4, 
				draw: function(){
					game.ctx2.drawImage(images.sprites['buttons'], 0, 0, 50, 50, ui.buttons[i].x, ui.buttons[i].y, 40, 40);
				},
				cost: 1,	
				selected: -1	
			};
			var button2 = {	x: 180,	y: 5,	funct: 5, draw: function(){game.ctx2.drawImage(images.sprites['buttons'], 50, 0, 50, 50, ui.buttons[i].x, ui.buttons[i].y, 40, 40);}, cost: 5,	selected: -1	};
			var button3 = {	x: 220,	y: 5,	funct: 6, draw: function(){game.ctx2.drawImage(images.sprites['buttons'], 100, 0, 50, 50, ui.buttons[i].x, ui.buttons[i].y, 40, 40);}, cost: 100,	selected: -1	};
			var button4 = {	x: 260,	y: 5,	funct: 7, draw: function(){game.ctx2.drawImage(images.sprites['buttons'], 150, 0, 50, 50, ui.buttons[i].x, ui.buttons[i].y, 40, 40);},cost: 0,	selected: -1	};
			this.buttons.push(button1);
			this.buttons.push(button2);
			this.buttons.push(button3);
			this.buttons.push(button4);
		},
		draw: function(){
			game.ctx2.drawImage(images.sprites['ui_bg_top'], 0,0, 400,60);
			game.ctx2.fillStyle = "black";
			game.ctx2.font = "26px 'Indie Flower'";
			game.ctx2.fillText("Day "+ui.day,300,30);
			game.ctx2.font = "18px 'Indie Flower'";
			game.ctx2.fillText(ui.points,30,30);
			game.ctx2.fillText(ui.power,30,45);
			game.ctx2.fillText(ui.glums,80,30);
			game.ctx2.fillStyle = "#99ff99";
			game.ctx2.font = "bold 20px 'Indie Flower'";
			game.ctx2.fillText("Objectives",10,80);

			if (ui.hover > -1){
				this.drawCharInfo(ui.hover);
			} else if (ui.selected > -1){
				this.drawCharInfo(ui.selected);
			}
			
			if (ui.colselected > -1 && ui.rowselected > -1){
				game.ctx2.fillStyle = "red";
				game.ctx2.font = "10px  'Indie Flower'";
				game.ctx2.fillText("col "+ui.colselected,120,game.canvas.height-70);
				game.ctx2.fillText("row "+ui.rowselected,160,game.canvas.height-70);
			}
			
			game.ctx2.fillStyle = "white";
			game.ctx2.font = "14px  'Indie Flower'";
			if (typeof map.top_layer[input.mousePos.row] != 'undefined' && typeof map.top_layer[input.mousePos.row][input.mousePos.col] != 'undefined'){
				var bgobj =map.top_layer[input.mousePos.row][input.mousePos.col];
			} else {
				bgobj = -1;
			}
			if (typeof map.center_layer[input.mousePos.row] != 'undefined' && typeof map.center_layer[input.mousePos.row][input.mousePos.col] != 'undefined'){
				var cgobj =map.center_layer[input.mousePos.row][input.mousePos.col];
			} else {
				cgobj = -1;
			}
			if (typeof map.bottom_layer[input.mousePos.row] != 'undefined' && typeof map.bottom_layer[input.mousePos.row][input.mousePos.col] != 'undefined'){
				var fgobj =map.bottom_layer[input.mousePos.row][input.mousePos.col];
			}else {
				fgobj = -1;
			}
			//console.log("r"+input.mousePos.row+" c"+input.mousePos.col);
			if (input.mousePos.col < map.colTileCount && input.mousePos.row < map.rowTileCount) game.ctx2.fillText(map.ground[input.mousePos.row][input.mousePos.col]+": "+tiles[map.ground[input.mousePos.row][input.mousePos.col]],10,game.canvas.height-70);
			if (bgobj > -1) game.ctx2.fillText(map.top_layer[input.mousePos.row][input.mousePos.col]+"+ "+objects[map.top_layer[input.mousePos.row][input.mousePos.col]].name,10,game.canvas.height-170);
			if (cgobj > -1) game.ctx2.fillText(map.center_layer[input.mousePos.row][input.mousePos.col]+"- "+objects[map.center_layer[input.mousePos.row][input.mousePos.col]].name,10,game.canvas.height-150);
			if (fgobj > -1) game.ctx2.fillText(map.bottom_layer[input.mousePos.row][input.mousePos.col]+"- "+objects[map.bottom_layer[input.mousePos.row][input.mousePos.col]].name,10,game.canvas.height-130);
			
			//game.ctx.fillRect(thisentity.stagex-5,thisentity.stagey - 5,10,10);
			for (i = 0; i < ui.buttons.length;i++){
				game.ctx2.fillStyle = "black";
				game.ctx2.font = "20px  'Indie Flower'";
				ui.buttons[i].draw();
				if (ui.buttons[i].selected == 1){
					game.ctx2.fillStyle = "RGBA(255,255,0,.5)";
					game.ctx2.fillRect(ui.buttons[i].x,ui.buttons[i].y,40,40);
				}
				if(input.mousePos.x > ui.buttons[i].x && input.mousePos.x < ui.buttons[i].x + 40 && input.mousePos.y > ui.buttons[i].y && input.mousePos.y < ui.buttons[i].y + 40){
					
					if(input.lclick){
						for (j = 0; j < ui.buttons.length;j++){
							ui.buttons[j].selected = -1;
						}
						ui.buttons[i].selected = 1;
						ui.action = ui.buttons[i].funct
						game.ctx2.fillStyle = "RGBA(255,255,0,.5)";
						game.ctx2.fillRect(ui.buttons[i].x,ui.buttons[i].y,40,40);
						input.lclick = false;
					} else {
						game.ctx2.fillStyle = "RGBA(255,255,255,.5)";
						game.ctx2.fillRect(ui.buttons[i].x,ui.buttons[i].y,40,40);
					}
				}
			}
		},
		drawCharInfo: function(char){
			console.log(char);
				game.ctx.fillStyle = "rgba(0, 255, 0, .2)";
				game.ctx.fillRect(game.entities[char].stagex-15,game.entities[char].stagey-15,30,25);

				game.ctx2.drawImage(images.sprites['ui_bg_top'], 0,game.canvas.height-65, 400, 65);

				game.ctx.save(); 
				game.ctx.fillStyle = 'blue';
				game.ctx.fillRect(game.entities[char].stagex - 15,game.entities[char].stagey - 45,30,2);
				game.ctx.fillStyle = 'red';
				game.ctx.fillRect(game.entities[char].stagex - 15,game.entities[char].stagey - 47,30,2);
				game.ctx.fillStyle = 'black';
				game.ctx.fillRect(game.entities[char].stagex - 15,game.entities[char].stagey - 49,30,2);
				game.ctx.fillStyle = 'red';
				game.ctx.fillRect(game.entities[char].stagex - 15,game.entities[char].stagey - 52,30,3);
				
				var energypc = (game.entities[char].energy/100)*30;
				var healthpc = (game.entities[char].health/100)*30;
				var hungerpc = (game.entities[char].hunger/100)*30;
				var sanitypc = (game.entities[char].sanity/100)*30;
				game.ctx.fillStyle = 'yellow';
				game.ctx.fillRect(game.entities[char].stagex-15,game.entities[char].stagey - 45,energypc,2);
				game.ctx.fillStyle = 'lightblue';
				game.ctx.fillRect(game.entities[char].stagex-15,game.entities[char].stagey - 47,sanitypc,2);
				game.ctx.fillStyle = 'white';
				game.ctx.fillRect(game.entities[char].stagex-15,game.entities[char].stagey - 49,hungerpc,2);
				game.ctx.fillStyle = 'lime';
				game.ctx.fillRect(game.entities[char].stagex-15,game.entities[char].stagey - 52,healthpc,3);
				
				game.ctx.restore();
				// Fill with gradient
				// game.ctx2.fillStyle="rgba(255, 255, 255, 0.600)";
				// game.ctx2.strokeStyle="rgba(255, 255, 255, 0.900)";
				// game.ctx2.fillRect(0,game.canvas.height-45,150,45);
				// game.ctx2.strokeRect(0,game.canvas.height-45,150,45);

				game.ctx2.fillStyle = "#132768";
				
				game.ctx2.font = "bold 34px 'Indie Flower'";
				game.ctx2.fillText(game.entities[char].name,230,game.canvas.height-20);

				game.ctx2.fillStyle = "#333";
				game.ctx2.font = "30px 'Indie Flower'";
				
				game.ctx2.fillText("destination "+game.entities[char].dest,410,game.canvas.height-5);
				game.ctx2.fillText(game.entities[char].mode,410,game.canvas.height-25);
				
				if (game.entities[char].sanity > 75){
					game.ctx2.drawImage(images.sprites['happy'], 175, game.canvas.height-52,50,50);
				} else if (game.entities[char].sanity > 25){
					game.ctx2.drawImage(images.sprites['average'], 175, game.canvas.height-52,50,50);
				} else {
					game.ctx2.drawImage(images.sprites['sad'], 175, game.canvas.height-52,50,50);
				}
				
				game.ctx2.drawImage(images.sprites['health'], 5, game.canvas.height-60, 60, 60);
				game.ctx2.drawImage(images.sprites['energy'], 60, game.canvas.height-60, 60, 70);
				game.ctx2.drawImage(images.sprites['hunger'], 110, game.canvas.height-50, 60, 60);
				
				game.ctx2.fillStyle = "RGBA(0,0,0,.8)";
				game.ctx.fillRect(10,game.canvas.height-55,50,50);
				game.ctx2.font = "bold 30px 'Indie Flower'";
				game.ctx2.fillStyle = "#fff";
				game.ctx2.fillText(Math.floor(game.entities[char].health),13,game.canvas.height-23);
				game.ctx2.fillText(Math.floor(game.entities[char].energy),75,game.canvas.height-23);
				game.ctx2.fillText(Math.floor(game.entities[char].hunger),140,game.canvas.height-23);
		},
		setCameraPos: function(){
		
			viewportBounds = {n: 50, s: game.canvas.offsetHeight-50, e: game.canvas.offsetWidth-50, w: 50};
			mapBounds = {n: 0, s: map.h-(game.canvas.offsetHeight), e: map.w-(game.canvas.offsetWidth), w: map.stage.w};
			
			if (input.mousePos.x > viewportBounds.w && input.mousePos.x < viewportBounds.e || input.mousePos.x > game.canvas.offsetWidth){
				//game.camera.x = mousePos.x-(stage.w/2);
			} else if (input.mousePos.x < viewportBounds.w && !isMobile) {
				if (game.camera.x > 0){
					game.camera.x -= 10;
				}
			} else if (!isMobile){
				if (game.camera.x < mapBounds.e){
					game.camera.x += 10;
				}
			}
			if (game.camera.x > mapBounds.e) game.camera.x = mapBounds.e;
			if (game.camera.x < 0) game.camera.x = 0;
			
			if (input.mousePos.y > viewportBounds.n && input.mousePos.y < viewportBounds.s || input.mousePos.y > game.canvas.offsetHeight){
				//game.camera.y = mousePos.y-(stage.h/2);
			} else if (input.mousePos.y <= viewportBounds.n && !isMobile) {
				if (game.camera.y > 0){
					game.camera.y -= 10;
				}
			} else if (!isMobile) {
				if (game.camera.y < mapBounds.s){
					game.camera.y += 10;
				}
			}
			if (game.camera.y > mapBounds.s) game.camera.y = mapBounds.s;
			if (game.camera.y < 0) game.camera.y = 0;
		}
	}