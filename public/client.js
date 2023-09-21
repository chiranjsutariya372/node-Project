const socket=io()
let name;
let textarea=document.querySelector("#textarea")
let messagearea=document.querySelector(".message_area")
do {
    name=prompt("please enter a name:   ")
}while(!name)

textarea.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }

    appendMessage(msg, "outgoing")
    textarea.value=''
    scrollToBottom()
    socket.emit('message',msg)
}

function appendMessage(mag,type){
    let maindiv=document.createElement('div')
    let className=type
    maindiv.classList.add(className,"message")
    
    let markup=`
        <h4>${mag.user}</h4>
        <p>${mag.message}</p>
    `

    maindiv.innerHTML=markup
    messagearea.appendChild(maindiv)
}

socket.on("message",(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}