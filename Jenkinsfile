node {
    try {
        withEnv(['serviceName=boss-admin-ui', "commitHash=${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"]) {
            stage('Checkout') {
                echo "Checking out $serviceName"
                checkout scm
            }
            stage('Build') {
                nodejs('NodeJS') {
                    echo "Building $serviceName"
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
            stage('Push to S3') {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'aws-cli', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    echo "Pushing to s3"
                    sh 'aws s3 cp --recursive build s3://ssor-test-ui/'
                }
            }
        }
    }
    catch (exc) {
        echo "$exc"
    } finally {
        stage('Cleanup') {
            echo "cleanup"
            sh 'rm -rf *'
        }
    }
}