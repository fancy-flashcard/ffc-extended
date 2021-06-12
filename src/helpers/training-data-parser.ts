

export interface QA {
    q: string,
    a: string
}

export interface Document {
    lang: string,
    utterance: string,
    intent: string
}

export interface Answer {
    lang: string,
    intent: string,
    output: string
}

export class TrainingDataParser {

    public getQAPairsFromFFC(trainingData: any): QA[] {

        const qaPairs: QA[] = []

        for (const d of Object.keys(trainingData.decks)) {
            console.log(Object.keys(trainingData.decks))

            for (const e of Object.keys(Object.keys(trainingData.decks[d].cards))) {
                const qa: QA = {
                    q: trainingData.decks.d1.cards[e].q,
                    a: trainingData.decks.d1.cards[e].a,
                }

                qaPairs.push(qa)
            }
        }

        return qaPairs

    }

    public getDocuments(qaPairs: QA[]): Document[] {
        const documents: Document[] = []

        for (const qaPair of qaPairs) {

            const document: Document = {
                lang: 'de',
                utterance: qaPair.q,
                intent: qaPair.q,
            }
            
            documents.push(document)
        }


        return documents
    }

    public getAnswers(qaPairs: QA[]): Answer[] {
        const answers: Answer[] = []

        for (const qaPair of qaPairs) {

            const answer: Answer = {
                lang: 'de',
                intent: qaPair.q,
                output: qaPair.a
            }
            
            answers.push(answer)
        }


        return answers
    }


}


