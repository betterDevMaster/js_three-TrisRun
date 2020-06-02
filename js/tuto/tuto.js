(function(ctx){
	var tuto = {
		config : { debug : false},
		init : function(){
			this.webgl.initWebgl();
			this.physic.initPhysic();
			this.map.init();
			this.player.init();
			this.tutoEngine.inittutoEngine();
			consol(this, "tuto :: ok");	
			return this;
		},
		start : function(){
			consol(this, "============== tuto :: started =================");

			this.update();
		},
		update : function(){
			tuto.req = requestAnimationFrame(tuto.update);
			//------------------------- with debug-----------------
			
			if (tuto.config.debug === true){
				tuto.webgl.stats.begin();
				tuto.physic.world.step(1/60);
				if (tuto.player.mesh != undefined){	
					tuto.tutoEngine.animate();// gameloop
				}
				tuto.webgl.stats.end()
			}
			//------------------------- without debug-----------------

			else{
				tuto.physic.world.step(1/60);
				if (tuto.player.mesh !== undefined){
					tuto.tutoEngine.animate();
				}
			}
			tuto.webgl.renderer.render(tuto.webgl.scene, tuto.webgl.camera);
			
		},
	}
	ctx.tuto = tuto;	
})(window);



