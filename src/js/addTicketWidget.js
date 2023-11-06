function addTicketCancelButtonHandler(mainContainer) {
  if (!mainContainer) return;

  const widgetAddTicket = mainContainer.querySelector('[data-widget=addTicket]');
  const addTicketForm = widgetAddTicket.querySelector('[data-id=addTicket-form]');
  const addTicketCancelButton = widgetAddTicket.querySelector('[data-id=cancel]');

  addTicketCancelButton.addEventListener('click', () => {
    addTicketForm.reset();
    widgetAddTicket.remove();
  });
}

function bindTicketEvents(ticketElement, ticket) {
  const ticketEdit = ticketElement.querySelector('.ticket-edit-button');
  const ticketRemove = ticketElement.querySelector('.ticket-remove-button');

  ticketEdit.addEventListener('click', () => {
    console.log('Edit ticket:', ticket);
  });

  ticketRemove.addEventListener('click', () => {
    console.log('Remove ticket:', ticket);
  });
}

function createTicketElement(ticket) {
  const ticketElement = document.createElement('div');
  ticketElement.classList.add('ticket-wrapper');
  ticketElement.dataset.id = ticket.id; // Установим значение data-id

  ticketElement.innerHTML = `
    <div class="ticket-body">
      <div class="ticket-status" data-status="${ticket.status}">
        <span class="ticket-status-checkbox ${ticket.status ? '' : 'hidden'}">✔</span>
      </div>
      <div class="ticket-name"><p>${ticket.name}</p></div>
      <div class="ticket-timestamp"><span>${ticket.created}</span></div>
      <div class="ticket-edit-button"><span>✎</span></div>
      <div class="ticket-remove-button"><span>✖</span></div>
    </div>
    <div class="ticket-description hidden"><p>${ticket.description}</p></div>
  `;

  return ticketElement;
}

function updateTicketList(newTicketData) {
  const ticketsContainer = document.querySelector('.tickets-container');
  const newTicketElement = createTicketElement(newTicketData);
  ticketsContainer.appendChild(newTicketElement);
  bindTicketEvents(newTicketElement, newTicketData);
  document.location.reload();
}

async function addTicketSubmitHandler(mainContainer, serverUrl) {
  if (!mainContainer) return;
  const widgetAddTicket = mainContainer.querySelector('[data-widget=addTicket]');
  const addTicketForm = widgetAddTicket.querySelector('[data-id=addTicket-form]');

  addTicketForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputName = addTicketForm.name.value.trim();
    const inputDescription = addTicketForm.description.value.trim();
    if (inputName === '') return;

    const formData = new FormData();
    formData.append('name', inputName);
    formData.append('description', inputDescription);
    formData.append('status', false);
    formData.append('created', new Date().toLocaleString());

    const requestCreateTicketUrl = `${serverUrl}/?method=createTicket`;

    try {
      const response = await fetch(requestCreateTicketUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // После успешного создания тикета, мы можем получить данные о новом тикете
        const newTicketData = await response.json();

        // Обновляем список тикетов на странице, передавая только данные о новом тикете
        updateTicketList(newTicketData);

        // Закрываем модальное окно
        widgetAddTicket.remove();
      } else {
        console.error('Error creating ticket:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
}

export default function getAddTicketWidget(mainContainer, serverUrl) {
  if (mainContainer.querySelector('.modal')) return;

  const widgetAddTicketHtml = `
    <div data-widget="addTicket" class="modal widget-add">
      <h2>Добавить тикет</h2>
      <form data-id="addTicket-form" class="widget-form">
        <label>
          Краткое описание
          <textarea rows=1 data-id="name" name="name" required class="widget-input"></textarea>
        </label>
        <label>
          Подробное описание
          <textarea rows=3 data-id="description" name="description" class="widget-input"></textarea>
        </label>
        <div class="widget-form-controls">
          <button data-id="cancel" class="widget-button">Отмена</button>
          <button type="submit" data-id="ok" class="widget-button">Ок</button>
        </div>
      </form>
    </div>
  `;

  mainContainer.insertAdjacentHTML('beforeEnd', widgetAddTicketHtml);

  addTicketCancelButtonHandler(mainContainer);
  addTicketSubmitHandler(mainContainer, serverUrl);
}
