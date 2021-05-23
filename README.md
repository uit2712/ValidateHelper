# A library support for input or form validation
# Table of contents
- [Installation](#installation)
- [Interfaces, types](#interfaces-types)
  * [Validation types](#validation-types)
    + [Minlength](#minlength)
    + [Maxlength](#maxlength)
    + [Function](#function)
    + [Match](#match)
- [Usage](#usage)
  * [Input validation](#input-validation)
    + [Minlength](#minlength-1)
    + [Maxlength](#maxlength-1)
    + [Function](#function-1)
    + [Match](#match-1)
  * [Form validation](#form-validation)
# Installation
```
npm install --save @uit2712/react-validator-helper
```
# Interfaces, types
## Validation types
### Minlength
Show error message if the length of input is not reach __minlength__.
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
Show error message if the length of input reachs __maxlength__.
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
Validate input uses a function __validate__ like we can use this to validate email or phone with regex.
```js
type ValidatorType = {
    type: 'function';
    errorMessage: string;
    validate: (value: string) => boolean;
}
```
### Match
Check if current input's value is same another input's value or not like we cab use this to compare password and re-enter password.
```js
type ValidatorType = {
    type: 'match';
    errorMessage: string;
    matchValue: string;
}
```
# Usage
## Input validation
### Minlength
```js
import { Input } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
### Function
```js
import { Input } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useInputValidator } from '@uit2712/react-validator-helper';

function App() {
    const email = useInputValidator({
        listValidators: [{
            type: 'function',
            errorMessage: 'Please enter a valid email adress.',
            validate: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(value) === true,
        }]
    });
    
    return (
        <View>
            <Input
                ref={email.ref}
                placeholder='email@address.com'
                label='Your Email Address'
                leftIcon={
                    <MaterialCommunityIcon
                        name='email'
                        size={30}
                    />
                }
                errorStyle={{ color: 'red' }}
                {...email.props}
            />
        </View>
    )
}
```
### Match
```js
import { Input } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useInputValidator } from '@uit2712/react-validator-helper';

function App() {
    const password = useInputValidator({
        listValidators: [{
            type: 'function',
            errorMessage: 'Please enter a password has at least one character and one number.',
            validate: (value) => /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value) === true,
        }]
    });

    const reenterPassword = useInputValidator({
        listValidators: [{
            type: 'match',
            errorMessage: 'Re-enter password is not match.',
            matchValue: password.props.value,
        }]
    });
    
    return (
        <View>
            ...
            <Input
                ref={reenterPassword.ref}
                placeholder='Confirm Password'
                label='Re-enter password'
                leftIcon={
                    <MaterialCommunityIcon
                        name='account-edit'
                        size={30}
                    />
                }
                secureTextEntry={isShowPassword === false}
                errorStyle={{ color: 'red' }}
                {...reenterPassword.props}
            />
            ...
        </View>
    )
}
```
## Form validation
```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, CheckBox, Button } from 'react-native-elements';
import { useFormValidator, useInputValidator } from '@uit2712/react-validator-helper';

function App() {
    const name = useInputValidator({
        ...
    });
    const email = useInputValidator({
        ...
    });
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const password = useInputValidator({
        ...
    });

    const reenterPassword = useInputValidator({
        ...
    });

    const form = useFormValidator({
        inputs: [name, email, password, reenterPassword],
        isFocusErrorInput: true, // focus on input when call form.validate
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            enabled={false}
        >
            <ScrollView>
                ...
                <Button
                    title='Sign Up'
                    onPress={form.validate}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default App;
```
