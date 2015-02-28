// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/images.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("alien", "assets/images.jpg");
    game.load.image("tesla", "assets/unnamed.jpg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#FF3300");
    game.add.text(110, 200, "Welcome to Rocket Race", {font: "50px Arial", fill: "#000000"});


    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);


    label_score = game.add.text(20, 20, "0");

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    pipes = game.add.group();

    for(var x = 325; x < 10000; x+= 250)
    {
        generate_pipe(x);

    }

    game.physics.startSystem(Phaser.Physics.ARCADE)
    //set initial coordinates for player
    player = game.add.sprite(80, 200, "playerImg");

    // enable physics for the player sprite
    game.physics.arcade.enable(player);



    player.body.velocity.y = -100;

    // subject the player to a gravitational pull downwards of 100.
    player.body.gravity.y = 500


}


function generate_pipe(x) {

    var gap_end = game.rnd.integerInRange(2, 6);

    for (var count = 0; count < gap_end; count++) {
        add_pipe_block(x, 50 * count, "alien");
    }

    for (var count = gap_end + 2; count <= 8; count++) {
        add_pipe_block(x, 50 * count, "tesla");
    }
}

function add_pipe_block(x, y, label){
    var block = pipes.create(x, y, label);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -150;
}


/*
 * This function updates the scene. It is called for every new frame
 */
function update() {

    game.physics.arcade.overlap(player, pipes, game_over);

}

function clickHandler(event) {game.add.sprite (
    event.x, event.y, "playerImg");
    //alert(event.x + ":" + event.y);
}

function spaceHandler() {
    game.sound.play("score");
    player_jump();
    changeScore();
}

function setScore (newscore){
    score=newscore;
}

function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}

function moveRight(){
    player.x = player.x + 5
}

function moveLeft(){
    player.x = player.x - 5
}

function moveUp(){
    player.y = player.y - 5
}

function moveDown(){
    player.y = player.y + 5
}

function player_jump(){
    //the more negative the value the higher it jumps
    player.body.velocity.y = -200;
}

function game_over(){
    location.reload();
}