const config = {
  "aws_project_region": process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  "aws_appsync_graphqlEndpoint": process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT,
  "aws_appsync_region": process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION,
  "aws_appsync_authenticationType": process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE,
  "aws_appsync_apiKey": process.env.NEXT_PUBLIC_AWS_APPSYNC_APIKEY,
  "aws_cognito_identity_pool_id": process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  "aws_cognito_region": process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  "aws_user_pools_id": process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  "aws_user_pools_web_client_id": process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  "oauth": {},
  "aws_cognito_username_attributes": [
      "EMAIL"
  ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "NAME",
      "FAMILY_NAME"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": [
          "REQUIRES_LOWERCASE",
          "REQUIRES_NUMBERS",
          "REQUIRES_SYMBOLS",
          "REQUIRES_UPPERCASE"
      ]
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ]
};

export default config;