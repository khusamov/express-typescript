
// https://www.npmjs.com/package/gulp-typescript
// http://www.typescriptlang.org/docs/handbook/gulp.html
// https://apellsin.com/typescript/typescript-gulp-byistryiy-start-chast-2.html
// https://medium.com/@pleerock/create-a-gulpfile-and-write-gulp-tasks-using-typescript-f08edebcac57

const path = require("path");
const gulp = require("gulp");

const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const tsconfig = require("./tsconfig.json");

const nodemon = require("gulp-nodemon");
const changed = require('gulp-changed');

const outDir = tsconfig.compilerOptions.outDir || "dist";

const pugFiles = ['test/**/*.pug'];
const outPugDir = path.join(outDir, 'test');

gulp.task("compile", function () {
	return tsProject.src()
		.pipe(changed(outDir, { extension: '.js' }))
		.pipe(tsProject())
		.pipe(gulp.dest(outDir));
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*', 'test/**/*'], ['compile']);
	gulp.watch(pugFiles, ['copypugs']);
});

gulp.task('nodemon', function() {
	nodemon({
		script: 'dist/test/test2'
	});
});

gulp.task('copypugs', function() {
	return gulp.src(pugFiles)
		.pipe(changed(outPugDir))
		.pipe(gulp.dest(outPugDir));
});

gulp.task('default', ['compile', 'copypugs', 'watch', 'nodemon']);