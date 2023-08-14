const POST_STYLES = `
    <style>
        * {
            font-family: sans-serif;
            max-width: 100%;
        }

        p {
            margin: 0;
        }

        pre {
            background: #e8ffe8;
            padding: 0.5em 10px;
            border-radius: 3px;
        }

        blockquote {
            background: #f9f9f9;
            border-left: 10px solid #ccc;
            margin: 1.5em 10px;
            padding: 0.5em 10px;
        }

        blockquote p {
            display: inline;
        }

        .ql-video {
            width: 100%;
            aspect-ratio: 16 / 9;
        }
    </style>
`

export default function BlogPostContent({ blogPostContent }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: POST_STYLES + blogPostContent }} />
    );
}
