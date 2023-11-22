// GENERATED CODE -- DO NOT EDIT!

// package: hello
// file: proto/hello.proto

import * as proto_hello_pb from "../proto/hello_pb";
import * as grpc from "@grpc/grpc-js";

interface IHelloServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getHello: grpc.MethodDefinition<proto_hello_pb.HelloRequest, proto_hello_pb.HelloResponse>;
}

export const HelloServiceService: IHelloServiceService;

export interface IHelloServiceServer extends grpc.UntypedServiceImplementation {
  getHello: grpc.handleUnaryCall<proto_hello_pb.HelloRequest, proto_hello_pb.HelloResponse>;
}

export class HelloServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getHello(argument: proto_hello_pb.HelloRequest, callback: grpc.requestCallback<proto_hello_pb.HelloResponse>): grpc.ClientUnaryCall;
  getHello(argument: proto_hello_pb.HelloRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_hello_pb.HelloResponse>): grpc.ClientUnaryCall;
  getHello(argument: proto_hello_pb.HelloRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_hello_pb.HelloResponse>): grpc.ClientUnaryCall;
}
