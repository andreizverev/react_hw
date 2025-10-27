import esbuild, {type BuildOptions} from 'esbuild';
import path from 'path';

const resolveFromLib = (...paths: string[]) => {
    return path.resolve(process.cwd(), 'lib', ...paths)
}
const config: BuildOptions = {
    bundle: true,
    entryPoints: [resolveFromLib('index.ts'), resolveFromLib('math.ts'), resolveFromLib('string.ts')],
    external: ['react'],
    minify: true,
    sourcemap: true
};

await esbuild.build({
    ...config,
    format: 'esm',
    outdir: 'dist/esm'
});

await esbuild.build({
    ...config,
    format: 'cjs',
    outdir: 'dist/cjs'
});