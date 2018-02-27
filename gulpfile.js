const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const iife = require('gulp-iife')

const cfg = {
	src: './src/**',
	dist: './dist/',
	name: 'ui-router-history',
	babel: {
		presets: ['env'],
	},
	iife: {
		useStrict: false,
	},
}

function build(filename) {
	return gulp.src(cfg.src)
		.pipe(concat(filename))
		.pipe(babel(cfg.babel))
		.pipe(iife(cfg.iife))
}

gulp.task('build:concat', () => {
	return build(cfg.name + '.js')
		.pipe(gulp.dest(cfg.dist))
})

gulp.task('build:minify', () => {
	return build(cfg.name + '.min.js')
		.pipe(uglify())
		.pipe(gulp.dest(cfg.dist))
})

gulp.task('build', ['build:concat', 'build:minify'])
