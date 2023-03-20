import React, { FC, memo } from 'react';

import { list } from "../../lib/const";
import { sleep } from "../../lib/sleep";

interface IList {
    search: string;
}

// memo помогает
export const List: FC<IList> = memo(({ search }) => {
    const filteredList = list.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

    sleep(300);

    return (
        <ul>
            {filteredList.map((el) => (
                <li key={el.id}>
                    {el.name} - {el.price}
                </li>
            ))}
        </ul>
    );
})
