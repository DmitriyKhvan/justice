FROM nginx

COPY dist/* /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200