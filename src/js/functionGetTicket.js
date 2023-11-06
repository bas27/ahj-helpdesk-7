export default function getTicket(ticket, ticketsContainer) {
  const ticketWrapper = document.createElement('div');
  ticketWrapper.classList.add('ticket-wrapper');
  ticketWrapper.dataset.id = ticket.id;

  const ticketBody = document.createElement('div');
  ticketBody.classList.add('ticket-body');

  const ticketStatus = document.createElement('div');
  ticketStatus.classList.add('ticket-status');
  ticketStatus.dataset.status = ticket.status;

  const ticketStatusCheckbox = document.createElement('span');
  ticketStatusCheckbox.classList.add('ticket-status-checkbox', 'hidden');
  ticketStatusCheckbox.innerHTML = '&#10004;';

  const ticketName = document.createElement('div');
  ticketName.classList.add('ticket-name');
  ticketName.innerHTML = `<p>${ticket.name}</p>`;

  const ticketTimestamp = document.createElement('div');
  ticketTimestamp.classList.add('ticket-timestamp');
  ticketTimestamp.innerHTML = `<span>${ticket.created}</span>`;

  const ticketEditButton = document.createElement('div');
  ticketEditButton.classList.add('ticket-edit-button');
  ticketEditButton.innerHTML = '<span>&#9998;</span>';

  const ticketRemoveButton = document.createElement('div');
  ticketRemoveButton.classList.add('ticket-remove-button');
  ticketRemoveButton.innerHTML = '<span>&#10006;</span>';

  const ticketDescription = document.createElement('div');
  ticketDescription.classList.add('ticket-description', 'hidden');
  ticketDescription.innerHTML = '<p></p>';

  ticketBody.appendChild(ticketStatus);
  ticketStatus.appendChild(ticketStatusCheckbox);
  ticketBody.appendChild(ticketName);
  ticketBody.appendChild(ticketTimestamp);
  ticketBody.appendChild(ticketEditButton);
  ticketBody.appendChild(ticketRemoveButton);

  ticketWrapper.appendChild(ticketBody);
  ticketWrapper.appendChild(ticketDescription);

  ticketsContainer.appendChild(ticketWrapper);
}
