FROM nginx:1.21.0-alpine

# Install certbot for letsencrypt certificates
RUN apk add --no-cache certbot

# Replace existing files by our own configs
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

# We use a small hack with envsubst to pass variables to our Nginx config file.
# The variables in Nginx needs to be in this specific format: ${FOO}. That's why
# we create also a DOLLAR variable to add the "real" $ in our config flask_app.conf
# ex: $host needs to be set as ${DOLLAR}host
ARG DOMAIN
ARG EMAIL

ENV DOMAIN=$DOMAIN
ENV EMAIL=$EMAIL
ENV DOLLAR='$'

# Directory needed for LetEncrypt certificates renewal
RUN mkdir /var/lib/certbot

# App entrypoint and auto-renewal scripts
COPY ./bin/entrypoint.sh /entrypoint.sh
COPY ./bin/renew /etc/periodic/weekly/renew
RUN chmod +x /entrypoint.sh \
  && chmod +x /etc/periodic/weekly/renew

# Install certificates and launch
ENTRYPOINT ../entrypoint.sh $DOMAIN $EMAIL
