import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, Col, Container, Row, Stack } from "react-bootstrap"


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


    const scalingFactor = 0.5
    const inputRef = useRef<HTMLDivElement>(null)

    const printDocument = () => {

        html2canvas(inputRef.current!).then((canvas) => {

            const orientation = (canvas.height >= canvas.width) ? 'portrait' : 'landscape'
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: orientation,
                unit: "px",
                format: [canvas.width * scalingFactor, canvas.height * scalingFactor]
            })

            pdf.addImage(imgData, "png", 0, 0, canvas.width * scalingFactor, canvas.height * scalingFactor);
            pdf.save(generateDownloadFilename())
        })
    }

    return (
        <>
            {myData.length > 0 &&
                <Container fluid>
                    <Stack gap={2} className="col-md-6 mx-auto">
                        <Button
                            className={`${styles.printButton}`}
                            onClick={printDocument}
                            variant="outline-warning"
                        >
                            Download conversation to PDF image
                        </Button>
                    </Stack>

                </Container>
            }

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

