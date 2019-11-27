import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';
import theme from '../configs/theme';
import absoluteUrl from 'next-absolute-url'
import Domain from '../utils/domain'

class MyDocument extends Document {
  get domainPrefix() {
    const { subdomain } = this.props
    // return subdomain ? subdomain : 'default'
    return 'default'
  }

  get appTitle() {
    const subdomain = this.domainPrefix
    return subdomain === 'default' ? 'ClusterCubes' : subdomain.toUpperCase()
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, user-scalable=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,500,700,800,900&display=swap" />
          <link rel="manifest" href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/manifest.json`} />

          {/* apple touch */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="apple-mobile-web-app-title" content={this.appTitle} />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <link rel="apple-touch-icon" sizes="180x180" href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/icons/apple-touch-icon.png`} />
            
          {/* favicons */}
          <link rel="icon" type="image/png" sizes="32x32" href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/icons/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/icons/favicon-16x16.png`} />
          <link rel="mask-icon" href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/icons/safari-pinned-tab.svg`} color="#5bbad5" />

          {/* splashscreens */}
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/iphone5_splash.png`} media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/iphone6_splash.png`} media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/iphoneplus_splash.png`} media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/iphonex_splash.png`} media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/iphonexr_splash.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/iphonexsmax_splash.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/ipad_splash.png`} media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/ipadpro1_splash.png`} media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/ipadpro3_splash.png`} media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href={`https://cluster-cubes-staging.s3-ap-southeast-1.amazonaws.com/${this.domainPrefix}/splashscreens/ipadpro2_splash.png`} media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            
          {/* external */}
          <script src="//www.tracking.my/track-button.js"></script>
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const req = ctx.req ? ctx.req : null

  const { protocol, host } = absoluteUrl(ctx.req)
  const subdomain = await Domain.subdomain(host)

  return {
    ...initialProps,
    req: req,
    subdomain: subdomain,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {sheets.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
