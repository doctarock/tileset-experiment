	boulderObject ={
		name: "Boulder",
		health: 0,
		hunger: 0,
		sanity: 0,
		product: -1,
		death: -1,
		qty: 50,
		half: false,
		growth: false,
		upgrade: -1,
		combo: -1,
		impassible: false,
		value: 50,
		image: 0 
	}
	treeObject ={
		name: "Tree",
		health: 0,
		hunger: 0,
		sanity: 0,
		product: -1,
		death: -1,
		qty: 50,
		half: true,
		growth: false,
		upgrade: -1,
		combo: -1,
		impassible: false,
		value: 50,
		image: 2 
	}

	bushObject ={	  name: "Bush",			health: 0,	hunger: 0,	sanity: 0,	energy: 10,	product: "stick",	death: -1,	qty: 5,	half: true,	growth: true,	upgrade: 3,	combo: -1,	impassible: false,	value: 50,	image: 2 }
	berrybushObject ={name: "Berry Bush",	hunger: 20,	health: 10,	sanity: 2,	energy: 10,	product: -1,		death: 2,	half: true,	growth: false,	upgrade: -1,	combo: -1,	impassible: false,	w: 50,	h: 25,	hx: 10,	hy: 0,	value: 50,	image: 2 }

	rockObject ={
		name: "Rock",
		health: 0,
		hunger: 0,
		sanity: 0,
		product: "stone",
		death: 1,
		qty: 5,
		half: true,
		growth: false,
		upgrade: -1,
		combo: -1,
		impassible: true,
		value: 50,
		image: 4 
	}
	grassObject ={
		name: "Grass Tuft",
		health: 0,
		hunger: 0,
		sanity: 0,
		product: -1,
		death: 7,
		qty: 50,
		half: false,
		impassible: false,
		growth: false,
		upgrade: -1,
		combo: -1,
		value: 50,
		image: 5 
	}
	flowerObject ={
		name: "Flower",
		health: 0,
		hunger: 0,
		sanity: 10,
		product: "pollen",
		death: 9,
		qty: 15,
		half: false,
		growth: false,
		upgrade: [1,2,10],
		combo: -1,
		impassible: false,
		value: 50,
		image: 6 
	}
	thickgrassObject ={	name: "Long Grass",		health: 0,	hunger: 0,	sanity: 0,	energy: 0,	death: -1,	qty: 50,	half: false,	growth: true,	upgrade: [5],	combo: -1,	impassible: false,	value: 50,	image: 6 }
	medgrassObject ={	name: "Wild Grass",		health: 0,	hunger: 0,	sanity: 0,	energy: 0,	death: -1,	qty: 30,	half: false,	growth: true,	upgrade: [7,20],			combo: -1,	impassible: false,	value: 50,	image: 6 }
	thingrassObject ={	name: "Thin Grass",		health: 0,	hunger: 0,	sanity: 0,	energy: 0,	death: -1,	qty: 20,	half: false,	growth: true,	upgrade: [8],				combo: -1,	impassible: false,	value: 50,	image: 6 }

	greyshroomObject ={	name: "Grey Shroom",	health: -5,	hunger: 5,	sanity: -5,	energy: 0,	death: -1,	qty: 1,		half: false,	growth: true,	upgrade: -1,					combo: -1,	impassible: false,	value: 50,	image: 6 }
	yellowshroomObject ={name: "Yellow Shroom",	health: 0,	hunger: 10,	sanity: -10,energy: 0,	death: -1,	qty: 1,		half: false,	growth: true,	upgrade: 14,					combo: -1,	impassible: false,	value: 50,	image: 6 }
	greenshroomObject ={name: "Green Shroom",	health: -10,hunger: 20,	sanity: -5,	energy: 0,	death: -1,	qty: 1,		half: false,	growth: true,	upgrade: 15,					combo: -1,	impassible: false,	value: 50,	image: 6 }
	redshroomObject ={	name: "Red Shroom",		health: 15,	hunger: 15,	sanity: -1,	energy: 0,	death: -1,	qty: 1,		half: false,	growth: true,	upgrade: 16,					combo: -1,	impassible: false,	value: 50,	image: 6 }
	purpleshroomObject ={name: "Purple Shroom",	health: 10,	hunger: 25,	sanity: -10,energy: 0,	death: -1,	qty: 1,		half: false,	growth: true,	upgrade: 13,					combo: -1,	impassible: false,	value: 50,	image: 6 }
	babyshroomObject ={name: "Baby Shroom",		health: 0,	hunger: 0,	sanity: -5,	energy: 0,	death: -1,	qty: 10,	half: false,	growth: true,	upgrade: 11,					combo: -1,	impassible: false,	value: 50,	image: 10 }
	smallshroomObject ={name: "Small Shroom",	health: -30,hunger: 0,	sanity: -30,energy: 0,	death: -1,	qty: 1,		half: false,	growth: true,	upgrade: 12,					combo: -1,	impassible: false,	value: 50,	image: 6 }
	
	sprout1Object ={name: "Vegetation",			health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1,  	half: false,  	growth: true,	upgrade: [21],					combo: -1,	impassible: false,	value: 1, image: 21 }
	sprout2Object ={name: "Plant Shoot",		health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1, 	half: false,  	growth: true,	upgrade: [22],					combo: -1,	impassible: false,	value: 1, image: 21 }
	sprout3Object ={name: "Plant Tuft",			health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1,  	half: false,  	growth: true,	upgrade: [23],					combo: -1,	impassible: false,	value: 1, image: 21 }
	sprout4Object ={name: "Plant Sprout",		health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1,  	half: false,  	growth: true,	upgrade: [24,24,24,24,6], combo: -1,	impassible: false,	value: 1, image: 21 }
	sprout5Object ={name: "Plant Sprout",		health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1,  	half: false,  	growth: true,	upgrade: [25],					combo: -1,	impassible: false,	value: 1, image: 21 }
	sprout6Object ={name: "Plant Sprout",		health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1,  	half: false,  	growth: true,	upgrade: [26],					combo: -1,	impassible: false,	value: 1, image: 21 }
	sprout7Object ={name: "Plant Sprout",		health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1,  	half: false,  	growth: true,	upgrade: [27],					combo: -1,	impassible: false,	value: 1, image: 21 }
	sprout8Object ={name: "Plant Sprout",		health: 0,	hunger: 0,	sanity: 0,	energy: 0, death: -1,  	qty: 1,  	half: false,  	growth: true,	upgrade: [30],					combo: -1,	impassible: false,	value: 1, image: 21 }
	
	coffee1Object ={name: "Coffee Sprout",		health: 0,	hunger: 0,	sanity: 0,	energy: 0, 	death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [31],					combo: -1,	impassible: false,	value: 1, image: 21 }
	coffee2Object ={name: "Immature Coffee",	health: 0,	hunger: 0,	sanity: 0,	energy: 0, 	death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [32],					combo: -1,	impassible: false,	value: 1, image: 21 }
	coffee3Object ={name: "Coffee Plant",		health: 0,	hunger: 5,	sanity: -10,energy: 20, death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [33],					combo: -1,	impassible: false,	value: 1, image: 21 }
	coffee4Object ={name: "Ripe Coffee Plant",	health: 5,	hunger: 10,	sanity: -20,energy: 30, death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [34],					combo: -1,	impassible: false,	value: 1, image: 21 }
	coffee5Object ={name: "Old Coffee Plant",	health: 0,	hunger: 4,	sanity: -15,energy: 15, death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [35],					combo: -1,	impassible: false,	value: 1, image: 21 }
	coffee6Object ={name: "Dying Coffee Plant",	health: 0,	hunger: 3,	sanity: -10,energy: 10, death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [36],					combo: -1,	impassible: false,	value: 1, image: 21 }
	coffee7Object ={name: "Shriveled Coffee",	health: 0,	hunger: 0,	sanity: 0,	energy: 0, 	death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [37],					combo: -1,	impassible: false,	value: 1, image: 21 }
	coffee8Object ={name: "Dead Plant",			health: 0,	hunger: 0,	sanity: 0,	energy: 1, 	death: -1,  qty: 1,  	half: false,  	growth: true,	upgrade: [-1],					combo: -1,	impassible: false,	value: 1, image: 21 }
	appleObject   ={name: "Tree",				health: 0,	hunger: 0,	sanity: 0,	energy: 0,	death: -1,	qty: 0,	 	half: true,		growth: true,	upgrade: 3,						combo: -1,	impassible: false,	value: 50,	image: 2 }
	apltreeObject ={name: "Apple Tree",			hunger: 20,	health: 10,	sanity: 2,	energy: 10,	death: 2,	qty: 0,	 	half: true,		growth: false,	upgrade: -1,					combo: -1,	impassible: false,	w: 50,	h: 25,	hx: 10,	hy: 0,	value: 50,	image: 2 }


	treeLrgObject ={
		name: "Tree",
		health: 100,
		hunger: 0,
		sanity: 0,
		product: -1,
		death: -1,
		qty: 50,
		half: true,
		growth: false,
		upgrade: -1,
		combo: -1,
		impassible: false,
		value: 50,
		assets: {x:0,y:300,w:100,h:100,hx:50,hy:50,sprite:"objects"}
	}
	// var objects matches objectset.png sprite order
	var objects = [boulderObject, rockObject, bushObject, berrybushObject, treeObject, grassObject, flowerObject, thickgrassObject, medgrassObject, thingrassObject, 
				   babyshroomObject, smallshroomObject, yellowshroomObject, greyshroomObject, greenshroomObject, redshroomObject, purpleshroomObject,  purpleshroomObject,purpleshroomObject, purpleshroomObject,
				   sprout1Object, sprout2Object, sprout3Object, sprout4Object, sprout5Object, sprout6Object, sprout7Object, sprout8Object, sprout8Object, sprout8Object,
				   coffee1Object, coffee2Object, coffee3Object, coffee4Object, coffee5Object, coffee6Object, coffee7Object, coffee8Object, coffee8Object, coffee8Object,
				   treeLrgObject];
	
	
	var tiles = [	];
	tiles[0] = "Grass";
	tiles[1] = "Dirt";
	tiles[2] = "Water";
	tiles[3] = "Dirt";
	tiles[4] = "Rock";
	tiles[7] = "Water";
	tiles[10] = "Grass";
	tiles[11] = "Grass";
	tiles[12] = "Grass";
	tiles[13] = "Grass";
	tiles[14] = "Grass";
	tiles[15] = "Rock";
	tiles[20] = "Grass";
	tiles[25] = "Rock";
	tiles[30] = "Grass";
	tiles[33] = "Path";
	tiles[35] = "Rock";
	tiles[40] = "Grass";
	tiles[45] = "Rock";
	tiles[50] = "Grass";
	tiles[55] = "Rock";
	tiles[56] = "Dirt";
	tiles[55] = "Rock";
	tiles[57] = "Water / Dirt";
	tiles[60] = "Grass";
	tiles[65] = "Rock";
	tiles[70] = "Grass";
	tiles[75] = "Rock";
	tiles[80] = "Grass";
	tiles[100] = "Grass";
	tiles[110] = "Grass";
	tiles[120] = "Sprouts";