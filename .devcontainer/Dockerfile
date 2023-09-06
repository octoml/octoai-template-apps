FROM ubuntu:22.04

ENV NODE_MAJOR=20
RUN apt-get update --fix-missing
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update --fix-missing
RUN apt-get install -y \
    git \
    nodejs \
    python3 \
    python-is-python3 \
    python3-pip

RUN corepack enable && \
    yarn init -2

# RUN wget https://nodejs.org/dist/v18.17.1/node-v18.17.1-linux-x64.tar.xz && \

WORKDIR /usr/dev

COPY . .

CMD bash
