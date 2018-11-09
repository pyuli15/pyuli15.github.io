//creating all of my global variables before anything else
//these variables are for my background and my "coin" which is a fish
var bg;
var astronaut;

//these variables are for my sounds
var walls;
var paddleSound;
var youLose;
var coinCollect;
var spaceSounds;

//these variables represent the paddle's x and y position as well as the paddle's speed
var paddleX = 250;
var paddleY = 485;
var paddleSpeed = 0;

//these variables represent the ball's x and y position as well as it's speed
var xPos = 250;
var yPos = 250;
var xSpeed = 0;
var ySpeed = 0;

//these variables represent the point system implemented in my game. everytime the ball goes below the 
//screen the player will get a miss, and everytime the player reached the fish they get a point
var score = 0;
var misses = 0;

//these variables represent the astronaut's x and y position
var astronautX;
var astronautY;

//preloading my images so that they appear on the screen immediately.
function preload()
{
	bg = loadImage("images/space.jpg");
	astronaut = loadImage("images/astro.png");
	walls = loadSound("sounds/walls_ping.mp3");
	paddleSound = loadSound("sounds/paddle.mp3");
	youLose = loadSound("sounds/lose.mp3");
	coinCollect = loadSound("sounds/collect.mp3");
	spaceSounds = loadSound("sounds/space_sounds.mp3");
}


function setup()
{
	//centering my images
	imageMode(CENTER);
	createCanvas(500,500);
	//here I am setting a random x and y coordinate for my astronaut so that it starts at a random spot on the screen
	//when the player first starts the game
	astronautX = (random( 100, width - 100));
	astronautY = (random( 100, height - 200));
	spaceSounds.loop();
}
	

function draw()
{
	//calling my image so that the background is the sky picture I selected
	image(bg, 250, 250, 500, 500);
	fill(72,61,129);
	noStroke();
	//here I am setting up my borders for the canvas
	rect(0,0,15,499);
	rect(485,0,15,499);
	rect(0,0,499,15);
	
	//setting up the scoring system text on the upp-left hand side of my screen
	fill(238,232,170);
	text("Score: " + score, 40, 40);
	text("Misses: " + misses, 40, 60);

	//creating my paddle 
	fill(72,61,129);
	rect(paddleX,paddleY,80,25);
	//make sure that the x and y position are the variables we created 
	//calling my fish image
	image(astronaut, astronautX, astronautY, 60,60);


	//setting up keyboard control so that the a key represents the left side and 
	//the d key represents the right side of the paddle
	if(keyIsDown(65))
	{
		//adding speed and sending the paddle to the left or right according to the key that
		//is down. Negative for left since the x value is going down and positive for right 
		//since the x value is going up
		paddleSpeed -= 0.3;
		console.log("left key is down");
	}

	if(keyIsDown(68))
	{
		paddleSpeed += 0.3;
		console.log("right key is down");
	}

	//adding the speed to the paddle
	paddleX += paddleSpeed;


	if(paddleX <= 15)
	{
		//making the speed zero when the paddle's x value reaches the left border
		paddleSpeed = 0;
		//setting the paddle's x value to the border's x value so that the paddle does not go past the border
		paddleX = 15;
		
	}
	//paddle x value plus the width of the paddle is greater than or equal to the width of the 
	//canvas minus the border width
	else if(paddleX + 80 >= 485)
	{
		//making the speed zero when the paddle's x value reaches the right border
		paddleSpeed = 0;
		//make the position right at the edge(hardset the position)
		paddleX = 405;
		
	}

	//adding speed to the x and y 
	xPos += xSpeed;
	yPos += ySpeed;

	//creating my ball
	fill(255, 255, 255, 235);
	ellipse(xPos,yPos,25,25);

	//to make the ball hit the edge of the border you have to add the width of the border plus half the diameter of the ball
	if(yPos <= 15 + 12.5 )
	{
		//easiest eay to make the y value go up
		//for the game, make sure you put in a speed limit so tht the ball doesn't go too fast on the screen
		//make the speed -1.1 to make it go faster and faster
		ySpeed *= -1.1;
		fill(random(0,255), random(0,255), random(0,255));
		walls.play();
		//if you put just 255 in the random function it will assume that the starting number is 0
	}

	//This is what you do to make the ball bounce off the paddle
	if ((yPos >= height - 15 -12.5) && xPos >= paddleX && xPos <= paddleX + 80) 
	{
		//this makes the ball bounce up
		ySpeed *= -1.1;
		yPos = height -15 -12.5;
		paddleSound.play();
		//making the ball bounce in the direction that it lands on the paddle
		if (xPos <= paddleX + 40)
		{
			xSpeed = -1*abs(xSpeed);
		}
		else 
		{
			xSpeed = abs(xSpeed);
		}
	}

	//making it so that if the ball falls below the canvas then the ball resets and the player gets a miss
	if(yPos >= height - 12.5)
	{
		xSpeed = 0;
		ySpeed = 0
		xPos = 250;
		yPos = 250;
		misses += 1;
		youLose.play();
	}

	if(xPos >= width - 15 - 12.5 || xPos <= 0 + 15 +12.5)
	{
	
		//make the speed -1.1 to make it go faster and faster

		xSpeed *= -1.1;
		fill(random(0,255), random(0,255), random(0,255));
		walls.play();

	}

	//calculating the distance of the astronaut and the ball
	//if the distance between the two is less than the radius's of both then the astronaut will
	//pick a new random point to jump to, and the player gets a point
	if(dist(xPos,yPos,astronautX,astronautY) <= 15 + 30)
	{
		astronautX = (random( 100, width - 100));
		astronautY = (random( 100, height - 200));
		image(astronaut, astronautX, astronautY, 60,60);
		score += 1;
		coinCollect.play();
	}

	//constrain the speed so that if it is above 5 or below 5 once the frame ends, it will bring it 
	//back to the constraint that we put
	xSpeed = constrain(xSpeed, -5,5);

	//setting up the scoring system text on the upper-left hand side of my screen\
	fill(238,232,170);
	text("Score: " + score, 40, 40);
	text("Misses: " + misses, 40, 60);


}

//controls mousePressed so that when the player misses, and only is the speed of the ball is zero, the player 
//can restart by clicking the mouse.
function mousePressed()
{
	if(xSpeed == 0 && ySpeed == 0)
	{
		xSpeed = random(-5, 5);
		ySpeed = random(-5,0);
		console.log("Mouse is being pressed");
	}
}
	

