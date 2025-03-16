# Node.js 기반 이미지 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package.json ./
COPY package-lock.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# React 빌드
RUN npm run build

# Nginx 설정
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
