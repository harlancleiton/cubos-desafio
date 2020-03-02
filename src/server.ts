import "dotenv/config";

import app from "./App";

import { Role } from "./models/Role";

// const role = Role.create<Role>({ id: "1" });
// console.log(role);
// console.log(Role.deleteById("3"));
console.log(Role.findAll());
// console.log(Role.findById("2"));

app.listen(3333);
