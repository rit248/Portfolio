/* =========================================
   RITESH PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   PARTICLE BACKGROUND
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    canvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* Create particles */

const particleCount =
    Math.min(
        120,
        Math.floor(window.innerWidth / 10)
    );


for (
    let i = 0;
    i < particleCount;
    i++
) {

    particles.push({

        x:
            Math.random() *
            window.innerWidth,

        y:
            Math.random() *
            window.innerHeight,

        size:
            Math.random() * 1.8 + .5,

        speedX:
            (Math.random() - .5) * .3,

        speedY:
            (Math.random() - .5) * .3,

        opacity:
            Math.random() * .7 + .2

    });

}


/* Draw particles */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    particles.forEach(p => {

        p.x += p.speedX;
        p.y += p.speedY;


        if (
            p.x < 0 ||
            p.x > window.innerWidth
        ) {

            p.speedX *= -1;

        }


        if (
            p.y < 0 ||
            p.y > window.innerHeight
        ) {

            p.speedY *= -1;

        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(0,229,255,${p.opacity})`;

        ctx.fill();

    });


    /* Connections */

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 110) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(124,92,255,
                    ${0.12 -
                    distance / 1100})`;

                ctx.lineWidth = .5;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(
        drawParticles
    );

}


drawParticles();


/* =========================================
   MOUSE POSITION
========================================= */

document.addEventListener(
    "mousemove",
    e => {

        mouse.x = e.clientX;
        mouse.y = e.clientY;

    }
);


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


document.addEventListener(
    "mousemove",
    e => {

        cursor.style.left =
            e.clientX + "px";

        cursor.style.top =
            e.clientY + "px";


        cursorDot.style.left =
            e.clientX + "px";

        cursorDot.style.top =
            e.clientY + "px";

    }
);


/* Cursor hover */

document.querySelectorAll(
    "a, button, .project-card, .skill-card"
).forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            cursor.style.width = "55px";
            cursor.style.height = "55px";

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            cursor.style.width = "35px";
            cursor.style.height = "35px";

        }
    );

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                    }

                }
            );

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   SKILL BAR ANIMATION
========================================= */

const skillBars =
    document.querySelectorAll(
        ".progress-bar"
    );


const skillObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const bar =
                            entry.target;

                        const width =
                            bar.dataset.width;

                        bar.style.width =
                            width;

                        skillObserver.unobserve(
                            bar
                        );

                    }

                }
            );

        },

        {
            threshold: .5
        }

    );


skillBars.forEach(
    bar => {

        skillObserver.observe(
            bar
        );

    }
);


/* =========================================
   3D CARD TILT
========================================= */

const tiltCards =
    document.querySelectorAll(
        ".tilt"
    );


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            const rect =
                card.getBoundingClientRect();


            const x =
                e.clientX -
                rect.left;


            const y =
                e.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                centerY) * -6;


            const rotateY =
                ((x - centerX) /
                centerX) * 6;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================
   ABOUT IMAGE TILT
========================================= */

const aboutImage =
    document.querySelector(
        ".about-image img"
    );


if (aboutImage) {

    aboutImage.addEventListener(
        "mousemove",
        e => {

            const rect =
                aboutImage.getBoundingClientRect();


            const x =
                e.clientX -
                rect.left;


            const y =
                e.clientY -
                rect.top;


            const rotateY =
                ((x / rect.width) - .5) *
                12;


            const rotateX =
                ((y / rect.height) - .5) *
                -12;


            aboutImage.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.03)`;

        }
    );


    aboutImage.addEventListener(
        "mouseleave",
        () => {

            aboutImage.style.transform =
                "";

        }
    );

}


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const navLinks =
    document.querySelector(
        ".nav-links"
    );


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );

}


/* Close mobile menu */

document.querySelectorAll(
    ".nav-links a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.classList.remove(
                "active"
            );

        }
    );

});


/* =========================================
   HERO PARALLAX
========================================= */

const hero3D =
    document.querySelector(
        ".hero-3d"
    );


document.addEventListener(
    "mousemove",
    e => {

        if (
            window.innerWidth < 800 ||
            !hero3D
        ) {
            return;
        }


        const x =
            (e.clientX /
            window.innerWidth - .5);


        const y =
            (e.clientY /
            window.innerHeight - .5);


        hero3D.style.transform =
            `translate(
                ${x * 20}px,
                ${y * 20}px
            )`;

    }
);


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.querySelector(
        ".navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 50
        ) {

            navbar.style.background =
                "rgba(3,3,11,.9)";

        } else {

            navbar.style.background =
                "rgba(5,5,15,.65)";

        }

    }
);