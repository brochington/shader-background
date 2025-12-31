import { ShaderPlugin } from '../core/types';
export declare class ShaderBackgroundElement extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    set plugin(plugin: ShaderPlugin);
    get plugin(): ShaderPlugin;
    set renderScale(value: number);
    get renderScale(): number;
    set singleRender(value: boolean);
    get singleRender(): boolean;
    render(): void;
    init(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
