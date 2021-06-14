<template>
  <!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->
  <div id="allOfIt" class="allOfIt">
    <button id="open-button" class="open-button" @click="openClose()">Chat</button>
    <!-- <div v-if="formIsOpen" class="form-container" id="myForm"> -->
    <div v-if="formIsOpen" class="form-container" id="myForm">
      <span id="myClose" class="close" onclick="closeForm()"> &times; </span>

    <div v-for="message in messages" :key="message">
      {{message}}
    </div>

      <!-- <div id="messages" class="messages-area">
        <div class="profile-area">
          <img class="profile-image" src=""
                     alt="Card image">
          <p></p>
          <h3 style="text-align: center">Lucky Luke<span class="dot"></span></h3>
          <br />
        </div>
      </div> -->

      <div class="row">
        <div class="column1">
          <textarea placeholder="Your Message... :)" id="input" name="msg"></textarea>
        </div>
        <div class="column2">
          <button @click="sendMessage()" class="send-button">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from "vue";
// import { defineComponent } from "vue";
import Component from "vue-class-component";

@Component
export default class Chatbot extends Vue {
  formIsOpen = false
  currentMessage ='michael'
  // messages: string[] = []
  messages: string[] = ['hi', 'lucky']
  pause = false
  welcomeSent = false

    openClose() {
            console.log('hello hello')
            this.formIsOpen = !this.formIsOpen
            // this.closeForm()
    }

    sendMessage(messageFromUser: string) {
      alert('ok')
      this.messages.push(messageFromUser)

    }

    // startListening() {
    //     let theInputElement = document.getElementById('input')
    //     theInputElement?.addEventListener("keyup", function (event) {
    //         if (event.keyCode === 13) {
    //             event.preventDefault();
    //             addMessageFromUser()
    //         }
    //     })
    // }

    // startListening()

    getLinkHTML(text: string, url: string) {
        return `<a href="${url}">${text}</a>`
    }

    // async addMessageFromUser() {
    //     const usersMessage = document.getElementById('input')?value
    //     if (usersMessage === '') {
    //         alert('Why would you send an empty message?')
    //     } else {
    //         let messagesDiv = document.getElementById('messages')
    //         messagesDiv.innerHTML = messagesDiv.innerHTML +
    //             `
    //                     <b>Du:</b><br>
    //                     ${usersMessage}
    //                     <p><br></p>
    //     `
    //         setTimeout(() => {
    //             var objDiv = document.getElementById("messages");
    //             objDiv.scrollTop = objDiv.scrollHeight;
    //         }, 100)

    //         document.getElementById('input').value = ''

    //         const clearedUserMessage = replaceAllConfusingCharactersInUserInput(usersMessage)
    //         console.log(clearedUserMessage)
    //         // const nlpURL = `http://localhost:3010/process/input/${clearedUserMessage}/languageCode/en`
    //         const nlpURL = `http://localhost:3010/process/input/${clearedUserMessage}/languageCode/en`

    //         console.log(nlpURL)

    //         // response = await fetch(encodeURI(nlpURL));

    //         const response = await fetch(encodeURI(nlpURL))

    //         const responseJSON = await (response.json())

    //         if (response.ok) {
    //             const pauseBeforeShowWriting = Math.round(Math.random() * (1000 - 900) + 900)
    //             setTimeout(() => {
    //                 showAssistantIsTyping()
    //             }, pauseBeforeShowWriting)

    //             const result = await getResponseText(responseJSON.nlpResult)
    //             const psiFactor = (1 + result.length / 100)
    //             const waitingTime = psiFactor * Math.round(Math.random() * (2000 - 1600) + 1600)
    //             console.log(`waitingTime: ${waitingTime}`)
    //             setTimeout(() => {
    //                 showResponseToTheUser(result)
    //             }, waitingTime)
    //         } else {
    //             alert("HTTP-Error: " + response.status);
    //         }
    //     }
    // }
    // showWelcomeMessage() {
    //     let messagesDiv = document.getElementById('messages')

    //     messagesDiv.innerHTML = messagesDiv.innerHTML.replace(`Lucky Luke is writing......<p><br></p>`, '')

    //     messagesDiv.innerHTML = messagesDiv.innerHTML +
    //         `<div>
    //             <b>Lucky Luke:</b>
    //             <br>
    //         </div>
    //         Hi :)
    //         <p><br></p>`
    //     setTimeout(() => {
    //         var objDiv = document.getElementById("messages");
    //         objDiv.scrollTop = objDiv.scrollHeight;
    //     }, 100)

    // }

