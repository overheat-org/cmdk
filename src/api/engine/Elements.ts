export class Keyword {
    children = new Map<string, Keyword>();
    options: { [key: string]: unknown } = {};
    run?: (...args: any[]) => any;
    
    constructor(public id: string) {}
}

export class Option {
    autocomplete = false;
    children = new Map<string, Keyword>();
    
    constructor(public id: string, public type: string) {}
}