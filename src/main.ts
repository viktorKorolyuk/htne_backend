import { LearnDatabase } from "./database"

require("dotenv").config()

const express = require("express")
const cors = require("cors")
const axios = require("axios")
const bodyparser = require("body-parser")
const { formParsePromise } = require("./utilities")
const { pool, runQuery } = require("./database")

const BASE_URL = "https://console.echoAR.xyz"
console.log(formParsePromise)
const app = express()
app.use(cors())

app.get("/", (req: any, res: any) => {
})

app.post("/upload", async (req: any, res: any) => {
  var formData = await formParsePromise(req) as any;
  // res.send(JSON.stringify(req.body, null, " "))
  // console.log(req.body)
  // let request: LearnAPI.UPLOAD_REQUEST = {
  //   module_name: req.body.module_name,
  //   model_file: new Blob(),
  //   description: "",
  //   questions: [],
  //   metadata: []
  // }

  axios.post(BASE_URL + `/upload`, {
    params: {
      key: process.env.API_KEY,
      target_type: {} as EchoAR.BRICK_TARGET,
      hologram_type: { type: "upload" } as EchoAR.MODEL_HOLOGRAM
    },
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

  let temp = (await runQuery(`select * from "QuestionSet" where id=${id}`)).rows[0]
  
  if(temp == undefined){
    res.send("ID not found")
    return
  }

  let result = (temp) as LearnDatabase.QuestionSetTable
  res.json(result)
})

app.listen(8080, () => console.log("leARn server listening on port 8080 of localhost"))