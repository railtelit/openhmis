
FROM --platform=arm64 nginx:alpine
ARG appname 
# COPY --from=build /tmp/dist/apps/${appname} /usr/share/nginx/html/
COPY  dist/apps/patient/${appname} /usr/share/nginx/html/