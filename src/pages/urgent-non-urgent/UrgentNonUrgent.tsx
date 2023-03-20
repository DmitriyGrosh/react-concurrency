import { FC, useRef, useState } from "react";

export const UrgentNonUrgent: FC = () => {
    const [count, setCount] = useState<number>(0);
    const render = useRef<number>(0);

    const handleIncrement = () => {
        setCount((prev) => prev + 1)
    };

    // будет происходить ререндер, однако ничего не будет перерисовываться
    const handleSame = () => {
        setCount(count);
    };

    render.current += 1;

    console.log('==========>render.current', render.current);
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleIncrement}>Handle increment</button>
            <button onClick={handleSame}>Handle same</button>
            <p>Rerender {render.current}</p>
        </div>
    );
};
