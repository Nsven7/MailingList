import { Client } from './Client.js';

class ClientManager {
    constructor() {
        this.clients = [];
    }

    // Add a new client
    addClient(firstName, senior, disability, service) {
        if (firstName, senior, disability, service) {
            const validatedFirstName = this.#validateString(firstName);
            const validatedService = this.#validateString(service);
            const validatedSenior = this.#validateState(senior);
            const validatedDisability = this.#validateState(disability);
            
            const client = new Client(validatedFirstName, validatedSenior, validatedDisability, validatedService);
            this.clients.push(client);
            return client;
        }
    }

    /**
     * Validate the firstName of the client.
     * @param {string} firstName - The firstName to validate.
     * @return {string} The validated firstName.
     * @throws Will throw an error if the firstName is empty string with a maximum size of 10 characters.
     */
    #validateString(firstName) {
        if (firstName.length <= 3 || firstName.length > 15 || typeof firstName !== 'string') {
            throw new Error("The length of your firstName must be between 3 and 15 characters");
        } else {
            return firstName;
        }
    }

    /**
     * Validate the handicap or senior state of the client.
     * @param {number} state - The state to validate.
     * @return {number} The validated state.
     * @throws Will throw an error if the state is different of 0, 1 or null.
     */
    #validateState(param) {
        if (typeof param === 'number' && (param === 0 || param === 1)) {
            return param;
        } else {
            throw new Error('Invalid value for disabled: must be 0 or 1.');
        }
    }

    // Select a client by its ID
    selectClient(clientId) {
        this.#validateClientId(clientId);
        this.clients = this.clients.filter(client => client.id !== clientId);
    }

    /**
     * Validate the client ID.
     * @param {number} clientId - The ID to validate.
     * @throws Will throw an error if the ID is not found.
     */
    #validateClientId(clientId) {
        if (!this.clients.some(client => client.id === clientId)) {
            throw new Error("client's id isn't present in clients");
        }
    }
}

export { ClientManager };