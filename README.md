# gRPC
* [grpc](https://grpc.io/) 
  * [Go](https://grpc.io/docs/languages/go/quickstart/)
  * [Web](https://grpc.io/docs/platforms/web/)
  * [Web(example)](https://github.com/grpc/grpc-web)
* [Envoy](https://www.envoyproxy.io/)
* [Next.js](https://nextjs.org/)
* [Go](https://go.dev/)

# Docker
```bash
docker-compose up -d

# CLI Workspace
docker-compose exec workspace bash
```

# Protoc
```bash
# to Go
protoc --go_out=./server --go_opt=paths=source_relative \
 	--go-grpc_out=./server --go-grpc_opt=paths=source_relative \
  ./proto/*.proto

# to Ts
protoc --js_out=import_style=commonjs,binary:./client \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./client \
  --ts_out=service=grpc-node,mode=grpc-js:./client \
  ./proto/*.proto
```

# grpcurl
```bash
# Services
grpcurl -plaintext server:55050 list

# Methods
grpcurl -plaintext server:55050 list hello.HelloService

# Call Method
grpcurl -plaintext -d '{"name": "test!"}' server:55050 hello.HelloService.GetHello
```
