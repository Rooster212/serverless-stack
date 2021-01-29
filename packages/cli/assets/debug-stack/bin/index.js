#!/usr/bin/env node

const { Aspects } = require("@aws-cdk/core");
const cdk = require("@aws-cdk/core");
const { DebugStack, PermissionsBoundaryAspect } = require("../lib/DebugStack");

const stage = process.argv[3];
const region = process.argv[4];
const stackName = process.argv[2];
const permissionsBoundaryArn = process.argv[5];

// Override default region
const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region };

const app = new cdk.App();

const debugStack = new DebugStack(app, stackName, {
  env,
  stage,
  stackName,
  region,
});

if (permissionsBoundaryArn) {
  const permissionsBoundaryAspect = new PermissionsBoundaryAspect(
    permissionsBoundaryArn
  );
  Aspects.of(debugStack).add(permissionsBoundaryAspect);
}
