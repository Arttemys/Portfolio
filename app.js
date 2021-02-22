const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;


// Mouse position

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width / 80)
}

// window.addEventListener('mousedown',
//     function (event) {
//         mouse.x = event.x;
//         mouse.y = event.y;
//     }
    
// );

// Create Particle 

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2, false);
        ctx.fillStyle = '#72D6B7';
        ctx.fill();
    }

    // check particle and mouse position, and create particle

    update() {
        if (this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }

            if (mouse.y > this.y && this.y > this.size *10) {
                this.y -= 10;
            }
        }
        //move particle

        this.x += this.directionX;
        this.y += this.directionY;
        //draw particle

        this.draw();
    }
}

//create particle array

function init() {
    particlesArray = [];
    let numberOfParticle = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticle * 0.2; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) -(size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) -(size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directiony = (Math.random() * 5) - 2.5;
        let color = '#FFFFFF';

        particlesArray.push(new Particle(x, y, directionX, directiony, size, color));
    }
}

//animation loop

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connect();
}
//draw lines 

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = 0; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width/10) * (canvas.height/10)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(136,211,206,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//reside event 

window.addEventListener('resize', 
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.width/80) * (canvas.height/80));
        init();
    }
);

//mouse out 

window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();