const canvas = document.querySelector("#canvas");
// const addBtn = document.querySelector(".addbtn");
const shootbtn = document.querySelector(".shootbtn");
const main = document.getElementById("main");
let intervalRunning = false;
let intervalRunning2 = false;
var intervalId1;
var intervalId2;
// canvas configuration
// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Constraint = Matter.Constraint,
  Events = Matter.Events,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

shootbtn.addEventListener("mouseenter", (params) => {
  if (intervalRunning) {
    clearInterval(intervalId1);
    intervalRunning = false;
  } else {
    intervalId1 = setInterval(shoot, 60);
    intervalRunning = true;
  }
});
shootbtn.addEventListener("mouseleave", (params) => {
  if (intervalRunning) {
    clearInterval(intervalId1);
    intervalRunning = false;
  } else {
    intervalId1 = setInterval(shoot, 60);
    intervalRunning = true;
  }
});

shootbtn.addEventListener("touchend", (params) => {
  if (intervalRunning) {
    clearInterval(intervalId1);
    intervalRunning = false;
  } else {
    intervalId1 = setInterval(shoot, 60);
    intervalRunning = true;
  }
});

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    clearInterval(intervalId1);
    intervalRunning = false;
    clearInterval(intervalId2);
    intervalRunning2 = false;
    console.log("if chala");
  } else {
    clearInterval(intervalId2);
    intervalId2 = setInterval(createobj, 800);
    intervalRunning2 = true;
    console.log("elsechala");
  }
});

intervalId2 = setInterval(createobj, 800);
intervalRunning2 = true;

// window.innerWidth - scroller width
let innerh = window.innerHeight;
let innerw = window.innerWidth - 7;

var rockOptions = { density: 0.004 },
  anchor = { x: 170, y: 450 };

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    background: "transparent",
    wireframes: false,
    width: innerw,
    height: innerh * 5,
  },
});

//screen bounds/walls
Composite.add(engine.world, [
  //   Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  //   bottom
  Bodies.rectangle(
    innerw / 2,
    innerh * 4 + innerh / 4 + (innerh - innerh / 4) / 2 + 10,
    innerw,
    innerh - innerh / 4,
    { isStatic: true, chamfer: { radius: [150, 150, 0, 0] } }
  ),
  //   left right
  Bodies.rectangle(
    innerw,
    (innerh * 5) / 2 - (innerh - innerh / 2),
    5,
    innerh * 5 - 500,
    {
      isStatic: true,
    }
  ),
  Bodies.rectangle(
    0,
    (innerh * 5) / 2 - (innerh - innerh / 2),
    5,
    innerh * 5 - 500,
    {
      isStatic: true,
    }
  ),
]);

// create object function
function createobj() {
  let box = Bodies.circle(
    Math.random() * (innerw - innerw / 3) + innerw / 5 - 40,
    0,
    40,
    {
      render: {
        sprite: {
          texture: "../Assets/dark_insta.png",
        },
      },
      restitution: 1,
      density: 0.02,
    }
  );
  Composite.add(engine.world, [box]);
}

const functionName = () => {
  var body = Bodies.circle(280, 100, 3, 30);

  var constraint = Constraint.create({
    pointA: { x: 280, y: 120 },
    bodyB: body,
    pointB: { x: -10, y: -7 },
    stiffness: 0.001,
  });

  Composite.add(engine.world, [constraint]);
};

var rock = Bodies.polygon(innerw / 10, innerh / 2 + 120, 3, 30, {
  density: 0.05,
});

var constraint = Constraint.create({
  pointA: { x: innerw / 10, y: innerh - 200 },
  bodyB: rock,
  pointB: { x: -10, y: -10 },
  length: 0.06,
  damping: 0.01,
  stiffness: 0.05,
});

Composite.add(engine.world, [constraint, rock]);

var body = Bodies.polygon(innerw / 3, 100, 4, 30, {
  chamfer: { radius: [5, 2, 4, 2] },
});

var constraint1 = Constraint.create({
  pointA: { x: innerw / 3, y: 120 },
  bodyB: body,
  pointB: { x: -10, y: -10 },
  stiffness: 0.01,
  damping: 0.05,
});

Composite.add(engine.world, [body, constraint1]);
// ______________________________________slingshot___________________________________________

function shoot() {
  Body.setSpeed(rock, Math.floor((Math.random() + Math.random()) * 25));
  rock = Bodies.polygon(innerw / 12, innerh / 2 + 140, 3, 30, {
    density: 0.02,
    friction: 0,
  });
  Composite.add(engine.world, rock);
  constraint.bodyB = rock;
}

// create two boxes and a ground
let ground = Bodies.rectangle(innerw / 2, innerh - 15, innerw, 30, {
  isStatic: true,
  angle: Math.PI * 0,
  render: { fillStyle: "#222" },
});

// add all of the bodies to the world
// Composite.add(engine.world, [ground]);

// ________________________new codes____________________________
// ________________________new codes____________________________
// ________________________new codes____________________________

var body = Bodies.polygon(innerw / 1.2, innerh / 1.5, 4, 40, {
  density: 1,
  chamfer: { radius: 5 },
});

var constraint1 = Constraint.create({
  pointA: { x: innerw / 1.25, y: innerh / 1.9 },
  bodyB: body,
  pointB: { x: -10, y: -10 },
  stiffness: 0.01,
  damping: 0.05,
});

Composite.add(engine.world, [body, constraint1]);

var body = Bodies.rectangle(innerw / 3.5 + 5, innerh + 150 + 50, 350, 20, {
  restitution: 0.5,
  density: 0.2,
  chamfer: { radius: 5 },
});
var body1 = Bodies.rectangle(innerw / 3.5 + 10, innerh + 150, 205, 20, {
  restitution: 0.5,
  density: 0.2,
  chamfer: { radius: 5 },
});

