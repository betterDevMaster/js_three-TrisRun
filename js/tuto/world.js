(function(ctx){
	var physic = {
		initPhysic : function(){
			consol(tuto, "physic :: ok");
			this.world = new CANNON.World(),
			this.world.broadphase = new CANNON.NaiveBroadphase();
			this.world.broadphase.useBoundingBoxes = true;	
			this.world.gravity.set(0,-20,0);
		},
	}
	var self = physic;
	ctx.physic = physic;
})(tuto);