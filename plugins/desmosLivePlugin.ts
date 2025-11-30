import type { Browser, Page } from "playwright";
import { chromium } from "playwright";
import type { PluginOption } from "vite";

export type DesmosLivePluginOptions = {
  target?: "calculator" | "geometry";
  expressionsCollapsedByDefault?: boolean;
};

export function desmosLivePlugin({
  target = "calculator",
  expressionsCollapsedByDefault=false,
}: DesmosLivePluginOptions = {}): PluginOption {
  // Browser + page promise
  const browserReady = (async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const page: Page = await browser.newPage({ viewport: null });

    page.on("console", (msg) => console.log("BROWSER:", msg.text()));
    browser.on("disconnected", () => {
      console.log("Browser closed, exiting.");
      process.exit(0);
    });

    await page.goto(`https://www.desmos.com/${target}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector(".dcg-container");
    await page.waitForFunction(() => (window as any).Calc !== undefined);
    if (expressionsCollapsedByDefault) {
        await page.evaluate(()=>{
            (window as any).Calc.updateSettings({
                expressionsCollapsed: true
            })
        })
    }

    console.log("✅ Desmos ready in browser");

    return { browser, page };
  })();

  return {
    name: "desmos-live",
    apply: "build",
    async buildStart() {
      // ensure browser is launched before build
      await browserReady;
    },
    async generateBundle(_options, bundle) {
      const { page } = await browserReady;

      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === "chunk") {
          try {
            await page.evaluate(chunk.code);
            console.log(`Injected ${fileName} into Desmos`);
          } catch (err) {
            console.error(`Failed to inject ${fileName}:`, err);
          }
        }
      }
    },
  };
}