Composite.add(engine.world, [body, body1]);

// ___________________________________card1_____________________________________

var body = Bodies.rectangle(
  innerw / 3.5,
  innerh + 150 + innerh / 2.5 - 40,
  355,
  405,
  {
    density: 0.03,
    chamfer: { radius: 15 },
  }
);

var constraint1 = Constraint.create({
  pointA: { x: innerw / 3.5 - 355 / 2, y: innerh + innerh / 9 },
  bodyB: body,
  pointB: { x: -355 / 2 + 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

var constraint2 = Constraint.create({
  pointA: { x: innerw / 3.5 + 355 / 2, y: innerh + innerh / 9 },
  bodyB: body,
  pointB: { x: 355 / 2 - 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

Composite.add(engine.world, [body, constraint1, constraint2]);

// ___________________________________card2_____________________________________

var body = Bodies.rectangle(
  innerw - innerw / 3.5,
  innerh + 150 + innerh / 2.5 - 40 + innerh / 4,
  355,
  405,
  {
    density: 0.03,
    chamfer: { radius: 15 },
  }
);

var constraint1 = Constraint.create({
  pointA: {
    x: innerw - innerw / 3.5 - 355 / 2,
    y: innerh + innerh / 9 + innerh / 4,
  },
  bodyB: body,
  pointB: { x: -355 / 2 + 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

var constraint2 = Constraint.create({
  pointA: {
    x: innerw - innerw / 3.5 + 355 / 2,
    y: innerh + innerh / 9 + innerh / 4,
  },
  bodyB: body,
  pointB: { x: 355 / 2 - 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

Composite.add(engine.world, [body, constraint1, constraint2]);

// ___________________________________card3_____________________________________

var body = Bodies.rectangle(
  innerw / 3.5,
  innerh + 150 + innerh / 2.5 - 40 + 405 + 150,
  355,
  405,
  {
    density: 0.03,
    chamfer: { radius: 15 },
  }
);

var c3constraint1 = Constraint.create({
  pointA: { x: innerw / 3.5 - 355 / 2, y: innerh + innerh / 9 + 405 + 150 },
  bodyB: body,
  pointB: { x: -355 / 2 + 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

var c3constraint2 = Constraint.create({
  pointA: { x: innerw / 3.5 + 355 / 2, y: innerh + innerh / 9 + 405 + 150 },
  bodyB: body,
  pointB: { x: 355 / 2 - 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

Composite.add(engine.world, [body, c3constraint1, c3constraint2]);

// ___________________________________card4_____________________________________

var body = Bodies.rectangle(
  innerw / 3.5 + 5,
  innerh + 150 + 50 + 405 + 150,
  350,
  20,
  {
    restitution: 0.5,
    density: 0.2,
    chamfer: { radius: 5 },
  }
);
var body1 = Bodies.rectangle(
  innerw / 3.5 + 50,
  innerh + 150 + 405 + 150,
  205,
  20,
  {
    restitution: 0.5,
    density: 0.2,
    chamfer: { radius: 5 },
  }
);

Composite.add(engine.world, [body, body1]);

var body4 = Bodies.rectangle(
  innerw - innerw / 3.5,
  innerh + 150 + innerh / 2.5 - 40 + innerh / 4 + 405 + 150,
  355,
  405,
  {
    density: 0.03,
    chamfer: { radius: 15 },
  }
);

var constraint1 = Constraint.create({
  pointA: {
    x: innerw - innerw / 3.5 - 355 / 2,
    y: innerh + innerh / 9 + innerh / 4 + 405 + 150,
  },
  bodyB: body4,
  pointB: { x: -355 / 2 + 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

var constraint2 = Constraint.create({
  pointA: {
    x: innerw - innerw / 3.5 + 355 / 2,
    y: innerh + innerh / 9 + innerh / 4 + 405 + 150,
  },
  bodyB: body4,
  pointB: { x: 355 / 2 - 30, y: -405 / 2 + 20 },
  stiffness: 0.001,
  damping: 0.05,
});

Composite.add(engine.world, [body4, constraint1, constraint2]);

// ________________________second last page____________________________
// ________________________second last page____________________________

var body4 = Bodies.rectangle(
  (innerw - innerw/2.5)/2,
  innerh * 2 + innerh / 9 + innerh / 4 + 405 + 150 + innerh / 4 -innerh/7,
  innerw - innerw/2.5,
  innerw/8,
  {
    density: 0.025,
    chamfer: { radius: 15 },
  }
);

// var constraint1 = Constraint.create({
//   pointA: {
//     x: innerw/10 -30 ,
//     y: innerh * 2 + innerh / 9 + innerh / 4 + 405 + 150,
//   },
//   bodyB: body4,
//   pointB: { x: - (innerw - innerw/5)/2 + 30, y: -innerw/16 },
//   stiffness: 0.001,
//   damping: 0.05,
// });

var constraint2 = Constraint.create({
  pointA: {
    x: innerw - innerw/5 - (innerw - innerw/5)/2 -innerw/10,
    y: 2 * innerh + innerh / 9 + innerh / 4 + 405 + 150,
  },
  bodyB: body4,
  pointB: { x: -20 , y: -innerw/16 },
  stiffness: 0.001,
  damping: 0.05,
});

Composite.add(engine.world, [body4, constraint2]);

// ________________________new codes____________________________
// ________________________new codes____________________________

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.01,
    render: {
      visible: false,
    },
  },
});
mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

Composite.add(engine.world, mouseConstraint);
