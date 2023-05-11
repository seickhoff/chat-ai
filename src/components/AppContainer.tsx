
import { useRef, useState } from "react"
import { Button, Form, InputGroup, Spinner } from "react-bootstrap"

import { PairContainer } from "./PairContainer"

// ipconfig / ifconfig
const SERVICE_IP = '192.168.1.116'
//const SERVICE_IP = 'localhost'
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

        refContainer.current!.value = ""

        setIsLoading(false)

        const record = {
            request: `${request}`,
            response: `${response}`,
            id: `${list.length + 1}`
        }

        setList(prevState => {
            return [record, ...prevState];
        })
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleQuery()
        }
    }

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Enter your question"
                    aria-label="Enter your question"
                    aria-describedby="basic-input"
                    ref={refContainer}
                    onKeyDown={handleKeyDown}
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

            <PairContainer myData={list} />
        </>
    )
}
