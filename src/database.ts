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


export namespace LearnDatabase {
  export interface ModulesTable {
    id: number,
    educator_name: string,
    school_name: string,
  }

  export interface QuestionSetTable {
    id:number,
    model_id:number,
    question_set:string
  }

  export interface QuestionSet {
    question:string,
    options:string[]
  }
}