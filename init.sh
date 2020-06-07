#/bin/bash
echo "[Dropping database]"
dropdb learn
echo "[Dropping the htne user]"
dropuser htne

echo "[Resetting the database]"
createdb learn
psql learn -c "create role htne with superuser login password 'htne'"
psql learn -c "GRANT ALL PRIVILEGES ON DATABASE learn TO htne"

echo "[Creating required tables]"
psql learn -c "CREATE TABLE \"public\".\"Modules\" (\"id\" serial,\"module_name\" text, \"description\" text, \"questions\" text, \"metadata\" text, \"model_id\" text, PRIMARY KEY (\"id\"));"