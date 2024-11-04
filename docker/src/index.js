import express from "express";
import mongoose from "mongoose";
import redis from "redis";
import pg from "pg";
import os from "os";
const app = express();
const PORT = 3000;
// connect to redis
const REDIS_PORT = 6379;
const redisClient = redis.createClient({
  url: "redis://redis:6379",
});
redisClient.on("error", (err) => {
  console.log("Error " + err);
});
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.connect();
// conncet to mongodb
// const DB_USER = "root";
// const DB_PASSWORD = "example";
// const DB_PORT = 27017;
// const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@mongo_db:${DB_PORT}`;
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });

// connect to postgres
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 5432;
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@postgres:${DB_PORT}`;
const client = new pg.Client({
  connectionString,
});

client
  .connect()
  .then(() => {
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.get("/", (req, res) => {
<<<<<<< HEAD
  redisClient.set("key", "prouct");

  res.send(
    `Hello jafar from AWS EC2 using Docker-hub and iam from ${os.hostname()}`
  );
});
// api test redis
app.get("/get", async (req, res) => {
  let reslut = await redisClient.get("key");
=======
  client.set("key", "prouct");
  res.send("Hello jafar from AWS EC2 using Docker-hub");
});
// api test redis
app.get("/get", async (req, res) => {
  let reslut = await client.get("key");
>>>>>>> a687b5db8432113fdef9a725491c7a0b4373166b
  res.send(reslut);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
