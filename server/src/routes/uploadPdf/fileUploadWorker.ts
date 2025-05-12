import { Worker } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from 'dotenv';
dotenv.config();

const worker = new Worker(
    'file-upload-queue',
    async (job) => {
        console.log('jobs:', job.data);
        const data = JSON.parse(job.data);
        /*
        path: data.path
        read the pdf from path
        chunk the pdf
        call the the embeding modle for every chunk
        store the chunk in vector db
        */

        // load the pdf
        const loader = new PDFLoader(data.path);
        const docs = await loader.load();

        // chunking
        const textSplitter = new CharacterTextSplitter({
            chunkSize: 400,
            chunkOverlap: 0,
        });

        const docsChunks = await textSplitter.splitDocuments(docs);
        // console.log(docsChunks);

        //storing embeding into qdrant vector db
        try {
            const embeddings = new OpenAIEmbeddings({
                model: "text-embedding-3-small",
                apiKey: process.env.OPEN_API_KEY,
            });

            const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
                url: process.env.QDRANT_URL,
                collectionName: "pdf-docs",
            });

            await vectorStore.addDocuments(docsChunks);
            console.log("all docs chunks are added to vector store")
        } catch (err) {
            console.log(err);
        }

    },

    {
        concurrency: 100,
        connection: {
            host: 'localhost',
            port: 6379
        }
    }
);