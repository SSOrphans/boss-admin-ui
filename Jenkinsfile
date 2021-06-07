node {
    try {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'aws-cli', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                withEnv(["AWS_ELB_DNS=${sh(script: 'aws elbv2 --region us-east-2 describe-load-balancers --query LoadBalancers[*].DNSName --output text', returnStdout: true).trim()}",
                        'serviceName=boss-admin-ui']) {

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
                    echo "Pushing to s3"
                    sh 'aws s3 cp --recursive build s3://$serviceName/'
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