function Road(w, h, d, x, y, z, assets ){
	this.w = w || 1;
	this.h= h || 1;
	this.d = d ||1;
	this.x = x || 0;
	this.y = y || 0;
	this.z = z|| 0;
	this.assets = assets;
}
Road.prototype.init = function(scene, world) {
		var self = this;
		this.loader = new THREE.TextureLoader();
		this.loader.load(this.assets, function ( image ) {
			self.geometry = new THREE.BoxGeometry( self.w, self.h, self.d )
			self.material = new THREE.MeshBasicMaterial({map:image});
     			
     			self.mesh = new THREE.Mesh(self.geometry, self.material);
     			self.mesh.position.set(self.x,self.y,self.z);
     			
     			image.wrapS = THREE.RepeatWrapping;
     			image.wrapT = THREE.RepeatWrapping;
     			image.repeat.set( 1, 25 );
 			
 			self.shape = new CANNON.Box(new CANNON.Vec3(self.w/2,self.h/2, self.d/2));
			self.body = new CANNON.Body({ mass: 0, type : CANNON.Body.KINEMATIC  });

			self.body.addShape(self.shape);
			self.body.fixedRotation = true;
			self.body.grp = self.grp;
			self.body.position.set(self.x, self.y, self.z);

			world.add(self.body);
 			scene.add(self.mesh);
 					
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
			
};
