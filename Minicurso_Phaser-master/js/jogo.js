
var jogoStage={
    Jogador: null,
    porquinho: null,
    Delay:0,
    preload: function(){
        game.load.image('eusouoceu','assets/sky.png');
        game.load.image('chao','assets/platform.png');
        game.load.spritesheet('Rai','assets/dude.png', 32, 48);
        game.load.spritesheet('SouoPorquinho', 'assets/baddie.png', 32, 32);

    },
    create: function(){
        game.add.sprite(0, 0, 'eusouoceu');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        GrupodasPlataformas = game.add.group();
            GrupodasPlataformas.enableBody = true;

        chao1 = GrupodasPlataformas.create(0,550,'chao');
            chao1.scale.setTo(2,2);
            chao1.body.immovable = true;
        
        this.Jogador = game.add.sprite(30, 0, 'Rai');
            this.Jogador.enableBody = true;
        game.physics.arcade.enable(this.Jogador);
        this.Jogador.body.gravity.y = 300;

        this.porquinho = game.add.sprite(300, 0, 'SouoPorquinho');
            this.porquinho.enableBody = true;
        game.physics.arcade.enable(this.porquinho);
        this.porquinho.body.gravity.y = 300;

        this.Jogador.animations.add('right',[5,6,7,8], 10, true);
        this.Jogador.animations.add('left',[0,1,2,3], 10, true)
        teclas= game.input.keyboard.createCursorKeys();
        this.Jogador.frame = 4;

        this.porquinho.animations.add('right', [0,1], 10, true);
        this.porquinho.animations.add('left', [2,3], 10, true);

        this.porquinho.animations.play('left');
        this.porquinho.body.velocity.x=200;

        
    },
    update: function(){
            if(this.Delay>0){
                this.Delay--;
            }
        var TocandonoChao = game.physics.arcade.collide(GrupodasPlataformas, this.Jogador);
        var porquinhoNoChao = game.physics.arcade.collide(GrupodasPlataformas, this.porquinho);
        var porquinhoJogador = game.physics.arcade.overlap(this.Jogador,this.porquinho);
            if(porquinhoJogador){
                if(this.Delay==0){
                    this.Delay=100;
                }
                if(this.Delay > 0)
                game.camera.flash('0xff0000',1000);
            }

        //this.porquinho.animations.play('right');
        //this.porquinho.body.velocity.x=50
        this.porquinho.body.collideWorldBounds = true;

        if (this.porquinho.x >= 600) {
            this.porquinho.animations.play('right');
            this.porquinho.body.velocity.x = -200;
        }
        if (this.porquinho.x <= 30) {
            this.porquinho.animations.play('left');
            this.porquinho.body.velocity.x = 200;
        }

        //this.Jogador.body.velocity.x = 50;
            if(teclas.right.isDown){
                this.Jogador.body.velocity.x = 100;
                this.Jogador.animations.play('right');

            } else if(teclas.left.isDown){
                this.Jogador.body.velocity.x = -100;
                this.Jogador.animations.play('left');
            } else {
                this.Jogador.body.velocity.x = 0;
                this.Jogador.frame = 4;
            }
        this.Jogador.body.collideWorldBounds = true;
            
        

    }
}