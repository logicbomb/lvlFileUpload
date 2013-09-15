#Native FileUpload Service and Directive#

##File Upload Directive##
A native directive that supports uploading multiple files and data.  It exposes a simple API that a parent scope can use to track upload progress, errors and completion.

The [demo](http://github.com/logicbomb/ng-directives/tests/xhr-svc-integration.html) requires node.js and the express package so files can be posted to a [server](http://github.com/logicbomb/ng-directives/server/server.js).

[Documentation](http://jasonturim.wordpress.com/2013/09/12/angularjs-native-multi-file-upload-with-progress)

#Services#

##XHR Post Service##
A service that posts files and data to a url, and uses promises and callbacks to notify it's parent of upload events.

[Unit Test](http://logicbomb.github.io/ng-directives/xhr-svc-unit.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/11/angularjs-native-multi-file-upload-with-progress)
