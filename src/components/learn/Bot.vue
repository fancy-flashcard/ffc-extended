<template>
    <div class="toplayer">
        <v-card id="card" v-show="show">
            <v-card-title>
                <v-avatar id="onlineIndicator" color="green" size="12"></v-avatar>
                Chatty
            </v-card-title>
            <ul>
                <li v-for="message in chatHistory" :key="message.id">{{ message.message }}</li>
            </ul>
            <v-card-actions>
                <v-text-field
                    v-model="message" 
                    label="Your message..."
                    solo 
                    clearable
                    class="textfield"
                    append-outer-icon="mdi-send"
                    @click:append-outer="sendMessage"
                    >
                </v-text-field>
            </v-card-actions>
        </v-card>

        <v-btn @click="show = !show" color="orange" bottom right fab>
            <v-icon>{{ show ? 'mdi-close' : 'mdi-chat' }}</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            message: "",
            chatHistory: [{id: 1, message: "Please ask something!"}],
            nextMessageId: 2
        }
    },
    methods: {
        sendMessage() {
            if(this.message == "") {
                console.log("Empty message.")
            } else {
                this.chatHistory.push({id: this.nextMessageId++, message: this.message})
                console.log(this.chatHistory) // check, if id increases even if message is exact the same (= duplicate)
                this.message = ""
                this.answerFromBot()
            }
        },
        answerFromBot() {
            this.chatHistory.push({id: this.nextMessageId++, message: "The answer is 42."})
        }
    }
}
</script>

<style scoped>
.toplayer {
    position: absolute;
    z-index: 1000;
    bottom: 70px;
    right: 50px;
    width: auto;
}

#card {
    margin-bottom: 5px;
}

#onlineIndicator {
    margin-right: 10px;
}

ul {
    list-style-type: none;
}
</style>
