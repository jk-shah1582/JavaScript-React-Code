import { useParams } from "react-router-dom";
export default function ContactUs() {
    const { id } = useParams();
    return <h1>This is Contact of {id}</h1>;
}