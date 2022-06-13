import {Context} from "aws-lambda";
import {HttpEvent, HttpResponse} from "./types";
import {createAchievement, getAchievements} from "./database";
import {respondJson} from "./utils";

export async function handler(event: HttpEvent<{ itemId: string, gameId?: string }>, context: Context): HttpResponse {
    if (!event.pathParameters.itemId) {
        return respondJson(400, 'Please Provide Item ID')
    }
    context.callbackWaitsForEmptyEventLoop = false;
    switch (event.requestContext.http.method) {
        case 'GET':
            const achievements = await getAchievements(event.pathParameters.itemId, event.pathParameters.gameId);
            return respondJson(200, {achievements});
        case 'POST':
            if (!event.pathParameters.gameId) {
                return respondJson(400, 'Please Provide Game ID')
            }
            if (!event.body) {
                return respondJson(400, 'Please Provide Body')
            }
            let body = event.body;
            // dirty hack, "thanks" to API Gateway that provides body as base64 encoded
            if (Buffer.from(event.body, 'base64').toString('base64') === event.body) {
                body = Buffer.from(event.body, 'base64').toString('utf8');
            }
            await createAchievement(event.pathParameters.itemId, event.pathParameters.gameId, body)
            return respondJson(201, 'Created');
        default:
            return respondJson(405, 'Method Not Allowed')
    }
}
