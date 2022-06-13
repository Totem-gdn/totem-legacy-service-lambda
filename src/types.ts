import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from "aws-lambda";

export type HttpEvent<T = null> = Omit<APIGatewayProxyEventV2, 'pathParameters'> & { pathParameters: T }

export type HttpResponse = Promise<APIGatewayProxyResultV2>

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
