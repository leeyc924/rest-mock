import { build } from 'esbuild';

build({
  entryPoints: ['./src/lambda.ts'],
  bundle: true,
  outfile: './build/index.js',
  sourcemap: true,
  platform: 'node',
  minify: true,
  target: 'es2022',
});
