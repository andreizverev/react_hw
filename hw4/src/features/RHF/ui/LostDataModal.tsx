import { FORMS_LS_KEY } from '@/shared/configs/constants';
import { clearLS } from '@/shared/lib/localStorage';
import { Box, Button, Modal } from '@mui/material';
import { useEffect, useState, type FC } from 'react';
import { useBlocker } from 'react-router';
import { FORM_LS_KEY } from '@/features/Formik/config';
import type { FormValues } from '../model';
import { useFormContext } from 'react-hook-form';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const LostDataModal: FC = () => {
    const [open, setOpen] = useState(false);

    const {
        formState: { isDirty },
    } = useFormContext<FormValues>();

    const handleClose = () => setOpen(false);

    const blocker = useBlocker(isDirty);

    useEffect(() => {
        setOpen(blocker.state === 'blocked');
    }, [blocker]);

    const leavePageHandler = () => {
        clearLS({
            key: FORMS_LS_KEY,
            subTitle: FORM_LS_KEY,
        });

        blocker.proceed?.();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style, width: 600 }}>
                <h2 id="child-modal-title">Вы уверены что хотите покинуть страницу?</h2>
                <p id="child-modal-description">Введенная информация будет утеряна</p>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleClose} sx={{ mx: 1 }}>
                        Остаться
                    </Button>
                    <Button sx={{ mx: 1 }} variant="contained" color="error" onClick={leavePageHandler}>
                        Уйти
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
