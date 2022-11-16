docker rm -f chat-realtime-frontend
docker rmi -f mailnophone03/chat-realtime-frontend:latest
docker run -d -p 4040:80 --name chat-realtime-frontend mailnophone03/chat-realtime-frontend:latest
