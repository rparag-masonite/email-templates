const gulp = require('gulp')
const mjml = require('gulp-mjml')
const imagemin = require('gulp-imagemin')
const del = require('del')

const path = {
  mjml: 'src/**/*.mjml',
  public: './public',
  images: 'src/images/*.png',
  imageDest: './public/images'
};

// These are a list of our supported companies. They should match the folder names in the src/includes
const companies = [
  'advisar',
  'usawd',
  'masonite',
  'gbs'
]

// Task for compiling common templates and moving to the public folder under a folder corresponding to the respective company. Common templates are email templates that every compnany in the list will use.
// e.g.
//    /public
//         | /advisar
//                 | template.html

// This task copies all of the common templates into the company-specific includes folder
gulp.task('copyFilesCommon', async function() {
  companies.forEach(company => {
    return gulp
      .src(`src/common/*.mjml`)
      .pipe(gulp.dest(`src/includes/${company}/common`))
  })
})

// This task deletes the copied common templates in the company-specific includes folder., subsequent to compiling
gulp.task('cleanCommon', async function() {
  companies.forEach(company => {
    return del([`src/includes/${company}/common/*.mjml`, `!src/includes/${company}/common`])
  })
})

// Compile all common templates that were copied into the includes folder
gulp.task('commonCompile', async function () {
  companies.forEach(company => {
    return gulp.src(`src/includes/${company}/common/**/*.mjml`)
      .pipe(mjml())
      .pipe(gulp.dest('public/' + company + '/'))
  })
})

// Glob task for copying, compiling, and deleting common templates
gulp.task('common', gulp.series('copyFilesCommon', 'commonCompile', 'cleanCommon'))

// Task for optimizing images
gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(imagemin())
    .pipe(gulp.dest(path.imageDest))
})

// Task for compiling specific templates and moving to the public folder under a folder corresponding to the respective company. Specific templates are one-off templates that are proprietary to a specific company.
// e.g.
//    /public
//         | /advisar
//                 | template.html

// This task copies all of the common templates into the company-specific includes folder
gulp.task('copyFilesSpecific', async function() {
  companies.forEach(company => {
    return gulp
      .src(`src/specific/${company}/*.mjml`)
      .pipe(gulp.dest(`src/includes/${company}/specific`))
  })
})

// This task deletes the copied common templates in the company-specific includes folder., subsequent to compiling
gulp.task('cleanSpecific', async function() {
  companies.forEach(company => {
    return del([`src/includes/${company}/specific/*.mjml`, `!src/includes/${company}/specific`])
  })
})

// Compile all common templates that were copied into the includes folder
gulp.task('specificCompile', async function () {
  companies.forEach(company => {
    return gulp.src(`src/includes/${company}/specific/**/*.mjml`)
      .pipe(mjml())
      .pipe(gulp.dest('public/' + company + '/'))
  })
})

// Glob task for copying, compiling, and deleting common templates
gulp.task('common', gulp.series('copyFilesCommon', 'commonCompile'))
gulp.task('specific', gulp.series('copyFilesSpecific', 'specificCompile'))

gulp.task('cleanPublic', async function () {
  return del([`public/**`, `!public`])
})

gulp.task('clean', gulp.parallel('cleanCommon', 'cleanSpecific', 'cleanPublic'))

// Task for optimizing images
gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(imagemin())
    .pipe(gulp.dest(path.imageDest))
})

// Bulk compile task
gulp.task('compile', gulp.series('common', 'specific', 'images'))

// Watch task
gulp.task('watch', function () {
  gulp.watch(path.mjml, gulp.series('compile', 'compile'));
})

// Glob task for errything
gulp.task('default', gulp.series('compile', 'watch'));