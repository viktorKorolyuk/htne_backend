import { LearnAPI } from "./api";

const { Client, Pool } = require("pg")

export const pool = new Pool({
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432
});

pool.connect()

/**
 * Run a PostgreSQL Query
 * @param query PostgreSQL query
 */
export function runQuery(query:string){
  return pool.query(query)
}

export function addModule(moduleInformation:LearnDatabase.ModulesTable){
  runQuery(`INSERT INTO "public"."Modules" ("module_name", "description", "questions", "metadata", "model_id") VALUES ('${moduleInformation.module_name}', '${moduleInformation.description}', '${JSON.stringify(moduleInformation.questions)}', '${JSON.stringify(moduleInformation.metadata)}', '${moduleInformation.model_id}');`)
}

export namespace LearnDatabase {
  export interface ModulesTable {
    id?: number,
    module_name:string,
    description: string,
    questions: QuestionSet,
    metadata:string[],
    model_id: string
  }

  export interface QuestionSet {
    question:string,
    options:string[]
  }
}