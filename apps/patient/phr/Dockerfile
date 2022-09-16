
FROM --platform=arm64 nginx:alpine
ARG appname 
# COPY --from=build /tmp/dist/apps/${appname} /usr/share/nginx/html/

COPY  dist/apps/patient/${appname} /home/
COPY configure/nginx/default.conf /etc/nginx/conf.d/default.conf