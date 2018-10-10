/*global describe it*/

let generater = require("../main")
let expect = require('chai').expect

let str = 'http://www.domain.com/{foo}/{bar}'


describe('border and normal', function () {
	describe('until', function () {
		let iterator = generater.generate(str, {
			foo: {
				type: generater.type.increasing,
				init: 1, step: 2, until: 0,
			},
		})
		let arr = [...iterator]
		it('until.border', function () {
			expect(arr.length).to.equal(0)
		})
		iterator = generater.generate(str, {
			foo: {
				type: generater.type.increasing,
				init: 1, step: 2, until: 2,
			},
		})
		let arr2 = [...iterator]
		it('until.normal', function () {
			expect(arr2.length).to.equal(2)
		})
	})
	describe('step', function () {
		let iterator = generater.generate(str, {
			foo: {
				type: generater.type.increasing,
				init: 1, step: 0, until: 2,
			},
		})
		let arr = [...iterator]
		it('step.border', function () {
			expect((arr[1].phase.foo - arr[0].phase.foo)).to.equal(0)
		})
		iterator = generater.generate(str, {
			foo: {
				type: generater.type.increasing,
				init: 1, step: 2, until: 2,
			},
		})
		let arr2 = [...iterator]
		it('step.normal', function () {
			expect((arr2[1].phase.foo - arr2[0].phase.foo)).to.equal(2)
		})
	})
	describe('init', function () {
		let iterator = generater.generate(str, {
			foo: {
				type: generater.type.increasing,
				init: -1, step: 1, until: 2,
			},
		})
		let arr = [...iterator]
		it('init.border', function () {
			expect(arr[0].phase.foo).to.equal(-1)
		})
	})
	describe('type', function () {
		let iterator = generater.generate(str, {
			foo: {
				type: generater.type.increasing,
				init: -1, step: 2, until: 3,
			},
		})
		let arr = [...iterator]
		it('type.increasing', function () {
			expect(arr[2].phase.foo - arr[0].phase.foo).to.equal(2 * (3 - 1))
		})
	})
	describe('set', function () {
		let iterator = generater.generate(str, {
			foo: {
				type: generater.type.iterating,
				set: [2, 3],
			},
		})
		let arr = [...iterator]
		it('set.normal', function () {
			expect(arr[1].phase.foo).to.eql(3)
		})
		iterator = generater.generate(str, {
			foo: {
				type: generater.type.iterating,
				set: [],
			},
		})
		let arr2 = [...iterator]
		it('type.empty', function () {
			expect(arr2).to.be.empty
		})
	})
})

describe('defaults and validation', function () {
	describe('thow error', function () {
		it('no parameter', function () {
			let func = () => { generater.generate() }
			expect(func).to.throw()
		})
		it('no setting', function () {
			let func = () => { generater.generate("http://xxx.com") }
			expect(func).to.throw()
		})
		it('empty setting', function () {
			let func = () => { generater.generate("http://xxx.com", {}) }
			expect(func).to.throw()
		})
		it('empty field', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: {}
				})
			}
			expect(func).to.throw()
		})
		it('null field', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: null
				})
			}
			expect(func).to.throw()
		})
		it('invalid type', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: { type: 333 }
				})
			}
			expect(func).to.throw()
		})
		it('no init', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: { type: generater.type.increasing, until: 2, step: 3, }
				})
			}
			expect(func).to.throw()
		})
		it('invalid init', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: { type: generater.type.increasing, until: 2, step: 3, init: null }
				})
			}
			expect(func).to.throw()
		})
		it('no step', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: { type: generater.type.increasing, until: 2 }
				})
			}
			expect(func).to.throw()
		})
		it('no until', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: { type: generater.type.increasing, }
				})
			}
			expect(func).to.throw()
		})
		it('no set', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: { type: generater.type.iterating, }
				})
			}
			expect(func).to.throw()
		})
		it('invalid set', function () {
			let func = () => {
				generater.generate("http://xxx.com", {
					foo: { type: generater.type.increasing, set: 3 }
				})
			}
			expect(func).to.throw()
		})
	})
	describe('shifter.js', function () {
		//

	})


})
