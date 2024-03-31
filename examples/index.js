import Connector from "./lib/connector.js";
import Container from "./lib/container.js";

const container = document.querySelector('.container');
const node1 = document.querySelector('.node-1');
const node2 = document.querySelector('.node-2');
const connectorOut = document.querySelector('.connection-out');
const connectionIn = document.querySelector('.connection-in');

const connector = Connector.create({
    origin: connectorOut,
    target: connectionIn,
    container,
}, {
    originX: -4,
    targetX: 4,
    lineStroke: 4,
    onDelete: () => console.log('deleted')
});

const c = Container.create(container);

c.addConnector(connector);

const currentPos = {x: 0, y: 0};
let isDragging = false;

container.addEventListener('mousedown', ({clientY, clientX}) => {

    const x = clientX - container.offsetLeft;
    const y = clientY - container.offsetTop;

    console.log({clientX, clientY});

    currentPos.x = clientX;
    currentPos.y = clientY;
    isDragging = true;
});

container.addEventListener('mousemove', ({target, clientY, clientX}) => {


    if (!isDragging) return;

    const x = clientX - container.offsetLeft;
    const y = clientY - container.offsetTop;

    const deltaX = currentPos.x - clientX;
    const deltaY = currentPos.y - clientY;

    if (target.classList.contains('node')) {
        target.style.top = `${target.offsetTop - deltaY}px`;
        target.style.left = `${target.offsetLeft - deltaX}px`;

        connector.calculatePosition();
    }

    currentPos.x = clientX;
    currentPos.y = clientY;
});

container.addEventListener('mouseup', ({clientY, clientX}) => {
    isDragging = false;
});