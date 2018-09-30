let types = require("./ShifterType")

let fields = ["type", "init", "step", "count", "field"] // need to modify this array responsibly if the structure is changed

let xxxx = function (setting) {
	if ((typeof setting.type) !== "number" || setting.type == null) {
		throw new Error("there must be a type field!")
	}
	if (setting.type === "iterating") {
		if (Array.isArray(setting.set) !== "array" || setting.set == null) {
			throw new Error("there must be a set field!")
		}
	}
}

let arr2obj = function (wrapperArray, keyArray) {
	if (!wrapperArray || !keyArray) {
		throw new Error("the two parameters should both be array")
	}
	return wrapperArray.map(combination => {
		let obj = {}
		keyArray.forEach((field, index) => {
			obj[field] = combination[index]
		})
		return obj
	})
}

let getCombinations1 = function (wrapperArray) {    // two dimension array
	if (!wrapperArray || !wrapperArray.length) {
		return []
	}
	if (wrapperArray.length === 1) {
		return wrapperArray[0].map(item => {
			return [item]
		})
	}
	let result = []
	let rightWrapperArray = getCombinations1(wrapperArray.slice(1))
	rightWrapperArray.forEach(rightSide => {
		wrapperArray[0].forEach(leftSide => {
			result.push([leftSide, ...rightSide])
		})
	})
	return result
}

class Shifter {
	static generate(rules) {
		// xxxx(rules)	// no need to validate
		return new ShifterImpl(rules)
	}
	static getCombinations(shifterArray) {
		let tempArray = getCombinations1(shifterArray.map(item => item._array))
		return arr2obj(tempArray, shifterArray.map(item => {
			return item.field
		}))
	}
}

class ShifterImpl extends Shifter {
	constructor(rules) {
		super(rules)
		//	no need to validate
		fields.forEach(field => {
			if (rules[field] === undefined) {
				return null
			}
			this[field] = rules[field]
		})
		this._index = 0
		this._array = []
		this.init2(rules)
	}
	init2(setting) {
		switch (setting.type) {
		case types.increasing:
			if (setting.count < 1) {
				return null
			}
			this._array = [setting.init]
			for (let i = 1, limit = setting.count; i < limit; i++) {
				this._array.push(setting.init + i * setting.step)
			}
			break
		case types.iterating:
			this._array = Array.from(setting.set)
			break
		default:
			break
		}
	}
}


module.exports = Shifter
