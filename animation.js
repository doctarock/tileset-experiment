// Animation Extension	
var SpriteSheet = function(data) {
	this.load(data);
};
	
SpriteSheet.prototype = {
	_sprites: [],
	_width: 0,
	_height: 0,
	
	load: function(data) {
		this._height = data.height;
		this._width = data.width;
		this._sprites = data.sprites;
	},
	
	getOffset: function(spriteName) {
		//Go through all sprites to find the required one
		for(var i = 0, len = this._sprites.length; i < len; i++) {
			var sprite = this._sprites[i];
	
			if(sprite.name == spriteName) {
				//To get the offset, multiply by sprite width
				//Sprite-specific x and y offset is then added into it.
				return {
					x: sprite.x, //(i * this._width) + (sprite.x||0),
					y: sprite.y, //(sprite.y||0),
					width: this._width,
					height: this._height
				};
			}
		}
	
		return null;
	}
};

var Animation = function(data, sprites) {
	this.load(data);
	this._sprites = sprites;
};
	
Animation.prototype = {
	_frames: [],
	_frame: null,
	_frameDuration: 0,
	
	load: function(data) {
		this._frames = data;
	
		//Initialize the first frame
		this._frameIndex = 0;
		this._frameDuration = data[0].time;
	},
	
	animate: function(deltaTime) {
		//Reduce time passed from the duration to show a frame        
		this._frameDuration -= deltaTime;
	
		//When the display duration has passed
		if(this._frameDuration <= 0) {
			//Change to next frame, or the first if ran out of frames
			this._frameIndex++;
			if(this._frameIndex == this._frames.length) {
				this._frameIndex = 0;
			}
	
			//Change duration to duration of new frame
			this._frameDuration = this._frames[this._frameIndex].time;
		}
	},
	
	getSprite: function() {
		//Return the sprite for the current frame
		return this._sprites.getOffset(this._frames[this._frameIndex].sprite);
	}
}

var tileSprites = new SpriteSheet({
	width: 50,
	height: 50,
	sprites: [
		{ name: 'water_1', x: 100, y: 0 },
		{ name: 'water_2', x: 100, y: 50 },
		{ name: 'water_3', x: 100, y: 100 },
		{ name: 'water_4', x: 100, y: 150 },
		{ name: 'water_5', x: 100, y: 200 },
		{ name: 'water_s_1', x: 300, y: 0 },
		{ name: 'water_s_2', x: 300, y: 50 },
		{ name: 'water_s_3', x: 300, y: 100 },
		{ name: 'water_s_4', x: 300, y: 150 },
		{ name: 'water_s_5', x: 300, y: 200 },
		{ name: 'water_n_1', x: 350, y: 0 },
		{ name: 'water_n_2', x: 350, y: 50 },
		{ name: 'water_n_3', x: 350, y: 100 },
		{ name: 'water_n_4', x: 350, y: 150 },
		{ name: 'water_n_5', x: 350, y: 200 },
		{ name: 'water_e_1', x: 400, y: 0 },
		{ name: 'water_e_2', x: 400, y: 50 },
		{ name: 'water_e_3', x: 400, y: 100 },
		{ name: 'water_e_4', x: 400, y: 150 },
		{ name: 'water_e_5', x: 400, y: 200 },
		{ name: 'water_w_1', x: 450, y: 0 },
		{ name: 'water_w_2', x: 450, y: 50 },
		{ name: 'water_w_3', x: 450, y: 100 },
		{ name: 'water_w_4', x: 450, y: 150 },
		{ name: 'water_w_5', x: 450, y: 200 },
		{ name: 'water_nw_1', x: 300, y: 250 },
		{ name: 'water_nw_2', x: 300, y: 300 },
		{ name: 'water_nw_3', x: 300, y: 350 },
		{ name: 'water_nw_4', x: 300, y: 400 },
		{ name: 'water_nw_5', x: 300, y: 450 },
		{ name: 'water_ne_1', x: 350, y: 250 },
		{ name: 'water_ne_2', x: 350, y: 300 },
		{ name: 'water_ne_3', x: 350, y: 350 },
		{ name: 'water_ne_4', x: 350, y: 400 },
		{ name: 'water_ne_5', x: 350, y: 450 },
		{ name: 'water_se_1', x: 400, y: 250 },
		{ name: 'water_se_2', x: 400, y: 300 },
		{ name: 'water_se_3', x: 400, y: 350 },
		{ name: 'water_se_4', x: 400, y: 400 },
		{ name: 'water_se_5', x: 400, y: 450 },
		{ name: 'water_sw_1', x: 450, y: 250 },
		{ name: 'water_sw_2', x: 450, y: 300 },
		{ name: 'water_sw_3', x: 450, y: 350 },
		{ name: 'water_sw_4', x: 450, y: 400 },
		{ name: 'water_sw_5', x: 450, y: 450 },
	]
});
var waterspeed = 4;
var flow = new Animation([
		{ sprite: 'water_1', time: waterspeed },
		{ sprite: 'water_2', time: waterspeed },
		{ sprite: 'water_3', time: waterspeed },
		{ sprite: 'water_4', time: waterspeed },
		{ sprite: 'water_5', time: waterspeed },
], tileSprites);

