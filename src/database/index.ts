import MongoAdapter from '@bot-whatsapp/database/mongo';

const MONGO_DB_URI =
    process.env.MONGO_DB_URI ||
    "";
const MONGO_DB_NAME = "dont-forget-love";


export default new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
})