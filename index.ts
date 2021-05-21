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

interface IRequestValidatorHelper {
    listValidators: ValidatorType[];
    isValidateOnValueChange: boolean;
}

export function useValidatorHelper(request: IRequestValidatorHelper) {
    const [value, setValue] = React.useState('');
    React.useEffect(() => {
        if (request.isValidateOnValueChange === true) {
            setErrorMessage(validate());
        }
    }, [value, request.listValidators]);
    
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
        errorMessage,
        onChangeText: setValue,
        value,
    }
}