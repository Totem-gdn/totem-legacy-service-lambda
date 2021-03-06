# totem-legacy-service-lambda

Web-service that simplifies the approach for accessing the Totem Legacy Service for game developers. Implemented as AWS Lambda function

## Before the start:

```bash
npm install
```

## AWS Part

### 1) Open your terminal and run command:

```bash
aws configure
```

Insert your credentials and follow the steps

### 2) Run build script:

```bash
npm run package
```

it will create a `totem-legacy-service-lambda.zip` file ready to be uploaded to AWS Lambda inside `dist` directory

### 3) Open your terminal in the directory where trust-policy.json is stored and pass it to the create-role command:

```bash
aws iam create-role --role-name {NAME_OF_ROLE} --assume-role-policy-document file://aws-data/trust-policy.json
```

### 4) The next step is to attach a policy to the role. This policy grants permissions to the lambda function to log to CloudWatch:

```bash
aws iam attach-role-policy --role-name {NAME_OF_ROLE} --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

### 5) Now we're ready to create the lambda function using the AWS CLI.

Since our lambda function requires an environment variables so edit a file called environment.json in aws-data folder with your mongo db credentials. And run the following script:

```bash
aws lambda create-function --function-name {FUNCTION_NAME} --runtime nodejs14.x --zip-file fileb://dist/totem-legacy-service-lambda.zip --handler index.handler --environment file://aws-data/environment.json --role "arn:aws:iam::{YOUR_ACCOUNT_NUMBER}:role/{NAME_OF_ROLE}"
```

## Request Examples:

```bash
# Get all records by Item ID
curl {DOMAIN_URL}/{itemId}
# Get all records by Item ID and Game ID
curl {DOMAIN_URL}/{itemId}/{gameId}
# Add new record by Item ID and Game ID
curl -X POST \
     -d '000000000000000000000000000000000000000000000000000000000000000000000000000000' \
     {DOMAIN_URL}/{itemId}/{gameId}
```
