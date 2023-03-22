
import { useRef, useState } from "react"
import { Alert, Button, Form, InputGroup, Spinner } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import styles from "./AppContainer.module.css"

// ipconfig / ifconfig
const SERVICE_IP = '192.168.1.195'
const SERVICE_PORT = 3000

const data: [] = []

async function doFetch(request: string) {
    const response = await fetch(`http://${SERVICE_IP}:${SERVICE_PORT}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "q": request })
    });
    const json = await response.json();

    return json
}

export function AppContainer() {

    const [list, setList] = useState<any[]>(data)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const refContainer = useRef<HTMLInputElement>(null)

    async function handleQuery() {

        const request = refContainer.current?.value

        // ignore empty requests
        if (!request) {
            return
        }

        setIsLoading(true)
        
        // call server
        const response = await doFetch(request)
        
        setIsLoading(false)

        const record = {
            request: `${request}`,
            response: `${response}`,
            key: `${list.length + 1}`
        }

        setList(prevState => {
            return [record, ...prevState];
        })
    }

    return (
        <>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Enter your question"
                    aria-label="Enter your question"
                    aria-describedby="basic-input"
                    ref={refContainer}
                />
                {isLoading == false && (
                    <Button
                        variant="primary"
                        id="button-input"
                        type="submit"
                        onClick={handleQuery}
                    >
                        Submit
                    </Button>
                )}
                {isLoading == true && (
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </Button>
                )}

            </InputGroup>

            {list.map((data) => (
                <div className={`${styles.pairContainer}`}>

                    <Alert key={data.key} variant="success">
                        {data.key}) {data.request}
                    </Alert>

                    <div className={`${styles.responseContainer}`}>

                        <ReactMarkdown
                            className={`border rounded p-4 table ${styles.markdownBackground}`}
                            remarkPlugins={[remarkGfm]}
                        >
                            {data.response}
                        </ReactMarkdown>

                    </div>

                </div>
            ))}
        </>
    )
}

