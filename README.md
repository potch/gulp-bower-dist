gulp-bower-dist
===============

When you use bower dependencies in your project, they look like this:

```
|- my-project
   |- bower_components
   |  |- thingy
   |     |- index.js
   |
   |- src
      |- mycode.html
```

And you use them like this:

```html
<script src="../bower_components/thingy/thingy.js"></script>
```

But when your project is itself a bower dependency, now things look like this:

```
|- bower_components
   |- thingy
   |  |- index.js
   |
   |- my-project
      |- src
         |- mycode.html
```

That kinda sucks. This plugin rewrites the URLs so they point to sibling dependencies properly.

```js
var bower = require('gulp-bower-dist');

gulp.src('mycode.html')
  .pipe(bower())
  .pipe(gulp.dist('dist'));
```

The result?

```html
<script src="../../thingy/thingy.js"></script>
```

Hooray!
