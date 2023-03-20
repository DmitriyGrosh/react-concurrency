import React, { ChangeEvent, FC, useState } from "react";

import { List } from "./List";

export const BlockingAutocomplete: FC = () => {
    const [search, setSearch] = useState<string>('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <div><input type="text" onChange={onChange} /></div>
            <List search={search} />
        </>
    );
}