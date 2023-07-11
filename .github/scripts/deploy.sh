#!/bin/bash
set -ex

env=$1
 
tasks="pse-web-$env"
for task in $tasks; do
  pse_web_revision=$(aws ecs describe-task-definition --task-definition $task --query "taskDefinition.revision")
  aws ecs update-service --cluster pse-web-$env --service $task --force-new-deployment --task-definition $task:$pse_web_revision
done

aws ecs wait services-stable --cluster pse-web-$env --services $tasks
