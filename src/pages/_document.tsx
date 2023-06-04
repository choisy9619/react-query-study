import Document, { Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=block"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700;900&display=block"
                        rel="stylesheet"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            var browse = navigator.userAgent.toLowerCase();

                            if ((navigator.appName == 'Netscape' && browse.indexOf('trident') != -1) || (browse.indexOf('msie') != -1)) {
                                var pathname = window.location.pathname;
                                var url = '/unsupported.html';
                                var enUrl = '/unsupported-en.html';
                                document.write('');
                                window.location.replace(pathname.indexOf('en') != -1 ? enUrl : url);
                            }
                            `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
export default CustomDocument;
