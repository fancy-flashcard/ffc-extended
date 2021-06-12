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
import { TrainingDataParser } from "./../../helpers/training-data-parser";

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
    console.log(JSON.stringify(fileContent));

    const trainingDataParser = new TrainingDataParser();

    const qaPairs = trainingDataParser.getQAPairsFromFFC(fileContent);

    const documents = trainingDataParser.getDocuments(qaPairs);
    const answers = trainingDataParser.getAnswers(qaPairs);

    
    (async () => {
      const container = await containerBootstrap();
      container.use(Nlp);
      container.use(LangEn);
      const nlp = container.get("nlp");
      nlp.settings.autoSave = false;
      nlp.addLanguage("de");
      // nlp.addLanguage("en");

      for (const document of documents) {
        nlp.addDocument(document.lang, document.utterance, document.intent);
      }

      for (const answer of answers) {
        nlp.addAnswer(answer.lang, answer.intent, answer.output);
      }

      await nlp.train();

      const response = await nlp.process("de", "Was ist unter der Wirtschaftsinformatik zu verstehen?");
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
