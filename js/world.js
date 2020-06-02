(function(ctx){
	var physic = {
		initPhysic : function(){
			consol(trisrun, "physic :: ok");
			this.world = new CANNON.World(),
			this.world.broadphase = new CANNON.NaiveBroadphase();
			this.world.broadphase.useBoundingBoxes = true;	
			this.world.gravity.set(0,-20,0);
		},
	}
	var self = physic;
	ctx.physic = physic;
})(trisrun);