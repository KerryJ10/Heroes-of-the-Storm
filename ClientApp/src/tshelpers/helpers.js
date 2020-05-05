// Pass in the array you want grouped and the key to be grouped by
// I would like to remove the conditional but I'm not sure how to a use 'key' as an identifier on e
export function group(data, key) {
	return data.reduce((r, e) => {
		let group;
		if (key === 'name') {
			group = e.name[0];
		} else if (key === 'level') {
			group = e.level;
		} else {
			return '';
		}
		if (!r[group]) {
			r[group] = { group, children: [e] }
		} else {
			r[group].children.push(e);
		}
		return r;
	}, {});


}