import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { useMessage } from '../hooks/useMessage'
import { MessageServiceClient } from '../../proto/message_grpc_web_pb'

const inter = Inter({subsets: ['latin']})
const client = new MessageServiceClient('http://localhost:8008')

export default function Home() {

  const [messages, sendMessage] = useMessage(client)
  const [text, setText] = useState('')

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }
    handleSubmit()

  }, [text])

  const handleSubmit = () => {
    sendMessage(text)
  }

  return (
    <>
      <Head>
        <title>gRPC App</title>
        <meta name="description" content="gRPC App"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <input
            className="input"
            type="text"
            placeholder="text"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSubmit}>
            Submit
          </button>
          <div>
            {messages && messages.map((message: string, index: number) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
