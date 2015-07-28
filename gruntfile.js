module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development:{
                options:{
                    paths: ['public/stylesheets/']
                },
                files: {
                    'public/stylesheets/index-styles.css': 'public/stylesheets/index-styles.less',
                    'public/stylesheets/styles.css': 'public/stylesheets/styles.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};