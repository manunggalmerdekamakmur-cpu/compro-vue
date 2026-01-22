import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { transform } from "lightningcss";

export default function viteCssPlugin() {
  return {
    name: "vite-css-plugin",

    transform(code, id) {
      if (id.endsWith(".css")) {
        const result = transform({
          filename: id,
          code: Buffer.from(code),
          minify: true,
          sourceMap: false,
          targets: {
            chrome: 90,
            firefox: 88,
            safari: 14,
            edge: 90,
          },
        });

        return {
          code: result.code.toString(),
          map: null,
        };
      }
    },

    writeBundle() {
      const cssFiles = [
        resolve(__dirname, "assets/css/style.css"),
        resolve(__dirname, "assets/css/product.css"),
      ];

      cssFiles.forEach((cssFile) => {
        if (existsSync(cssFile)) {
          const cssContent = readFileSync(cssFile, "utf-8");

          const result = transform({
            filename: cssFile,
            code: Buffer.from(cssContent),
            minify: true,
            sourceMap: false,
          });

          writeFileSync(cssFile, result.code.toString());
        }
      });
    },
  };
}
