import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, Col, Container, Row } from "react-bootstrap"


import { Question } from "./Question"
import { Response } from "./Response"

import generateDownloadFilename from "../utils/helper.js"

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

    const inputRef = useRef<HTMLDivElement>(null)

    const printDocument = () => {

        const width = inputRef.current!.getBoundingClientRect().width
        const height = inputRef.current!.getBoundingClientRect().height

        html2canvas(inputRef.current!).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [width, height]
            })
            pdf.addImage(imgData, "png", 0, 0, width, height);
            pdf.save(generateDownloadFilename())
        })
    }

    return (
        <>
            {myData.length > 0 &&
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button
                                className={`${styles.printButton}`}
                                onClick={printDocument}
                                variant="outline-warning"
                            >
                                Download conversation to PDF image
                            </Button>
                        </Col>
                    </Row>
                </Container>
            }

            <div className="mb5">
                <Row className="justify-content-md-center">
                    <Col>

                    </Col>

                </Row>
            </div>
            <div id="divToPrint" ref={inputRef}>
                {myData.map((data) => (
                    <div key={keyCount++} className={`${styles.pairContainer}`}>
                        <Question {...data} />
                        <Response {...data} />
                    </div>
                ))}
            </div>
        </>
    )
}

