"use strict";

var side = 40, timer;
let squares = [];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function animate() {

    const maxNumSquares = 10;
    timer = setTimeout(function () {

        let random = (Math.random() * 30).toFixed();
        if (random == 1 && (squares.length < maxNumSquares)) {
            generateSquare(canvas);
        }

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);

        squares.forEach((item, i) => {
            ctx.fillStyle = item.color;
            ctx.fillRect(item.left, item.top, side, side);
            item.top += item.speed;
            if (item.top >= canvas.clientHeight) {
                squares.splice(i, 1);
            }
        });
        requestAnimationFrame(animate);
    }, 1000 / 50);
}

function generateSquare() {
    let x;
    if (checkX()) {
        let score = document.querySelector("#score");
        let scoreValue = parseInt(score.innerHTML);
        if (scoreValue > 120) {
            scoreValue = 120;
        }

        /* with increasing speed */
        let coef = scoreValue/30+0.5;
        let min = coef, max = 2*coef;

        let color = {
            r: (Math.random() * 255).toFixed(),
            g: (Math.random() * 255).toFixed(),
            b: (Math.random() * 255).toFixed()
        };
        squares.push({
            left: x,
            top: 0,
            color: `rgb(${color.r},${color.g},${color.b})`,
            speed: Math.floor(Math.random() * (max - min)) + min
        });
    }

    function checkX() {
        let flag = true;

        x = Math.random() * (canvas.clientWidth - side);
        for (let i = 0; i < squares.length; i++) {
            if ((x > squares[i].left - side) && x < squares[i].left + side * 2) {
                flag = false;
                break;
            }
        }
        return flag;
    }
}

function stopAll() {
    clearInterval(timer);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    squares.splice(0, squares.length);
    let score = document.querySelector("#score");
    score.innerHTML = " 0 ";
}

function eraseSquare(event) {
    let x = event.clientX,
        y = event.clientY;

    squares.forEach((item, i) => {
        if ((x > item.left+side*0.2) && (x < item.left + side*1.2)
            && (y > item.top+side/2 ) && (y < item.top + side * 1.7)) {

            ctx.clearRect(item.left, item.top, side, side);
            squares.splice(i, 1);

            let score = document.querySelector("#score");
            score.innerHTML = parseInt(score.innerHTML) + 1;
        }
    });
}

document.querySelector(".start").addEventListener("click", animate);
document.querySelector(".stop").addEventListener("click", stopAll);
canvas.addEventListener("click", eraseSquare);