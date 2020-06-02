(function(ctx){
	var map = {
		init : function(){
			consol(tuto,"map :: ok");
			consol(tuto,"map > road :: ok");
			this.skyBox.init();
			// now we init patern in game engine for statemanager
			this.patern1.init();
			
		},
		skyBox : {
			
			material : [],
			
			
			init : function(){
			
				consol(tuto,"map > skybox :: ok");	
				this.geometry =  new THREE.BoxGeometry(90000,90000,90000);
				this.materials = new THREE.MeshBasicMaterial({color: 0x00aa00, side: THREE.BackSide});
			
				
				this.box = new THREE.Mesh(this.geometry, this.materials);
				tuto.webgl.scene.add(this.box);
			},
				
					
		},
		patern1:{
			road1 : null,
			
			init : function(){
				this.road1 = new Road(20,1,1000,0,0,-500,"../assets/road2.jpg");
				this.road2 = new Road(20,1,1000,0,0,-1600,"../assets/road2.jpg");
				this.road3 = new Road(20,1,1000,0,-20,-2600,"../assets/road2.jpg");
				this.road4 = new Road(20,1,1000,0,-20,-3700,"../assets/road2.jpg");
				this.wall = new Road(20,30,20,0,5,-2200,"../assets/road2.jpg");
				
				this.road1.init(tuto.webgl.scene, tuto.physic.world);
			
			}, 
			destroy : function(){
				if (this.road1 != null){
					tuto.webgl.scene.remove(this.road1.mesh);
					tuto.physic.world.remove(this.road1.body);
				
				}
				
				this.road1 = null;
				
			}
		},

	}
	var self =map;
	ctx.map = map;
})(tuto);