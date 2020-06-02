(function(ctx){
	var trisrun = {
		config : { debug : false},
		init : function(){
			this.webgl.initWebgl();
			this.physic.initPhysic();
			this.map.init();
			this.player.init();
			this.gameEngine.initGameEngine();
			consol(this, "Trisrun :: ok");	
			return this;
		},
		start : function(){
			consol(this, "============== Trisrun :: started =================");

			this.update();
		},
		update : function(){
			trisrun.req = requestAnimationFrame(trisrun.update);
			//------------------------- with debug-----------------
			
			if (trisrun.config.debug === true){
				trisrun.webgl.stats.begin();
				trisrun.physic.world.step(1/60);
				if (trisrun.player.mesh != undefined){	
					trisrun.gameEngine.animate();// gameloop
				}
				trisrun.webgl.stats.end()
			}
			//------------------------- without debug-----------------

			else{
				trisrun.physic.world.step(1/60);
				if (trisrun.player.mesh !== undefined){
					trisrun.gameEngine.animate();
				}
			}
			trisrun.webgl.renderer.render(trisrun.webgl.scene, trisrun.webgl.camera);
			
		},
	}
	ctx.trisrun = trisrun;	
})(window);