var flown = new Animation([
		{ sprite: 'water_n_1', time: waterspeed },
		{ sprite: 'water_n_2', time: waterspeed },
		{ sprite: 'water_n_3', time: waterspeed },
		{ sprite: 'water_n_4', time: waterspeed },
		{ sprite: 'water_n_5', time: waterspeed },
], tileSprites);

var flowe = new Animation([
		{ sprite: 'water_e_1', time: waterspeed },
		{ sprite: 'water_e_2', time: waterspeed },
		{ sprite: 'water_e_3', time: waterspeed },
		{ sprite: 'water_e_4', time: waterspeed },
		{ sprite: 'water_e_5', time: waterspeed },
], tileSprites);

var flows = new Animation([
		{ sprite: 'water_s_1', time: waterspeed },
		{ sprite: 'water_s_2', time: waterspeed },
		{ sprite: 'water_s_3', time: waterspeed },
		{ sprite: 'water_s_4', time: waterspeed },
		{ sprite: 'water_s_5', time: waterspeed },
], tileSprites);

var floww = new Animation([
		{ sprite: 'water_w_1', time: waterspeed },
		{ sprite: 'water_w_2', time: waterspeed },
		{ sprite: 'water_w_3', time: waterspeed },
		{ sprite: 'water_w_4', time: waterspeed },
		{ sprite: 'water_w_5', time: waterspeed },
], tileSprites);

var flownw = new Animation([
		{ sprite: 'water_nw_1', time: waterspeed },
		{ sprite: 'water_nw_2', time: waterspeed },
		{ sprite: 'water_nw_3', time: waterspeed },
		{ sprite: 'water_nw_4', time: waterspeed },
		{ sprite: 'water_nw_5', time: waterspeed },
], tileSprites);

var flowne = new Animation([
		{ sprite: 'water_ne_1', time: waterspeed },
		{ sprite: 'water_ne_2', time: waterspeed },
		{ sprite: 'water_ne_3', time: waterspeed },
		{ sprite: 'water_ne_4', time: waterspeed },
		{ sprite: 'water_ne_5', time: waterspeed },
], tileSprites);

var flowse = new Animation([
		{ sprite: 'water_se_1', time: waterspeed },
		{ sprite: 'water_se_2', time: waterspeed },
		{ sprite: 'water_se_3', time: waterspeed },
		{ sprite: 'water_se_4', time: waterspeed },
		{ sprite: 'water_se_5', time: waterspeed },
], tileSprites);

