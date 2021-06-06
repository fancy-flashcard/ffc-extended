<template>
  <v-col cols="12" sm="12" md="6" lg="4" xl="4">
    <v-card height="100%" raised>
      <v-card-title>Import Deck From URL</v-card-title>
      <v-card-text>
        <v-text-field
          class="deck-input"
          label="Provide a File URL (Raw JSON)"
          outlined
          clearable
          :rules="urlRules"
          v-model="chosenURL"
        >
          <v-icon slot="prepend">mdi-web</v-icon>
        </v-text-field>
      </v-card-text>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="indigo" right @click="loadFileFromURL">Import File</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import NlpManager from "node-nlp";
const { NlpManager } = require('node-nlp');

import { Event } from "../../types";

@Component
export default class ImportDeckFromURL extends Vue {
  chosenURL = "";
  fileContent = "";
  urlRules = [
    (value: string) =>
      new RegExp("^https://.*/.*.json$").exec(value) !== null ||
      "Please provide a correct URL",
  ];
  async loadFileFromURL() {
    alert("hi");

    const manager = new NlpManager({ languages: ["en"], forceNER: true });
    // Adds the utterances and intents for the NLP
    manager.addDocument("en", "goodbye for now", "greetings.bye");
    manager.addDocument("en", "bye bye take care", "greetings.bye");
    manager.addDocument("en", "okay see you later", "greetings.bye");
    manager.addDocument("en", "bye for now", "greetings.bye");
    manager.addDocument("en", "i must go", "greetings.bye");
    manager.addDocument("en", "hello", "greetings.hello");
    manager.addDocument("en", "hi", "greetings.hello");
    manager.addDocument("en", "howdy", "greetings.hello");

    // Train also the NLG
    manager.addAnswer("en", "greetings.bye", "Till next time");
    manager.addAnswer("en", "greetings.bye", "see you soon!");
    manager.addAnswer("en", "greetings.hello", "Hey there!");
    manager.addAnswer("en", "greetings.hello", "Greetings!");

    // Train and save the model.
    (async () => {
      await manager.train();
      manager.save();
      const response = await manager.process("en", "I should go now");
      console.log(response);
      alert(response)
    })();

    try {
      const response = await fetch(this.chosenURL);
      const fileContent = await response.json();
      this.$eventHub.$emit(Event.ADD_DECKS_FROM_JSON, fileContent, this.chosenURL);
    } catch (error) {
      // console.log(error);
      // TODO: cors?!
      this.$eventHub.$emit(
        Event.SNACKBAR_EVENT,
        "An error occurred while loading the file"
      );
    }
  }
}
</script>

<style scoped>
#file-input-wrapper {
  padding-bottom: 0;
}
.button-padding {
  padding: 16px;
}
</style>
