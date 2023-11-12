
    var pos = 0;
    const pacArray = [
        ["PacMan1.png", "PacMan2.png"],
        ["PacMan3.png", "PacMan4.png"]
    ];
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale,
        };
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        // Add image to div id = game
        let game = document.getElementById("game");
        let newimg = document.createElement("img");
        newimg.style.position = "absolute";

        //Use the 'direction' variable to select the appropiate image
        newimg.src = pacArray[direction][0];
        newimg.width = 100;
       
        // set position here 
        newimg.style.left = position.x + "px";
        newimg.style.top = position.y + "px";

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        return {
            position,
            velocity,
            newimg,
        };
    }

    function update() {
        console.log("update() function called");
        console.log("Valor de direction:", direction);
        

        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            console.log("Posición de Pac-Man 0:", item.position);
            checkCollisions(item);
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;
            item.newimg.src = pacArray[item.direction][pos % 2];
            item.newimg.style.left = item.position.x + "px";
            item.newimg.style.top = item.position.y + "px";


            if(item.position.x + item.velocity.x + item.newimg.width >
               window.innerWidth
               ){
                item.direction = 1;
                item.newimg.src = pacArray[item.direction][0];

            }else if(item.position.x + item.velocity.x < 0){
                item.direction = 0;
                item.newimg.src = pacArray[item.direction][0];

                }
            });
            
            pos++;
            setTimeout(update, 200);
      }
       
      
        function checkCollisions(item) {
        // detect collision with all walls and make pacman bounce
        if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) 
        {
        item.velocity.x = -item.velocity.x;
        }
        
        if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0)
         {
            item.velocity.y = -item.velocity.y;
        }
    }

    function makeOne() {
    const pac = makePac();
    pacMen.push({...pac, direction:0}); // add a new PacMan
    }
