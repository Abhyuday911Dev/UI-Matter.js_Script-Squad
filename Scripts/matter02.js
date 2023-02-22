// create an engine
var engine = Matter.Engine.create();

// create a renderer
var render = Matter.Render.create({
    element: document.body,
    engine: engine
});

// create two static bodies to form a rectangular boundary around the canvas
var boundaryLeft = Matter.Bodies.rectangle(-50, render.canvas.height/2, 100, render.canvas.height, { isStatic: true });
var boundaryRight = Matter.Bodies.rectangle(render.canvas.width + 50, render.canvas.height/2, 100, render.canvas.height, { isStatic: true });

// add the boundaries to the world
Matter.World.add(engine.world, [boundaryLeft, boundaryRight]);

// create some particles
var particles = Matter.Composite.create();
for (var i = 0; i < 20; i++) {
    var particle = Matter.Bodies.circle(Matter.Common.random(0, render.canvas.width), Matter.Common.random(0, render.canvas.height), 10);
    Matter.Composite.add(particles, particle);
}

// add the particles to the world
Matter.World.add(engine.world, particles);

// add a constraint to keep the particles inside the boundaries
Matter.World.add(engine.world, Matter.Constraint.create({
    bodyA: boundaryLeft,
    bodyB: particles,
    pointB: { x: 0, y: 0 },
    stiffness: 0.1
}));
Matter.World.add(engine.world, Matter.Constraint.create({
    bodyA: boundaryRight,
    bodyB: particles,
    pointB: { x: 0, y: 0 },
    stiffness: 0.1
}));

// run the engine and renderer
Matter.Engine.run(engine);
Matter.Render.run(render);
