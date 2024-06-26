import { Keyword, Option } from "./engine";

function KeywordElement(props, children) {
	const keyword = new Keyword(props.id);

	for (const child of children) {
		switch (true) {
			case child instanceof Keyword:
				keyword.children.set(child.id, child);
				break;

			case child instanceof Option:
				keyword.options[child.id] = child.type;
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

type CmdResolvableReturn = JSX.Element | ((opts: any) => unknown);

declare global {
	type _JSX = typeof _JSX;

	namespace JSX {
		interface IntrinsicElements {
			keyword: {
				id: string,
				children: CmdResolvableReturn | CmdResolvableReturn[]
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
