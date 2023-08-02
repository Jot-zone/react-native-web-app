const POST_STYLES = `
    <style>
        * {
            font-family: sans-serif;
            max-width: 100%;
        }

        p {
            margin: 0;
        }
    </style>
`

export default function BlogPostContent({ blogPostContent }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: POST_STYLES + blogPostContent }} />
    );
}
