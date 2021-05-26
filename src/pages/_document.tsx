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
                    <meta name="title" content="DogePhysics —  Interactive Physics Simulations — The Fastest and Easiest Way of Learning Physics" />
                    <meta name="description" content="You can use DogePhysics to play with our interactive simulations, and effectively take your physics learning to the moon! You can complete missions to gain further understanding on the topic." />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.dogephysics.ga/" />
                    <meta property="og:title" content="DogePhysics —  Interactive Physics Simulations — The Fastest and Easiest Way of Learning Physics" />
                    <meta property="og:description" content="You can use DogePhysics to play with our interactive simulations, and effectively take your physics learning to the moon! You can complete missions to gain further understanding on the topic." />
                    <meta property="og:image" content="/dogephysics/apple-icon-180x180.png" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://www.dogephysics.ga/" />
                    <meta property="twitter:title" content="DogePhysics —  Interactive Physics Simulations — The Fastest and Easiest Way of Learning Physics" />
                    <meta property="twitter:description" content="You can use DogePhysics to play with our interactive simulations, and effectively take your physics learning to the moon! You can complete missions to gain further understanding on the topic." />
                    <meta property="twitter:image" content="/dogephysics/apple-icon-180x180.png" />

                    <link rel="apple-touch-icon" sizes="57x57" href="/dogephysics/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/dogephysics/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/dogephysics/apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/dogephysics/apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/dogephysics/apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/dogephysics/apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/dogephysics/apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/dogephysics/apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/dogephysics/apple-icon-180x180.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="/dogephysics/android-icon-192x192.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/dogephysics/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/dogephysics/favicon-96x96.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/dogephysics/favicon-16x16.png" />
                    <link rel="manifest" href="/dogephysics/manifest.json" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="msapplication-TileImage" content="/dogephysics/ms-icon-144x144.png" />
                    <meta name="theme-color" content="#ffffff" />

                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.10/dist/katex.min.css" integrity="sha384-0cCFrwW/0bAk1Z/6IMgIyNU3kfTcNirlObr4WjrUU7+hZeD6ravdYJ3kPWSeC31M" crossOrigin="anonymous" />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet" />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,400&display=swap" rel="stylesheet"></link>

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