var flowsw = new Animation([
		{ sprite: 'water_sw_1', time: waterspeed },
		{ sprite: 'water_sw_2', time: waterspeed },
		{ sprite: 'water_sw_3', time: waterspeed },
		{ sprite: 'water_sw_4', time: waterspeed },
		{ sprite: 'water_sw_5', time: waterspeed },
], tileSprites);

// extended walk
var glumSprites = new SpriteSheet({
	width: 50,
	height: 50,
	sprites: [
		{ name: 'walk_l_1', x: 0, y: 0 },
		{ name: 'walk_l_2', x: 50, y: 0 },
		{ name: 'walk_l_3', x: 100, y: 0 },
		{ name: 'walk_l_4', x: 150, y: 0 },
		{ name: 'walk_l_5', x: 200, y: 0 },
		{ name: 'walk_l_6', x: 250, y: 0 },
		{ name: 'walk_l_7', x: 300, y: 0 },
		{ name: 'walk_l_8', x: 350, y: 0 },
		{ name: 'walk_r_1', x: 0, y: 50 },
		{ name: 'walk_r_2', x: 50, y: 50 },
		{ name: 'walk_r_3', x: 100, y: 50 },
		{ name: 'walk_r_4', x: 150, y: 50 },
		{ name: 'walk_r_5', x: 200, y: 50 },
		{ name: 'walk_r_6', x: 250, y: 50 },
		{ name: 'walk_r_7', x: 300, y: 50 },
		{ name: 'walk_r_8', x: 350, y: 50 },
		{ name: 'stand_1', x: 0, y: 100 },
		{ name: 'stand_2', x: 50, y: 100 },
		{ name: 'stand_3', x: 100, y: 100 },
		{ name: 'stand_4', x: 150, y: 100 },
		{ name: 'stand_5', x: 200, y: 100 },
		{ name: 'stand_6', x: 250, y: 100 },
		{ name: 'stand_7', x: 300, y: 100 },
		{ name: 'stand_8', x: 350, y: 100 },
		{ name: 'stand_1_1', x: 0, y: 150 },
		{ name: 'stand_1_2', x: 50, y: 150 },
		{ name: 'stand_1_3', x: 100, y: 150 },
		{ name: 'stand_1_4', x: 150, y: 150 },
		{ name: 'stand_1_5', x: 200, y: 150 },
		{ name: 'stand_1_6', x: 250, y: 150 },
		{ name: 'stand_1_7', x: 300, y: 150 },
		{ name: 'stand_1_8', x: 350, y: 150 },
		{ name: 'point_r', x: 0, y: 200 },
		{ name: 'point_l', x: 50, y: 200 },
		{ name: 'walk_d_1', x: 0, y: 250 },
		{ name: 'walk_d_2', x: 50, y: 250 },
		{ name: 'walk_d_3', x: 100, y: 250 },
		{ name: 'walk_d_4', x: 150, y: 250 },
		{ name: 'walk_d_5', x: 200, y: 250 },
		{ name: 'walk_d_6', x: 250, y: 250 },
		{ name: 'walk_d_7', x: 300, y: 250 },
		{ name: 'walk_d_8', x: 350, y: 250 },
		{ name: 'walk_u_1', x: 0, y: 300 },
		{ name: 'walk_u_2', x: 50, y: 300 },
		{ name: 'walk_u_3', x: 100, y: 300 },
		{ name: 'walk_u_4', x: 150, y: 300 },
		{ name: 'walk_u_5', x: 200, y: 300 },
		{ name: 'walk_u_6', x: 250, y: 300 },
		{ name: 'walk_u_7', x: 300, y: 300 },
		{ name: 'walk_u_8', x: 350, y: 300 },
		{ name: 'sleep_1', x: 0, y: 350 },
		{ name: 'sleep_2', x: 50, y: 350 },
		{ name: 'sleep_3', x: 100, y: 350 },
		{ name: 'sleep_4', x: 150, y: 350 },
		{ name: 'sleep_5', x: 200, y: 350 },
		{ name: 'dead', x: 250, y: 350 },
	]
});

