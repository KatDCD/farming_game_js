function earn (event, zone) {
  event.preventDefault()
  console.log("fetching from " + zone);
  let min;
  let max;

  if (zone == 'farm') {
    min = 10;
    max = 20;
  } else if (zone == 'cave') {
    min = 5;
    max = 10;
  } else if (zone == 'house') {
    min = 2;
    max = 5;
  } else {
    min = -50;
    max = 50;
  }

  const newGold = generateGold(min, max);
  
  const message = generateMessage(newGold, zone)
  console.log(message);

  updateFarming(newGold, message);
}

function generateGold (min, max) {
  const newGold = Math.floor((Math.random() * (max - min + 1)) + min);
  return newGold;
}

function generateMessage(newGold, zone) {
  if (newGold < 0) {
    return `You have lost ${newGold} gold in the ${zone}`
  } else {
    return `You have earn ${newGold} gold in the ${zone}`
  }
}

function updateFarming(newGold, message) {
  // 1. Nos traemos los datos ya guardados
  let total_gold = localStorage.getItem('total_gold') || '0'
  total_gold = parseInt(total_gold);

  let messages = localStorage.getItem('messages') || '[]'
  messages = JSON.parse(messages)

  console.log(total_gold, messages);
  // 2. Actualizamos estos datos
  total_gold += newGold;
  messages.unshift(message);

  // 3. Volvemos a guardar los datos
  localStorage.setItem('total_gold', total_gold + '')
  localStorage.setItem('messages', JSON.stringify(messages))

  // 4. Dibujamos los cambios
  $('#total_gold').attr('value', total_gold)
  $('#message-list').html('');
  for (let message of messages) {
    $('#message-list').append(`
      <h5 class="text-center">
        ${message}
      </h5>
    `)
  }
}

function initCount () {
  // 1. Nos traemos los datos ya guardados
  let total_gold = localStorage.getItem('total_gold') || '0'
  total_gold = parseInt(total_gold);

  let messages = localStorage.getItem('messages') || '[]'
  messages = JSON.parse(messages)

  // 4. Dibujamos los cambios
  $('#total_gold').attr('value', total_gold)
  $('#message-list').html('');
  for (let message of messages) {
    $('#message-list').append(`
      <h5 class="text-center">
        ${message}
      </h5>
    `)
  }
}
initCount()

function playSound() {
  audio = document.getElementById("myAudio");
  audio.play();
}