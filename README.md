# A library support for input or form validation
# Installation
```
npm install --save @uit2712/react-validator-helper
```
# Usage
## Input validation
### Minlength
```js
import { useInputValidator } from '@uit2712/react-validator-helper';

function App() {
    /**
     * Validate for minlength
     * @param type 'minlength'
     * @param minlength Min length (number)
     * @param errorMessage Error message
     * @param errorMessagePlaceHolder Replace @param minlength in @param errorMessage by replacing @param errorMessagePlaceHolder to 'minlength' in @param errorMessage
     */
    const name = useInputValidator({
        listValidators: [{
            type: 'minlength',
            errorMessage: 'Please enter a value has at least __placeholder__ characters.',
            minlength: 9,
            errorMessagePlaceHolder: '__placeholder__',
        }]
    });
}
```
