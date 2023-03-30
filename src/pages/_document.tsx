import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head title="Movies APP" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
                rel="stylesheet"
            ></link>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
