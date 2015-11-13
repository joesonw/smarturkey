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
export function removeElementOf<T>(items:Array<T>,item:T):T {
	let index = findIndexOf(items,item);
	let ret:T = null;
	if (index != -1) {
		ret = items.splice(index,1)[0]; 
	}
	return ret;
}
export function removeElement<T,V>(items:Array<T>,value:V,func: (T) => V):T {
	let index = findIndex(items,value,func);
	let ret:T = null;
	if (index != -1) {
		ret = items.splice(index,1)[0];
	}
	return ret;
}
export function findElement<T,V>(items:Array<T>,value:V,func: (T) => V):T {
	let index = findIndex(items,value,func);
	let ret:T = null;
	if (index != -1) {
		ret = items[index];
	}
	return ret;
}