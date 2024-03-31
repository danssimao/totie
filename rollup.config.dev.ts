import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { cleandir } from "rollup-plugin-cleandir";

export default [
    {
        input: 'src/main.ts',
        output: [
            {
                file: 'dist/bundle.cjs.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/bundle.es.js',
                format: 'es',
                sourcemap: true,
            },
            {
                file: 'dist/bundle.umd.js',
                format: 'umd',
                name: 'MyBundle',
                sourcemap: true,
            }
        ],
        plugins: [
            cleandir('./dist'), 
            esbuild(),
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