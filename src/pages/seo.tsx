import { Helmet } from 'react-helmet-async';
export default function SEO({ title, description, name, type }) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='author' content={name} />   
            <meta name='type' content={type} />
        </Helmet>
    )
}