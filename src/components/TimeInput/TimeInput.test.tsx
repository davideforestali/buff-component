import testIsValid from './isValidValues'
import {isValidTimeInput} from '../../helpers'

describe('Check function isValid', function () {
    testIsValid.forEach(function(test) {
        it(test.value + ' - Should be '+ test.text, function() {
            expect(isValidTimeInput(test.value)).toBe(test.valid);
        })
    })
})