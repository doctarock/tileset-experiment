	
	ai = {
		moment: function(i){
			if(game.entities[i].ydir == 0 && game.entities[i].xdir == 0){
				game.entities[i].energy -=.01;
				game.entities[i].hunger -=.002;
			} else {
				game.entities[i].energy -=.015;
				game.entities[i].hunger -=.003;
			}
			
			if(game.entities[i].energy < 0){
				game.entities[i].energy = 0;
				game.entities[i].xdir = 0;
				game.entities[i].ydir = 0;
				game.entities[i].mode = "sleeping";
				game.notifications.push({time: 1000, text: game.entities[i].name +": ZZZzzz... "});
			}
			
			if(game.entities[i].hunger < 0){
				if (Math.floor((Math.random() * 150) - 1) == 0) {
					game.notifications.push({time: 150, text: game.entities[i].name +": ARRRgggg ... "});
					audio.playSound('scream');
				}
			
				game.entities[i].energy -=.02;		
				game.entities[i].health -=.01;	
				game.entities[i].sanity -=.005;	
				game.entities[i].hunger = 0;
			} else if (game.entities[i].hunger < 50){
				game.entities[i].sanity -=.001;	
			}
			
			if(game.entities[i].health < 0){
				game.entities[i].xdir = 0;
				game.entities[i].ydir = 0;
				game.entities[i].mode = -1;	
				game.entities[i].health = 0;				
			}	
		},
		sleep: function(i){
			sleep.animate(images.tick);
			game.entities[i].frame = sleep.getSprite();
			game.entities[i].energy +=.07;
			if (game.entities[i].energy > 99){
				game.entities[i].mode = "wander";
			}	
		},
		seek: function(i){
			if (game.entities[i].row > game.entities[i].dest[1]){
				game.entities[i].ydir = -1;
			} else if (game.entities[i].row < game.entities[i].dest[1]){
				game.entities[i].ydir = 1;
			} else if (game.entities[i].dest[2] == 1 && game.entities[i].remainder >= .5 || game.entities[i].dest[2] == 0 && game.entities[i].remainder < .5 || game.entities[i].dest[2] == 2) {
				game.entities[i].ydir = 0;
			}
			if (game.entities[i].col > game.entities[i].dest[0]){
				game.entities[i].xdir = -1;
			} else if (game.entities[i].col < game.entities[i].dest[0]){
				game.entities[i].xdir = 1;
			} else {
				game.entities[i].xdir = 0;
			}
			if(game.entities[i].xdir == 0 && game.entities[i].ydir == 0){
				game.entities[i].mode = "interacting";
			}
		},
		search: function(i){
			if (game.entities[i].sanity > 60)	{
				area = Math.floor(80 - game.entities[i].sanity);
			} else{
				area = 20;
			}
			result = map.searchArea(true,true,game.entities[i].col,game.entities[i].row,area);
			if (results.length > 0){
				if (game.entities[i].hunger < game.entities[i].hunger_max-(game.entities[i].hunger_max/4)){
					var best = 0, gain = 0, q = result.length;
					while (q--) {
						if (objects[result[q][3]].hunger > gain) {best = q;gain = objects[result[q][3]].hunger;}
					}
					if (best > 0){
						chosen = objects[result[best][3]];
						game.notifications.push({time: 300, text: game.entities[i].name+" see's a "+chosen.name});
						game.entities[i].dest = [result[best][2],result[best][1],result[best][0],3,result[best][3]];
						game.entities[i].mode = "seeking";
						audio.playSound('sigh');
						return;
					}
				}
				if (game.entities[i].health < game.entities[i].health_max-(game.entities[i].health_max/4)){
					var best = 0, gain = 0, q = result.length;
					while (q--) {
						if (objects[result[q][3]].health > gain) {best = q;gain = objects[result[q][3]].health;}
					}
					if (best > 0){
						chosen = objects[result[best][3]];
						game.notifications.push({time: 300, text: game.entities[i].name+" see's a "+chosen.name});
						game.entities[i].dest = [result[best][2],result[best][1],result[best][0],1,result[best][3]];
						game.entities[i].mode = "seeking";
						audio.playSound('learn2');
						
						return;
					}
				}
				if (game.entities[i].sanity < game.entities[i].sanity_max-(game.entities[i].sanity_max/2)){
					var best = 0, gain = 0, q = result.length;
					while (q--) {
						if (objects[result[q][3]].sanity > gain) {best = q;gain = objects[result[q][3]].sanity;}
					}
					if (best > 0){
						chosen = objects[result[best][3]];
						game.notifications.push({time: 300, text: game.entities[i].name+" see's a "+chosen.name});
						game.entities[i].dest = [result[best][2],result[best][1],result[best][0],2,result[best][3]];
						game.entities[i].mode = "seeking";
						
						audio.playSound('mumble');
						return;
					}
				}
			}
			
			game.entities[i].bored = Math.floor((Math.random() * 200) +50);
			game.entities[i].ydir = Math.floor((Math.random() * 3) - 1);
			game.entities[i].xdir = Math.floor((Math.random() * 3) - 1);
			game.entities[i].mode = "wander";
			if(Math.floor((Math.random() * 5) - 1) == 0) audio.playSound('sad2');
			//game.notifications.push({time: 500, text: game.entities[i].name+" can't find something"});
		},
		wander: function(i){
			game.entities[i].bored -= 1; 
			if (game.entities[i].bored <= 0){
				if (Math.floor((Math.random() * 5)) == 0){
					if(game.entities[i].hunger < game.entities[i].health_max - (game.entities[i].health_max/4) || 
					game.entities[i].health  < game.entities[i].health_max - ( game.entities[i].health_max/5) ||
					game.entities[i].sanity  < game.entities[i].health_max - ( game.entities[i].sanity_max/2) ){
						game.notifications.push({time: 200, text: game.entities[i].name+" looks around."});
						game.entities[i].mode = "searching";
						return;
					}
				}
				if (game.events.length > 0){
					var lowestscore = 1000;
					var closest = -1;
					for (j = 0, len = game.events.length; j < len; ++j) {
						currentscore = 0
						if (game.events[j].triggered == false && game.events[j].assigned == false){	
							if (game.events[j].col < game.entities[i].col){
								currentscore = game.entities[i].col - game.events[j].col;
							} else if (game.events[j].col >= game.entities[i].col){
								currentscore = game.events[j].col - game.entities[i].col;
							}
							if (game.events[j].row < game.entities[i].row){
								currentscore += game.entities[i].row - game.events[j].row;
							} else if (game.events[j].row >= game.entities[i].row){
								currentscore += game.events[j].row - game.entities[i].row;
							}
							if(currentscore < lowestscore){
								lowestscore = currentscore;
								closest = j;
							}
						} else {
							game.events[j].assigned = false;	
						}
					}
					if (closest > -1 && typeof game.events[closest] != 'undefined' && game.events[closest].col > -1 && game.events[closest].row > -1){
						var edge = 1;
						if (game.events[closest].row > game.entities[i].row ) edge = 0;
						game.entities[i].dest = [game.events[closest].col,game.events[closest].row,edge,0];							
						game.entities[i].mode = "seeking";
						game.events[closest].assigned = true;
						return;
					}
				}
				num = Math.floor((Math.random() * 150) +50);
				game.entities[i].bored = num;
				game.entities[i].ydir = Math.floor((Math.random() * 3) - 1);
				game.entities[i].xdir = Math.floor((Math.random() * 3) - 1);
				game.entities[i].mode = "wander";
			
			}
		},
		interact: function(i){
			game.notifications.push({time: 100, text: game.entities[i].name+" interacting"});
			var j = game.events.length
			if (j > 0 && game.entities[i].dest[3] == 0){
				while (j--) {
					if (game.events[j].triggered == false && game.events[j].col == game.entities[i].col && game.events[j].row == game.entities[i].row){	
						game.events[j].triggered = true;
						audio.playSound('collect');
						break;
					}
				}
				game.entities[i].dest = -1;	
				game.entities[i].bored =  20;
				game.entities[i].ydir = Math.floor((Math.random() * 3) - 1);
				game.entities[i].xdir = Math.floor((Math.random() * 3) - 1);						
				game.entities[i].mode = "wander";
			} else if (game.entities[i].dest[2] == 0){
				
				var id = map.top_layer[ game.entities[i].row ][ game.entities[i].col ]
				if (id > -1 && id == game.entities[i].dest[4]){
					did = false

					if (game.entities[i].health < game.entities[i].health_max && objects[id].health > 0) {
						game.entities[i].health += objects[id].health;
						game.notifications.push({time: 200, text: game.entities[i].name+" +hp"});
						audio.playSound('learn1');
						did = true
					}
					if (game.entities[i].hunger < game.entities[i].hunger_max-5 && objects[id].hunger > 0) {
						game.notifications.push({time: 200, text: game.entities[i].name+" +food"});
						game.entities[i].hunger += objects[id].hunger;
						audio.playSound('yummy');
						did = true
					}
					if (game.entities[i].sanity < game.entities[i].sanity_max && objects[id].sanity > 0) {
						game.entities[i].sanity += objects[id].sanity;
						game.notifications.push({time: 200, text: game.entities[i].name+" +sanity"});
						audio.playSound('laugh2');
						did = true
					}
					if (game.entities[i].energy < game.entities[i].energy_max && objects[id].energy > 0) {
						game.entities[i].energy += objects[id].energy;
						game.notifications.push({time: 200, text: game.entities[i].name+" +energy"});
						audio.playSound('laugh3');
						did = true
					}
					game.notifications.push({time: 600, text: game.entities[i].name+" eat's a "+objects[id].name});
					game.entities[i].mode = "wander";
				} else{
					game.entities[i].mode = "wander";
					//console.log("item no longer exists");
				}
			} else if (game.entities[i].dest[2] == 2){
				
				var id = map.center_layer[ game.entities[i].row ][ game.entities[i].col ]
				if (id > -1){
					did = false
					if (game.entities[i].health < game.entities[i].health_max && objects[id].health > 0) {
						game.entities[i].health += objects[id].health;
						game.events.push(game.newMessage("+hp "+game.entities[i].name,rowstart+10, colstart+10));
						audio.playSound('learn1');
						did = true
					}
					if (game.entities[i].hunger < game.entities[i].hunger_max-5 && objects[id].hunger > 0) {
						game.events.push(game.newMessage("+food "+game.entities[i].name,rowstart+10, colstart+10));
						game.entities[i].hunger += objects[id].hunger;
						audio.playSound('yummy');
						did = true
					}
					if (game.entities[i].sanity < game.entities[i].sanity_max && objects[id].sanity > 0) {
						game.entities[i].sanity += objects[id].sanity;
						game.events.push(game.newMessage("+happy "+game.entities[i].name,rowstart+10, colstart+10));
						audio.playSound('laugh2');
						did = true
					}
					if (did){
						game.entities[i].qty -= 1;
						game.entities[i].mode = "wander";
					}
					
					if (game.entities[i].qty < 1){
						map.center_layer[ game.entities[i].row ][ game.entities[i].col ] = objects[id].death;
						game.entities[i].mode = "wander";
					}
				} else {
					game.notifications.push({time: 1250, text: game.entities[i].name+" failed interaction"});
					game.entities[i].mode = "wander";
				}
			} else {
				var id = map.bottom_layer[ game.entities[i].row ][ game.entities[i].col ]
				if (id > -1){
					did = false
					if (game.entities[i].health < game.entities[i].health_max && objects[id].health > 0) {
						game.entities[i].health += objects[id].health;
						audio.playSound('laugh1');
						
						game.notifications.push({time: 1000, text: "+hp "+game.entities[i].name});
						game.events.push(game.newMessage("+hp "+game.entities[i].name,rowstart+10, colstart+10));
						did = true
					}
					if (game.entities[i].hunger < game.entities[i].hunger_max- 5 && objects[id].hunger > 0) {
						audio.playSound('laugh2');
						
						game.notifications.push({time: 1000, text: "+food "+game.entities[i].name});
						game.events.push(game.newMessage("+food "+game.entities[i].name,rowstart+10, colstart+10));
						game.entities[i].hunger += objects[id].hunger;
						game.entities[i].energy += 1
						did = true
					}
					if (game.entities[i].sanity < game.entities[i].sanity_max && objects[id].sanity > 0) {
						
						audio.playSound('laugh3');
						game.notifications.push({time: 1000, text: "+happy "+game.entities[i].name});
						game.events.push(game.newMessage("+happy "+game.entities[i].name,rowstart+10, colstart+10));
						game.entities[i].sanity += objects[id].sanity;
						did = true
					}
					if (did == true){
						game.entities[i].qty -= 1;
						game.entities[i].mode = "wander";
					}
					
					if (game.entities[i].qty < 1){
						map.bottom_layer[ game.entities[i].row ][ game.entities[i].col ] = objects[id].death;
						game.entities[i].bored = Math.floor((Math.random() * 100) +10);
						game.entities[i].ydir = Math.floor((Math.random() * 3) - 1);
						game.entities[i].xdir = Math.floor((Math.random() * 3) - 1);
						game.entities[i].mode = "wander";
					}
				}else {
					game.notifications.push({time: 1250, text: game.entities[i].name+" failed interaction"});
					game.entities[i].mode = "wander";
				}
			}
			if (game.entities[i].hunger > game.entities[i].hunger_max){game.entities[i].hunger = game.entities[i].hunger_max;}
			if (game.entities[i].sanity > game.entities[i].sanity_max){game.entities[i].sanity = game.entities[i].sanity_max;}
			if (game.entities[i].health > game.entities[i].health_max){game.entities[i].health = game.entities[i].health_max;}
			if (game.entities[i].energy > game.entities[i].energy_max){game.entities[i].energy = game.entities[i].energy_max;}
		},
		movement: function(i){
			var intended = {
				x: game.entities[i].x,
				y: game.entities[i].y,
			}
			
			if (game.entities[i].ydir == 1){
				intended.y = game.entities[i].y + images.tick;
				glumDown.animate(images.tick);
				game.entities[i].frame = glumDown.getSprite();
			} else if (game.entities[i].ydir == -1) {
				intended.y = game.entities[i].y - images.tick;
				glumUp.animate(images.tick);
				game.entities[i].frame = glumUp.getSprite();
			} else {
				game.entities[i].ydir = 0;
				stand.animate(images.tick);
				game.entities[i].frame = stand.getSprite();
			}
			
			if (game.entities[i].xdir == 1) {
				intended.x = game.entities[i].x + images.tick;
				glumRight.animate(images.tick);
				game.entities[i].frame = glumRight.getSprite();
			} else if (game.entities[i].xdir == -1) {
				intended.x = game.entities[i].x- images.tick;
				glumLeft.animate(images.tick);
				game.entities[i].frame = glumLeft.getSprite();
			} else {
				game.entities[i].xdir = 0;
			}
			
			var row 	= intended.y / map.tileSize;
			var col 	= intended.x / map.tileSize;
			remainer = row % 1;
			
			if (!map.isImpassibleTerrain(intended) && !map.isImpassibleObject(Math.floor(row),Math.floor(col),remainer)){
				game.entities[i].x = intended.x;
				game.entities[i].y = intended.y;
				game.entities[i].row = Math.floor(row);
				game.entities[i].col = Math.floor(col);
				game.entities[i].remainder = remainer;
			} else {
				if (row == game.entities[i].row && col == game.entities[i].col || map.isImpassibleObject(game.entities[i].row,Math.floor(game.entities[i].col),game.entities[i].remainder) || game.entities[i].mode == "seeking"){
					console.log(game.entities[i].name+" stuck in wall");
					if(game.entities[i].remainder > .5){
						game.entities[i].y += 1;
					} else {
						game.entities[i].y -= 1;
					}
				}
				game.entities[i].bored=  Math.floor((Math.random() * 100) +50);
				game.entities[i].mode = "wander";
				audio.playSound('effort');
				game.entities[i].ydir = Math.floor((Math.random() * 3) - 1);
				game.entities[i].xdir = Math.floor((Math.random() * 3) - 1);
			}
		},
		dead: function(i){
			dead.animate(images.tick);
			game.entities[i].frame = dead.getSprite();
			game.entities[i].energy = 0;
		},
	}
	
	
	