<template>
<div>
    <viewer :initialValue="text" style="background-color: white"></viewer>


<div style="float:right; padding-top:20%">
    <chatbot v-if="textType==='answer'"/>
</div>

</div>

</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Chatbot from './Chatbot.vue'
import {Viewer} from '@toast-ui/vue-editor';

export default {
    props: [
        "text",
        "textType"
    ],
    // Test if Component is loaded
    created() {
        console.log(`This Component gets loaded with textType: ${this.textType}.`)
    },
    data() {
        return {
            // editorOptions: {
            //     minHeight: '200px'
            // }
        }
    },
    components: {
        chatbot: Chatbot,
        viewer: Viewer,
    }
}

</script>