import {Db, MongoClient} from "mongodb";
import {Filter, Record} from "./types";

let cachedDb: Db;

const uri = process.env.MONGODB_URI!;
const database = process.env.MONGODB_DATABASE!;
const COLLECTION_ACHIEVEMENTS = 'achievements';

async function connectToDatabase(): Promise<Db> {
    if (cachedDb) {
        return cachedDb;
    }
    const client = await MongoClient.connect(uri);
    const db = client.db(database);
    cachedDb = db;
    return db;
}

export async function getAchievements(itemId: string, gameId?: string) {
    const filter: Filter = {itemId};
    if (!!gameId) {
        filter.gameId = gameId;
    }
    const db = await connectToDatabase();
    return db.collection<Record>(COLLECTION_ACHIEVEMENTS).find(filter).toArray();
}

export async function createAchievement(itemId: string, gameId: string, body: string) {
    const b64data = Buffer.from(body, 'utf8').toString('base64')
    const achievementRecord: Record = {
        itemId,
        gameId,
        timestamp: Date.now(),
        data: b64data
    }
    const db = await connectToDatabase();
    await db.collection<Record>(COLLECTION_ACHIEVEMENTS).insertOne(achievementRecord);
}
