import './global.css';
import { Command } from 'cmdk';
import React from 'react';
import ReactDOM from 'react-dom';

console.log("STARTING COMPILATION")

function App() {
	const [open, setOpen] = React.useState(false);
	const container = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const KDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "k") {
				e.preventDefault();
				e.stopPropagation();

				setOpen((open) => !open);
			}
		}
		document.addEventListener("keydown", KDown)
		return () => document.removeEventListener("keydown", KDown)
	}, [])

	return (
		<div className='layerContainer_a2fcaa' style={{ display: open ? 'block' : 'none' }}>
			<div className="backdrop__1a911 withLayer__29ace" style={{background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(0px)' }} />
			<div className='layer_c14d31'>
				<div className='focusLock__28507'>
					<Command
						className='quickswitcher_b5bb0a'
						label="Global Command Menu"
					>
						<Command.Input className='input__2a648' />
						<Command.List>
							<Command.Empty>No results found.</Command.Empty>

							<Command.Group heading="Letters">
								<Command.Item>a</Command.Item>
								<Command.Item>b</Command.Item>
								<Command.Separator />
								<Command.Item>c</Command.Item>
							</Command.Group>

							<Command.Item>Apple</Command.Item>
						</Command.List>
					</Command>
				</div>
			</div>
		</div>
	)
}

const overheatElem = document.createElement('overheat');
document.body.appendChild(overheatElem);

ReactDOM.render(<App />, overheatElem);