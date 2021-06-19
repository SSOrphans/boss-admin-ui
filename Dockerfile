from node:14
workdir /app/build
copy build .

from nginx:1.17
copy nginx.conf /etc/nginx/nginx.conf
workdir /usr/share/nginx/html
copy --from=0 /app/build .
