
	var audio = {
        loaded: 0,
        samples: [],
        init: function(){
            this.preloadAudio('yummy'       ,'sounds/yummy.wav');
            this.preloadAudio('effort'      ,'sounds/effort.wav');
            this.preloadAudio('sigh'        ,'sounds/sigh.wav');
            this.preloadAudio('sad1'        ,'sounds/awww.wav');
            this.preloadAudio('sad2'        ,'sounds/awww2.wav');
            this.preloadAudio('cry1'        ,'sounds/cry.wav');
            this.preloadAudio('cry2'        ,'sounds/cry2.wav');
            this.preloadAudio('learn1'      ,'sounds/ahhh.wav');
            this.preloadAudio('learn2'      ,'sounds/ohh.wav');
            this.preloadAudio('scared1'     ,'sounds/eee.wav');
            this.preloadAudio('scared2'     ,'sounds/scream.wav');
            this.preloadAudio('squeek'      ,'sounds/squeek.wav');
            this.preloadAudio('laugh1'      ,'sounds/laugh1.wav');
            this.preloadAudio('laugh2'      ,'sounds/laugh2.wav');
            this.preloadAudio('laugh3'      ,'sounds/laugh3.wav');
            this.preloadAudio('laugh4'      ,'sounds/laugh4.wav');
            this.preloadAudio('laugh5'      ,'sounds/laugh5.wav');
            this.preloadAudio('scream'      ,'sounds/scream.wav');
            this.preloadAudio('cackle'      ,'sounds/cackle.wav');
            this.preloadAudio('hurt1'       ,'sounds/ouch1.wav');
            this.preloadAudio('hurt2'       ,'sounds/ouch2.wav');
            this.preloadAudio('hurt3'       ,'sounds/ouch3.wav');
            this.preloadAudio('mumble'      ,'sounds/vrrr.wav');
            this.preloadAudio('yes'         ,'sounds/mmmm.wav');
            this.preloadAudio('newday'      ,'sounds/new_day.wav');
            this.preloadAudio('powerup'     ,'sounds/powerup.wav');
            this.preloadAudio('newitem'     ,'sounds/newitem.wav');
            this.preloadAudio('levelup'     ,'sounds/levelup.wav');
            this.preloadAudio('collect'     ,'sounds/collect.wav');
            this.preloadAudio('failed'      ,'sounds/failed.wav');
            this.preloadAudio('warning'     ,'sounds/warning.wav');
            this.preloadAudio('grow'        ,'sounds/grow.wav');
            this.preloadAudio('gameover'    ,'sounds/gameover.wav');
            this.preloadAudio('hurt'        ,'sounds/hurt.wav');
            this.preloadAudio('click1'      ,'sounds/click.wav');
            this.preloadAudio('click2'      ,'sounds/click2.wav');
            this.preloadAudio('burp'        ,'sounds/burp.wav');
            this.preloadAudio('crunch'      ,'sounds/crunch.wav');
            this.preloadAudio('dead'        ,'sounds/dead.wav');
            this.preloadAudio('fart'        ,'sounds/dead.wav');
            this.preloadAudio('fireball'    ,'sounds/fireball.wav');
            this.preloadAudio('join'        ,'sounds/join.wav');
            this.preloadAudio('pop'         ,'sounds/pop.wav');
            this.preloadAudio('raven'       ,'sounds/raven.wav');
            this.preloadAudio('score'       ,'sounds/score.wav');
            this.preloadAudio('twang'       ,'sounds/twang.wav');
            this.preloadAudio('song1'       ,'sounds/amberleen.mp3');
            this.preloadAudio('song2'       ,'sounds/amberleenstory.mp3');

        },
        preloadAudio: function(name,url) {
            this.samples[name] = new Audio();
            // once this file loads, it will call loadedAudio()
            // the file will be kept by the browser as cache
            this.samples[name].addEventListener('canplaythrough', this.loadedAudio, false);
            this.samples[name].src = url;
        },
        loadedAudio: function() {
            // this will be called every time an audio file is loaded
            // we keep track of the loaded files vs the requested files
            audio.loaded++;
            if (audio.loaded == Object.keys(audio.samples).length){
                // all have loaded
                audio.loaded = true;
            }
        },
        playMusic: function(id){
            audio.samples[id].loop = true;
            //audio.samples[id].addEventListener('ended', this.repeatIndef(id), false);
            audio.samples[id].play();
        },
        stopMusic: function(id){
            //audio.samples[id].removeEventListener('ended', this.repeatIndef(id), false);
            audio.samples[id].pause();
        },
        playSound: function(id){
            this.samples[id].play();
        },
        stopSound: function(id){
            this.samples[id].pause();
        },
        repeatIndef: function(id){
            audio.samples[id].currentTime = 0;
            audio.samples[id].play();
        }
    }