export enum ElementType {
  Keyword,
	Option
}

function KeywordElement(props, _children) {
  const children = new Array<any>()
  const options = new Array<any>();
  let run: null | ((...args: any[]) => any) = null; 

  for (const child of _children) {
    if(child.type == ElementType.Keyword) {
      children.push(child);
    } else if(child.type == ElementType.Option) {
      options.push(child);
    } else {
      run = child;
    }
  }

	return {
		type: ElementType.Keyword,
    children,
    ...props
	}
}

function OptionElement(props, children) {
	return {
		type: ElementType.Option,
		children,
		...props
	}
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
