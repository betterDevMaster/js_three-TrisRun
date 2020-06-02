(function(ctx){
	var map = {
		init : function(){
			consol(trisrun,"map :: ok");
			this.skyBox.init();
			// now we init patern in game engine for statemanager
			// this.patern1.init();
			// this.patern2.init();
			// this.patern3.init();
		},
		skyBox : {
			assets : ['../assets/skybox/grid_ft.jpg','../assets/skybox/grid_ft.jpg',
					'../assets/skybox/grid_ft.jpg','../assets/skybox/grid_ft.jpg',
					'../assets/skybox/grid_ft.jpg', '../assets/skybox/grid_ft.jpg'],
			material : [],
			geometry :  new THREE.BoxGeometry(90000,90000,90000),
			loader : new THREE.TextureLoader(),
			init : function(){
				for( var i =0; i< this.assets.length; i++){
					self.skyBox.loader.load(this.assets[i], function ( image ) {
						self.skyBox.materials = new THREE.MeshBasicMaterial({map:image, side: THREE.BackSide});
             					self.skyBox.material.push(self.skyBox.materials);
             					self.skyBox.materialFinal = new THREE.MeshFaceMaterial(self.skyBox.material);
             					self.skyBox.box = new THREE.Mesh(self.skyBox.geometry, self.skyBox.materialFinal);
             					trisrun.webgl.scene.add(self.skyBox.box);
						},
						// Function called when download progresses
						function ( xhr ) {
							console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
						},
						// Function called when download errors
						function ( xhr ) {
							console.log( 'An error happened' );
						}
					);	
				}
			consol(trisrun,"map > skybox :: ok");	
			}		
		},
		patern1:{
			road1 : null,
			road2 : null,
			road3: null,
			road4 : null,
			wall : null,
			init : function(){
				this.road1 = new Road(20,1,1000,0,0,-500,"../assets/road2.jpg");
				this.road2 = new Road(20,1,1000,0,0,-1600,"../assets/road2.jpg");
				this.road3 = new Road(20,1,1000,0,-20,-2600,"../assets/road2.jpg");
				this.road4 = new Road(20,1,1000,0,-20,-3700,"../assets/road2.jpg");
				this.wall = new Obst(20,30,20,0,5,-2200,"../assets/road2.jpg");
				
				this.road1.init(trisrun.webgl.scene, trisrun.physic.world);
				this.road2.init(trisrun.webgl.scene, trisrun.physic.world);	
				this.road3.init(trisrun.webgl.scene, trisrun.physic.world);	
				this.road4.init(trisrun.webgl.scene, trisrun.physic.world);
				
				this.wall.init(trisrun.webgl.scene, trisrun.physic.world)
			}, 
			destroy : function(){
				if (this.road1 != null){
					trisrun.webgl.scene.remove(this.road1.mesh, this.road2.mesh);
					trisrun.physic.world.remove(this.road1.body, this.road2.body);
					trisrun.webgl.scene.remove(this.road3.mesh, this.road4.mesh);
					trisrun.physic.world.remove(this.road3.body, this.road4.body);
					trisrun.webgl.scene.remove(this.wall.mesh);
					trisrun.physic.world.remove(this.wall.body);
				}
				
				this.road1 = null;
				this.road2 = null;
				this.road3 = null;
				this.road4 = null;
				this.wall = null;
			}
		},
		patern2:{
			road1 : null,
			road2 : null,
			init : function(){
				this.obstTbl = [];

				this.road1 = new Road(20,1,1000,0,0,-500,"../assets/road2.jpg");
				this.road2 = new Road(20,1,1000,0,0,-1600,"../assets/road2.jpg");

				this.wall1= new Road(8,30,1000,-10,2,-500,"../assets/road2.jpg");
				this.wall2 = new Road(8,30,1000,10,2,-500,"../assets/road2.jpg");
				
				for (var i = 0 ;i<15; i++){
					this.z = -700;
					this.zAlea =  Math.floor(Math.random() * -4800/2)+this.z;
					this.xAlea =  Math.floor(Math.random() * -8)+ Math.floor(Math.random() * 8);
					if (i === 0){
						this.obstTbl[i] = new Obst(2,20,20,this.xAlea,2,this.z,"../assets/placeholder.jpg");
						this.obstTbl[i] .init(trisrun.webgl.scene, trisrun.physic.world);
					}
					if( i>= 1){
						this.obstTbl[i] = new Obst(2,20,20,this.xAlea,2,this.zAlea,"../assets/placeholder.jpg");
						this.obstTbl[i] .init(trisrun.webgl.scene, trisrun.physic.world);
					}
				}

				this.road1.init(trisrun.webgl.scene, trisrun.physic.world);
				this.road2.init(trisrun.webgl.scene, trisrun.physic.world);
				this.wall1.init(trisrun.webgl.scene, trisrun.physic.world);
				this.wall2.init(trisrun.webgl.scene, trisrun.physic.world);	
			},
			destroy : function(){
				if (this.road1 != null){
					for (var i=0; i<trisrun.map.patern2.obstTbl.length; i++){
						trisrun.physic.world.remove(trisrun.map.patern2.obstTbl[i].body)
						trisrun.webgl.scene.remove(trisrun.map.patern2.obstTbl[i].mesh)
					}
					trisrun.webgl.scene.remove(this.road1.mesh, this.road2.mesh);
					trisrun.physic.world.remove(this.road1.body);
					trisrun.physic.world.remove(this.road2.body);
					trisrun.webgl.scene.remove(this.wall1.mesh, this.wall2.mesh);
					trisrun.physic.world.remove(this.wall1.body);
					trisrun.physic.world.remove(this.wall2.body)
					this.road1 = null;
					this.road2 = null;
				}
			}	
		},
		patern3 :{
			roadTbl : null,
			init : function(){
				this.roadTbl = [];
				for (var i = 1 ;i<30; i++){
					this.z = i*70;
					this.xAlea =  Math.floor(Math.random() * -20 ) + Math.floor(Math.random() * 20 ) ;
					this.zAlea =  Math.floor(Math.random() * -3000);
					if (i===1){
						this.roadTbl[i] = new Road(5,1,20, 0,0,-this.z,"../assets/road2.jpg");
					}
					if (i > 1 ){
						this.roadTbl[i] = new Road(5,1,20,this.xAlea,0,this.zAlea-20,"../assets/road2.jpg");
					}
					this.roadTbl[i] .init(trisrun.webgl.scene, trisrun.physic.world);
				}
			}, 
			destroy : function(){
				if (this.roadTbl  != null){
					for (var i=1; i<trisrun.map.patern3.roadTbl.length; i++){
						
						trisrun.physic.world.remove(trisrun.map.patern3.roadTbl[i].body)
						trisrun.webgl.scene.remove(trisrun.map.patern3.roadTbl[i].mesh)
					}
					
				}
				this.roadTbl = null;
			}
		}	
	}
	var self =map;
	ctx.map = map;
})(trisrun);