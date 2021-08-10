import awsgi
import app

def lambda_handler(event, context):
  print(event)
  return awsgi.response(app.app, event, context, base64_content_types={"application/json"})
