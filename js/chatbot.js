class ChatHistory{
    constructor(){
        this.messages = [];
    }
    addMessage(message, sender, date){
        this.messages.push({message, sender, date});
    }
    get messagesHistory(){
        return this.messages;
    }

}

var msgHistory = new ChatHistory();

function fetchJSON(url){
    fetch(url)
        .then(response =>{
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0 && data.constructor === Object){
                throw new Error('Empty JSON or malformed JSON');
            }
            console.log(data);
            sendMessage(data.intents);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })
}

function sendMessage(intents){
    let inputElement = document.querySelector('#chat-command input[type="text"]');
    let userInput = inputElement.value;
    console.log(userInput);
    let date = new Date();
    showMessage(userInput, "user", date);
    let response = processMessage(intents, userInput);
    showMessage(response, "bot", date);
    inputElement.value = '';
}

function showMessage(message, type, date){
    let chatBox = document.getElementById("chat-box");
    let messageText = document.createElement("p");
    let msgContainer = document.createElement("div");
    msgContainer.classList.add("msg-container");
    let dateElement = document.createElement("p");
    dateElement.classList.add("date");
    dateElement.textContent = `${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
    messageText.classList.add("message");
    if (type === "user"){
        messageText.classList.add("user-message");
        dateElement.style.justifySelf = "end";
        msgContainer.style.marginRight = "5px";
    }else{
        messageText.classList.add("bot-message");
        dateElement.style.justifySelf = "start";
        msgContainer.style.marginLeft = "5px";
    }
    messageText.textContent = message;
    msgContainer.appendChild(messageText);
    msgContainer.appendChild(dateElement);
    chatBox.appendChild(msgContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
    //save for the history
    msgHistory.addMessage(message, type, date);
}

function processMessage(intents, message){
    let response = "Je suis désolé, je ne suis pas sûr d'avoir compris.";
    intents.forEach(intent => {
        intent.patterns.forEach(pattern => {
            if(message.toLowerCase().includes(pattern.toLowerCase())) {
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        });
    });
    return response;
}

function saveMessages(){
    console.log("Saving chat history");
    console.log(msgHistory.messagesHistory);
    sessionStorage.setItem('chatHistory',
        JSON.stringify(msgHistory.messagesHistory.map(msg => ({
            message: msg.message,
            sender: msg.sender,
            date: msg.date,})
        )));
}

function loadMessages(){
    console.log("Loading chat history");
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory && Array.isArray(chatHistory)){
        chatHistory.forEach(msg => {
            showMessage(msg.message, msg.sender, new Date(msg.date));
        })
    }
    let chatBox = document.getElementById("chat-box");
    let separation = document.createElement("p");
    separation.id = "history-separation";
    separation.textContent = "⬆ Messages de notre dernière discussion.️ ⬆"
    chatBox.appendChild(separation);
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.addEventListener("unload", saveMessages);
window.addEventListener("load", loadMessages);
let textInputChat = document.getElementById("chatInput");
textInputChat.focus();
textInputChat.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        fetchJSON('../json/intents.json');
    }

})