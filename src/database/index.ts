import { resolve } from "path";
import * as fs from "fs";

import config from "../config/database";

class Database {
  private db;

  constructor() {
    try {
      const rawDb = fs.readFileSync(this.dbJsonPath);

      this.db = JSON.parse(rawDb.toString());
    } catch {
      fs.writeFileSync(this.dbJsonPath, JSON.stringify({}));

      this.db = {};
    }
  }

  readData(resource: string): any[] | undefined {
    const data = this.db[resource];

    return data;
  }

  saveData(resource: string, data: any, override?: boolean) {
    let newData: any[];

    if (override) {
      if (Array.isArray(data)) {
        newData = data;
      } else {
        newData = [data];
      }
    } else {
      const resourceData = this.readData(resource);

      if (resourceData) {
        newData = [...resourceData, data];
      } else {
        newData = [data];
      }
    }

    const db = this.db;

    db[resource] = newData;

    this.updateDatabase(db);

    return db;
  }

  private updateDatabase(newDb) {
    fs.writeFileSync(this.dbJsonPath, JSON.stringify(newDb));

    this.db = newDb;
  }

  get dbJsonPath(): string {
    return resolve(__dirname, config.database);
  }
}

export default new Database();
