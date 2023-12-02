import mongoose from "mongoose";

interface Option {
  mongoUrl: string,
  dbName: string
}

export class MongoDatabase {

  static async connect(option: Option) {
    const {mongoUrl, dbName} = option;
    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });
      console.log('Mongo connected')
      return true
    } catch (error) {
      console.log('Mongo connection error')
      throw error;
    }
  }

}