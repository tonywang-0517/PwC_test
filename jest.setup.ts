import '@testing-library/jest-dom'
import 'jest-canvas-mock'; //for chartjs test
import * as ResizeObserverModule from 'resize-observer-polyfill';

(global as any).ResizeObserver = ResizeObserverModule.default;
