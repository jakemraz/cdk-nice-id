FROM public.ecr.aws/lambda/python:3.8

COPY handler.py ./
COPY app.py ./
COPY CPClient_64bit /opt/CPClient/
COPY templates ./templates
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

CMD [ "handler.lambda_handler" ]
