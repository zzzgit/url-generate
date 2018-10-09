var templateParser = require('url-template')
const Joi = require('joi')
const Shifter = require('./Shifter')
let types = require("./ShifterType")

function* gen(tmpl, combinations, isPhaseesReturned) {
	if (!combinations || !combinations.length) {
		//yield tmpl
		return null
	}
	if ((typeof tmpl) === "string") {
		tmpl = templateParser.parse(tmpl)
	}
	if (isPhaseesReturned === undefined) {
		isPhaseesReturned = true
	}
	for (let i = 0, len = combinations.length; i < len; i++) {
		let item = combinations[i]
		yield isPhaseesReturned ? {
			url: tmpl.expand(item),
			phase: combinations[i]
		} : tmpl.expand(item)
	}
}

let getShifterList = function (setting) {
	let result = []
	for (let key in setting) {
		let item = setting[key]
		item.field = key
		result.push(Shifter.generate(item))
	}
	return result
}

let validateParas = function (setting) {
	for (let key in setting) {
		let item = setting[key]
		if (!item["type"]) {
			throw new Error("[url-generate]: 'type' is required in a rule!")
		}
		if (![types.increasing, types.iterating].includes(item.type)) {
			throw new Error("[url-generate]: the value for field 'type' in a rule must be 1 or 2")
		}
		if (item.type === types.increasing) {
			let schema = Joi.object().keys({
				init: Joi.number().required().integer(),
				step: Joi.number().required().integer(),
				until: Joi.number().required().integer(),
				type: Joi.any()
			})
			const result = Joi.validate(item, schema)
			if (result.error) {
				throw new Error(result.error)
			}
		} else if (item.type === types.iterating) {
			let schema = Joi.object().keys({
				set: Joi.array().required(),
				type: Joi.any()
			})
			const result = Joi.validate(item, schema)
			if (result.error) {
				throw new Error(result.error)
			}
		}
	}
}

let generate = function (template, setting, isPhaseesReturned) {
	if (!template) {
		throw new Error("[url-generate]: the first parameter should be a string or a url-template!")
	}
	if ((setting == null) || ((typeof setting) !== "object")) {
		throw new Error("[url-generate]: the second parameter should be an json object!")
	}
	let hasFields = false
	for (let key in setting) {
		if (setting[key] != null) {
			hasFields = true
		}
	}
	if (!hasFields) {
		throw new Error("[url-generate]: the second parameter should have at least one property which is an json object!")
	}
	if ((typeof setting) !== "object") {
		throw new Error("[url-generate]: the second parameter should be an json object!")
	}
	validateParas(setting)
	let shifterList = getShifterList(setting)
	return gen(template, Shifter.getCombinations(shifterList), isPhaseesReturned)
}


module.exports = {
	generate,
	type: types
}
