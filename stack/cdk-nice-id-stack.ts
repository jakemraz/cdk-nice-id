import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_apigateway as apigw, 
         aws_lambda as lambda,
         aws_ssm as ssm,
         aws_iam as iam,
        } from 'aws-cdk-lib';
import { AppContext } from '../lib/app-context';
import * as path from 'path';

export class CdkNiceIdStack extends Stack {

  private readonly layer: lambda.LayerVersion;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dockerfile = path.join(__dirname, "../service/niceid");
    const handler = new lambda.DockerImageFunction(this, 'NiceIdFunction', {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
      environment: {
        DEPLOYMENT_ENV: AppContext.getInstance().env,
      },
    });

    const api = new apigw.LambdaRestApi(this, 'NiceIdRestAPI', {
      handler: handler,
      proxy: true,
      deployOptions: {
        stageName: AppContext.getInstance().env,
      },
    });

    const param = new ssm.StringParameter(this, 'RestApiEndpoint', {
      parameterName: `/${AppContext.getInstance().env}/NiceIdRestApiEndpoint`,
      stringValue: api.url,
    });

    const secretManagerReadPolicy = new iam.PolicyStatement({
      actions: [
        'secretsmanager:GetSecretValue',
      ],
      resources: [
        `arn:aws:secretsmanager:${this.region}:${this.account}:secret:niceid*`
      ],
    });
    const paramReadPolicy = new iam.PolicyStatement({
      actions: [
        'ssm:GetParameter',
      ],
      resources: [
        '*'
      ],
    })
    handler.addToRolePolicy(secretManagerReadPolicy);
    handler.addToRolePolicy(paramReadPolicy);
  }
}
