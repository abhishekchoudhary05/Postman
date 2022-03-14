FROM nginx
COPY ./index.js /usr/share/nginx/html
COPY ./index.html /usr/share/nginx/html