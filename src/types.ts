import {APIGatewayEvent, ProxyResult} from "aws-lambda";

export type HttpEvent<T = null> = Omit<APIGatewayEvent, 'pathParameters'> & { pathParameters: T }

export type HttpResponse = Promise<ProxyResult>

export type Record = {
    itemId: string;
    gameId: string;
    timestamp: number;
    data: string;
}

export type Filter = {
    itemId: string,
    gameId?: string
}
