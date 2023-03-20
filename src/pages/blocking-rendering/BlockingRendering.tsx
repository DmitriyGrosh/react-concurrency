import React, { FC, ChangeEvent, useState } from 'react';

import { Slow } from "./Slow";

export const BlockingRendering: FC = () => {
    const [randomNumber, setRandomNumber] = useState<number>(Math.random());
    const [array, setArray] = useState<string[]>([]);
    const [text, setText] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setText(value);

        setArray((prev) => ([...prev, value]))
    };

    return (
        <>
            <input
                value={text}
                onChange={handleChange}
            />
            <button onClick={() => setRandomNumber(Math.random())}>Slow RENDER</button>
            <Slow text={randomNumber.toString()} />
            <ul>
                {array.map((el, index) => (
                    <li key={index.toString(36)}>{el}</li>
                ))}
            </ul>
        </>
    );
};