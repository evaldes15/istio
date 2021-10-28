// Init script for DB
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD
use ErrorCollection
db.createUser({	user: "fluentd", pwd: "w34535", roles:[{ role: "readWrite", db:"ErrorCollection"}] })
db.auth( "fluentd", "w34535")


mongodump -h localhost:27018 -d "ErrorCollection" -u "fluentd-writer" -p "w34535"
kubectl port-forward mongo-768d5ff64d-ddlg7 27019:27017 -n storage
mongorestore --host=localhost --port=27019 --authenticationDatabase="ErrorCollection" -u "fluentd" -p "w34535" ./work/