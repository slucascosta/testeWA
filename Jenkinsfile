node {
  def dockerImage

  def IMAGE = 'eduzz-mobile-api'
  def ECR_URL = '343892332509.dkr.ecr.us-east-1.amazonaws.com'
  def ECR_CRED = 'ecr:us-east-1:ecr-login'
  def ECS_CLUSTER = 'PRODUTOS'
  def ECS_SERVICE = 'svc-eduzz-mobile-api'

  def ECS_QA_CLUSTER = 'EDUZZ-QA'
  def ECS_QA_SERVICE = 'svc-eduzz-mobile-api-qa'

  stage ('Clone Repository') {
    checkout scm
  }

  stage ('Build container') {
    dockerImage = docker.build(IMAGE, "-f docker/prod/Dockerfile .")
  }

  stage('Publish to ECR') {
    if (env.BRANCH_NAME ==~ /(hotfix.*|release.*|master)/) {
      docker.withRegistry("https://${ECR_URL}", ECR_CRED) {
        dockerImage.push("${env.BRANCH_NAME}-${env.BUILD_NUMBER}")
        dockerImage.push("${env.BRANCH_NAME}")
      }
    }
  }

  stage('Deploy') {
    if (env.BRANCH_NAME ==~ /(master)/) {
      sh "ecs-deploy -c \"${ECS_CLUSTER}\" -n \"${ECS_SERVICE}\" -t 500 -i \"${ECR_URL}/${IMAGE}:${env.BRANCH_NAME}-${env.BUILD_NUMBER}\""
    }

    if (env.BRANCH_NAME ==~ /(release.*|hotfix.*)/) {
      sh "ecs-deploy -c \"${ECS_QA_CLUSTER}\" -n \"${ECS_QA_SERVICE}\" -t 500 --force-new-deployment -i \"${ECR_URL}/${IMAGE}:${env.BRANCH_NAME}-${env.BUILD_NUMBER}\""
    }
  }

  stage('Clean') {
    cleanWs()
  }

}