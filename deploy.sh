docker rm -f chat-realtime-frontend
docker rmi -f mailnophone03/chat-realtime-frontend:latest

git reset --hard
git pull origin main
rm -rf .env
cp .env.example .env

docker run -d -p 4040:80 --env-file ./.env --name chat-realtime-frontend mailnophone03/chat-realtime-frontend:latest
