import Head from 'next/head'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {HelloServiceClient} from "../../proto/hello_grpc_web_pb";
import {HelloRequest} from "../../proto/hello_pb";

const inter = Inter({subsets: ['latin']})

export default function Home() {
  const [text, setText] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }
    console.log('test')

  }, [text]);

  const [message, setMessage] = useState<string>('');

  const handleSubmit = useCallback(() => {
    const client = new HelloServiceClient('http://localhost:8008', null, null);
    const req = new HelloRequest();
    req.setName(text);
    client.getHello(req, {}, (err, res) => {
      if(err) {
        console.error(err)
      } else {
        setMessage(res.getMessage())
      }
    });
  }, [text])

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
          <p>{message}</p>
        </div>
      </main>
    </>
  )
}
