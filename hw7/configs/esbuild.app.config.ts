import esbuild, {type BuildOptions} from 'esbuild';
import path from 'path';

let config: BuildOptions = {
    outdir: 'dist',
    format: 'esm',
    entryPoints: [path.resolve(process.cwd(), 'app', 'index.ts')],
};
if (!isDev()) {
    config = {
        ...config,
        bundle: true,
        minify: true,
        sourcemap: true,
        splitting: true,
        treeShaking: true
    };
    await esbuild.build(config);
}
if (isDev()) {
    config = {
        ...config,
    };
    const context = await esbuild.context(config);
    await context.watch();
    const port = 8086;
    console.log(`serving: http://localhost:${port}`);
    await context.serve({port: 8086});
}


function isDev() {
    const args = process.argv.slice(2);
    return args.includes('dev');
}