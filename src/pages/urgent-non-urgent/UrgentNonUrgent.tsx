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
        <div
          className="flex flex__column flex__center-center flex__gap-sm"
          style={{
            height: '100%'
          }}
        >
            <p className='h1'>Counter: {count}</p>
            <button className="button" onClick={handleIncrement}>Handle increment</button>
            <button className="button" onClick={handleSame}>Handle same</button>
            <p className='h1'>Rerender: {render.current}</p>
        </div>
    );
};
