const formidable = require("formidable")

export function formParsePromise(req:any){
  let form = formidable({multiplies:true})
  return new Promise(resolve => {
    form.parse(req, (err:any, fields:any, files:any) => {
      resolve({fields, files})
    })
  })
}