<template>
    <div class="toplayer">
        <v-card id="card" v-show="show">
            <v-card-title>Chatty</v-card-title>
            <ul>
                <li v-for="message in chatHistory" :key="message">{{ message }}</li>
            </ul>
            <v-card-actions>
                <v-text-field
                    v-model="message" 
                    label="Your message..." 
                    solo 
                    clearable
                    append-icon="mdi-send"
                    @click:append="sendMessage"
                    >
                </v-text-field>
            </v-card-actions>
        </v-card>

        <v-btn @click="show = !show" v-model="fab" color="orange" bottom right fab>
            <v-icon>{{ show ? 'mdi-close' : 'mdi-chat' }}</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            chatHistory: ["Test", "Noch ein Test"]
        }
    },
    methods: {
        sendMessage() {
            if(this.message == "") {
                console.log("Nachricht leer")
            } else {
                this.chatHistory.push(this.message)
                this.message = ""
            }
        },
        closeChat() {
            console.log("Klappt")
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
    margin-bottom: 10px;
}
</style>
