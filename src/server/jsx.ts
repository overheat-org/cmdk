import { commands } from "./main";

Object.assign(global, { _JSX: __JSX, _: void 0 });

export enum ElementType {
	Command,
	SubCommand,
	Run,
	Option
}

function __JSX(type: string, props, ...children) {
	const acceptedTypes = {
		cmd: CommandElement,
		subcmd: SubCommandElement,
		run: RunElement,
		opt: OptionElement
	}

	return acceptedTypes[type](props, children);
}


function CommandElement(props, children) {
	const command = {
		type: ElementType.Command,
		children,
		...props
	}

	commands.set(command.name, command);

	return command;
}

function SubCommandElement(props, children) {
	return {
		type: ElementType.SubCommand,
		children,
		...props
	}
}

function RunElement(props) {
	return {
		type: ElementType.Run,
		fn: props.fn
	}
}

function OptionElement(props, children) {
	return {
		type: ElementType.Option,
		children,
		...props
	}
}

declare global {
	let _: any;
	const _JSX: typeof __JSX

	namespace JSX {
		interface IntrinsicElements {
			cmd: {
				name: string,
				children: any
			},
			subcmd: {
				name: string,
				children?: any
			},
			run: {
				fn: (...args: any[]) => any
			}
			opt: {
				name: string,
				type: string,
				autocomplete?: boolean,
				children?: any
			}
		}
	}
}

export {}