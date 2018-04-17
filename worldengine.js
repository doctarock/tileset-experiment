var environment = {
	worldDaylightSwitch: 0,
	worldDayTransitionLength: 500,
	worldLightLength: 1000,
	worldDarkLength: 100,
	worldCycleTick: 0,
	worldDayTicks: 0,
	worldDayTicker: 0,
	init: function(){
		images.tick =1;
		this.worldCycleTick = this.worldLightLength;
		this.worldDayTicks = this.worldLightLength + this.worldDarkLength + (this.worldDayTransitionLength*2);
	},
	drawMainMenu: function(){
		game.ctx.clearRect(0,0,map.stage.w,map.stage.h);
		game.ctx2.clearRect(0,0,map.stage.w,map.stage.h);
		this.drawMenuBGShade();
		this.drawPixies();
		// Add colors
		grd.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
		grd.addColorStop(1.000, 'rgba(150, 32, 214, 1.000)');
		game.ctx2.fillStyle = grd;
		game.ctx2.fillText("Glums",(game.canvas.width/2)-(wid/2),(game.canvas.height/4));
		
		var gradient=game.ctx2.createLinearGradient((game.canvas.width/2)-(wid/2), (game.canvas.height/4), (game.canvas.width/2)+(wid/2), (game.canvas.height/4)+50);
		 gradient.addColorStop(0.000, 'rgba(219, 219, 219, 1.000)');
		 gradient.addColorStop(1.000, 'rgba(255, 255, 255, 0.000)');
		
		game.ctx2.strokeStyle = gradient;
		game.ctx2.strokeText("Glums",(game.canvas.width/2)-(wid/2),(game.canvas.height/4));

		game.ctx2.fillStyle = "#fff";
		game.ctx2.strokeStyle = "#000";
		game.ctx2.font = "bold 20px 'Indie Flower'";
		wid = game.ctx2.measureText("created by").width
		game.ctx2.fillText("Created by",(game.canvas.width/2)-(wid/2),(game.canvas.height-70));
		game.ctx2.strokeText("Created by",(game.canvas.width/2)-(wid/2),game.canvas.height-70);
		wid = game.ctx2.measureText("Astrid Thiebault & Derek  Robertson").width
		game.ctx2.fillText("Astrid Thiebault & Derek  Robertson",(game.canvas.width/2)-(wid/2),(game.canvas.height-50));
		game.ctx2.font = "bold 50px 'Indie Flower'";
		wid = game.ctx2.measureText("Click/tap to start!").width
		game.ctx2.fillText("Click/tap to start!",(game.canvas.width/2)-(wid/2),game.canvas.height-(game.canvas.height/4));
		var gradient=game.ctx2.createLinearGradient((game.canvas.width/2)-(wid/2), (game.canvas.height/4), (game.canvas.width/2)+(wid/2), (game.canvas.height/4)+50);
		gradient.addColorStop(0.000, 'rgba(255, 110, 2, 1.000)');
		gradient.addColorStop(0.500, 'rgba(255, 255, 0, 1.000)');
		gradient.addColorStop(1.000, 'rgba(255, 109, 0, 1.000)');
		game.ctx2.strokeStyle = gradient;
		game.ctx2.strokeText("Click/tap to start!",(game.canvas.width/2)-(wid/2),game.canvas.height-(game.canvas.height/4));
		
	},
	drawMenuBGShade: function(){
		grd = game.ctx.createLinearGradient(0.000, 0.000, map.w, map.h);
		
		// Add colors
		grd.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
		grd.addColorStop(1.000, 'rgba(0, 0, 0, 0.000)');
		
		// Fill with gradient
		game.ctx.fillStyle = grd;
		game.ctx.fillRect(0, 0, map.w, map.h+20);

		game.ctx2.font = "bold 180px 'glums'";
		wid = game.ctx2.measureText("Glums").width
		grd = game.ctx2.createRadialGradient((game.canvas.width/2), (game.canvas.height/4), 0, (game.canvas.width/2)+(wid/2), (game.canvas.height/4)+50, 150.000);
	},
	drawPixies: function (){
		for(var i = 0; i < game.pixies.length; i++) {
			game.pixies[i].fade();
			game.pixies[i].move();
			game.pixies[i].draw();
		}
	},
	drawScene: function(){
		// flow.animate(images.tick);
		// waterframe = flow.getSprite();
		// flown.animate(images.tick);
		// waterframen = flown.getSprite();
		// flowe.animate(images.tick);
		// waterframee = flowe.getSprite();
		// flows.animate(images.tick);
		// waterframes = flows.getSprite();
		// floww.animate(images.tick);
		// waterframew = floww.getSprite();
		// flownw.animate(images.tick);
		// waterframenw = flownw.getSprite();
		// flowne.animate(images.tick);
		// waterframene = flowne.getSprite();
		// flowse.animate(images.tick);
		// waterframese = flowse.getSprite();
		
		game.ctx.clearRect(0,0,map.stage.w,map.stage.h);
		game.ctx2.clearRect(0,0,map.stage.w,map.stage.h);
		
		var startrow 	= Math.floor(game.camera.y / map.tileSize);
		var startcol 	= Math.floor(game.camera.x / map.tileSize);
		var endrow 		= Math.floor((game.camera.y+(map.stage.h)) / map.tileSize);
		var endcol 		= Math.floor((game.camera.x+(map.stage.w)) / map.tileSize)+1;
		var mapoffsetx 	= map.tileSize * startcol;
		var mapoffsety 	= map.tileSize * startrow;
		var coloffset	= Math.floor(game.camera.x - mapoffsetx);
		var rowoffset 	= Math.floor(game.camera.y - mapoffsety);
		
		// Draw the arrays to the canvas
		for (r = startrow; r < endrow+1; r++) {
			
			rowstart = (0-rowoffset)+(r * map.tileSize)-(map.tileSize*startrow);
			for (c = startcol; c < endcol; c++) {
				
				colstart = (0-coloffset)+(c * map.tileSize)-(map.tileSize*startcol);
				
				//fil the row with ground
				if (typeof map.ground[r] != 'undefined') {
					var tile = map.ground[r][c];
					switch(tile) {
						case 2:
							game.ctx.drawImage(images.sprites['tiles'], waterframe.x, waterframe.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 6:
							game.ctx.drawImage(images.sprites['tiles'], waterframes.x, waterframes.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 7:
							game.ctx.drawImage(images.sprites['tiles'], waterframen.x, waterframen.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 8:
							game.ctx.drawImage(images.sprites['tiles'], waterframee.x, waterframee.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 9:
							game.ctx.drawImage(images.sprites['tiles'], waterframew.x, waterframew.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 56:
							game.ctx.drawImage(images.sprites['tiles'], waterframenw.x, waterframenw.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 57:
							game.ctx.drawImage(images.sprites['tiles'], waterframene.x, waterframene.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 58:
							game.ctx.drawImage(images.sprites['tiles'], waterframese.x, waterframese.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case 59:
							game.ctx.drawImage(images.sprites['tiles'], waterframesw.x, waterframesw.y, map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							break;
						case -1:
							break;
						default:
							var tileRow = (tile / images.sprites['tiles'].rownumtiles) | 0; // Bitwise OR operation
							var tileCol = (tile % images.sprites['tiles'].rownumtiles) | 0;
							game.ctx.drawImage(images.sprites['tiles'], (tileCol * map.tileSize), (tileRow * map.tileSize), map.tileSize, map.tileSize, colstart, rowstart, map.tileSize, map.tileSize);
							if(r == ui.rowselected && c == ui.colselected){
								game.ctx.fillStyle = 'rgba(255, 255, 255, 0.200)';
								game.ctx.fillRect(colstart,rowstart,map.tileSize,map.tileSize);
							}
					}
				}
			}
			for (i = 0, len = game.entities.length; i < len; ++i) {
				if (game.entities[i].row == r && game.entities[i].remainder <= .5) {
					if (game.entities[i].type == 1){
						drawGlum(game.entities[i]);
					} else if (game.entities[i].type == 2){
						drawHuman1(game.entities[i]);
					} else if (game.entities[i].type == 3){
						drawBunny(game.entities[i]);
					} else {
						drawBird(game.entities[i]);
					}
				}
			}
			for (c = startcol; c < endcol; c++) {
				itemx = (0-coloffset)+(c * map.tileSize)-(map.tileSize*startcol);
				//fil the row with ground
				if (typeof map.top_layer[r] != 'undefined') {
					var tile = map.top_layer[ r ][ c ];
					var tileRow = (tile / images.sprites['objects'].rownumtiles) | 0;
					var tileCol = (tile % images.sprites['objects'].rownumtiles) | 0;
					if (tile > -1){
						game.ctx.drawImage(images.sprites['objects'], (tileCol * map.tileSize), (tileRow * map.tileSize), map.tileSize, map.tileSize, itemx+10, rowstart-30, map.tileSize, map.tileSize);
					}
				}
				if (typeof map.center_layer[r] != 'undefined') {
					var tile = map.center_layer[ r ][ c ];
					var tileRow = (tile / images.sprites['objects'].rownumtiles) | 0;
					var tileCol = (tile % images.sprites['objects'].rownumtiles) | 0;
					if (tile > -1){
						currObject = objects[tile];
						if(Array.isArray(currObject.assets)){
							console.log(currObject.assets);
							//has custom sprite info
							game.ctx.drawImage(images.sprites[currObject.assets.sprite], currObject.assets.x, currObject.assets.y, currObject.assets.w, currObject.assets.h, itemx, rowstart-15, currObject.assets.w, currObject.assets.h);
						} else {
							//sprite assumed default size and order
							game.ctx.drawImage(images.sprites['objects'], (tileCol * map.tileSize), (tileRow * map.tileSize), map.tileSize, map.tileSize, itemx, rowstart-15, map.tileSize, map.tileSize);
						}
						
					}
				}
			}
			for (i = 0, len = game.entities.length; i < len; ++i) {
				if (game.entities[i].row == r && game.entities[i].remainder >.5) {
					if (game.entities[i].type == 1){
						drawGlum(game.entities[i]);
					} else if (game.entities[i].type == 2){
						drawHuman1(game.entities[i]);
					} else {
						drawBunny(game.entities[i]);
					}
				}
			}
			//now fill the row with foreground objects
			for (c = startcol; c < endcol; c++) {
				colstart = (0-coloffset)+(c * map.tileSize)-(map.tileSize*startcol);
				if (typeof map.bottom_layer[r] != 'undefined') {
					
					var tile = map.bottom_layer[ r ][ c ];
					var tileRow = (tile / images.sprites['objects'].rownumtiles) | 0;
					var tileCol = (tile % images.sprites['objects'].rownumtiles) | 0;
					
					if (tile > -1){
						game.ctx.drawImage(images.sprites['objects'], (tileCol * map.tileSize), (tileRow * map.tileSize), map.tileSize, map.tileSize, colstart-10, rowstart, map.tileSize, map.tileSize);
						//hitbox
						//game.ctx.fillStyle = "rgba(255, 255, 255, .5)";
						//game.ctx.fillRect(colstart,rowstart+(tileSize),50,25);
					}
				}
			}
		}
	},
	drawDarkMask: function(transition){
		
		if (transition == true) {
			daypercent = (environment.worldCycleTick/environment.worldDayTransitionLength);
			if (daypercent < 0) daypercent = 0;
			if (daypercent > .5) daypercent = .5;
		}
		
		var startrow 	= Math.floor(game.camera.y / map.tileSize);
		var startcol 	= Math.floor(game.camera.x / map.tileSize);
		var endrow 		= Math.floor((game.camera.y+(map.stage.h/2)) / map.tileSize);
		var endcol 		= Math.floor((game.camera.x+(map.stage.w/2)) / map.tileSize)+1;
		
		game.ctx2.fillStyle = "rgba(0, 0, 0, "+daypercent+")";
		game.ctx2.fillRect(0,0,map.stage.w,map.stage.h);
		
		for (i = 0, len = game.entities.length; i < len; ++i) {
			images.cut(game.entities[i].stagex,game.entities[i].stagey-20,250);
			//images.cut(game.entities[i].stagex,game.entities[i].stagey-20,250-daypercent*200);
		}	
	},
	grow: function(){
		var reward = 0;
		
		// Draw the arrays to the canvas
		for (r = 0; r < map.rowTileCount; r++) {
			
			for (c = 0; c < map.colTileCount; c++) {
				colstart = (c * map.tileSize);
				rowstart = (r * map.tileSize);
				if (map.ground[ r ][ c ] == 120){
					map.ground = map.blendGrassTile(map.ground,r,c,true);
					reward += 1;
					if (!game.achievements[1].completed){
						game.achievements[1].completed = true;
						ui.points += game.achievements[1].reward;
						game.notifications.push({time: 2000, text: "+"+game.achievements[1].reward+" points: "+game.achievements[1].text});
						audio.playSound('levelup');
					}
				}
				if (typeof map.top_layer[r] != 'undefined') {
					var tile = map.top_layer[ r ][ c ];
					if (tile > -1){
					
						if(objects[map.top_layer[ r ][ c ]].growth){
							if (Array.isArray(objects[tile].upgrade)){
								num = Math.floor(Math.random() * objects[map.top_layer[ r ][ c ]].upgrade.length)

								growing = objects[map.top_layer[ r ][ c ]].upgrade[num];
								if (growing >= -1){
								map.top_layer[ r ][ c ] = growing;
								reward += 2;
								
							
								}
								
							}else{
								map.top_layer[ r ][ c ] = objects[map.top_layer[ r ][ c ]].upgrade;
								reward += 2;
							}
							
							if (!game.achievements[3].completed && map.top_layer[ r ][ c ] == 30){
								game.achievements[3].completed = true;
								ui.points += game.achievements[3].reward;
								game.notifications.push({time: 2000, text: "+"+game.achievements[3].reward+" passed achevement "+game.achievements[3].text});
								audio.playSound('levelup');
							}
							if (!game.achievements[4].completed && map.top_layer[ r ][ c ] == 6){
								game.achievements[4].completed = true;
								ui.points += game.achievements[4].reward;
								game.notifications.push({time: 2000, text: "+"+game.achievements[4].reward+" passed achevement "+game.achievements[4].text});
								audio.playSound('levelup');
							}
					}					
					//game.ctx.fillStyle = "rgba(0, 0, 0, .5)";
					//game.ctx.fillRect(colstart,rowstart,50,25);
					}
				}
				if (typeof map.center_layer[r] != 'undefined') {
					var tile = map.center_layer[ r ][ c ];
					if (tile > -1){
					
						if(objects[map.center_layer[ r ][ c ]].growth){
							if (Array.isArray(objects[map.center_layer[ r ][ c ]].upgrade)){
								num = Math.floor(Math.random() * objects[map.center_layer[ r ][ c ]].upgrade.length)
								
								growing = objects[map.center_layer[ r ][ c ]].upgrade[num];
								if (growing >= -1){
								map.center_layer[ r ][ c ] = growing;
								reward += 2;
								} else {
									switch (growing) {
										case -2:
										game.entities.push(newBunny1(colstart,rowstart))
										break;
									case -3:
										game.entities.push(newBird(colstart,rowstart))
										break;
									default:
										center_layer[ r ][ c ] = -1;
									}
								}
								
							}else{
								map.center_layer[ r ][ c ] = objects[map.center_layer[ r ][ c ]].upgrade;
								reward += 2;
							}
						}					
					//game.ctx.fillStyle = "rgba(0, 0, 0, .5)";
					//game.ctx.fillRect(colstart,rowstart,50,25);
					}
				}
				if (typeof map.bottom_layer[r] != 'undefined') {
					var tile = map.bottom_layer[ r ][ c ];
					if (tile > -1){
						if(objects[map.bottom_layer[ r ][ c ]].growth){
							if (Array.isArray(objects[map.bottom_layer[ r ][ c ]].upgrade)){
								num = Math.floor((Math.random() * objects[map.bottom_layer[ r ][ c ]].upgrade.length) )
								map.bottom_layer[ r ][ c ] = objects[map.bottom_layer[ r ][ c ]].upgrade[num];
								reward += 2;
							}else{
								map.bottom_layer[ r ][ c ] = objects[map.bottom_layer[ r ][ c ]].upgrade;
								reward += 2;
							}
							
							if (!game.achievements[3].completed && map.bottom_layer[ r ][ c ] == 30){
								game.achievements[3].completed = true;
								ui.points += game.achievements[3].reward;
								game.notifications.push({time: 2000, text: "+"+game.achievements[3].reward+" passed achevement "+game.achievements[3].text});
								audio.playSound('levelup');
							}
							if (!game.achievements[4].completed && map.bottom_layer[ r ][ c ] == 6){
								game.achievements[4].completed = true;
								ui.points += game.achievements[4].reward;
								game.notifications.push({time: 2000, text: "+"+game.achievements[4].reward+" passed achevement "+game.achievements[4].text});
								audio.playSound('levelup');
							}
						}					
					//game.ctx.fillStyle = "rgba(0, 0, 0, .5)";
					//game.ctx.fillRect(colstart,rowstart,50,25);
					}
				}
			}
		}
		game.notifications.push({time: 1000, text: "+"+reward+" influence"});
		ui.power +=reward;
		audio.playSound('grow');
	},
	drawLighting: function(){
		//nightday
		
		switch(environment.worldDaylightSwitch) {
			case 1:
				//dusk
				environment.worldCycleTick +=1;
				environment.drawDarkMask(true);
				if (environment.worldCycleTick == environment.worldDayTransitionLength) {
					environment.worldDaylightSwitch = 2;
					environment.worldCycleTick = environment.worldDarkLength;
					this.drawPixies();
				}
				break;
			case 2:
				//dark
				environment.worldCycleTick -=1;
				environment.drawDarkMask(false)
				
				this.drawPixies();
				if (environment.worldCycleTick == 0) {
					ui.day+=1;
					ui.points+=25;
					environment.worldDaylightSwitch = 3;
					environment.worldCycleTick = environment.worldDayTransitionLength;
					
					audio.playSound('newday');
				}
				break;
			case 3:
				//dawn
				environment.worldCycleTick -=1;
				environment.drawDarkMask(true);
				
				if (environment.worldCycleTick == 0) {
					environment.grow();
					environment.worldDaylightSwitch = 0;
					environment.worldCycleTick = environment.worldLightLength;
				}
				break;
			default:
				//day
				environment.worldCycleTick -=1;
				if (environment.worldCycleTick == 0) {
					environment.worldDaylightSwitch = 1;
				}
		}
	}
}