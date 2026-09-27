pipeline {

    agent any

    tools {
        nodejs 'NodeJs-22'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
        buildDiscarder(logRotator(
            numToKeepStr: '20',
            artifactNumToKeepStr: '10'
        ))
    }

    parameters {
        choice(
            name: 'MODULE',
            choices: ['ui', 'api', 'heroku', 'all'],
            description: 'Select module to execute'
        )
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo "Cleaning workspace..."
                cleanWs(deleteDirs: true)
            }
        }

        stage('Checkout Source') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/rameshn3/PlaywrightEndToEndAutomationAug252026.git'
                    ]],
                    extensions: [
                        [$class: 'CloneOption',
                            shallow: true,
                            depth: 1,
                            noTags: true,
                            timeout: 10
                        ]
                    ]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                echo Installing Dependencies...
                npm ci
                '''
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat '''
                echo Installing Browsers...
                npx playwright install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                script {

                    switch(params.MODULE) {

                        case "ui":
                            bat "npm run test:ui"
                            break

                        case "api":
                            bat "npm run test:api"
                            break

                        case "heroku":
                            bat "npm run test:heroku"
                            break

                        default:
                            bat "npm run test:all"
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat "npm run allure:generate"
            }
        }
    }

    post {

        always {

            script {

                if (fileExists('playwright-report/index.html')) {

                    publishHTML(target: [
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report',
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true
                    ])

                    archiveArtifacts(
                        artifacts: 'playwright-report/**/*',
                        allowEmptyArchive: true
                    )

                } else {
                    echo "Playwright report not found."
                }

                if (fileExists('allure-results')) {

                    allure(
                        includeProperties: false,
                        jdk: '',
                        results: [[path: 'allure-results']]
                    )

                } else {
                    echo "Allure results not found."
                }

                if (fileExists('allure-report/index.html')) {

                    archiveArtifacts(
                        artifacts: 'allure-report/**/*',
                        allowEmptyArchive: true
                    )

                } else {
                    echo "Allure report not found."
                }
            }
        }

        success {
            echo "Build completed successfully."
        }

        failure {
            echo "Build failed."
        }

        cleanup {
            cleanWs(
                deleteDirs: true,
                disableDeferredWipeout: true
            )
        }
    }
}