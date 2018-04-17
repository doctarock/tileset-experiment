
function newBunny1(x,y){
	return {
		x: x,
		y: y,
		stagex: -1,
		stagey: -1,
		type: 3,
		hotspotx: 12,
		hotspoty: 12,
		row: 0,
		col: 0,
		name: "Bunny",
		xdir: 1,
		ydir: 0,
		bored: 0,
		hover: 0,
		selected: 0,
		mode: 3,
		health: 20,
		health_max: 20,
		energy: 100,
		energy_max: 200,
		hunger: 100,
		hunger_max: 100,
		sanity: 100,
		sanity_max: 100,
		sight: 5,
		w: 24,
		h: 24,
		qty: 0,
		remainder: 0,
		frame: null
	};
}

function runBunny(i){
	var intended = {
		x: game.entities[i].x,
		y: game.entities[i].y,
		xhot: game.entities[i].hotspotx,
		yhot: game.entities[i].hotspoty
	}
	
	if (game.entities[i].ydir == 1){
		intended.y = game.entities[i].y + 1;
		bunnydown.animate(images.tick);
		game.entities[i].frame = bunnydown.getSprite();
	} else if (game.entities[i].ydir == -1) {
		intended.y = game.entities[i].y - 1;
		bunnyup.animate(images.tick);
		game.entities[i].frame = bunnyup.getSprite();
	}
	
	if (game.entities[i].xdir == 1) {
		intended.x = game.entities[i].x + 1;
		bunnyright.animate(images.tick);
		game.entities[i].frame = bunnyright.getSprite();
	} else if (game.entities[i].xdir == -1) {
		intended.x = game.entities[i].x- 1;
		bunnyleft.animate(images.tick);
		game.entities[i].frame = bunnyleft.getSprite();
	} else {
		game.entities[i].xdir = 0;
		if (game.entities[i].ydir == 0){
			bunnystop.animate(images.tick);
			game.entities[i].frame = bunnystop.getSprite();
		}
		
	}
	
	var row 	= intended.y / tileSize;
	var col 	= intended.x / tileSize;
	remainer = row % 1;
	game.entities[i].bored -= 1;
	
	if (!isImpassibleTerrain(intended) && !isImpassibleObject(Math.floor(row),Math.floor(col),remainer)){
		game.entities[i].x = intended.x;
		game.entities[i].y = intended.y;
		game.entities[i].row = Math.floor(row);
		game.entities[i].col = Math.floor(col);
		game.entities[i].remainder = remainer;
	} else {
		game.entities[i].bored = 0;
	}
	if (game.entities[i].bored <= 0){
		game.entities[i].bored = Math.floor((Math.random() * 10) +30);
		if(game.entities[i].ydir !=0 ||game.entities[i].xdir != 0){
			game.entities[i].ydir = 0;
			game.entities[i].xdir = 0;
		}else{
			game.entities[i].ydir = Math.floor((Math.random() * 3) - 1);
			game.entities[i].xdir = Math.floor((Math.random() * 3) - 1);
		}
		game.entities[i].mode = "wander";
	}

	if(input.mousePos.row == game.entities[i].row && input.mousePos.col == game.entities[i].col){
		ui.hover = i;
	}
}

function drawBunny(thisentity){
	thisentity.stagex = thisentity.x-game.camera.x;
	thisentity.stagey = thisentity.y-game.camera.y;
	game.ctx.drawImage(images.sprites['bunny'], thisentity.frame.x, thisentity.frame.y, 24, 24, thisentity.stagex-(thisentity.w/2), thisentity.stagey-(thisentity.h), thisentity.w, thisentity.h)
	game.ctx.save(); 
	game.ctx.fillStyle = 'red';
	game.ctx.fillRect(thisentity.stagex - 15,thisentity.stagey - 43,30,2);
	game.ctx.fillStyle = 'red';
	game.ctx.fillRect(thisentity.stagex - 15,thisentity.stagey - 40,30,3);
	
	var healthpc = (thisentity.health/100)*30;
	var sanitypc = (thisentity.sanity/100)*30;
	game.ctx.fillStyle = 'lightblue';
	game.ctx.fillRect(thisentity.stagex-15,thisentity.stagey - 43,sanitypc,2);
	game.ctx.fillStyle = 'lime';
	game.ctx.fillRect(thisentity.stagex-15,thisentity.stagey - 40,healthpc,3);
	
	game.ctx.restore();
}