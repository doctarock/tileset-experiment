function newGlum(){
	isdev = Math.floor(Math.random() * 2);
	type = "glum";
	if (isdev == 1){
		type = "devilglum";
	}
	return {
		x: Math.floor((Math.random() * (map.w/2)) + 150),
		y: Math.floor((Math.random() * (map.h/2)) + 150),
		type: 1,
		hotspotx: 25,
		hotspoty: 15,
		row: 0,
		col: 0,
		xface: 1,
		name: names[Math.floor((Math.random() * (names.length-1)))],
		xdir: 0,
		ydir: 0,
		bored: 0,
		hover: 0,
		selected: 0,
		mode: "wander",
		sprite: type,
		health: 100,
		health_max: 100,
		energy: 100,
		energy_max: 200,
		hunger: 100,
		hunger_max: 100,
		sanity: 100,
		sanity_max: 100,
		sight: 5,
		w: 50,
		h: 50,
		qty: 0,
		remainder: 0,
		frame: null,
		inventory: []
	};
}

function runGlum(i) {
	
	if (game.entities[i].mode == "sleeping"){
		//Sleep
		ai.sleep(i);
	} else if (game.entities[i].mode == "wander"){
		//Wander
		ai.movement(i);
		ai.moment(i);
		ai.wander(i);
	} else if (game.entities[i].mode == "searching"){
		//Search
		ai.movement(i);
		ai.moment(i);
		ai.search(i);
	} else if (game.entities[i].mode == "interacting"){
		//Interact
		ai.moment(i);
		ai.interact(i);
	} else if (game.entities[i].mode == "seeking"){
		//Seek
		ai.movement(i);
		ai.moment(i);
		ai.seek(i);
	} else if (game.entities[i].mode == -1){
		//Dead
		ai.dead(i);
	}
	
	if(input.mousePos.row == game.entities[i].row && input.mousePos.col == game.entities[i].col){
		xmouse = input.mousePos.x;
		ymouse = input.mousePos.y;
		if(input.lclick && xmouse > game.entities[i].x - (game.entities[i].w/2) && xmouse < game.entities[i].x + (game.entities[i].w/2) && ymouse > game.entities[i].y - (game.entities[i].h/2) && ymouse < game.entities[i].y + (game.entities[i].h/2)){

			game.entities[i].selected = 1;
			ui.selected = i;
			ui.hover = -1;
			input.lclick = false;
			input.lclick = false;
		}else if(ui.selected == -1){
			game.entities[i].hover = 1;
			ui.hover = i;
		}
	} else {
		game.entities[i].hover = 0;
	}
}

function drawGlum(thisentity){
	thisentity.stagex = thisentity.x-game.camera.x;
	thisentity.stagey = thisentity.y-game.camera.y;
	
	game.ctx.drawImage(images.sprites[thisentity.sprite], thisentity.frame.x, thisentity.frame.y, thisentity.w, thisentity.h, thisentity.stagex-(thisentity.w/2), thisentity.stagey-thisentity.h, thisentity.w, thisentity.h)
	
}