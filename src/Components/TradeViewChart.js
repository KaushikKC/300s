import { Resizable } from 're-resizable';
import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

const style = {
    display: "flex",
    position: "absolute",
    bottom: 0,
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    // border: "solid 1px #ddd",
    // background: "#f0f0f0"
  };

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_2a3f9') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:ETHUSD",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_2a3f9"
          });
        }
      }
    },
    []
  );

  return (
    <div>
    
    <Resizable
    style={style}
    defaultSize={{
      width: "100%",
      height: 10
    }}
    >
    

    <div className='tradingview-widget-container w-full h-full'>
    <div className="h-[1.5vw] bg-slate-200 cursor-row-resize flex justify-center items-center absolute bottom-0 left-0 right-0 border-t border-violet-500"><div className="w-[10vw] h-[0.6vw] bg-violet-500 rounded-lg"></div></div>
      <div id='tradingview_2a3f9' className='h-full w-full' />
      {/* <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/symbols/ETHUSD/?exchange=BINANCE" rel="noopener" target="_blank"><span className="blue-text">Ethereum chart</span></a> by TradingView
      </div> */}
    </div>
    </Resizable>
    </div>
  );
}
