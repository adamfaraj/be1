'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-1"});

const ddb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'users';

exports.handler = async (event, context) => {
  let responseBody = "";
  let statusCode;


  const params = {
    TableName: tableName,
  };
  
  try {
    const data = await docClient.scan(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get user data ${err}`;
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
