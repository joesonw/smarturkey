export function findIndexOf<T>(items:Array<T>,item:T):number {
	let index = 0;
	for (let i of items) {
		if (i == item) break;
		index++;
	}	
	if (index > items.length) index = -1;
	return index;
}
export function findIndex<T,V>(items:Array<T>,value:V,func: (T) => V) {
	let index = 0;
	for (let i of items) {
		if (value == func(i)) break;
		index++;
	}
	if (index > items.length) index = -1;
	return index;
}
