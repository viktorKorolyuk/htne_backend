# htne_backend

This project requires a `.env` file with the following properties:
```
DB_USER = ""
DB_PASS = ""
DB_HOST = ""
DB_NAME = ""
API_KEY = ""
```

This project requires a postgresql server to run on the client on port 5432. The modules table is created with the following statement:
```
CREATE TABLE "public"."Modules" ("id" serial ,"module_name" text, "description" text, "questions" text, "metadata" text, "model_id" text, PRIMARY KEY ("id"));
```
The database can also be set up by executing `init.sh`.

To run the backend server:
```
npm install
npm start
```

## Docker
To run the docker containers:
```bash
docker build . -f Dockerfile.base_img -t htne/base_img # Only needs to be run once if no new packages need to be installed
docker build . -f Dockerfile.instance -t htne/htne_instance
docker run -it -p8080:8080 htne/htne_instance
```
