# A library support for input or form validation
# Installation
```
npm install --save @uit2712/react-validator-helper
```
# Interfaces, types
## Validation types
### Minlength
Show error message if the length of input is not reach __minlength__
```js
type ValidatorType = {
    type: 'minlength';
    errorMessage: string;
    errorMessagePlaceHolder?: string;
    minlength: number;
}
```
- __type__: 'minlength'
- __errorMessage__: Error message
- __errorMessagePlaceHolder__: A placeholder for __minlength__ in __errorMessage__
- __minlength__: Minimum length
### Maxlength
Show error message if the length of input reachs __maxlength__
```js
type ValidatorType = {
    type: 'maxlength';
    errorMessage: string;
    errorMessagePlaceHolder?: string;
    maxlength: number;
}
```
- __type__: 'maxlength'
- __errorMessage__: Error message
- __errorMessagePlaceHolder__: A placeholder for __maxlength__ in __errorMessage__
- __maxlength__: Maximum length
### Function
Validate input uses a function __validate__ like we can use this to validate email or phone with regex
```js
type ValidatorType = {
    type: 'function';
    errorMessage: string;
    validate: (value: string) => boolean;
}
```
# Usage

## Input validation
### useInputValidator
### Minlength
```js
import { Input } from 'react-native-elements';
import { useInputValidator } from '@uit2712/react-validator-helper';

function App() {
    const name = useInputValidator({
        isValidateImmediate: false, // validate immediately in the first time load app or not
        listValidators: [{
            type: 'minlength',
            errorMessage: 'Please enter a value has at least __placeholder__ characters.',
            minlength: 9,
            errorMessagePlaceHolder: '__placeholder__',
        }]
    });
    
    return (
        <View>
            <Input
                placeholder='Name'
                label='Your Name'
                errorStyle={{ color: 'red' }}
                {...name.props}
            />
        </View>
    )
}
```
### Maxlength
```js
import { Input } from 'react-native-elements';
import { useInputValidator } from '@uit2712/react-validator-helper';

function App() {
    const name = useInputValidator({
        isValidateImmediate: false, // validate immediately in the first time load app or not
        listValidators: [{
            type: 'maxlength',
            errorMessage: 'Please enter a value has max characters is __placeholder__.',
            maxlength: 10,
            errorMessagePlaceHolder: '__placeholder__',
        }]
    });
    
    return (
        <View>
            <Input
                placeholder='Name'
                label='Your Name'
                errorStyle={{ color: 'red' }}
                {...name.props}
            />
        </View>
    )
}
```
