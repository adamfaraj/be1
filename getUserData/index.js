'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-1"});

const ddb = new AWS.DynamoDB();
const tableName = 'users';

exports.handler = function (event, context, callback) {
    // console.log(JSON.stringify(`Event: event`))
    // Lambda Code Here
    // context.succeed('Success!')
    // context.fail('Failed!')
    const params = {
      TableName: tableName,
      Key:{
        userId: {
          N: "3",
        }
      }
    };

    ddb.getItem(params, function(err, data) {
      if (err) {
        console.error('Unable to get user data', JSON.stringify(err, null, 2))
      } else {
        console.log('User data', JSON.stringify(data, null, 2));
      }
    })

}
