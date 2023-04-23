import React, {FC, memo, useCallback, useDeferredValue, useLayoutEffect, useRef, useState} from 'react';

import { useDebug } from '../../lib/useDebug';
import {IPlayer} from "../../pages/players/interfaces";

interface ILogs {
	filter?: string;
	delayedFilter?: string;
}

// export const Logs = memo(({ filter, delayedFilter }: ILogs) => {
// 	useDebug({ filter, delayedFilter });
//
// 	return (
// 		<div className="logs">
//
// 		</div>
// 	);
// });

const useActualRef = (value: any) => {
	const [ref, setRef] = useState(value);

	const setCallbackRef = useCallback((actualValue: any) => {
		console.log('==========>1', 1);
		setRef(actualValue);
	}, []);

	return [ref, setCallbackRef];
};

function useEvent(handler: any) {
	const handlerRef = useRef<any>(null);

	// In a real implementation, this would run before layout effects
	useLayoutEffect(() => {
		handlerRef.current = handler;
	});

	return useCallback((...args: any[]) => {
		// In a real implementation, this would throw if called during render
		const fn = handlerRef.current;
		return fn(...args);
	}, []);
}

enum Probe {
	Start = 'Start',
	Low = 'Low',
	High = 'High',
}

export const Logs: FC<ILogs> = ({ filter, delayedFilter }) => {
	const isFirstRenderRef = useRef(true);
	const isFirstRender = isFirstRenderRef.current;

	const probeRef = useRef(Probe.Start);
	// const [probeRef, setProebRef] = useActualRef({});
	const deferredProbe = useDeferredValue(probeRef.current);

	const renderStateRef = useRef('High Start');

	if (isFirstRenderRef.current) {
		isFirstRenderRef.current = false;
	}

	console.log('==========>probeRef.current', probeRef.current);
	console.log('==========>deferredProbe', deferredProbe);
	const isLowPriority = probeRef.current === deferredProbe && !isFirstRender;

	const onLowPriorityStart =  () => {
		console.log(
			`%c Low Priority Start - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: teal;',
			'color: white'
		);
	}
	const onLowPriorityEnd = () => {
		console.log(
			`%c Low Priority End - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: teal;',
			'color: white'
		);
	};

	const	onHighPriorityStart = () => {
		console.log(
			`%c High Priority Start - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: green;',
			'color: white'
		);
	};

	const	onHighPriorityEnd = () => {
		console.log(
			`%c High Priority End - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: green;',
			'color: white'
		);
	};
	const onLowPriorityInterrupted = () =>
		console.log('%c Low Priority Interrupted!', 'color: red');

	if (isLowPriority) {
		console.log('==========>111', 111);
		renderStateRef.current = 'Low Start';
		// setProebRef({});
		probeRef.current = Probe.Low;
		onLowPriorityStart?.();
	} else {
		if (renderStateRef.current === 'Low Start') {
			onLowPriorityInterrupted?.();
		}

		renderStateRef.current = 'High Start';
		probeRef.current = Probe.High;
		// setProebRef({});
		onHighPriorityStart?.();
	}

	useLayoutEffect(() => {
		if (isLowPriority) {
			renderStateRef.current = 'Low End';
			onLowPriorityEnd?.();
		} else {
			renderStateRef.current = 'High End';
			onHighPriorityEnd?.();
		}
	});

	return (
		<div className="logs">

		</div>
	);
};

