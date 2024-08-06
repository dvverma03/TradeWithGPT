import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const TradingViewWidget = () => {
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    fetchHtmlContent();
  }, []);

  const fetchHtmlContent = async () => {
    // Simulate an asynchronous fetch with a timeout
    setLoading(true);
    setTimeout(() => {
      const fetchedHtmlContent = `
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
      setHtmlContent(fetchedHtmlContent);
    }, 2000); // Simulate a 2-second fetch delay
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {htmlContent && (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
          onLoad={() => setLoading(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: height / 2 - 20, // Center the loader
    left: width / 2 - 20, // Center the loader
  },
  webview: {
    flex: 1,
  },
});

export default TradingViewWidget;
