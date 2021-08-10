import * as cdk from 'aws-cdk-lib';
import * as CdkBackendServerlessDeployer from '../lib/cdk-backend-serverless-deployer-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkBackendServerlessDeployer.CdkBackendServerlessDeployerStack(app, 'MyTestStack');
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual.Resources ?? {}).toEqual({});
});
