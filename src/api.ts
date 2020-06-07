namespace LearnAPI {
  export interface UPLOAD_REQUEST {
    module_name: string,
    model_file: Blob,
    description: string,
    questions: string[],
    metadata: string[]
  }
}