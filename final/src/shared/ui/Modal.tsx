import { FC, MouseEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	close: () => void;
};

export const CustomModal: FC<Props> = (props) => {
	const container = document.getElementById('modal-root');
	if (!container) {
		throw new Error("No element with id 'modal-root'");
	}
	const closeElementRef = useRef<HTMLButtonElement | null>(null);
	const close = (e: MouseEvent) => {
		props.close();
		e.stopPropagation();
	};
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			e.preventDefault();
			if (e.key === 'Escape') {
				props.close();
			}
			e.stopPropagation();
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [props]);
	useEffect(() => {
		if (!closeElementRef.current) {
			return;
		}
		closeElementRef.current.focus();
	}, []);
	return createPortal(
		<>
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: '100vw',
					height: '100vh',
					backgroundColor: 'gray',
					opacity: 0.5,
				}}
				onClick={close}></div>
			<div
				style={{
					position: 'absolute',
					left: '50vw',
					top: '50vh',
					transform: 'translate(-50%, -50%)',
					backgroundColor: 'white',
				}}>
				<header>
					<span>This is modal header </span>
					<button onClick={close} ref={closeElementRef}>
						&#10060;
					</button>
				</header>
				<hr />
				<div>This is modal</div>
			</div>
		</>,
		container
	);
};
