import {useState} from 'react';

export default function Validate(input) {
    const [errors, setErrors] = useState({})

    if (!input.Username) {
        errors.Username = 'Required';
    } else if (!/\S+@\S+.\S+/.test(input.Username)) {
        errors.Username = 'Must be a valid email address';
    } else if (!input.Password) {
        errors.Password = 'Required';
    } else if (/^\D+$/.test(input.Password)) {
        errors.Password = 'Must be a valid password';
    }
    return errors;
}