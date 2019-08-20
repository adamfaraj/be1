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
  let responseBody = "";
  let statusCode;

  const { id } = event.pathParameters;

  const params = {
    TableName: tableName,
    Key: {
      userId: parseFloat(id),
    }
  };

  try {
    const data = await docClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (err) {
    responseBody = 'Unable to get user data';
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "myHeader": "test",
    },
    body: responseBody
  }

  return response;
}
