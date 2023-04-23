import { ChangeEvent, FC, useState, useTransition, useDeferredValue } from "react";
import { useDebug } from "../../lib/useDebug";
import { List } from "./List";

export const ConcurrentAutocomplete: FC = () => {
    const [search, setSearch] = useState<string>('');
    const [delayedSearch, setDelayedSearch] = useState<string>('');
    const [isPending, startTransition] = useTransition();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearch(value);

        startTransition(() => {
            setDelayedSearch(value);
        });
    };

    useDebug({ filter: search, delayedFilter: delayedSearch })

    return (
        <>
            <div><input value={search} onChange={handleChange} /></div>
            {isPending && "Recalculating..."}
            <List search={delayedSearch} />
        </>
    );
};
