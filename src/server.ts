import "dotenv/config";

import app from "./App";

import { Database } from "./database";
const db = new Database();
console.log(db.readData("rules"));

db.saveData("rules", { id: 2, start: "14:00" });

console.log(db.readData("rules"));

app.listen(3333);
