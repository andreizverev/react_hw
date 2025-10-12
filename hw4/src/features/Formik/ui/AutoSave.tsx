import { useFormikContext } from 'formik';
import { useEffect, useRef, useState, type FC } from 'react';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { FORMS_LS_KEY } from '@/shared/configs/constants';
import { saveToLocaleStorage } from '@/shared/lib/localStorage';
import { FORM_LS_KEY } from '../config';

export const AutoSave: FC = () => {
    const { values, dirty } = useFormikContext();

    const [showAutoSaveMsg, setShowAutoSaveMsg] = useState(false);

    const metaInfo = useRef({
        isActive: false,
        lastValues: values,
    });

    useEffect(() => {
        metaInfo.current.lastValues = values;

        if (!dirty || metaInfo.current.isActive) {
            return;
        }

        metaInfo.current.isActive = true;

        setTimeout(() => {
            saveToLocaleStorage({
                state: metaInfo.current.lastValues,
                key: FORMS_LS_KEY,
                subTitle: FORM_LS_KEY,
            });

            metaInfo.current.isActive = false;

            setShowAutoSaveMsg(true);
            setTimeout(() => setShowAutoSaveMsg(false), 5e2);
        }, 1e3);
    }, [dirty, values]);

    return (
        showAutoSaveMsg && (
            <Alert sx={{ mb: 2 }} icon={<CheckIcon fontSize="inherit" />} severity="info">
                Данные формы сохранены
            </Alert>
        )
    );
};
