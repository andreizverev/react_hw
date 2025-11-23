import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sort } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { CustomModal } from 'shared/ui/Modal';

export const App = () => {
	const sortRef = useRef<SVGSVGElement>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const close = () => {
		setModalVisible(false);
		if (sortRef.current == null) {
			return;
		}
		sortRef.current.focus();
	};
	return (
		<>
			<Header />
			<Sort onClick={() => setModalVisible((p) => !p)} ref={sortRef} />
			{modalVisible && <CustomModal close={close} />}
			<Outlet />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<Footer />
		</>
	);
};
