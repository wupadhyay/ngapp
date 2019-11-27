module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      core: {
        files: [{
          expand: true,
          cwd: 'src/main/resources',
          src: 'public/js/**/*.js',
          dest: "target/classes",
          ext: '.min.js'
        }]
      }
    },
    watch: {
        files: ['tools/**'],
        tasks: ['run']
     }
  });
  
  grunt.registerTask('run', function(){
	   console.log('Hapy hapy');
	  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};