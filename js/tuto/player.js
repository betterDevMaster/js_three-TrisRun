(function(ctx){
	var player = {

		init : function(){
			consol(tuto,"player :: ok");
			this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
			this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
			this.shape = new CANNON.Box(new CANNON.Vec3(5,5,5));
			this.mesh = new THREE.Mesh( this.geometry, this.material );	
			this.body = new CANNON.Body({ mass: 100});
			
			this.mesh.position.set(0, 15,-20 );
			this.mesh.rotation.y += 3;
			
		
			this.body.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);
			this.body.addShape(this.shape);
			this.body.fixedRotation = true;
			tuto.physic.world.add(this.body);
			tuto.webgl.scene.add(this.mesh);
			this.body.addEventListener("collide", this.jump, false);

		
			this.life.init("assets/heart1.png");
		},
	
		
			
				
			
					
	
		jump : function(e){
			if ( e.contact ){
				tuto.tutoEngine.keyboard.jump = false;
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
					tuto.tutoEngine.gameOver();
				}
			},
			looseLife : function(e){
				
				if ( e.contact ){
					tuto.tutoEngine.gameOver();
				}
			}	
		}
	}
	var self =player;
	ctx.player = player;

})(tuto);