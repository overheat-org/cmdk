export enum ElementType {
	Keyword,
	Option
}

export class Keyword {
	children = new Map<string, Keyword>();
	options: { [key: string]: unknown } = {};
	run?: ((...args: any[]) => any);
	
	constructor(
		public id: string
	) {}
}

export class Option {
	autocomplete = false;
	children = new Map<string, Keyword>();
	
	constructor(
		public id: string,
		public type: string
	) {}
}

function KeywordElement(props, children) {
	const keyword = new Keyword(props.id);

	for (const child of children) {
		switch (child.type) {
			case ElementType.Keyword:
				keyword.children.set(child.id, child);
				break;

			case ElementType.Option:
				keyword.options[child.id] = child.value;
				break;

			default:
				keyword.run = child;
				break;
		}
	}

	return keyword;
}

function OptionElement(props, children) {
	const option = new Option(props.id, props.type);

	if(props.autocomplete) 
		option.autocomplete = true;
	
	return option;
}

const elementsMap = {
	keyword: KeywordElement,
	opt: OptionElement
}

function _JSX(type: string, props, ...children) {
	return elementsMap[type](props, children);
}

Object.assign(global, { _JSX });

type CmdResovableReturn = JSX.Element | ((opts: any) => unknown);

declare global {
	type _JSX = typeof _JSX;

	namespace JSX {
		interface IntrinsicElements {
			keyword: {
				id: string,
				children: CmdResovableReturn | CmdResovableReturn[]
			},
			opt: {
				id: string,
				type: string,
				autocomplete?: boolean,
				children?: any
			}
		}
	}
}
