
	var images = {
        sprites: [],
        tick: 0,
        loaded: 0,
        init: function(){
            this.preloadSprites('tiles',        'img/tileset.png',                       50, 50, 10);
            this.preloadSprites('buttons',      'img/buttonset.png',                     50, 50, 10);
            this.preloadSprites('objects',      'img/objectset.png',                     50, 50, 10);
            this.preloadSprites('glum',         'img/glum_sprite_ext-normal.png',        50, 50, 10);
            this.preloadSprites('devilglum',    'img/glum_sprite_ext.png',               50, 50, 10);
            this.preloadSprites('human',        'img/char5.png',                         50, 50, 10);
            this.preloadSprites('lightning',    'img/lightning.png',                     50, 50, 10);
            this.preloadSprites('magic',        'img/magic.png',                         50, 50, 10);
            this.preloadSprites('bunnies',      'img/bunnies.png',                       50, 50, 10);
            this.preloadSprites('health',       'img/health.png',                        50, 50, 10);
            this.preloadSprites('happy',        'img/happy.png',                         50, 50, 10);
            this.preloadSprites('average',      'img/average.png',                       50, 50, 10);
            this.preloadSprites('sad',          'img/sad.png',                           50, 50, 10);
            this.preloadSprites('hunger',       'img/hunger.png' ,                       50, 50, 10);
            this.preloadSprites('energy',       'img/energy.png' ,                       50, 50, 10);
            this.preloadSprites('ui_bg_top',    'img/ui_bg_top.png',                     150, 50, 10);
            this.preloadSprites('menu',         'img/menu.png',                          150, 50, 10);
        },
        preloadSprites: function(name,url,tilewidth,tileheight,rownumtiles) {
            this.sprites[name] = new Image();
            this.sprites[name].tilewidth = tilewidth;
            this.sprites[name].tileheight = tileheight;
            this.sprites[name].rownumtiles = rownumtiles;
            // once this file loads, it will call loadedAudio()
            // the file will be kept by the browser as cache
            this.sprites[name].addEventListener('load', this.loadedSprites, false);
            this.sprites[name].src = url;
        },
        loadedSprites: function() {
            // this will be called every time an audio file is loaded
            // we keep track of the loaded files vs the requested files
            images.loaded++;
            if (images.loaded == Object.keys(images.sprites).length){
                // all have loaded
                images.loaded = true;
            }
        },
        cut: function(x,y,radius){
            game.ctx2.save();
            game.ctx2.globalCompositeOperation='destination-out';
            game.ctx2.beginPath();
            game.ctx2.arc(x,y,radius, 0, 2 * Math.PI, false);
            game.ctx2.fill();
            game.ctx2.restore();
        },
        rain: function(colstart, rowstart, i){
            
            //raindrops
            game.ctx.save();
            game.ctx.fillStyle = "blue";
            game.ctx.beginPath();
            game.ctx.arc(colstart+Math.floor((Math.random() * 50)),rowstart+Math.floor((Math.random() * 50)),2, 0, 2 * Math.PI, false);
            game.ctx.fill();
            game.ctx.restore();
            
            // Add clouds
            game.ctx2.save();
            game.ctx2.beginPath();
            game.ctx2.fillStyle = "rgba(204, 204, 204, 0.050)";
            game.ctx2.arc(colstart+25+(i/100),rowstart+25-(i/100),30+i, 0, 2 * Math.PI, false);
            game.ctx2.fill();
            game.ctx2.beginPath();
            game.ctx2.fillStyle = "rgba(178, 178, 178, 0.050)";
            game.ctx2.arc(colstart+game.events.length+(i/100),rowstart+(i/100),25+i, 0, 2 * Math.PI, false);
            game.ctx2.fill();
            game.ctx2.beginPath();
            game.ctx2.fillStyle = "rgba(255, 255, 255, 0.050)";
            game.ctx2.arc(colstart-game.events.length+(i/100),rowstart+game.events.length,20+i, 0, 2 * Math.PI, false);
            game.ctx2.fill();
            game.ctx2.restore();
        }
    }