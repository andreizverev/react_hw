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
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const RHFForm: FC = () => {
    const navigate = useNavigate();

    const initialValues = useMemo(() => {
        const valuesFromLS = loadFromLS<FormValues>({
            key: FORMS_LS_KEY,
            subTitle: FORM_LS_KEY,
        });

        return createInitialsValues(valuesFromLS);
    }, []);

    const form = useForm<FormValues>({
        defaultValues: initialValues,
        mode: 'onChange',
        resolver: zodResolver(validationSchema),
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting },
    } = form;

    const isMiddleNameRequired = useWatch({
        name: 'isMiddleNameRequired',
        control,
    });

    const {
        fields: skillsValues,
        append: skillAppend,
        remove: skillRemove,
    } = useFieldArray({
        control,
        name: 'skills',
    });

    const submitHandler = async (formValues: FormValues) => {
        try {
            await formHandler(formValues);

            toast.success('Форма успешно отправлена');

            clearLS({
                key: FORMS_LS_KEY,
                subTitle: FORM_LS_KEY,
            });

            navigate('/');
        } catch (error) {
            toast.error(getMessageFromError(error));
        }
    };

    return (
        <FormProvider {...form}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexFlow: 'column',
                }}
                component="form"
                onSubmit={handleSubmit(submitHandler)}
            >
                <Typography variant="h4" sx={{ mb: 4 }}>
                    RHF form
                </Typography>
                <Container maxWidth="sm">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                sx={{ mb: 2 }}
                                fullWidth
                                label="Имя"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="isMiddleNameRequired"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                sx={{ mb: 2 }}
                                control={
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                }
                                label="Требуется отчество"
                            />
                        )}
                    />

                    {isMiddleNameRequired && (
                        <Controller
                            name="middleName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Отчество"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                    )}
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                sx={{ mb: 2 }}
                                fullWidth
                                label="Фамилия"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Divider variant="middle" sx={{ mb: 4 }} />
                    {skillsValues.map((skill, index) => (
                        <Box key={skill.id} sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Controller
                                name={`skills.${index}.value` as const}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        label={`Навык ${index + 1}`}
                                        variant="outlined"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />

                            {!!index && (
                                <IconButton
                                    onClick={() => skillRemove(index)}
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
                        onClick={() => skillAppend({ value: '' })}
                        color="primary"
                        sx={{ mb: 4 }}
                        startIcon={<AddIcon />}
                        disabled={Array.isArray(errors.skills) && !!errors.skills.length}
                    >
                        Добавить навык
                    </Button>

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
                </Container>
            </Box>
        </FormProvider>
    );
};
