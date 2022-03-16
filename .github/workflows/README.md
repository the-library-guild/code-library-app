## Deployment workflows
Different deployments are triggered based on the name of the branch being pushed.

- Pushes to master trigger review-app deployments.
- Tags with RC trigger deployments to staging (i.e., v1.0.0-rc.2).
- Tags without RC trigger deployments to production (i.e., v1.0.0).
