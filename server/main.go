package main

import (
    "context"
	"log"
	"net"
	"os"
	"os/signal"
	"sync"

    pb "g-prc/proto"
	
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/protobuf/types/known/emptypb"
)

type messageServer struct {
	pb.UnimplementedMessageServiceServer
	mu       sync.Mutex
	messages []string
}

func (s *messageServer) SendMessage(ctx context.Context, req *pb.SendMessageRequest) (*pb.SendMessageResponse, error) {
	// s.mu.Lock()
    // defer s.mu.Unlock()

    s.messages = append(s.messages, req.GetMessage())
    return &pb.SendMessageResponse{ Result: "ok" }, nil
}

func (s *messageServer) ReceiveMessage(empty *emptypb.Empty, stream pb.MessageService_ReceiveMessageServer) error {
    // s.mu.Lock()
    // defer s.mu.Unlock()

    for _, msg := range s.messages {
		if err := stream.Send(&pb.ReceiveResponse{
			Message: msg,
		}); err != nil {
			return err
		}
    }

	previousLen := len(s.messages)
	for {
		currentLen := len(s.messages)
		if previousLen < currentLen {
            receveMsg := s.messages[currentLen-1]
            if err := stream.Send(&pb.ReceiveResponse{
				Message: receveMsg,
			}); err != nil {
                return err
            }
        }
		previousLen = currentLen
	}
}

func NewServer() *messageServer {
	return &messageServer{}
}

func main() {
	lis, err := net.Listen("tcp", "0.0.0.0:55050")
	if err != nil {
		log.Fatal(err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterMessageServiceServer(grpcServer, NewServer())
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
