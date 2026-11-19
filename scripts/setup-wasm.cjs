// Ensure rollup has the wasm fallback on systems with Application Control
const fs = require('fs');
const path = require('path');

const rollupNativePath = path.join(__dirname, '..', 'node_modules', 'rollup', 'dist', 'native.js');

if (fs.existsSync(rollupNativePath)) {
  let content = fs.readFileSync(rollupNativePath, 'utf8');
  if (content.includes("error.code === 'ERR_DLOPEN_FAILED'")) {
    if (!content.includes("@rollup/wasm-node/dist/native.js")) {
      content = content.replace(
        /if\s*\(\s*error\s+instanceof\s+Error\s*&&\s*error\.code\s*===\s*'ERR_DLOPEN_FAILED'\s*\)\s*\{[\s\S]*?throw error;[\s\S]*?\}/,
        `if (error instanceof Error && error.code === 'ERR_DLOPEN_FAILED') {
			try {
				return require('@rollup/wasm-node/dist/native.js');
			} catch (_) {
				throw error;
			}
		}`
      );
      fs.writeFileSync(rollupNativePath, content, 'utf8');
      console.log('✓ Rollup wasm fallback successfully applied');
    }
  }
}

