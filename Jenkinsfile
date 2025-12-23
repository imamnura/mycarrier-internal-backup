/**
 * Project details
 * please update this based on project details
 */
String projectName = 'mycarrier'
String projectImageName = 'mycarrier-internal'
String vaultEnvironment = 'mycarrier'
String vaultEnvironmentJtn = 'mycarrier-jtn'

/**
 * Jenkins shared library
 * DeployImage
 */
@Library('shared-library') _
def deployImage = new DeployImage()
def devSecOps = new DevSecOps()
def vault = new Vault()
library(
    identifier: 'jenkins-shared-lib@master', retriever: modernSCM
    (
        [
            $class: 'GitSCMSource',
            remote: 'https://oauth2:23pGFDyiGtRJaqDkx2vq@gitlab.playcourt.id/ewz-devops/jenkins-lib'
        ]
    )
)

/**
 * Pre-defined project name suffix
 */
def projectNameSuffix = [
        production: 'prod',
        staging: 'stage',
        development: 'dev',
] as Object

/**
 * Pre-defined environment stages
 */
def environmentStage = [
        production: 'production',
        staging: 'staging',
        development: 'development',
] as Object

/**
 * Project worker detail
 * please update these object if necessary
 */
def projectWorkerDetail = [
        telegramChatId: '-1001215679728,-396772375',
        discordId: '',
        discordSecret: 'ewd/mycarrier/develop/jenkins',
        scmAgentLabel: 'Docker',
        testAgentLabel: 'Docker',
        buildAgentLabel: 'Docker',
        gitopsAgentLabel: 'Gitops',
        nodejsVersion: 20,
        toK3sJtn: 'true',
        /***
         * Auto generated value
         * avoid modify by hand
         */
        scmNodeName: '',
        testNodeName: '',
        buildNodeName: '',
        gitopsNodeName: '',
        deploymentNodeName: '',
        environmentStage: '',
        scmCommitId: '',
        dockerImageTag: '',
        gitopsEnvPath: '',
        npmAuth: '',
] as Object

/**
 * Performing build docker image
 * please update these function if necessary
 * @param projectWorkerDetail
 * @return void
 */
def performBuildDockerImage(Object projectWorkerDetail) {
    echo "Docker image tag: ${projectWorkerDetail.dockerImageTag}"
    sh "docker build \
            --build-arg ARGS_NODE_BUILD=${projectWorkerDetail.environmentStage} \
            --build-arg SCM_COMMIT_ID=${projectWorkerDetail.scmCommitId} \
            --build-arg NPM_AUTH=${projectWorkerDetail.npmAuth} \
            --rm \
            --no-cache \
            --pull \
            -t ${projectWorkerDetail.dockerImageTag} \
            ."
}

/**
 * Performing unit test & code coverage
 * please update these function if necessary
 * @return void
 */
def performUnitTest(Object projectWorkerDetail) {
    /**
        * Update command below depend on project
        * Jenkins default user uid: 1001, gid: 1001
        * or By detecting current current user on current node
        */
    env.UID = sh (script: 'id -u', returnStdout: true).trim()
    env.GID = sh (script: 'id -g', returnStdout: true).trim()
    env.NODE_VERSION = "${projectWorkerDetail.nodejsVersion}"

    sh 'docker run --rm -u root -v $PWD:/usr/src/app -w /usr/src/app playcourt/nodejs:$NODE_VERSION-alpine /bin/sh -c "yarn install || chown -R $UID:$GID /usr/src/app"'
    sh 'docker run --rm -u root -v $PWD:/usr/src/app -w /usr/src/app playcourt/nodejs:$NODE_VERSION-alpine /bin/sh -c "chown -R $UID:$GID /usr/src/app"'
}

/**
 * Performing code quality scan using SonarQube
 * @return void
 */
def performCodeScan() {
    def nodejsHome = tool name: "NodeJS-16", type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodejsHome}/bin:${env.PATH}"
    def sonarScannerHome = tool 'SonarScanner'
    env.PATH = "${sonarScannerHome}/bin:${env.PATH}"
    withSonarQubeEnv('SonarQube') {
        sh "${sonarScannerHome}/bin/sonar-scanner"
    }
}

