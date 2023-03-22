import { Alert } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import styles from "./Response.module.css"


type Props = {
    response: string
}

export function Response({ response }: Props) {

    return (
        <>
            <div className={`${styles.responseContainer}`}>
                <ReactMarkdown
                    className={`border rounded p-4 table`}
                    remarkPlugins={[remarkGfm]}
                >
                    {response}
                </ReactMarkdown>
            </div>
        </>
    )
}