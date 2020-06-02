// state-manager
function State( bool, typeOfRenderer){
	this.renderer = typeOfRenderer || "canvas2d"; // default is canvas 2d
	this.active = bool ; // true or false for if is active on start
}

State.prototype= {
	initState : function(obj){
		if ( obj.state.active === true){
			obj.init(); // call of initfunction
		}
	},
	changeState : function(obj, stateDestroy, renderer){
		stateDestroy.state.active = false;
		obj.state.active = true;

		// for canvas2d ...
		if (obj.state.renderer === 'canvas2d'){
			renderer.clearRect(0,0,window.innerWidth,window.innerHeight);
		}
		// for canvas3d using threejs
		if (obj.state.renderer === 'threejs'){
			for( var i = renderer.scene.children.length - 1; i >= 0; i--) { 
				renderer.scene.remove(renderer.scene.children[i]);
			} 
		}
		obj.init();
	}
};