pipeline {
    parameters {
        string(name: 'PRODUCTION_NAMESPACE', description: 'Production Namespace', defaultValue: "${projectName}-${projectNameSuffix.production}")
        string(name: 'STAGING_NAMESPACE', description: 'Staging Namespace', defaultValue: "${projectName}-${projectNameSuffix.staging}")
        string(name: 'DEVELOPMENT_NAMESPACE', description: 'Development Namespace', defaultValue: "${projectName}-${projectNameSuffix.development}")
        string(name: 'PRODUCT_NAME', description: 'Product name', defaultValue: "${projectName}")
        string(name: 'DOCKER_IMAGE_NAME', description: 'Docker Image Name', defaultValue: "${projectImageName}")
        string(name: 'DISCORD_ID', description: 'User ID of Discord', defaultValue: "${projectWorkerDetail.discordId}")
        string(name: 'CHAT_ID', description: 'Chat id of Telegram group', defaultValue: "${projectWorkerDetail.telegramChatId}")
        string(name: 'TO_K3S_JTN', description: 'Deploy to k3s jtn cluster', defaultValue: "${projectWorkerDetail.toK3sJtn}")
        string(name: 'VAULT_ENVIRONMENT', description: 'Vault environment', defaultValue: "${vaultEnvironment}")
        string(name: 'VAULT_ENVIRONMENT_JTN', description: 'Vault environment', defaultValue: "${vaultEnvironmentJtn}")
    }
    agent none
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Abort previous builds') {
            steps {
                echo 'Aborting previous builds'
                script {
                    KillOldBuild()
                }
            }
        }
        stage('SCM Checkout') {
            agent {
                label "${projectWorkerDetail.scmAgentLabel}"
            }
            steps {
                script {
                    projectWorkerDetail.scmNodeName = "${env.NODE_NAME}"
                }
                echo "SCM node: ${projectWorkerDetail.scmNodeName}"
                script {
                    //deployImage.cleanAll()
                    // Fix hidden files not removed
                    sh 'docker run --rm -v $PWD:$PWD -u root -w $PWD alpine:3.15 /bin/sh -c "rm -rf ..?* .[!.]* *"'
                    // Fix workspace permission
                    env.UID = sh (script: 'id -u', returnStdout: true).trim()
                    env.GID = sh (script: 'id -g', returnStdout: true).trim()
                    sh 'docker run --rm -v $PWD:$PWD -u root -w $PWD alpine:3.15 /bin/sh -c "chown -R $UID:$GID $PWD"'
                }
                checkout scm
                echo 'Generating SCM_COMMIT_ID'
                script {
                    sh 'echo -n $(git rev-parse --short HEAD) > ./commit-id'
                    projectWorkerDetail.scmCommitId = readFile('./commit-id')
                }
                echo "Generated SCM_COMMIT_ID: ${projectWorkerDetail.scmCommitId}"
                // Define environment stage based on branch
                echo 'Defining environment stage'
                echo "Current branch: ${env.BRANCH_NAME}"
                script {
                    def vaultEnvironmentTarget = "${params.VAULT_ENVIRONMENT}"
                    if (params.TO_K3S_JTN == 'true') {
                        vaultEnvironmentTarget = "${params.VAULT_ENVIRONMENT_JTN}"
                    }
                    switch (env.BRANCH_NAME) {
                        case 'master':
                            projectWorkerDetail.environmentStage = environmentStage.production
                            projectWorkerDetail.gitopsEnvPath = "ewd/${vaultEnvironmentTarget}/master/${params.DOCKER_IMAGE_NAME}"
                            break
                        case 'release':
                            projectWorkerDetail.environmentStage = environmentStage.staging
                            projectWorkerDetail.gitopsEnvPath = "ewd/${vaultEnvironmentTarget}/release/${params.DOCKER_IMAGE_NAME}"
                            break
                        case 'develop':
                            projectWorkerDetail.environmentStage = environmentStage.development
                            projectWorkerDetail.gitopsEnvPath = "ewd/${vaultEnvironmentTarget}/develop/${params.DOCKER_IMAGE_NAME}"
                            break
                    }
                }
                // Stash current workspace
                stash name: 'ws', includes: '**,commit-id', excludes: 'Jenkinsfile,.git/**'
                echo "Environment stage: ${projectWorkerDetail.environmentStage}"
            }
        }
        stage("Gitops env") {
            agent {
                label "${projectWorkerDetail.gitopsAgentLabel}"
            }
            steps {
                script {
                    projectWorkerDetail.gitopsNodeName = "${env.NODE_NAME}"
                }
                echo "Gitops node: ${projectWorkerDetail.gitopsNodeName}"
                script {
                    //sh 'rm -Rf * && rm -Rf .scannerwork && rm -Rf .nyc_output'
                    // Fix hidden files not removed
                    sh 'rm -rf ..?* .[!.]* *'
                }
                echo 'Get environment from Vault'
                script {
                    env.VAULT_ADDR = 'https://vault.playcourt.id'
                    vault.vault_fe(projectWorkerDetail.gitopsEnvPath)
                }
                // Stash current environment
                stash name: 'env', includes: '**'
                script {
                    //sh 'rm -Rf * && rm -Rf .scannerwork && rm -Rf .nyc_output'
                    // Fix hidden files not removed
                    sh 'rm -rf ..?* .[!.]* *'
                }
                unstash 'ws'
                script {
                    env.VAULT_ADDR = 'https://vault.playcourt.id'
                    projectWorkerDetail.npmAuth = vault.vault("${projectWorkerDetail.gitopsEnvPath}", "NPM_AUTH")
                    sh "sed -i 's/NPM_AUTH/${projectWorkerDetail.npmAuth}/g' .npmrc"
                }
                // Stash current workspace
                stash name: 'ws', includes: '**,commit-id'
            }
        }
        stage('Initialize') {
            parallel {
                stage("Gitleaks") {
                    agent {
                        docker {
                            alwaysPull true
                            image "playcourt/jenkins:gitleaks"
                            label "${projectWorkerDetail.scmAgentLabel}"
                            args "-u root --entrypoint ''  "
                        }
                    }
                    steps {
                        echo "Gitleaks node: ${projectWorkerDetail.scmNodeName}"
                        unstash 'ws'
                        echo 'Performing gitleaks'
                        script {
                            devSecOps.gitleaks("${params.PRODUCT_NAME}", "${params.DOCKER_IMAGE_NAME}")
                        }
                    }
                }
                stage("Test node") {
                    agent {
                        label "${projectWorkerDetail.testAgentLabel}"
                    }
                    steps {
                        script {
                            projectWorkerDetail.testNodeName = "${env.NODE_NAME}"
                        }
                        echo "Test node: ${projectWorkerDetail.testNodeName}"
                        script {
                            //deployImage.cleanAll()
                            // Fix hidden files not removed
                            sh 'docker run --rm -v $PWD:$PWD -u root -w $PWD alpine:3.15 /bin/sh -c "rm -rf ..?* .[!.]* *"'
                            // Fix workspace permission
                            env.UID = sh (script: 'id -u', returnStdout: true).trim()
                            env.GID = sh (script: 'id -g', returnStdout: true).trim()
                            sh 'docker run --rm -v $PWD:$PWD -u root -w $PWD alpine:3.15 /bin/sh -c "chown -R $UID:$GID $PWD"'
                        }
                        unstash 'ws'
                        unstash 'env'
                    }
                }
                stage("Build node") {
                    agent {
                        label "${projectWorkerDetail.buildAgentLabel}"
                    }
                    steps {
                        script {
                            projectWorkerDetail.buildNodeName = "${env.NODE_NAME}"
                        }
                        echo "Build node: ${projectWorkerDetail.buildNodeName}"
                        script {
                            //deployImage.cleanAll()
                            // Fix hidden files not removed
                            sh 'docker run --rm -v $PWD:$PWD -u root -w $PWD alpine:3.15 /bin/sh -c "rm -rf ..?* .[!.]* *"'
                            // Fix workspace permission
                            env.UID = sh (script: 'id -u', returnStdout: true).trim()
                            env.GID = sh (script: 'id -g', returnStdout: true).trim()
                            sh 'docker run --rm -v $PWD:$PWD -u root -w $PWD alpine:3.15 /bin/sh -c "chown -R $UID:$GID $PWD"'
                        }
                        unstash 'ws'
                        unstash 'env'
                    }
                }
            }
        }
        stage('Test & build') {
            parallel {
                stage('Unit test') {
                    agent {
                        label "${projectWorkerDetail.testNodeName}"
                    }
                    steps {
                        echo "Test node: ${projectWorkerDetail.testNodeName}"
                        echo "Unit test node: ${projectWorkerDetail.testNodeName}"
                        echo 'Performing unit test'
                        performUnitTest(projectWorkerDetail)
                        echo "Quality analysis node: ${projectWorkerDetail.testNodeName}"
                        echo 'Scanning code quality'
                        performCodeScan()
                    }
                }
                stage('Build docker image') {
                    agent {
                        label "${projectWorkerDetail.buildNodeName}"
                    }
                    steps {
                        echo "Build node: ${projectWorkerDetail.buildNodeName}"
                        echo "Docker image build node: ${projectWorkerDetail.buildNodeName}"
                        echo 'Performing build docker image'
                        script {
                            projectWorkerDetail.dockerImageTag = "${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${projectWorkerDetail.scmCommitId}"
                            performBuildDockerImage(projectWorkerDetail)
                        }
                        echo 'Defining deployment node'
                        script {
                            projectWorkerDetail.deploymentNodeName = "${projectWorkerDetail.buildNodeName}"
                        }
                        echo "Deployment node: ${projectWorkerDetail.deploymentNodeName}"
                    }
                }
            }
        }
        stage('Scan Image & SCA') {
            parallel {
                stage("SCA") {
                    agent {
                        docker {
                            alwaysPull true
                            image "playcourt/jenkins:nodejs18"
                            label "${projectWorkerDetail.deploymentNodeName}"
                            args "-u root -v /var/lib/jenkins/tools:/var/lib/jenkins/tools -v /var/lib/jenkins/depedency-check/data:/usr/share/dependency-check/data --entrypoint ''  "
                        }
                    }
                    steps {
                        echo "SCA node: ${projectWorkerDetail.deploymentNodeName}"
                        echo 'Performing SCA'
                        script {
                            devSecOps.dependencyCheck("${params.PRODUCT_NAME}", "${params.DOCKER_IMAGE_NAME}")
                        }
                    }
                }
                stage("Scan docker image") {
                    agent {
                        docker {
                            alwaysPull true
                            image "playcourt/jenkins:trivy"
                            label "${projectWorkerDetail.deploymentNodeName}"
                            args "-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint '' "
                            reuseNode true
                        }
                    }
                    steps {
                        echo "Scan docker image node: ${projectWorkerDetail.deploymentNodeName}"
                        echo 'Performing scan docker image'
                        script {
                            devSecOps.scanImage("${params.PRODUCT_NAME}", "${params.DOCKER_IMAGE_NAME}", "${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${projectWorkerDetail.scmCommitId}")
                        }
                    }
                }
            }
        }
        stage('Deployment') {
            steps {
                node(projectWorkerDetail.deploymentNodeName as String) {
                    echo "Deployment node: ${projectWorkerDetail.deploymentNodeName}"
                    script {
                        switch (projectWorkerDetail.environmentStage) {
                            case environmentStage.production:
                                EWZDiscord.sendNotification("${projectWorkerDetail.discordSecret}", 'approval')
                                echo "Deploying to ${environmentStage.production}"
                                deployImage.to_jtn_prod("${projectWorkerDetail.scmCommitId}")
                                break
                            case environmentStage.staging:
                                echo "Deploying to ${environmentStage.staging}"
                                deployImage.to_jtn_stage("${projectWorkerDetail.scmCommitId}")
                                break
                            case environmentStage.development:
                                echo "Deploying to ${environmentStage.development}"
                                if (params.TO_K3S_JTN == 'true') {
                                    deployImage.to_jtn_stage("${projectWorkerDetail.scmCommitId}")
                                } else {
                                    deployImage.to_vsan("${projectWorkerDetail.scmCommitId}")
                                }
                                break
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            /**
             * Send build status notification over Telegram
             * default sender node: deployment || build
             */
            script {
                if ((projectWorkerDetail.deploymentNodeName as String)?.trim()) {
                    node(projectWorkerDetail.deploymentNodeName as String) {
                        EWZDiscord.sendNotification("${projectWorkerDetail.discordSecret}")
                        TelegramNotif(currentBuild.currentResult)
                    }
                } else if ((projectWorkerDetail.buildNodeName as String)?.trim()) {
                    node(projectWorkerDetail.buildNodeName as String) {
                        EWZDiscord.sendNotification("${projectWorkerDetail.discordSecret}")
                        TelegramNotif(currentBuild.currentResult)
                    }
                }
            }
        }
        failure {
            /**
             * Clean up current docker image if current build was failed
             */
            script {
                if ((projectWorkerDetail.buildNodeName as String)?.trim()) {
                    node(projectWorkerDetail.buildNodeName as String) {
                        script {
                            sh "docker rmi -f ${projectWorkerDetail.dockerImageTag}"
                        }
                    }
                }
            }
        }
    }
}
