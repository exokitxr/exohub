FROM debian:latest

RUN apt-get update && \
  apt-get install -y curl python libglu1-mesa-dev xvfb && \
  apt-get clean
RUN adduser a
RUN su - a -c 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.9/install.sh | bash' && su - a -c '. /home/a/.nvm/nvm.sh; nvm install 9.11.1;'
ENV PATH $PATH:/home/a/.nvm/versions/node/v9.11.1/bin/
RUN su - a -c '. /home/a/.nvm/nvm.sh; npm i -g exokit'

ADD . /exohub
RUN chown a /exohub
WORKDIR /exohub
RUN su - a -c '. /home/a/.nvm/nvm.sh; cd /exohub && npm install'

CMD ["su", "-", "a", "-c", ". /home/a/.nvm/nvm.sh; cd /exohub && npm start"]
