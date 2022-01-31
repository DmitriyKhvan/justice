FROM nginx:alpine

COPY dist/* /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]