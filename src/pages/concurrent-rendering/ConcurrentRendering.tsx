import { FC, useState, ChangeEvent, useTransition } from "react";
import {DelayedList} from "./DelayedList";
import {sleep} from "../../lib/sleep";

export const ConcurrentRendering: FC = () => {
    const [search, setSearch] = useState<string>('');
    const [searchArray, setSearchArray] = useState<string[]>([]);
    const [delayedSearch, setDelayedSearch] = useState<string>('');
    const [delayedSearchArray, setDelayedSearchArray] = useState<string[]>([]);

    const [isPending, startTransition] = useTransition();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // high priority
        setSearch(value);
        setSearchArray((prev) => ([...prev, value]))

        startTransition(() => {
            // low priority
            setDelayedSearch(value);
            setDelayedSearchArray((prev) => ([...prev, value]));
        });
    };

    // sleep(400, `delayed=${delayedSearch} search=${search}`);
    console.log('==========>test');
    return (
        <>
            <div>
                <input value={search} onChange={handleChange} />
            </div>
            <div className="flex flex__gap-lg">
                <ul>
                    {searchArray.map((el, index) => (
                        <li key={index}>Search - {el}</li>
                    ))}
                </ul>
                <DelayedList list={delayedSearchArray} />
            </div>
        </>
    );
};
