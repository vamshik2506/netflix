import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";
import { config } from "dotenv";
import type { User, Movie } from "../types.js";

config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DDB_ENDPOINT || undefined
});
export const ddb = DynamoDBDocumentClient.from(client);

export const USERS_TABLE = "netflix_users";
export const MOVIES_TABLE = "netflix_movies";

// Users
export async function getUserByEmail(email: string): Promise<User | null> {
  const res = await ddb.send(new QueryCommand({
    TableName: USERS_TABLE,
    IndexName: "email-index",
    KeyConditionExpression: "email = :e",
    ExpressionAttributeValues: { ":e": email }
  }));
  return (res.Items?.[0] as User) ?? null;
}

export async function createUser(u: Omit<User, "id"|"createdAt">): Promise<User> {
  const item: User = { id: randomUUID(), createdAt: new Date().toISOString(), ...u };
  await ddb.send(new PutCommand({ TableName: USERS_TABLE, Item: item, ConditionExpression: "attribute_not_exists(id)" }));
  return item;
}

// Movies
export async function createMovie(m: Omit<Movie, "id"|"createdAt">): Promise<Movie> {
  const item: Movie = { id: randomUUID(), createdAt: new Date().toISOString(), ...m };
  await ddb.send(new PutCommand({ TableName: MOVIES_TABLE, Item: item, ConditionExpression: "attribute_not_exists(id)" }));
  return item;
}

export async function listMovies(category?: string): Promise<Movie[]> {
  // Simple scan; for scale, add a GSI on category.
  const params: any = { TableName: MOVIES_TABLE };
  if (category) {
    params.FilterExpression = "#c = :cat";
    params.ExpressionAttributeNames = { "#c": "category" };
    params.ExpressionAttributeValues = { ":cat": category };
  }
  const res = await ddb.send(new ScanCommand(params));
  return (res.Items as Movie[]) ?? [];
}

export async function getMovieById(id: string): Promise<Movie | null> {
  const res = await ddb.send(new GetCommand({ TableName: MOVIES_TABLE, Key: { id } }));
  return (res.Item as Movie) ?? null;
}

export async function searchMovies(q: string, category?: string): Promise<Movie[]> {
  // naive scan+filter; for scale use a proper index
  const res = await ddb.send(new ScanCommand({
    TableName: MOVIES_TABLE,
    FilterExpression: category ? "contains(#t,:q) AND #c = :cat" : "contains(#t,:q)",
    ExpressionAttributeNames: { "#t": "title", "#c": "category" },
    ExpressionAttributeValues: category ? { ":q": q, ":cat": category } : { ":q": q }
  }));
  return (res.Items as Movie[]) ?? [];
}
