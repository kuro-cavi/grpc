FROM node:20.9.0 as node
FROM golang:1.20

# Install Protocol Buffer
RUN apt-get update \
    && apt-get install -y protobuf-compiler
# Install protoc Plugins
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
# Install grp Tools
RUN go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# Install Node
COPY --from=node /usr/local/bin/node /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

# Install protoc Plugins
RUN npm install -g protoc-gen-js protoc-gen-grpc-web ts-protoc-gen

WORKDIR /workspace
