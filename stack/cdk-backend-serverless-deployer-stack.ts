import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_apigateway as apigw, aws_lambda as lambda} from 'aws-cdk-lib';
import { AppContext } from '../lib/app-context';
import * as path from 'path';

export class CdkBackendServerlessDeployerStack extends Stack {

  private readonly layer: lambda.LayerVersion;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apigw.LambdaRestApi(this, 'RestAPI', {
      handler: this.createLambdaFunction('PingService', 'ping'),
    });

    // bug at cdk v2
    // we will upload layer manually by using makelayer.sh til the bug fixed

    // this.layer = new lambda.LayerVersion(this, 'Layer', {
    //   code: lambda.Code.fromAsset(path.resolve(__dirname, '..', 'python')),
    //   compatibleRuntimes: [lambda.Runtime.PYTHON_3_8],
    // });

  }

  private createLambdaFunction(id: string, serviceName: string) {
    const temporaryLayerName = 'aws-flask-layer';

    return new lambda.Function(this, id, {
      code: lambda.Code.fromAsset(path.resolve(__dirname, '..', 'service', serviceName)),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'handler.lambda_handler',
      layers: [lambda.LayerVersion.fromLayerVersionArn(this, 'aws-flask-layer',
        `arn:aws:lambda:${this.region}:${this.account}:layer:aws-flask:1`)],
    });
  }
}
