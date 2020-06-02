(function(ctx){
	var counter = 0; // this is for statement
	var timer = 0;
	var tutoEngine = {
		inittutoEngine : function(){
			document.addEventListener('keydown',self.keyboard.keydown, false);
			document.addEventListener('keyup',self.keyboard.keyup, false);
			
			this.init();
			this.score.displayScore();
		},
		init : function(){		
			this.tool1.init(tuto.webgl.scene, tuto.physic.world);
			this.tool2.init(tuto.webgl.scene, tuto.physic.world);
			this.tool3.init(tuto.webgl.scene, tuto.physic.world);
			
			// this.ui_patern1.init(3, "assets/tools/patern1/tool", 'ui-box1','box1_');
		
			this.feedbacks.init();
			consol(tuto,"UserInterface :: ok");
		
		},
		gameOver : function(){
			// cancelAnimationFrame(tuto.req);
			
			
		},
		score : {
			scoreTbl :[],
			data : 0,
			text : null,
			displayScore : function(){
				this.text = document.createElement("div");
				this.text.setAttribute('id',"score")
				this.text.style.position = 'absolute';
				this.text.style.width = window.innerWidth/10+"px";
				this.text.style.height =  window.innerHeight/15 +"px";
				this.text.style.top =  0+ 'px';
				this.text.style.left = 200 + 'px';
				document.body.appendChild(this.text);

			},
			updateScore : function(){
				this.data ++;
				this.text.innerHTML = this.data +"m";
			},
			
		},
		feedbacks : {
			init : function(){
				this.feedbacks = document.createElement("div");
				this.feedbacks.setAttribute('id',"feedbacks")
				this.feedbacks.style.opacity = "0";
				this.feedbacks.style.position = 'absolute';
				this.feedbacks.style.width = window.innerWidth/2+"px";
				this.feedbacks.style.height =  window.innerHeight/15 +"px";
				this.feedbacks.style.top =  0+ 'px';
				this.feedbacks.style.left = 25 + '%';
				document.body.appendChild(this.feedbacks);
			},
			help : function(msg){
				this.feedbacks.style.opacity ="1";
				this.feedbacks.innerHTML = "<p class='help'>"+msg+"</p>";
			},
			
		},
		keyboard: {
			jump: false,
			left:false,
			right : false,
			tool1_active : false,
			tool2_active : false,
			tool3_active : false,
			tool1 : false,
			tool2:false,
			tool3:false,
			keydown : function(event){	
				switch(event.keyCode){
					case 40 : self.keyboard.tool2 = true;
					break;
					case 38 : self.keyboard.tool3 = true;
					break;
					case 32 : self.keyboard.jump = true;
					break;
					case 37 : 
					self.keyboard.tool1 = true;
					break;
					case 81 : self.keyboard.left = true;
					break;
					case 68 : self.keyboard.right = true;
					break;
				}
			},
			keyup : function(event){
				switch(event.keyCode){
					case 40 : self.keyboard.tool2 = false;
					break;
					case 38 : self.keyboard.tool3 = false;
					break;
					case 37 : self.keyboard.tool1 = false;
					break;
					case 81 : self.keyboard.left = false;
					break;
					case 68 : self.keyboard.right = false;
					break;
				}
			}
			
		},
		
		
		tool1 : new Road(20,1,100,-1000,0,-20,"../assets/road1.jpg"),
		tool2 : new Road(20,1,100,0,0,-2150,"../assets/road1.jpg"),
		tool3 : new Road(20,1,100,0,-20,-4250,"../assets/road1.jpg"),
		
		//gameloop

		animate : function(){
			timer ++;
			if (tuto.map.patern1.road1.mesh !=undefined){
				initPos(tuto.map.patern1.road1.mesh, tuto.map.patern1.road1.body);

			}


			if ( timer <1000){
				this.feedbacks.help("ooh !!!! you are in the bug, you probably died but your body found itself prisoner in the bug but your soul is in the matrix...I am going to take advantage of this bug to learn you how oversteer when you will be in the matrix....");
			}
			if( timer>1000 &&timer <=2000){
				timer = 1800;
				this.feedbacks.help("First when you will be in the matrix you always can run press Q or D for move...");
				if (this.keyboard.left === true || this.keyboard.right === true){
						timer = 2002;
				}
				
				
					
				
			}
			if (timer >2001 && timer <=2400){
				this.feedbacks.help("Nicce!!!! you well done now i will unlock your hack list .....");
			}
			if (timer >2400 && timer <=2500){
				this.feedbacks.help("look on the right this is your hacklist");
				
				if(this.ui_patern1 === undefined){
					this.ui_patern1 = new ToolBox(),
					this.ui_patern1.init(4, "assets/tools/tuto/tool", 'ui-box1','box1_')
				}

				
				
				
				
			}
			if (timer > 2500 && timer <=2950){
				tuto.map.patern1.road1.mesh.position.z +=2;

				if (timer === 2950 ){
					this.feedbacks.help("ok look the first hack is the bridge you have 3 types : <br> 1st : left_arrow_key for across a void <br> 2st : dow_arrow  for down if the way is under <br> 3rd up_arrow for up if the way is up");					
				}

			}
			if (timer >= 4000 && timer <= 4800){
				this.feedbacks.help("then you have power hack : <br> here you can see jump skill its mean this is active just press space for jump <br>if you cant see powerhack its beceause <br>the matrix not load for you made with......ho....u...t  ");
			}
			if (timer >= 4800 && timer <= 4900){
				tuto.map.patern1.destroy();
				cancelAnimationFrame(tuto.req);
				this.feedbacks.help(" Matrix find you ........... remember use your skill too early wait the good time ..... RUN!!!!!!!!!!!!!!!! ");
				window.setTimeout(function(){
					document.location="trisrun.html";
				},5000)
				
			}

			
		
			tuto.player.life.updateLife("assets/heart1.png");
		
			initPos(tuto.player.mesh, tuto.player.body);	
			
			if(self.keyboard.left === true){
				tuto.player.mesh.position.x -=0.5;
				
			}
			if(self.keyboard.right === true){
				
				tuto.player.mesh.position.x +=0.5;
				
			}
		
			if(self.keyboard.jump === true){
				
				tuto.player.mesh.position.y +=0.2;
				
			}	
			
			else{
				tuto.player.mesh.position.x = tuto.player.mesh.position.x;
			}
			
		},
	}
	var self = tutoEngine;
	ctx.tutoEngine = tutoEngine;
})(tuto);