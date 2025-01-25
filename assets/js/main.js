import { ClientManager } from '../../src/Controller/ClientManager.js';

const manager = new ClientManager();

document.getElementById('clientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const clientName = document.getElementById('firstName').value;
    const senior = document.getElementById('senior');
    const seniorState = senior.checked ? 1 : 0;
    const disability = document.getElementById('disability');
    const disabilityState = disability.checked ? 1 : 0;
    const service = document.getElementById('services').value
    const newClient = manager.addClient(clientName, seniorState, disabilityState, service);

    renderClients();
});

const renderClients = () => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    // Sort clients with isPriority = true at the top
    const sortedClients = [...manager.clients].sort((a, b) => b.isPriority - a.isPriority);

    // Loop through sorted clients and create rows
    sortedClients.forEach(client => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client.id}</td>
            ${client.isCompleted ? '<td class="isCompleted">' : '<td>'}
            ${client.firstName}</td>
            <td>${client.service}</td>
            <td>${client.senior === 1 ? '&#9745;' : '&#10060;'}</td>
            <td>${client.disabled === 1 ? '&#9855;' : '&#10060;'}</td>
            <td>
                <span class="icon remove" data-id="${client.id}">&#128465;</span>
                <span class="icon complete" data-id="${client.id}">${client.isCompleted ? '&#10060' : '&#9989;'}</span>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Reattach listeners for dynamically added rows
    attachRemoveListeners();
    attachCompleteListeners();
};

// Remove event
const attachRemoveListeners = () => {
    const removeButtons = document.getElementsByClassName('remove');

    Array.from(removeButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            const clientId = parseInt(e.target.getAttribute('data-id'));
            removeClient(clientId);
        });
    });
};

// Completed event
const attachCompleteListeners = () => {
    const completeButtons = document.getElementsByClassName('complete');

    Array.from(completeButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            const clientId = parseInt(e.target.getAttribute('data-id'));
            selectClient(clientId);
        });
    });
};

// Mark a client as completed (toggle isPriority)
const selectClient = (clientId) => {
    const client = manager.clients.find(c => c.id === clientId);
    
    if (client) {
        client.isCompleted = !client.isCompleted;
        alert(`${client.firstName}'s service: ${client.service} has been ${client.isCompleted ? 'served' : 'unserved'}`);
        renderClients();
    } else {
        alert("Client not found!");
        console.log("Client ID not found:", clientId);
    }
};

// Remove a client by its ID
const removeClient = (clientId) => {
    manager.selectClient(clientId);
    renderClients();
};