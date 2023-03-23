import { Alert } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Question } from "./Question"
import { Response } from "./Response"

import styles from "./PairContainer.module.css"

interface Record {
    id: string;
    request: string;
    response: string;
}

type PairContainerProps = {
    myData: Record[]
}

let keyCount = 0

export function PairContainer({ myData }: PairContainerProps) {

    return (
        <>
            {myData.map((data) => (
                <div key={keyCount++} className={`${styles.pairContainer}`}>
                    <Question {...data} />
                    <Response {...data} />
                </div>
            ))}
        </>
    )
}

