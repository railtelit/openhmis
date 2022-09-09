# FROM node:18 as build 
# WORKDIR /tmp
# COPY 'package*' .
# COPY . .
# # RUN npm i -g nx
# RUN npm i 

# ARG appname
#  RUN npx nx build ${appname}


FROM --platform=arm64 nginx:alpine
ARG appname 
# COPY --from=build /tmp/dist/apps/${appname} /usr/share/nginx/html/
COPY  dist/apps/${appname} /usr/share/nginx/html/