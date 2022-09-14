/* eslint-disable no-var */
/* eslint-disable prefer-const */
/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {Buffer} from 'buffer'

window.Buffer=Buffer
window.process={title:'browser',stderr:null} as any


 // eslint-disable-next-line @typescript-eslint/no-unused-vars
