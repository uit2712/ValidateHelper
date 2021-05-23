import React from 'react';

type ValidatorType = {
    type: 'minlength';
    errorMessage: string;
    errorMessagePlaceHolder?: string;
    minlength: number;
} | {
    type: 'maxlength';
    errorMessage: string;
    errorMessagePlaceHolder?: string;
    maxlength: number;
} | {
    type: 'function';
    errorMessage: string;
    validate: (value: string) => boolean;
} | {
    type: 'match';
    errorMessage: string;
    matchValue: string;
}

interface IRequestInputValidator {
    listValidators: ValidatorType[];
    isValidateImmediate?: boolean;
}

interface IResponseInputValidatorProps {
    errorMessage: string;
    onChangeText: (value: string) => void;
    value: string;
}

interface IResponseValidate {
    ref: React.MutableRefObject<any>;
    isValid: boolean;
}

interface IResponseInputValidator {
    props: IResponseInputValidatorProps;
    validate: () => IResponseValidate;
    isValid: boolean;
    ref: React.MutableRefObject<any>;
}

export function useInputValidator(request: IRequestInputValidator = {
    listValidators: [],
    isValidateImmediate: false,
}): IResponseInputValidator {
    const ref = React.useRef(null);
    const [value, setValue] = React.useState('');

    const [isDirty, setIsDirty] = React.useState(false);
    React.useEffect(() => {
        if (isDirty === false && value !== '') {
            setIsDirty(true);
        }
    }, [value]);

    React.useEffect(() => {
        if (request.isValidateImmediate === true) {
            setErrorMessage(validate());
        } else {
            if (isDirty === true) {
                setErrorMessage(validate());
            }
        }
    }, [isDirty, value, request.listValidators]);
    
    const [errorMessage, setErrorMessage] = React.useState('');
    function validate(): string {
        for(let i = 0; i < request.listValidators.length; i++) {
            const validator = request.listValidators[i];
            switch(validator.type) {
                default: break;
                case 'minlength':
                    const minlength = validator.minlength > 0 ? validator.minlength : 1;
                    if (value.length < minlength) {
                        return validator.errorMessage.replace(validator.errorMessagePlaceHolder ?? '', `${minlength}`) ?? `Min length is ${minlength} character${minlength > 1 ? 's' : ''}`;
                    }
                    break;
                case 'maxlength':
                    const maxlength = validator.maxlength > 0 ? validator.maxlength : 1;
                    if (value.length > maxlength) {
                        return validator.errorMessage.replace(validator.errorMessagePlaceHolder ?? '', `${maxlength}`) ?? `Max length is ${maxlength} character${maxlength > 1 ? 's' : ''}`;
                    }
                    break;
                case 'function':
                    if (validator.validate(value) === false) {
                        return validator.errorMessage ?? 'Please enter a valid value.';
                    }
                    break;
                case 'match':
                    if (validator.matchValue !== value) {
                        return validator.errorMessage ?? 'Re-enter password is not match.';
                    }
                    break;
            }
        }
        return '';
    }

    return {
        props: {
            errorMessage,
            onChangeText: setValue,
            value,
        },
        validate: () => {
            const errorMessage = validate();
            setErrorMessage(errorMessage)
            return {
                ref,
                isValid: errorMessage === '',
            };
        },
        isValid: errorMessage === '' && value !== '',
        ref,
    }
}

interface IRequestFormValidator {
    inputs: IResponseInputValidator[];
    isFocusErrorInput?: boolean;
}

export function useFormValidator(request: IRequestFormValidator = {
    inputs: [],
    isFocusErrorInput: false,
}) {
    const [isValid, setIsValid] = React.useState(checkIfValid());
    function checkIfValid() {
        for (let i = 0; i < request.inputs.length; i++) {
            if (request.inputs[i].isValid === false) {
                return false;
            }
        }

        return true;
    }
    React.useEffect(() => {
        setIsValid(checkIfValid());
    }, [request.inputs]);

    return {
        validate: () => {
            let refErrorInput: React.MutableRefObject<any> = null;
            for (let i = 0; i < request.inputs.length; i++) {
                const result = request.inputs[i].validate();
                if (result.isValid === false) {
                    if (request.isFocusErrorInput === true && !refErrorInput) {
                        refErrorInput = result.ref;
                    }
                }
            }

            refErrorInput?.current?.focus();
        },
        isValid,
    }
}