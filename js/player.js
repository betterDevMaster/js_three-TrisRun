(function(ctx){
	var player = {
		init : function(){
			consol(trisrun,"player :: ok");
			this.load();
			this.life.init("assets/heart1.png");
		},
		assets : "../assets/model/mercury.json",
		geometry : {},
		material : {},
		shape : {},	
      		body : {},
		load : function(){
			this.loader = new THREE.JSONLoader();
			this.loader.load( this.assets, function(geometry, material){
				
				self.material = new THREE.MeshFaceMaterial(material);
				
				self.mesh = new THREE.Mesh( geometry, self.material );
				self.mesh.position.set(0, 15,0 );
				self.mesh.rotation.y += 3;
				
				self.shape = new CANNON.Box(new CANNON.Vec3(2,0.5,1));
				self.body = new CANNON.Body({ mass: 100});
				self.body.position.set(self.mesh.position.x,self.mesh.position.y,self.mesh.position.z);
				self.body.addShape(self.shape);
				self.body.fixedRotation = true;
				trisrun.physic.world.add(self.body);
				trisrun.webgl.scene.add(self.mesh);
				self.body.addEventListener("collide", self.jump, false);
			});
		},
		jump : function(e){
			if ( e.contact ){
				trisrun.gameEngine.keyboard.jump = false;
			}	
		},
		life : {
			nbLife : 3,
			init : function(url){
				this.life = document.createElement("div");
				this.life.setAttribute('id',"life")
				this.life.style.position = 'absolute';
				this.life.style.width =  window.innerWidth/4 +"px";
				this.life.style.height = window.innerHeight/6 +"px";
				this.life.style.top =  100+ 'px';
				this.life.style.left = 0 + 'px';
				document.body.appendChild(this.life);
				for (var i = 0; i<this.nbLife; i++){
					this.life.innerHTML += '<img src=\''+url+'\' alt=\'\' class=\'life\' />';
					
				}	
			},
			updateLife : function(url){
				if (self.mesh.position.y < -40){
					this.nbLife --;
					this.elems = document.getElementsByClassName("life");
					for (var i=0; i<this.elems.length; i++){
						this.elems[i].style.display ="none";
					}
					for (var i = 0; i<this.nbLife; i++){

						this.life.innerHTML += '<img src=\''+url+'\' alt=\'\' class=\' life '+i+' \' />';
					
					}
					self.mesh.position.y = 15;			
				}
				if (this.nbLife ===0){
					trisrun.gameEngine.gameOver();
				}
			},
			looseLife : function(e){
				
				if ( e.contact ){
					trisrun.gameEngine.gameOver();
				}
			}	
		}
	}
	var self =player;
	ctx.player = player;

})(trisrun);