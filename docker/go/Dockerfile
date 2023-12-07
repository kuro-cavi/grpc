FROM golang:1.20-alpine

WORKDIR /app

#RUN go mod tidy

#CMD ["go", "run", "/app/main.go"]

COPY ../../server/go.mod .
COPY ../../server/go.sum .
RUN go mod tidy
