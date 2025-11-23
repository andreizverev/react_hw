import { useEffect, useRef, useState } from 'react';

export const useDebounce = <V>(outerValue: V, ms: number) => {
	const [optimizedValue, setOptimizedValue] = useState<V>(outerValue);
	const timerIdRef = useRef<number | null>(null);

	useEffect(() => {
		if (timerIdRef.current) {
			clearTimeout(timerIdRef.current);
		}
		timerIdRef.current = window.setTimeout(() => {
			setOptimizedValue(outerValue);
		}, ms);
	}, [ms, outerValue]);

	return optimizedValue;
};
