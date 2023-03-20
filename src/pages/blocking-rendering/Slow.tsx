import React, { FC, memo } from 'react';
import { sleep } from "../../lib/sleep";

interface ISlow {
	text: string;
}

export const Slow: FC<ISlow> = memo(({ text }) => {
	sleep(2000);

	return <span style={{ color: 'red' }}>{text}</span>;
});
