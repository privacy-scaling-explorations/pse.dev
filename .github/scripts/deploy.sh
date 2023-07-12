#!/bin/bash
set -ex

env=$1
 
tasks="pse-web-$env"
for task in $tasks; do
  pse_web_revision=$(aws ecs describe-task-definition --task-definition $task --query "taskDefinition.revision")
  aws ecs update-service --cluster pse-web-$env --service $task --force-new-deployment --task-definition $task:$pse_web_revision
done

aws ecs wait services-stable --cluster pse-web-$env --services $tasks

if [ $env = "stg" ]; then
  task_arn=$(aws ecs list-tasks --cluster pse-web-$env --query 'taskArns[]' --output text)
  eni_id=$(aws ecs describe-tasks --cluster pse-web-$env --task $task_arn --query 'tasks[].attachments[].details[?name==`networkInterfaceId`].value' --output text)
  public_ip=$(aws ec2 describe-network-interfaces --network-interface-ids $eni_id --query 'NetworkInterfaces[].Association.PublicIp' --output text) 
  echo "STG Url: http://$public_ip:3000"
fi
