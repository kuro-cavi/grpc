FROM golang:1.20-alpine

WORKDIR /app

#RUN go mod tidy

#CMD ["go", "run", "/app/main.go"]

COPY ../../server .
RUN go mod tidy
