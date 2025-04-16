import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

                    {/* 글로벌 CSS 파일 로드 */}
                    <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="/assets/vendor/font-awesome/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="/assets/vendor/linearicons/style.css" />
                    <link rel="stylesheet" href="/assets/vendor/chartist/css/chartist-custom.css" />
                    <link rel="stylesheet" href="/assets/css/main.css" />
                    <link rel="stylesheet" href="/assets/css/demo.css" />
                    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/favicon.png" />

                    {/* 추가된 스타일 파일 */}
                    <link rel="stylesheet" href="/globals.css" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
