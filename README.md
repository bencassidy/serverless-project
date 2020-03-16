## Serverless Project

### Summary

This serverless project creates an S3 bucket, DynamoDB Table, and 
Lambda in AWS. The lambda can be invoked locally and will take a file 
uploaded to S3, transform the data, and load it into the DynamoDB table.

### Instructions

Note: This project requires the [Serverless Framework](https://serverless.com/framework/docs/getting-started/) and the [AWS cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html). 
Instructions for installation can be found on the hyperlinked pages.

1. Clone the project from git
2. In the project directory run `npm i` to install necessary npm packages
3. To deploy, run `npm run deploy` this will deploy the AWS resources and upload the test data to S3
4. The lambda can be run from the terminal with `sls invoke local -f processData` or the AWS console with an empty event

