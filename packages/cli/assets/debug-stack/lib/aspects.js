const cdk = require("@aws-cdk/core");

class RolePermissionsBoundaryAspect extends cdk.Aspects {
  constructor(permissionBoundaryArn) {
    super();
    this.permissionsBoundaryArn = permissionBoundaryArn;
  }

  visit(node) {
    if (
      cdk.CfnResource.isCfnResource(node) &&
      node.cfnResourceType === "AWS::IAM::Role"
    ) {
      node.addPropertyOverride(
        "PermissionsBoundary",
        this.permissionsBoundaryArn
      );
    }
  }
}

class RolePathAspect extends cdk.Aspects {
  constructor(rolePath) {
    super();
    this.rolePath = rolePath;
  }

  visit(node) {
    if (
      cdk.CfnResource.isCfnResource(node) &&
      node.cfnResourceType === "AWS::IAM::Role"
    ) {
      node.addPropertyOverride("Path", this.rolePath);
    }
  }
}

module.exports = { RolePermissionsBoundaryAspect, RolePathAspect };
