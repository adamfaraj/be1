'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-1"});

const ddb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'users';

exports.handler = async (event, context) => {
    // console.log(JSON.stringify(`Event: event`))
    // Lambda Code Here
    // context.succeed('Success!')
    // context.fail('Failed!')
    const params = {
      TableName: tableName,
      Item:{
        "userId": Date.now(),
        "user": "Brian Carter",
      }
    };

    try {
      const data = await docClient.put(params).promise();
      console.log(data);
    } catch (err) {
      console.error('Unable to read item. Error JSON: ', JSON.stringify(err, null, 2));
    }
}
