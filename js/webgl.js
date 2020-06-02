(function(ctx){
	var webgl = {

		initWebgl : function(){
			this.scene = new THREE.Scene();
			
			this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000000);
			this.camera.position.set(0, 12, 20);
			
			this.light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
			this.scene.add( this.light2 );
			this.light = new THREE.AmbientLight( 0x404040 ); // soft white light
			this.scene.add( this.light );
			
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize( window.innerWidth, window.innerHeight -0.5 );
		
			document.body.style.margin = 0;
			document.body.style.overflow = 'hidden';
			document.body.appendChild( this.renderer.domElement );
			
			debugTool(this, trisrun);
		
			consol(trisrun, "==================== COMPONENTS ===================");
			consol(trisrun, "webgl :: ok")
				
		},
	}
	var self = webgl;
	ctx.webgl =  webgl;
})(trisrun);