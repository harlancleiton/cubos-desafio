import * as pluralize from "pluralize";
import { IBaseModel } from "../types/IBaseModel";
import database from "../database";

export abstract class BaseModel implements IBaseModel {
  id: string;

  public static get resource(): string {
    return pluralize(this.name.toLowerCase());
  }

  public static create<T extends BaseModel>(data: Partial<T>): T {
    if (!data.id) data.id = "1";

    const db = database.saveData(this.resource, data);
    const listData = db[this.resource];

    const model = listData.find(t => t.id === data.id);
    return model;
  }

  public static findAll<T extends BaseModel>(): T[] {
    return database.readData(this.resource);
  }

  public static findById<T extends BaseModel>(id: string): T | null {
    const listData = this.findAll<T>();

    const model = listData.find(t => t.id === id);
    return model;
  }

  public static deleteById<T extends BaseModel>(id: string): T | null {
    const sId = String(id);

    const listData = this.findAll<T>();

    const model = listData.find(t => String(t.id) === sId);

    if (model) {
      const newData = listData.filter(t => t.id !== id);

      database.saveData(this.resource, newData, true);

      return model;
    } else {
      return null;
    }
  }
}
