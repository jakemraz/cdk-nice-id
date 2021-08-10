import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_apigateway as apigw, aws_lambda as lambda} from 'aws-cdk-lib';
import { AppContext } from '../lib/app-context';
import * as path from 'path';

export class CdkBackendServerlessDeployerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const api = new apigw.RestApi(this, 'RestApi', {
    //   deployOptions: {
    //     stageName: AppContext.getInstance().env
    //   },
    // });

    const api = new apigw.LambdaRestApi(this, 'RestAPI', {
      handler: this.createLambdaFunction('PingService', 'ping'),
      // proxy: true,
      // defaultMethodOptions: apigw.Method
    });

  }

  private createLambdaFunction(id: string, serviceName: string) {
    return new lambda.Function(this, id, {
      code: lambda.Code.fromAsset(path.resolve(__dirname, '..', 'service', serviceName)),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'handler.lambda_handler',
    });
  }
}
