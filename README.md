# url-generator
a url generator based on [url-template](https://github.com/bramstein/url-template)

# install
`npm i url-generate`

# usage
```javascript
let gen = generater.generate(url, setting)
```
`url` is a string which represents an url template, `setting` is a json object which contains setting for every segment in the url template.
## increasing
```javascript
const generater = require('url-generate')
let gen = generater.generate("http://www.foo.com/{page}", {
	page: {
		type: generater.type.increasing,
		init: 1,
		step: 2,
		until: 3
	}
})
console.log([...gen])
```

It will get
```javascript
[
  { url: 'http://www.foo.com/1', phase: { page: 1 } },  // initialized by 1
  { url: 'http://www.foo.com/3', phase: { page: 3 } },  // 1+2=3
  { url: 'http://www.foo.com/5', phase: { page: 5 } }   // 3+2=5
]
```
## iterating
```javascript
let gen = generater.generate("http://www.foo.com/{cities}", {
	cities: {
		type: generater.type.iterating,
		set: ["beijing", "tokyo", "washington"]
	}
})
console.log([...gen])
```

It will get
```javascript
[
    { url: 'http://www.foo.com/beijing', phase: { cities: 'beijing' } },
    { url: 'http://www.foo.com/tokyo', phase: { cities: 'tokyo' } },
    { url: 'http://www.foo.com/washington', phase: { cities: 'washington' } }
]
```
## combined
```javascript
let gen = generater.generate("http://www.foo.com/{cities}/{gender}", {
	cities: {
		type: generater.type.iterating,
		set: ["beijing", "tokyo"]
	},
	gender: {
		type: generater.type.iterating,
		set: ["m", "f"]
	}
})
console.log([...gen])
```
it will get
```javascript
[
    { url: 'http://www.foo.com/beijing/m', phase: { cities: 'beijing', gender: 'm' } },
    { url: 'http://www.foo.com/tokyo/m', phase: { cities: 'tokyo', gender: 'm' } },
    { url: 'http://www.foo.com/beijing/f', phase: { cities: 'beijing', gender: 'f' } },
    { url: 'http://www.foo.com/tokyo/f', phase: { cities: 'tokyo', gender: 'f' } }
]
```

