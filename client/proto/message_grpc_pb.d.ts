// GENERATED CODE -- DO NOT EDIT!

// package: message
// file: proto/message.proto

import * as proto_message_pb from "../proto/message_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "@grpc/grpc-js";

interface IMessageServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sendMessage: grpc.MethodDefinition<proto_message_pb.SendMessageRequest, proto_message_pb.SendMessageResponse>;
  receiveMessage: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, proto_message_pb.ReceiveResponse>;
}

export const MessageServiceService: IMessageServiceService;

export interface IMessageServiceServer extends grpc.UntypedServiceImplementation {
  sendMessage: grpc.handleUnaryCall<proto_message_pb.SendMessageRequest, proto_message_pb.SendMessageResponse>;
  receiveMessage: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, proto_message_pb.ReceiveResponse>;
}

export class MessageServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sendMessage(argument: proto_message_pb.SendMessageRequest, callback: grpc.requestCallback<proto_message_pb.SendMessageResponse>): grpc.ClientUnaryCall;
  sendMessage(argument: proto_message_pb.SendMessageRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_message_pb.SendMessageResponse>): grpc.ClientUnaryCall;
  sendMessage(argument: proto_message_pb.SendMessageRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_message_pb.SendMessageResponse>): grpc.ClientUnaryCall;
  receiveMessage(argument: google_protobuf_empty_pb.Empty, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<proto_message_pb.ReceiveResponse>;
  receiveMessage(argument: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<proto_message_pb.ReceiveResponse>;
}
