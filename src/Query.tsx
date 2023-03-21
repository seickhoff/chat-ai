import { useRef, useState } from "react";
import { Alert, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "./Query.module.css"

const data: [] = []

async function doFetch(request: string) {
    const response = await fetch('http://localhost:8090', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "q": request })
    });
    const json = await response.json();

    return json
}

export function Query() {

    const [list, setList] = useState<any[]>(data)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const refContainer = useRef(null)

    async function handleQuery() {

        // @ts-ignore: Object is possibly 'null'.
        const request = refContainer.current.value

        // needs a value to continue
        if (!request) {
            return
        }

        setIsLoading(true)
        const response = await doFetch(request)
        setIsLoading(false)

        //const key = list.length + 1;
        const record = {
            request: `${request}`,
            response: `${response}`,
            key: `${list.length + 1}`
        }

        setList(prevState => {
            console.dir([record, ...prevState])
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
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
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

