pipeline {
    options {
        timestamps()
    }
    parameters {
        string(name: 'BUILD_VERSION', defaultValue: '', description: 'The build version to deploy (optional)')
    }
    agent {
        label 'internal-build.ncats'
    }
    triggers {
        pollSCM('H/5 * * * *')
    }
    environment {
        PROJECT_NAME = "ls-vision"
        TYPE = "web"
        DOCKER_REPO_NAME = "684150170045.dkr.ecr.us-east-1.amazonaws.com/ls-vision"
    }
    stages {
        stage('Clean') {
            steps {
                cleanWs()
                checkout scm
            }
        }
        stage('Build Version'){
            when { expression { return !params.BUILD_VERSION } }
            steps{
                script {
                    BUILD_VERSION_GENERATED = VersionNumber(
                        versionNumberString: 'v${BUILD_YEAR, XX}.${BUILD_MONTH, XX}${BUILD_DAY, XX}.${BUILDS_TODAY}',
                        projectStartDate:    '1970-01-01',
                        skipFailedBuilds:    true)
                    currentBuild.displayName = BUILD_VERSION_GENERATED
                    env.VERSION = BUILD_VERSION_GENERATED
                    env.BUILD = 'true'
                }
            }
        }
        stage('Build - Docker') {
            when { expression { return env.BUILD == 'true' }}
            steps {
                retry(3) {
                    sshagent (credentials: ['917d2cc8-84fe-4faf-89e5-25ea6649be83']) {
                        nodejs(configId: 'kw-npmrc', nodeJSInstallationName: 'Default Node.js') {
                            withEnv([
                                "IMAGE_NAME=ls-vision",
                                "BUILD_VERSION=" + (params.BUILD_VERSION ?: env.VERSION)
                            ]) {
                                cleanWs()
                                checkout scm

                                withCredentials([string(credentialsId: 'LABSHARE_NPM_TOKEN', variable: 'LABSHARE_NPM_TOKEN')]) {
                                    script {
                                        // See: https://jenkins.io/doc/book/pipeline/docker/#building-containers
                                         docker.build("${env.IMAGE_NAME}", "--build-arg NPM_TOKEN=${LABSHARE_NPM_TOKEN} --no-cache ./")
         
                                        docker.withRegistry('https://684150170045.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:aws-jenkins-build') {
                                            docker.image("${env.IMAGE_NAME}").push("${BUILD_VERSION}")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        stage('Deploy - CI') {
            steps {
        withAWS(credentials:'aws-jenkins-eks') {
        withEnv(["BUILD_VERSION=" + (params.BUILD_VERSION ?: env.VERSION)]) {
           sh "sed -i 's/BUILD_VERSION/${BUILD_VERSION}/g' k8s-deploy.yaml" 
           sh '''
           aws --region us-east-1 eks update-kubeconfig --name kube-eks-ci-compute
           kubectl apply -f k8s-deploy.yaml
           kubectl apply -f k8s-service.yaml
           kubectl apply -f k8s-ingress.yaml
           '''
                    }
                }
            }
        }
    }
    post {
        success {
                jiraSendDeploymentInfo environmentId: 'dev', environmentName: 'dev', environmentType: 'development', site: 'labshare.atlassian.net', state: 'successful'
        }
        failure {
                jiraSendDeploymentInfo environmentId: 'dev', environmentName: 'dev', environmentType: 'development', site: 'labshare.atlassian.net', state: 'failed'
        } 
    }
}
