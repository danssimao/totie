import { SOURCES } from "./consts.js";
import { style, settings, TotieSettings } from "./defaults.js";
import { merge, getDistanceBetweenPoints, getAxis, getRadians, getDegrees } from "./utils.js";

type Event = MouseEvent;

type EventParams = [HTMLElement, string, (event: Event) => void];

class Totie {
    settings: TotieSettings;
    LabelElement: HTMLElement;
    InElement: HTMLElement;
    OutElement: HTMLElement;
    element: HTMLElement;
    container: HTMLElement;
    events: Array<EventParams>;
    distance: number;

    constructor({
            origin = null, 
            target = null, 
            container = document.body
        }, 
        options = {},
    ) {
        this.settings = merge(settings, options);
        this.LabelElement = null;
        this.InElement = null;
        this.OutElement = null;
        this.element = this.createConnector();
        this[SOURCES.ORIGIN] = origin;
        this[SOURCES.TARGET] = target;
        this.container = container;
        this.events = [];
        this.distance = 0;
        this.loadEvents();
        this.build();
    }

    static create({origin, target, container}, options) {
        return new Totie({origin, target, container}, options);
    }

    getBounds(source) {
        const node = this[source];
        const containerBounds = this.container.getBoundingClientRect();
        const nodeBounds = node.getBoundingClientRect();

        return {
            ...nodeBounds.toJSON(),
            top: nodeBounds.top - containerBounds.top,
            left: nodeBounds.left - containerBounds.left,
        };
    }

    getCenter(source) {
        const bounds = this.getBounds(source);

        const futureLineStrokeHeight = ((this.settings.lineStroke - 1) / 2);
        const lineStrokeHeight = (futureLineStrokeHeight > 1 ? Math.floor(futureLineStrokeHeight) : 0);
        
        if (source === SOURCES.ORIGIN) {
            return {
                left: bounds.left + 
                    bounds.width - 
                    this[SOURCES.ORIGIN].clientLeft + 
                    this.settings.originX,
                top: bounds.top + 
                    (bounds.height / 2) - 
                    this[SOURCES.ORIGIN].clientTop + 
                    this.settings.originY - 
                    lineStrokeHeight,
            }
        }

        return {
            left: bounds.left + 
                this.settings.targetX,
            top: bounds.top + 
                (bounds.height / 2) - 
                this[SOURCES.TARGET].clientTop + 
                this.settings.targetY - 
                lineStrokeHeight,
        };
    }

    remove() {
        this.events.forEach(([target, event, fn]: EventParams) => {
            target.removeEventListener(event, fn);
        });
        this.element.remove();
    }

    createConnector() {
        const element = document.createElement('div');

        element.style.borderColor = style.borderColor;
        element.style.borderStyle = style.borderStyle;
        element.style.borderWidth = `${this.settings.lineStroke}px 0 0 0`;
        element.style.position = style.position;
        element.style.zIndex = style.zIndex;
        element.style.width = '50px';
        element.style.cursor = 'pointer';

        /**
         * TODO: inside connector must contain: 
         * 
         * - delete action when focus is active;
         * - hover feedback;
         * - focus feedback
         * - out dot
         * - in arrow
         * */ 

        return element;
    }

    get() {
        return this.element;
    }

    setPosition({
        originLeft,
        originTop,
        targetLeft,
        targetTop,
    }) {
        const { left, top } = getAxis(originLeft, targetLeft, originTop, targetTop);

        const fixedLeft = left - (this.distance / 2);

        this.element.style.left = `${fixedLeft}px`;
        this.element.style.top = `${top}px`;

        return {
            left: fixedLeft,
            top,
        };
    }

    setDistance({
        originLeft,
        originTop,
        targetLeft,
        targetTop,
    }) {
        this.distance = getDistanceBetweenPoints(originLeft, targetLeft, originTop, targetTop);
        this.element.style.width = `${this.distance}px`;
        return this.distance;
    }

    setDegree({
        originLeft,
        originTop,
        targetLeft,
        targetTop,
    }) {
        const radians = getRadians(originLeft,targetLeft, originTop, targetTop);
        const degrees = getDegrees(radians);

        this.element.style.transform = `rotate(${degrees}deg)`;

        return { radians, degrees };
    }

    addEvent(target: HTMLElement, event: string, fn: (event: Event) => void) {
        target.addEventListener(event, fn);
        this.events.push([target, event, fn]);
        return this;
    }

    loadEvents() {
        this
            .addEvent(this.element, 'mouseover', (event: Event) => {
                event.stopPropagation();
                this.element.style.borderColor = 'green';
            })
            .addEvent(this.element, 'mouseleave', (event) => {
                event.stopPropagation();
                this.element.style.borderColor = '#000';
            })
            .addEvent(this.element, 'click', (event) => {
                event.stopPropagation();
                console.log(event);
            });
    }

    calculatePosition() {
        const centerOrigin = this.getCenter(SOURCES.ORIGIN);
        const targetOrigin = this.getCenter(SOURCES.TARGET);

         this.setDistance({
            originLeft: centerOrigin.left,
            originTop: centerOrigin.top,
            targetLeft: targetOrigin.left,
            targetTop: targetOrigin.top,
        });

        this.setPosition({
            originLeft: centerOrigin.left,
            originTop: centerOrigin.top,
            targetLeft: targetOrigin.left,
            targetTop: targetOrigin.top,
        });

        this.setDegree({
            originLeft: centerOrigin.left,
            originTop: centerOrigin.top,
            targetLeft: targetOrigin.left,
            targetTop: targetOrigin.top,
        });
    }

    build() {
        if (!this[SOURCES.ORIGIN]) {
            throw new Error('You must define an origin element!');
        }

        if (!this[SOURCES.TARGET]) {
            throw new Error('You must define a target element!');
        }

       this.calculatePosition();
    }
}

export default Totie;
