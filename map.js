	//ground
	// 0 = grass
	// 1 = 
	// 2 = ocean
	
	
	var map = {
		tileSize: 50,
		rowTileCount: 0,   // The number of tiles in a row of our background
		colTileCount: 0,   // The number of tiles in a column of our background
		impassibleTerrain: [2,4,5,6,7,8,9,15,25,35,45,55,56,57,58,59,65,75,85,95,105,115,125],//,11,41, 61, 71, 121, 31];
		grassTiles: [0,10,20,30,40,50,60,70,80,90,100,110,11,21,31,41],
		w: 0,
		h: 0,
		stage: {
			w: 0,
			h: 0
		},
		init: function(){
			this.generate_map(20,40);
		},
		getTerrainType: function(x, y){
			var row 	= Math.floor(y / this.tileSize);
			var col 	= Math.floor(x / this.tileSize);
			return this.ground[row][col];
		},
		getFloorType: function(x, y){
			var row 	= Math.floor(y / this.tileSize);
			var col 	= Math.floor(x / this.tileSize);
			return this.top_layer[row][col];
		},
		getObjectType: function(x, y, p){
			var row 	= Math.floor(y / this.tileSize);
			var col 	= Math.floor(x / this.tileSize);
			//console.log(map.ground[row][col]);
			return this.bottom_layer[row][col];
		},
		isImpassibleTerrain: function(entity){
			var blocked = false;
			//map bounds
			if (entity.x >= map.w || entity.x <= 0 || entity.y >= map.h || entity.y <= 0) blocked = true;
			//impassible terrain
			if (this.impassibleTerrain.indexOf(this.getTerrainType(entity.x, entity.y)) > -1) blocked = true;
			return blocked;
		},
		isImpassibleObject: function(row, col, remainder){
			var blocked = false;
			
			type = this.center_layer[row][col];
			if (type > -1){
				if (objects[type].impassible == true && objects[type].half == false) blocked = true;
				if (objects[type].impassible == true && objects[type].half == true && remainder <.8 && remainder >.3) blocked = true;
			}
			type = this.top_layer[row][col];
			//impassible terrain
			if (type > -1 && remainder <.5){
				if (objects[type].impassible == true && objects[type].half == false) blocked = true;
				if (objects[type].impassible == true && objects[type].half == true) blocked = true;
			}
			type = this.bottom_layer[row][col];
			if (type > -1 && remainder >=.5){
				if (objects[type].impassible == true && objects[type].half == false) blocked = true;
				if (objects[type].impassible == true && objects[type].half == true) blocked = true;
			}
			return blocked;
		},
		checkFloor: function(row, col){
			if (typeof objects[this.top_layer[ row ]] != 'undefined' && objects[this.top_layer[ row ][ col ]].qty > 0){
				return 0;
			}
			if (typeof objects[this.bottom_layer[ row ]] != 'undefined' && objects[this.bottom_layer[ row ][ col ]].qty > 0){return 1;}
			return -1;
		},
		searchArea: function(searchbg,searchfg,col,row,size){
			results = [];
			for (r = 0; r < size; r++){
				cellrow = Math.floor(row-(size/2)+r);
				
				for (c = 0; c <= size; c++){
					cellcol = Math.floor(col-(size/2)+c);
					if(typeof this.center_layer[ cellrow ] != 'undefined' && typeof this.center_layer[ cellrow ][ cellcol ] != 'undefined' && this.center_layer[ cellrow ][cellcol] != -1 ){
						result = [2, cellrow, cellcol, this.center_layer[ cellrow ][cellcol]];
						results.push(result);
					}
					if(searchbg && typeof this.top_layer[ cellrow ] != 'undefined' && typeof this.top_layer[ cellrow ][ cellcol ] != 'undefined' && this.top_layer[ cellrow ][cellcol] != -1 ){
						result = [0, cellrow, cellcol, this.top_layer[ cellrow ][cellcol]];
						results.push(result);
					}
					if(searchfg && typeof this.bottom_layer[ cellrow ] != 'undefined' && typeof this.bottom_layer[ cellrow ][ cellcol ] != 'undefined' && this.bottom_layer[ cellrow ][cellcol] != -1){
						result = [1, cellrow, cellcol, this.bottom_layer[ cellrow ][cellcol]];
						results.push(result);
					}
				}
			}				
			return results;
		},
		layers: {
			tiles:[],
			top: [0,0],
			middle: [],
			bottom: [0,0]
		},
		generate_map: function(rows, cols){
			this.rowTileCount = rows;
			this.colTileCount = cols;
			this.w = this.colTileCount*this.tileSize,
			this.h = this.rowTileCount*this.tileSize;
			console.log('map init '+rows+" "+cols);
			for (r = 0; r < this.rowTileCount+1; r++) {
				this.ground[r] = [];
				for (c = 0; c < this.colTileCount; c++) {
					if (r < 2 || r > this.rowTileCount-2 || c < 2 || c > this.colTileCount-3){
						this.ground[r][c] = 4;
					} else if (r == 2){
						if 		(c == 2){					this.ground[r][c] = 55; }
						else if (c == this.colTileCount-3){	this.ground[r][c] = 45; }
						else {								this.ground[r][c] = 35;	}

					} else if (r == this.rowTileCount-2){
						if 		(c == 2){					this.ground[r][c] = 115; }
						else if (c == this.colTileCount-3){	this.ground[r][c] = 125; } 
						else {								this.ground[r][c] = 105; }
					} else {
						if 		(c == 2){					this.ground[r][c] = 65; }
						else if (c == this.colTileCount-3){	this.ground[r][c] = 75; }
						else {								this.ground[r][c] = 1;  }
					}
					//console.log('add cell '+this.ground[r][c]);
				}
			}
			//layers
			for (r = 0; r < this.rowTileCount+1; r++) {
				this.top_layer[r] = [];
				this.center_layer[r] = [];
				this.bottom_layer[r] = [];
				for (c = 0; c < this.colTileCount; c++) {
					this.top_layer[r][c] = -1;
					this.center_layer[r][c] = -1;
					this.bottom_layer[r][c] = -1;
				}
			}
		},
		ground: [],
		top_layer: [],
		center_layer: [],
		bottom_layer: [],
		blendGrassTile: function(tilemap,r,c,recursive){
			if(map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//solid grass	
				tilemap[ r ][ c ] = 0;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				tilemap[ r ][ c ] = 110;
				//console.log("new grass "+r+" "+c+" "+tilemap[ r ][ c ]);	
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				//console.log("dirt right");	
				tilemap[ r ][ c ] = 50;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				//console.log("dirt left right");	
				tilemap[ r ][ c ] = 100;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
				}
				
			}else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				//console.log("dirt right bot");	
				tilemap[ r ][ c ] = 80;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
				}
			}else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//console.log("dirt top bot");	
				tilemap[ r ][ c ] = 90;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				//console.log("dirt bot left");	
				tilemap[ r ][ c ] = 20;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//console.log("dirt bot");	
				tilemap[ r ][ c ] = 60;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//console.log("dirt top");	
				tilemap[ r ][ c ] = 30;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//console.log("dirt left");	
				tilemap[ r ][ c ] = 40;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//console.log("dirt bot left");
				tilemap[ r ][ c ] = 70;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//console.log("dirt top left");
				tilemap[ r ][ c ] = 10;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r+1,c, false);
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) != -1){
				//console.log("grass right");
				tilemap[ r ][ c ] = 41;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r,c+1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				//console.log("grass top");
				tilemap[ r ][ c ] = 31;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r-1,c, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) != -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				tilemap[ r ][ c ] = 21;
				//console.log("grass left "+r+" "+c+" "+tilemap[ r ][ c ]);	
				if (recursive){
					tilemap = this.blendGrassTile(tilemap,r,c-1, false);
				}
			} else if (map.grassTiles.indexOf(tilemap[ r-1 ][ c ]) == -1 && map.grassTiles.indexOf(tilemap[ r ][ c-1 ]) == -1 && map.grassTiles.indexOf(tilemap[ r+1 ][ c ]) != -1 && map.grassTiles.indexOf(tilemap[ r ][ c+1 ]) == -1){
				//console.log("grass bot");
				tilemap[ r ][ c ] = 11;
				if (recursive){
					tilemap = this.blendGrassTile(tilemap, r+1,c, false);
				}
			} else {
				console.log("cant find outcome") 	
			}
			return tilemap;
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
	  
	  
	//floor
	// 0 = rock
	// 1 = tree
	// 2 = tree
	// 3 = berries
	// 4 = rock2
	// 5 = large tuft
	// 6 = large flower
	// 7 = grass flower patch
	// 8 = grass flower sprinkle
	// 9 = grass sprinkle
	// 10 = large grey shroom
	// 11 = large yellow shroom
	// 12 = large green shroom
	// 13 = large red shroom
	// 14 = large purple shroom
	// 15 = mushroom patch good
	// 16 = mushroom patch bad
	// 17 = energy glow 1
	// 18 = energy glow 2
	// 19 = energy glow 3