    // showAssistantIsTyping() {
    //     let messagesDiv = document.getElementById('messages')
    //     messagesDiv.innerHTML = messagesDiv.innerHTML +
    //         `Lucky Luke is writing......<p><br></p>`
    //     setTimeout(() => {
    //         var objDiv = document.getElementById("messages");
    //         objDiv.scrollTop = objDiv.scrollHeight;
    //     }, 100)

    // }

    // replaceAllConfusingCharactersInUserInput(input) {
    //     let cleared = input
    //     while (cleared.indexOf('?') !== -1 || cleared.indexOf('/') !== -1) {
    //         cleared = cleared
    //             .replace('?', '')
    //             .replace('/', '')
    //     }

    //     return cleared
    // }

    // async getResponseText(response:any) {

    //     let json = response;
    //     let text
    //     let link
    //     if (json.answer === undefined) {
    //         alert('wtf')
    //     } else {
    //         text = json.answer.split(`https://`)[0]
    //         link = json.answer.split(`https://`)[1]
    //     }
    //     const formattedAnswer = text;
    //     let result = (link === undefined) ? text : getLinkHTML(text, link)
    //     return result
    // }

    // async showResponseToTheUser(result:any) {
    //     let messagesDiv = document.getElementById('messages')

    //     messagesDiv.innerHTML = messagesDiv.innerHTML.replace(`Lucky Luke is writing......<p><br></p>`, '') +
    //         `
    //                     <b>Lucky Luke:</b><br>
    //                     ${result}
    //                     <p><br></p>
    //     `

    //     setTimeout(() => {
    //         var objDiv = document.getElementById("messages");
    //         objDiv.scrollTop = objDiv.scrollHeight;
    //     }, 100)
    // }


    openForm() {
        console.log('opening chat window')


        // const theForm = document.getElementById("myForm");
        // theForm.style.zIndex = 1000000
        // theForm.style.display = "block"
        // const theClose = document.getElementById("myClose");
        // theClose.style.zIndex = 1000001
        // formIsOpen = true

        // if (!welcomeSent) {
        //     const pauseBeforeShowWriting = Math.round(Math.random() * (1000 - 900) + 900)
        //     setTimeout(() => {
        //         showAssistantIsTyping()
        //     }, pauseBeforeShowWriting)

        //     setTimeout(() => {
        //         showWelcomeMessage()
        //     }, pauseBeforeShowWriting + 1000)

        //     welcomeSent = true
        // }

    }

    closeForm() {
        // const theForm = document.getElementById("myForm");
        // theForm.style.zIndex = -1000000
        // theForm.style.display = "none";
        // const theClose = document.getElementById("myClose");
        // theClose.style.zIndex = -1000000
        // formIsOpen = false
    }

    // shallChatWindowBeDisplayed() {
    //     if (document.URL.indexOf('cart') === -1) {
    //         console.log("chat button will be displayed")
    //     } else {
    //         console.log("chat button will not displayed")
    //         const allOfIt = document.getElementById("allOfIt");
    //         allOfIt.style.display = "none";
    //         allOfIt.style.zIndex = -100000000000
    //     }
    // }
    // shallChatWindowBeDisplayed()
};



</script>

<style lang="scss" scoped>
.profile-image {
  width: 100%;
  border-radius: 50%;
}

.profile-area {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}

.open-button {
  z-index: 100;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 13px;
  padding-right: 13px;
  font-size: 20px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  opacity: 1;
  // position: fixed;
  // bottom: 110px;
  // right: 150px;
  background-color: #222222;
  color: #facc02;
}

.form-container {
  // z-index: -1000000;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 4px;
  margin-bottom: 10vh;
  border: solid black;
  background-color: white;
  // display: none;
  right: 4px;
  position: fixed;
  bottom: 70px;
  right: 4px;
  width: 320px;
}

.form-container textarea {
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 37px;
  padding-top: 12px;
  padding-left: 4px;
}

textarea:focus,
input:focus {
  outline: none;
}

.messages-area {
  height: 20vh;
  position: relative;
  margin: 0;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  padding-right: 1em;
  padding-top: 1vh;
  height: 380px;
  overflow-y: scroll;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

// .messages-area::-webkit-scrollbar {
//   display: none;
// }

.close {
  cursor: pointer;
  position: absolute;
  margin-right: 12px;
  margin-top: 16px;
  font-size: 34px;
  right: 10px;
}

.send-button {
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  opacity: 1;
  background-color: #222222;
  color: #facc02;
}

.column1 {
  float: left;
  width: 82%;
}

.column2 {
  float: left;
  width: 18%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.allOfIt {
  bottom: 0;
  right: 0;
}

.dot {
  height: 10px;
  margin-bottom: 0px;
  margin-left: 6px;
  width: 10px;
  background-color: rgb(2, 165, 2);
  border-radius: 50%;
  display: inline-block;
}
</style>
