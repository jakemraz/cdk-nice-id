# CDK NICE ID

CDK NICE ID 는 NICE ID 인증을 AWS 서버리스 서비스(API Gateway - Lambda)를 이용하여 수행하는 IaC 프로젝트 입니다.
CDK 2.0 (aws-cdk@next)를 이용하여 배포가 이루어 집니다.

# 준비 사항
- awscli
- Nodejs 12.16+
- CDK 2.0

# 사전 설정
CDK NICE ID를 사용하기 위해선 Nice Id에서 발급해준 sitecode와 sitepasswd가 필요 합니다.

이 코드를 `aws secret manager`에 등록 후 CDK에서는 이 값을 활용하여 본인 인증에 사용 합니다.

## AWS CLI를 통한 sitecode, sitepasswd 등록
{sitecode}와 {sitepasswd}에는 NICE ID에서 제공한 값을 입력 합니다
```
$ aws secretsmanager create-secret --name niceid --secret-string "{\"sitecode\":\"{sitecode}\",\"sitepasswd\":\"{sitepasswd}\"}"
```

예시
```
$ aws secretsmanager create-secret --name niceid --secret-string "{\"sitecode\":\"PS126\",\"sitepasswd\":\"d7v7di3s6f\"}"
```

# 설치 방법
```
$ npm i
$ cdk bootstrap
$ cdk deploy
```

# 기타 환경 배포 방법
```
# dev 환경 배포
$ cdk deploy

# prod 환경 배포
$ cdk deploy -c env=prod
```

# 사용법
`https://{endpoint_url}/checkplus_main` 에 접속 합니다.
예를 들어 endpoint url이 https://1bjnaj0anb.execute-api.ap-northeast-2.amazonaws.com/dev/ 인 경우
https://1bjnaj0anb.execute-api.ap-northeast-2.amazonaws.com/dev/checkplus_main 에 접속합니다.
