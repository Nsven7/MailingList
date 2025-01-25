class Client {
    #id
    #firstName
    #service
    #senior
    #disabled
    #isPriority
    #isCompleted

    static currentId = 1;

    constructor(firstName, senior, disabled, service) {
        this.#id = Client.currentId;
        this.#firstName = firstName;
        this.#service = service;
        this.#senior = senior;
        this.#disabled = disabled;
        this.#isPriority = false;
        this.#updatePriority();
        this.#isCompleted = false;
        Client.currentId++;
    }

    /**
     * Recalculate the priority status of the client.
     */
    #updatePriority() {
        this.#isPriority = this.#senior === 1 || this.#disabled === 1;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(firstName) {
        this.#firstName = firstName;
    }

    get service() {
        return this.#service;
    }

    set service(service) {
        this.#service = service;
    }

    get senior() {
        return this.#senior;
    }

    set senior(senior) {
        this.#senior = senior;
        this.#updatePriority(); // Recalculate priority
    }

    get disabled() {
        return this.#disabled;
    }

    set disabled(disabled) {
        this.#disabled = disabled;
        this.#updatePriority(); // Recalculate priority
    }

    get isPriority() {
        return this.#isPriority;
    }

    set isPriority(isPriority) {
        this.#isPriority = isPriority;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    set isCompleted(isCompleted) {
        this.#isCompleted = isCompleted;
    }
}

export { Client };