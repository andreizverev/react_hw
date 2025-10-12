import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useMemo, type FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Field, FieldArray, Form, Formik, type FormikHelpers } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { formHandler } from '@/shared/lib/forms';
import { getMessageFromError } from '@/shared/lib/common';
import { createInitialsValues, validationSchema, type FormValues } from '../model';
import { AutoSave } from './AutoSave';
import { clearLS, loadFromLS } from '@/shared/lib/localStorage';
import { FORMS_LS_KEY } from '@/shared/configs/constants';
import { FORM_LS_KEY } from '../config';
import { LostDataModal } from './LostDataModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const FormikForm: FC = () => {
    const navigate = useNavigate();

    const initialValues = useMemo(() => {
        const valuesFromLS = loadFromLS<FormValues>({
            key: FORMS_LS_KEY,
            subTitle: FORM_LS_KEY,
        });

        return createInitialsValues(valuesFromLS);
    }, []);

    const submitHandler = async (formValues: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            await formHandler(formValues);

            toast.success('Форма успешно отправлена');

            formikHelpers.resetForm();

            clearLS({
                key: FORMS_LS_KEY,
                subTitle: FORM_LS_KEY,
            });

            setTimeout(() => navigate('/'), 10);
        } catch (error) {
            toast.error(getMessageFromError(error));
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
            {({ values, handleChange, handleBlur, isSubmitting, isValid, errors }) => (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexFlow: 'column',
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 4 }}>
                        Formik form
                    </Typography>
                    <Container maxWidth="sm">
                        <Form>
                            <TextField
                                required
                                value={values.firstName}
                                type="text"
                                name="firstName"
                                sx={{ width: '100%' }}
                                label="Имя"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isMiddleNameRequired"
                                        checked={values.isMiddleNameRequired}
                                        onChange={handleChange}
                                    />
                                }
                                label="Отчество"
                            />
                            {values.isMiddleNameRequired && (
                                <TextField
                                    name="middleName"
                                    value={values.middleName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ width: '100%', mb: 2 }}
                                    label="Отчество"
                                    variant="outlined"
                                    error={!!errors.middleName}
                                    helperText={errors.middleName}
                                />
                            )}
                            <TextField
                                required
                                name="lastName"
                                onChange={handleChange}
                                value={values.lastName}
                                onBlur={handleBlur}
                                sx={{ width: '100%', mb: 4 }}
                                label="Фамилия"
                                variant="outlined"
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                            <Divider variant="middle" sx={{ mb: 4 }} />
                            <FieldArray
                                name="skills"
                                render={(arrayHelpers) => (
                                    <>
                                        {values.skills.map((_, index) => (
                                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }} key={index}>
                                                <Field
                                                    as={TextField}
                                                    required
                                                    variant="outlined"
                                                    name={`skills.${index}`}
                                                    label={`Навык ${index + 1}`}
                                                    sx={{ width: '100%' }}
                                                    error={Array.isArray(errors.skills) && errors.skills[index]}
                                                    helperText={Array.isArray(errors.skills) && errors.skills[index]}
                                                />
                                                {Boolean(index) && (
                                                    <IconButton
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        sx={{ ml: 2, mt: '12px' }}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        ))}

                                        <Button
                                            onClick={() => arrayHelpers.push('')}
                                            color="primary"
                                            sx={{ mb: 4 }}
                                            startIcon={<AddIcon />}
                                            disabled={Array.isArray(errors.skills) && !!errors.skills.length}
                                        >
                                            Добавить навык
                                        </Button>
                                    </>
                                )}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    sx={{ mb: 2 }}
                                    disabled={!isValid}
                                    loading={isSubmitting}
                                    variant="contained"
                                    type="submit"
                                >
                                    Отправить
                                </Button>
                            </Box>
                            <AutoSave />
                            <LostDataModal />
                        </Form>
                    </Container>
                </Box>
            )}
        </Formik>
    );
};
