package main

import (
    "context"
    "fmt"
	"log"
	"net"
	"os"
	"os/signal"

    hellopb "g-prc/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type helloServer struct {
	hellopb.UnimplementedHelloServiceServer
}

func (helloServer *helloServer) GetHello(ctx context.Context, in *hellopb.HelloRequest) (*hellopb.HelloResponse, error) {
	log.Printf("Received: %v", in.GetName())
	return &hellopb.HelloResponse{Message: fmt.Sprintf("Hello %s", in.GetName())}, nil
}

func main() {
	lis, err := net.Listen("tcp", "0.0.0.0:55050")
	if err != nil {
		log.Fatal(err)
	}

	grpcServer := grpc.NewServer()

	hellopb.RegisterHelloServiceServer(grpcServer, &helloServer{})

	reflection.Register(grpcServer)

    go func() {
		log.Printf("Starting Server")
		grpcServer.Serve(lis)
	}()

	quit := make(chan os.Signal, 1)
    signal.Notify(quit, os.Interrupt)
    <-quit

    log.Printf("Stopping Server")
    grpcServer.GracefulStop()
}
