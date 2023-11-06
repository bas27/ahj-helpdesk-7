/* eslint-disable max-len */
export default function changeTicketStatus(mainContainer, currentTicket, ticketStatus, ticketStatusCheckbox, serverUrl) {
  if (mainContainer.querySelector('.modal')) return;

  // Изменяем видимость чекбокса
  ticketStatusCheckbox.classList.toggle('hidden');

  // Определяем новый статус
  const isHidden = ticketStatusCheckbox.classList.contains('hidden');
  const status = !isHidden;

  // Формируем данные для отправки на сервер
  const formData = new FormData();
  formData.append('id', currentTicket.dataset.id);
  formData.append('status', status);

  // Отправляем запрос на изменение статуса
  const requestChangeTicketStatusUrl = `${serverUrl}/?method=changeTicketStatus`;
  const xhrChangeTicketStatus = new XMLHttpRequest();
  xhrChangeTicketStatus.open('POST', requestChangeTicketStatusUrl);
  document.body.style.cursor = 'wait';

  // Обработка завершения запроса
  xhrChangeTicketStatus.addEventListener('load', () => {
    if (xhrChangeTicketStatus.status >= 200 && xhrChangeTicketStatus.status < 300) {
      try {
        // console.log('ticket status changed');
        setTimeout(() => {
          document.body.style.cursor = '';
        }, 500);
      } catch (e) {
        console.error(e);
      }
    }
  });

  // Отправка данных на сервер
  xhrChangeTicketStatus.send(formData);
}
