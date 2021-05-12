import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* <script type="text/javascript" id="MathJax-script" async
                        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/latest?tex-mml-chtml.js">
                    </script> */}
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.10/dist/katex.min.css" integrity="sha384-0cCFrwW/0bAk1Z/6IMgIyNU3kfTcNirlObr4WjrUU7+hZeD6ravdYJ3kPWSeC31M" crossOrigin="anonymous" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument