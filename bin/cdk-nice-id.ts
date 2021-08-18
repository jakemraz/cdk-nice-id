#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkNiceIdStack } from '../stack/cdk-nice-id-stack';
import { AppContext } from '../lib/app-context';

const app = new cdk.App();
const env = app.node.tryGetContext("env")==undefined?'dev':app.node.tryGetContext("env");

AppContext.getInstance().initialize({
    applicationName: 'NiceId',
    deployEnvironment: env
})
new CdkNiceIdStack(app, `CdkNiceIdStack${env}`);
