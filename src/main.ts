import { LearnDatabase } from "./database"
import { LearnAPI } from "./api"

require("dotenv").config()

const express = require("express")
const cors = require("cors")
const axios = require("axios")
const bodyparser = require("body-parser")
const { formParsePromise } = require("./utilities")
const { pool, runQuery, addModule } = require("./database")

const chalk = require("chalk")

const BASE_URL = "https://console.echoAR.xyz"

const app = express()
app.use(cors())

app.get("/", (req: any, res: any) => {
  res.json({
    API_ROUTES: [
      "HTTP POST /upload",
      "HTTP GET /getobject",
      "HTTP GET /allentries",
      "HTTP GET /module/:id"
    ]
  })
})

app.post("/upload", async (req: any, res: any) => {
  console.log("[REQUEST RECEIVED FOR UPLOADING DATA]")

  var formData = await formParsePromise(req) as any;

  let request: LearnAPI.UPLOAD_REQUEST = {
    module_name: formData["fields"]["module_name"],
    model_file: formData["files"]["file"],
    description: formData["fields"]["description"],
    questions: { question: formData["fields"]["question"], options: [formData["fields"]["response1"], formData["fields"]["response2"], formData["fields"]["response3"]] } as LearnDatabase.QuestionSet,
    metadata: []
  }

  // TODO: After the model has been loaded, use the returned ID information to populate the database
  addModule({ 
    module_name:request.module_name,
    description:request.description,
    questions:request.questions,
    metadata:request.metadata,
    model_id: "model_id" + Math.floor(Math.random() * 1500)
  } as LearnDatabase.ModulesTable)

  console.log("\tSUCCESS.")
  res.json({ request, formData })
  return

  axios.post(BASE_URL + `/upload`, {
    key: process.env.API_KEY,
    target_type: "BRICK_TARGET",
    hologram_type: "MODEL_HOLOGRAM",
    type: "upload",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData["files"]["file"]
  }).then((response: any) => {
    console.log(response.data)
    res.send(response.data)
  }, (error: any) => {
    res.send(error.data)
  })
})

app.get("/getobject", (req: any, res: any) => {
  axios.get(BASE_URL + `/query`, {
    params: {
      key: process.env.API_KEY,
      entry: req.query.id
    }
  }).then((response: any) => {
    res.send(response.data)
  }, (error: any) => {
    res.send(error.data)
  })
})

app.get("/allentries", (req: any, res: any) => {
  axios.get(BASE_URL + `/query`, {
    params: {
      key: process.env.API_KEY
    }
  }).then((response: any) => {
    res.send(response.data)
  }, (error: any) => {
    res.send(error.data)
  })
})

app.get("/module/:id", async (req: any, res: any) => {
  let id = req.params.id
  if (Number(id) == NaN) {
    res.send("Invalid ID")
    return
  }

  let temp = (await runQuery(`select * from "Modules" where id=${id}`)).rows[0]

  if (temp == undefined) {
    res.send("ID not found")
    return
  }

  let result = (temp) as LearnDatabase.ModulesTable
  res.json(result)
})

app.listen(8080, () => console.log(chalk.green("leARn server listening on port 8080 of localhost")))