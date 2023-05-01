FROM node:18.12.1 as build-stage
COPY . .
RUN npm install
RUN npm install @googlemaps/markerclustererplus
RUN npm run build

# runner
# 3000번 포트 노출
EXPOSE 3000

# npm start 스크립트 실행
CMD ["npm", "start"]
