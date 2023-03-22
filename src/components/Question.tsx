import { Alert } from "react-bootstrap"

type Props = {
    id: string
    request: string
}

export function Question(props: Props) {

    return (
        <Alert key={props.id} variant="success">
            {props.id}) {props.request}
        </Alert>
    )
}