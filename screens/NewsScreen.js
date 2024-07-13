import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import ActiveIndicator from '../components/ActiveIndecator';

const { width, height } = Dimensions.get('window');

const TradingViewWidget = () => {
  const [loading, setLoading] = useState(true);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .tradingview-widget-container {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <!-- TradingView Widget BEGIN -->
        <div class="tradingview-widget-container">
          <div id="tradingview_widget"></div>
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
          {
            "feedMode": "all_symbols",
            "isTransparent": false,
            "displayMode": "regular",
            "width": "100%",
            "height": "100%",
            "colorTheme": "dark",
            "locale": "en"
          }
          </script>
        </div>
        <!-- TradingView Widget END -->
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {loading && <ActiveIndicator />}
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: width,
    height: height - 50, // Adjust height as necessary
  },
});

export default TradingViewWidget;
