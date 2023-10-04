
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let canvas, context;
let movers = [];



function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    loadMovers(20);
    animate();
    

}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    runMovers();   // run movers
    runOrbiters(); // run orbiters
    requestAnimationFrame(animate); // next cycle
}

function loadMovers(n) {
    for (let i = 0; i < n; i++) {
        let x = Math.random() * 600-0;
        let y = Math.random() * 600-0;
        let r = Math.random() * 10 + 5;
        movers[i] = new Mover(x, y, r);
    }
}

// move the circle to a new location
function runMovers() {
    for (let i = 0; i < movers.length; i++) {
        movers[i].run();
    }
}

