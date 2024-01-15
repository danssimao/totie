class Container {
    constructor(element) {
        this.element = element;
    }

    static create(element) {
        return new Container(element);
    }

    addConnector(connector) {
        this.element.append(connector.get());
    }
}

export default Container;
