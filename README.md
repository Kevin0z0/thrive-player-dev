# Thrive Player插件开发测试模块

### 测试features可行性

```javascript
const requireModule = require('./index')
const { test } = require('thrive-player-dev')
const query = {
	id: 5159439062
}

requireModule('playlist/detail', query).then((res) => {
	console.log(test.stringParser(res.musicList.features.id, res.musicList.data, 0))
})
```

