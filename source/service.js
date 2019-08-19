const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-1"});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = "users";

module.exports = {
  addUser: function() {
    let params = {
      TableName: tableName,
      Item: {
        "userId": 3,
        "user": 'Adam Faraj'
      }
    };
  
    docClient.put(params, function(err, data) {
      if (err) {
        console.error('Unable to add item. Error JSON: ', JSON.stringify(err, null, 2))
      }
      else {
        console.log('Succeeded ', JSON.stringify(data, null, 2));
      }
    })
  },
  
  getUser: function() {
    let params = {
      TableName: tableName,
      Key:{"userId": 1}
    };
  
    docClient.get(params, function(err, data) {
      if (err) {
        console.error('Unable to read item. Error JSON: ', JSON.stringify(err, null, 2));
      } else {
        console.log('Get item succeeded:', JSON.stringify(data, null, 2));
      }
    });
  },
  
  getUsers: function() {
    let params = {
      TableName: tableName,
    };
  
    docClient.scan(params, function(err, data) {
      if (err) {
        console.error('Unable to get users. Error JSON: ', JSON.stringify(err, null, 2));
      } else {
        console.log('Query successful: ', JSON.stringify(data, null, 2));
      }
    })
  },

}
