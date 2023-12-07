
import { useState, useEffect } from 'react'

import { MessageServiceClient } from '../../proto/message_grpc_web_pb'
import { SendMessageRequest, ReceiveResponse } from "../../proto/message_pb"

import { Empty } from 'google-protobuf/google/protobuf/empty_pb'

export const useMessage = (client: MessageServiceClient): [string[], (message: string) => void] => {
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        const stream = client.receiveMessage(new Empty())
        stream.on('data', (res: ReceiveResponse) => {
            setMessages((prevMessages) => [...(prevMessages ?? []), res.getMessage()])
            console.log('Message receive:', res.getMessage())
        })

        return () => {
            stream.cancel()
        }
    }, [client])

    const sendMessage = (message: string) => {
        const req = new SendMessageRequest()
        req.setMessage(message)

        client.sendMessage(req, {}, (err, response) => {
            if (err) {
                console.error(err)
            } else {
                console.log('Message sent:', response.getResult())
            }
        });
    }

    return [ messages, sendMessage ]
}