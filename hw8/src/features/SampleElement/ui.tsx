export type Props = {
    text: string
};

export function Element(props: Props) {
    return <div style={{border: '1px solid black'}}>{props.text}</div>;
}