var stand = new Animation([
		{ sprite: 'stand_1', time: 100 },
		{ sprite: 'stand_6', time: 100 },
		{ sprite: 'stand_5', time: 10 },
		{ sprite: 'stand_4', time: 10 },
		{ sprite: 'stand_1', time: 50 },
		{ sprite: 'stand_3', time: 10 },
		{ sprite: 'stand_2', time: 60 },
], glumSprites);

var dead = new Animation([
		{ sprite: 'dead', time: 50 },
], glumSprites);

var sleep = new Animation([
		{ sprite: 'sleep_1', time: 50 },
		{ sprite: 'sleep_2', time: 50 },
		{ sprite: 'sleep_3', time: 50 },
		{ sprite: 'sleep_4', time: 50 },
		{ sprite: 'sleep_5', time: 50 },
		{ sprite: 'sleep_3', time: 50 },
		{ sprite: 'sleep_2', time: 50 },
], glumSprites);

var glumDown = new Animation([
		{ sprite: 'walk_d_1', time: 5 },
		{ sprite: 'walk_d_2', time: 5 },
		{ sprite: 'walk_d_3', time: 5 },
		{ sprite: 'walk_d_4', time: 5 },
		{ sprite: 'walk_d_5', time: 5 },
		{ sprite: 'walk_d_6', time: 5 },
		{ sprite: 'walk_d_7', time: 5 },
		{ sprite: 'walk_d_8', time: 5 }
], glumSprites);

var glumUp = new Animation([
		{ sprite: 'walk_u_1', time: 5 },
		{ sprite: 'walk_u_2', time: 5 },
		{ sprite: 'walk_u_3', time: 5 },
		{ sprite: 'walk_u_4', time: 5 },
		{ sprite: 'walk_u_5', time: 5 },
		{ sprite: 'walk_u_6', time: 5 },
		{ sprite: 'walk_u_7', time: 5 },
		{ sprite: 'walk_u_8', time: 5 }
], glumSprites);

var pointLeft = new Animation([
		{ sprite: 'stand_2', time: 10 },
		{ sprite: 'point_l', time: 10 }
], glumSprites);

var pointRight = new Animation([
		{ sprite: 'stand_6', time: 10 },
		{ sprite: 'point_r', time: 10 }
], glumSprites);

var glumRight  = new Animation([
		{ sprite: 'walk_l_1', time: 5 },
		{ sprite: 'walk_l_2', time: 5 },
		{ sprite: 'walk_l_3', time: 5 },
		{ sprite: 'walk_l_4', time: 5 },
		{ sprite: 'walk_l_5', time: 5 },
		{ sprite: 'walk_l_6', time: 5 },
		{ sprite: 'walk_l_7', time: 5 },
		{ sprite: 'walk_l_8', time: 5 }
], glumSprites);

var glumLeft = new Animation([
		{ sprite: 'walk_r_8', time: 5 },
		{ sprite: 'walk_r_7', time: 5 },
		{ sprite: 'walk_r_6', time: 5 },
		{ sprite: 'walk_r_5', time: 5 },
		{ sprite: 'walk_r_4', time: 5 },
		{ sprite: 'walk_r_3', time: 5 },
		{ sprite: 'walk_r_2', time: 5 },
		{ sprite: 'walk_r_1', time: 5 }
], glumSprites);

// extended walk
var human1Sprites = new SpriteSheet({
	width: 30,
	height: 40,
	sprites: [
		{ name: 'walk_r_1', x: 0, y: 48 },
		{ name: 'walk_r_2', x: 32, y: 48 },
		{ name: 'walk_r_3', x: 64, y: 48},
		{ name: 'walk_r_4', x: 96, y: 48 },
		{ name: 'walk_l_1', x: 0, y: 96},
		{ name: 'walk_l_2', x: 32, y: 96},
		{ name: 'walk_l_3', x: 64, y: 96},
		{ name: 'walk_l_4', x: 96, y: 96},
	]
});

