const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
let chosenModel;

function appendMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = content;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}


let buttonContent = 'Below are the list of model that suits your requirement <br />';
buttonContent += 'All models performs equally good<br />';
buttonContent += 'Choose a model that you prefer <br /><br />';


function appendButton(list, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('btn', sender);
    messageDiv.innerHTML = buttonContent;
    list.forEach(element => {
        const button = document.createElement('button');
        button.textContent = element;
        button.addEventListener('click', handleButtonClick);
        messageDiv.appendChild(button);
    });
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}
appendMessage('I can suggest you best suited models for your AI application, Provide your detailed requirement', 'bot')

function toggleInput(disabled) {
    chatInput.disabled = disabled;
    sendBtn.disabled = disabled;
}

sendBtn.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if(validateEmail(userMessage) && chosenModel){
        sendRequestToCreateServer(userMessage);
    } else if (userMessage) {
        sendUserRequirement(userMessage);
    }
});

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendBtn.click();
    }
});

function handleButtonClick(event) {
    const parentDiv = event.target.parentElement;
    const allButtons = parentDiv.querySelectorAll('button');

    allButtons.forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = '#008CBA'; 
        button.style.color = 'white'; 
    });

    const clickedButton = event.target;
    clickedButton.style.backgroundColor = '#4CAF50'; 
    clickedButton.style.color = 'white'; 

    const selectedModel = clickedButton.textContent;
    chosenModel = selectedModel;
    appendMessage( `A server will be created with ${selectedModel} and an email will be sent to you with the details of the server` , 'bot');
    appendMessage('Provide your email address', 'bot');

}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const sendRequestToCreateServer = (email) =>{
    appendMessage(email, 'user');
    chatInput.value = '';
    toggleInput(true);
    fetch('/build-server', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email: email, model: chosenModel })
    }).then(() => {
        appendMessage('Preparing server and will be notified once done', 'bot');
    }).catch((error) => {
        console.log(error);
        appendMessage('Error from server, Provide the requirement once again', 'bot');
        toggleInput(false);
    });
}

const sendUserRequirement = (requirement) =>{
    appendMessage(requirement, 'user');
    chatInput.value = '';
    toggleInput(true);
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: requirement })
    })
        .then(response => response.json()) 
        .then(data => {
            if(data.models){
                appendButton(data.models, 'bot');
            }else if (data.message) {
                appendMessage(data.message.trim(), 'bot'); 
            } else {
                appendMessage('No response from server.', 'bot');
            }
        })
        .catch((error) => {
            console.log(error);
            appendMessage('Error connecting to the server.', 'bot');
        })
        .finally(() => {
            toggleInput(false);
        });
};