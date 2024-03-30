import React, { useState, useEffect } from 'react';
import API_URL from '../../config';

const HomePageContent = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operator, setOperator] = useState('addition');
    const [result, setResult] = useState('-');

    useEffect(() => {
        const handleOperatorChange = (event) => {
            setOperator(event.target.value);
            if (event.target.value === 'squareroot') {
                setNum2('None');
            }
        };

        const operatorSelect = document.querySelector('select[name="operator"]');
        operatorSelect.addEventListener('change', handleOperatorChange);

        return () => {
            operatorSelect.removeEventListener('change', handleOperatorChange);
        };
    }, []);

    const calculateResult = (event) => {
        event.preventDefault();
        const data = { num1, num2 };

        let apiUrl = `${API_URL}/${operator}`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setResult(data.result);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message);
        });
    };

    return (
        <div className='calculate-interface'>
            <p>Please enter the first number:</p>
            <input name="num1" value={num1} onChange={e => setNum1(e.target.value)} />
            <p>Please enter the second number:</p>
            <input name="num2" value={num2} onChange={e => setNum2(e.target.value)} disabled={operator === 'squareroot'} />
            <br />
            <p>Choose the operator:</p>
            <select name="operator" value={operator} onChange={e => setOperator(e.target.value)}>
                <option value="addition">+</option>
                <option value="subtraction">-</option>
                <option value="multiplication">*</option>
                <option value="division">/</option>
                <option value="exponentiation">^</option>
                <option value="squareroot">Sqrt</option>
                <option value="modulo">Mod</option>
            </select>
            <br />
            <br />
            <button name="calculate" onClick={calculateResult}>Calculate</button>
            <br />
            <p>Answer: <span>{result}</span></p>
        </div>
    );
};

export default HomePageContent;
