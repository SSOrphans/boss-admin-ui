from nginx:1.17
copy nginx.conf /etc/nginx/nginx.conf
workdir /usr/share/nginx/html
copy build .
