
	function newHuman1(){
		return {
			x: 10,
			y: 420,
			stagex: -1,
			stagey: -1,
			type: 2,
			hotspotx: 15,
			hotspoty: 15,
			row: 0,
			col: 0,
			name: "Human",
			xdir: 1,
			ydir: 0,
			bored: 10000,
			hover: 0,
			selected: 0,
			mode: 3,
			health: 100,
			health_max: 100,
			energy: 100,
			energy_max: 200,
			hunger: 100,
			hunger_max: 100,
			sanity: 100,
			sanity_max: 100,
			sight: 5,
			w: 30,
			h: 50,
			qty: 0,
			remainder: 0,
			frame: null,
			skin: null,
			inventory: []
		};
	}

function runHuman(i){
	images.tick = .3;
				var intended = {
					x: game.entities[i].x,
					y: game.entities[i].y,
					xhot: game.entities[i].hotspotx,
					yhot: game.entities[i].hotspoty
				}
				
				if (game.entities[i].ydir == 1){
					intended.y = game.entities[i].y + images.tick;
					human1Down.animate(images.tick);
					game.entities[i].frame = human1Down.getSprite();
				} else if (game.entities[i].ydir == -1) {
					intended.y = game.entities[i].y - images.tick;
					human1Up.animate(images.tick);
					game.entities[i].frame = human1Up.getSprite();
				}
				
				if (game.entities[i].xdir == 1) {
					intended.x = game.entities[i].x + images.tick;
					human1Right.animate(images.tick);
					game.entities[i].frame = human1Right.getSprite();
				} else if (game.entities[i].xdir == -1) {
					intended.x = game.entities[i].x- images.tick;
					human1Left.animate(images.tick);
					game.entities[i].frame = human1Left.getSprite();
				} else {
					game.entities[i].xdir = 0;
					
				}
				
				var row 	= intended.y / tileSize;
				var col 	= intended.x / tileSize;
				remainer = row % 1;
				
				if (!isImpassibleTerrain(intended) && !isImpassibleObject(Math.floor(row),Math.floor(col),remainer)){
					game.entities[i].x = intended.x;
					game.entities[i].y = intended.y;
					game.entities[i].row = Math.floor(row);
					game.entities[i].col = Math.floor(col);
					game.entities[i].remainder = remainer;
				} else {
					game.entities[i].xdir = -game.entities[i].xdir;
				}
	
		if(input.mousePos.row == game.entities[i].row && input.mousePos.col == game.entities[i].col){
			if(input.lclick){
				game.entities[i].selected = 1;
				ui.selected = i;
				ui.hover = -1;
				input.lclick =false;
			}else{
				game.entities[i].hover = 1;
				ui.hover = i;
			}
		} else {
			game.entities[i].hover = 0;
		}
}

function drawHuman1(thisentity){
		thisentity.stagex = thisentity.x-game.camera.x;
		thisentity.stagey = thisentity.y-game.camera.y;
		
		game.ctx.drawImage(images.sprites['human'], thisentity.frame.x, thisentity.frame.y, 30, 50, thisentity.stagex-(thisentity.w/2), thisentity.stagey-(thisentity.h), thisentity.w, thisentity.h)
		game.ctx.save(); 
		game.ctx.fillStyle = 'red';
		game.ctx.fillRect(thisentity.stagex - 15,thisentity.stagey - 47,30,2);
		game.ctx.fillStyle = 'red';
		game.ctx.fillRect(thisentity.stagex - 15,thisentity.stagey - 40,30,3);
		
		var healthpc = (thisentity.health/100)*30;
		var sanitypc = (thisentity.sanity/100)*30;
		game.ctx.fillStyle = 'lightblue';
		game.ctx.fillRect(thisentity.stagex-15,thisentity.stagey - 47,sanitypc,2);
		game.ctx.fillStyle = 'lime';
		game.ctx.fillRect(thisentity.stagex-15,thisentity.stagey - 40,healthpc,3);
		
		game.ctx.restore();
	}