
var input = {
	lclick: false, 
	mclick: false, 
	rclick: false,
	mousePos: {x:0,y:0,row:0,col:0},
	touches : {
		"touchstart": {"x":-1, "y":-1}, 
		"touchmove" : {"x":-1, "y":-1}, 
		"touchend"  : false,
		"distance" : "undetermined"
	},
	init: function(isMobile){
		window.oncontextmenu = function(e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		};
		
		game.canvas2.addEventListener('mousemove', function(evt) {
			input.getMousePos(game.canvas2, evt);
		}, false);

		if (isMobile){
			this.touchinit();
		} else {
			$(document).mousedown(function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				switch (event.which) {
					case 1:
						input.lclick = true;
						audio.playSound('click2');
						break;
					case 2:
						input.mclick = true;
						break;
					case 3:
						ui.hover = -1;
						ui.selected = -1;
						ui.colselected = -1;
						ui.rowselected = -1;
						break;
					default:
						input.lclick = true;
				}
			});
		}
	},
	touchinit: function() {
		document.addEventListener('touchstart', this.touchHandler, false);	
		document.addEventListener('touchmove', this.touchHandler, false);	
		document.addEventListener('touchend', this.touchHandler, false);
	},
	touchHandler: function(event) {
		var touch;
		if (typeof event !== 'undefined'){	
			if (typeof event.touches !== 'undefined') {
				touch = event.touches[0];
				switch (event.type) {
					case 'touchstart':
						input.touches.touchmove.x = touch.pageX;
						input.touches.touchmove.y = touch.pageY;
					case 'touchmove':
						input.touches[event.type].x = touch.pageX;
						input.touches[event.type].y = touch.pageY;
						var hordist = input.touches.touchstart.x - touch.pageX;
						var verdist = input.touches.touchstart.y - touch.pageY;
						//fix bug from  mouse code
						game.camera.x += hordist/10;
						game.camera.y += verdist/10;
						
						if (game.camera.x > mapBounds.e) game.camera.x = mapBounds.e;
						if (game.camera.y > mapBounds.s) game.camera.y = mapBounds.s;
						if (game.camera.x < 0) game.camera.x = 0
						if (game.camera.y < 0) game.camera.y = 0;
						break;
					case 'touchend':
						var hordist = input.touches.touchstart.x - input.touches.touchmove.x;
						var verdist = input.touches.touchstart.y - input.touches.touchmove.y;
						input.touches[event.type] = true;
						//fix bug from  mouse code
						if(input.touches.touchmove.x > -1 && (hordist > 100 || hordist < -100 || verdist > 100 || verdist < -100)){

						} else {
							 input.mousePos.x = input.touches.touchmove.x;
							 input.mousePos.y = input.touches.touchmove.y;
							 input.lclick = true;
						}
						
						if (game.camera.x > mapBounds.e) game.camera.x = mapBounds.e;
						if (game.camera.y > mapBounds.s) game.camera.y = mapBounds.s;
						if (game.camera.x < 0) game.camera.x = 0
						if (game.camera.y < 0) game.camera.y = 0;
					default:
						break;
				}
			}
		}
	},
	listen: function(){
	},
	getMousePos: function(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		this.mousePos = {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
		};
  	}
}
