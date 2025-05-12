import express from 'express'
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from '@langchain/openai';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const OpenAiClient = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
})


export const chatRouter = express.Router();

chatRouter.get('/', async (req, res) => {
    // hardcoded
    const userQuery:any = req.query.message;

    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: process.env.OPEN_API_KEY,
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: process.env.QDRANT_URL,
        collectionName: "pdf-docs",
    });

    // retriever
    const rt = vectorStore.asRetriever({
        k: 2,
    })

    const result = await rt.invoke(userQuery);

    // userquery with context call to open ai to give answers
    const SYSTEM_PROMPT = `
        You are helpful AI Assistant who answers the user query based on the available context from pdf file.
        Context:
        ${JSON.stringify(result)}
    `;

    const chatResult = await OpenAiClient.chat.completions.create({
        model: 'gpt-4.1',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userQuery }
        ]
    })


    res.json({
        message: chatResult.choices[0].message.content, // message returned from ai model
        docs: result, // refrence 
    });

    return;
})