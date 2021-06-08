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

const { containerBootstrap } = require("@nlpjs/core");
const { Nlp } = require("@nlpjs/nlp");
const { LangEn } = require("@nlpjs/lang-en-min");

// const { NlpManager } = require('node-nlp');

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

  async trainChatbot(fileContent: any) {

    alert("hi");

    (async () => {
      const container = await containerBootstrap();
      container.use(Nlp);
      container.use(LangEn);
      const nlp = container.get("nlp");
      nlp.settings.autoSave = false;
      nlp.addLanguage("en");
      // Adds the utterances and intents for the NLP
      nlp.addDocument("en", "goodbye for now", "greetings.bye");
      nlp.addDocument("en", "bye bye take care", "greetings.bye");
      nlp.addDocument("en", "okay see you later", "greetings.bye");
      nlp.addDocument("en", "bye for now", "greetings.bye");
      nlp.addDocument("en", "i must go", "greetings.bye");
      nlp.addDocument("en", "hello", "greetings.hello");
      nlp.addDocument("en", "hi", "greetings.hello");
      nlp.addDocument("en", "howdy", "greetings.hello");

      // Train also the NLG
      nlp.addAnswer("en", "greetings.bye", "Till next time");
      nlp.addAnswer("en", "greetings.bye", "see you soon!");
      nlp.addAnswer("en", "greetings.hello", "Hey there!");
      nlp.addAnswer("en", "greetings.hello", "Greetings!");
      await nlp.train();
      const response = await nlp.process("en", "I should go now");
      console.log(response);
    })();
  }

  async loadFileFromURL() {
    try {
      const response = await fetch(this.chosenURL);
      const fileContent = await response.json();

      await this.trainChatbot(fileContent);
      
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
