import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { cleandir } from "rollup-plugin-cleandir";

export default [
    {
        input: 'src/main.ts',
        output: [
            {
                file: 'dist/bundle.cjs.min.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/bundle.es.min.js',
                format: 'es',
                sourcemap: true,
            },
            {
                file: 'dist/bundle.umd.min.js',
                format: 'umd',
                name: 'MyBundle',
                sourcemap: true,
            }
        ],
        plugins: [
            cleandir('./dist'), 
            esbuild({
                minify: true,
            })
        ]
    },
    {
        input: 'src/main.ts',
        output: [
            {
                file: `dist/bundle.d.ts`,
                format: 'es',
            },
        ],
        plugins: [dts()]
    }
]