var human1Down = new Animation([
		{ sprite: 'walk_d_1', time: 5 },
		{ sprite: 'walk_d_2', time: 5 },
		{ sprite: 'walk_d_3', time: 5 },
		{ sprite: 'walk_d_4', time: 5 }
], human1Sprites);

var human1Up = new Animation([
		{ sprite: 'walk_u_1', time: 5 },
		{ sprite: 'walk_u_2', time: 5 },
		{ sprite: 'walk_u_3', time: 5 },
		{ sprite: 'walk_u_4', time: 5 }
], human1Sprites);


var human1Right  = new Animation([
		{ sprite: 'walk_l_1', time: 5 },
		{ sprite: 'walk_l_2', time: 5 },
		{ sprite: 'walk_l_3', time: 5 },
		{ sprite: 'walk_l_4', time: 5 }
], human1Sprites);

var human1Left = new Animation([
		{ sprite: 'walk_r_4', time: 5 },
		{ sprite: 'walk_r_3', time: 5 },
		{ sprite: 'walk_r_2', time: 5 },
		{ sprite: 'walk_r_1', time: 5 }
], human1Sprites);

var lightningSprites = new SpriteSheet({
	width: 50,
	height: 50,
	sprites: [
		{ name: 'lightning_1', x: 0, y: 0 },
		{ name: 'lightning_2', x: 50, y: 0 },
		{ name: 'lightning_3', x: 100, y: 0 }
	]
});

var magicSprites = new SpriteSheet({
	width: 50,
	height: 50,
	sprites: [
		{ name: 'magic_1', x: 0, y: 0 },
		{ name: 'magic_2', x: 50, y: 0 },
		{ name: 'magic_3', x: 100, y: 0 },
		{ name: 'magic_4', x: 150, y: 0 }
	]
});

var bunnySprites = new SpriteSheet({
	width: 24,
	height: 24,
	sprites: [
		{ name: 'bunny_d1', x: 0, y: 0 },
		{ name: 'bunny_d2', x: 30, y: 0 },
		{ name: 'bunny_d3', x: 60, y: 0 },
		{ name: 'bunny_l1', x: 0, y: 30 },
		{ name: 'bunny_l2', x: 30, y: 30 },
		{ name: 'bunny_l3', x: 60, y: 30 },
		{ name: 'bunny_r1', x: 0, y: 60 },
		{ name: 'bunny_r2', x: 30, y: 60 },
		{ name: 'bunny_r3', x: 60, y: 60 },
		{ name: 'bunny_u1', x: 0, y: 90 },
		{ name: 'bunny_u2', x: 30, y: 90 },
		{ name: 'bunny_u3', x: 60, y: 90 },
	]
});
var bunnystop = new Animation([
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
], bunnySprites);
var bunnydown = new Animation([
		{ sprite: 'bunny_d1', time: waterspeed },
		{ sprite: 'bunny_d2', time: waterspeed },
		{ sprite: 'bunny_d3', time: waterspeed },
], bunnySprites);
var bunnyleft = new Animation([
		{ sprite: 'bunny_l1', time: waterspeed },
		{ sprite: 'bunny_l2', time: waterspeed },
		{ sprite: 'bunny_l3', time: waterspeed },
], bunnySprites);
var bunnyright = new Animation([
		{ sprite: 'bunny_r1', time: waterspeed },
		{ sprite: 'bunny_r2', time: waterspeed },
		{ sprite: 'bunny_r3', time: waterspeed },
], bunnySprites);
var bunnyup = new Animation([
		{ sprite: 'bunny_u1', time: waterspeed },
		{ sprite: 'bunny_u2', time: waterspeed },
		{ sprite: 'bunny_u3', time: waterspeed },
], bunnySprites);