window.FakeXMLHttpRequest = (function () {
    function FakeXMLHttpRequest() {
        this.requestHeaders = {};
        this.readyState = 0;
        this.status = null;
        this.responseText = null;
        this.responses = [];

        jasmine.Ajax.server = this;
    }

    FakeXMLHttpRequest.prototype.open = function (method, url) {
        this.method = method;
        this.url = url;
        this.readyState = 1;
    };

    FakeXMLHttpRequest.prototype.onload = function(e) {

    };

    FakeXMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        this.requestHeaders[header] = value;
    };

    FakeXMLHttpRequest.prototype.abort = function () {
        this.readyState = 0;
    };

    FakeXMLHttpRequest.prototype.onreadystatechange = function (isTimeout) {};

    FakeXMLHttpRequest.prototype.send = function (data) {
        this.params = data;
        this.readyState = 2;
    };

    FakeXMLHttpRequest.prototype.getResponseHeader = function (name) {
        return this.responseHeaders[name];
    };

    FakeXMLHttpRequest.prototype.getAllResponseHeaders = function () {
        var responseHeaders = [],
            i;
        for (i in this.responseHeaders) {
            if (this.responseHeaders.hasOwnProperty(i)) {
                responseHeaders.push(i + ': ' + this.responseHeaders[i]);
            }
        }
        return responseHeaders.join('\r\n');
    };

    function getResponseByUrl(responses, url) {
        var i,
            l = responses.length,
            response;

        for (i = 0; i < l; i += 1) {
            if (url.indexOf(responses[i].url) > -1) {
                response = responses[i];
            }
        }

        return response;
    }

    FakeXMLHttpRequest.prototype.respond = function () {
        var response = getResponseByUrl(this.responses, this.url);

        if (response) {
            this.status = response.status;
            this.responseText = response.responseText || "";
            this.readyState = 4;
            this.responseHeaders = response.responseHeaders ||
                {"Content-type": response.contentType || "application/json" };

            this.onreadystatechange();
        }
    };

    FakeXMLHttpRequest.prototype.respondWith = function (response) {
        this.responses.push(response);
    };

    FakeXMLHttpRequest.prototype.responseTimeout = function () {
        this.readyState = 4;
        jasmine.Clock.tick(30000);
        this.onreadystatechange('timeout');
    };

    return FakeXMLHttpRequest;
}());

jasmine.Ajax = {

    isInstalled: function () {
        return jasmine.Ajax.installed;
    },

    assertInstalled: function () {
        if (!jasmine.Ajax.isInstalled()) {
            throw new Error("Mock ajax is not installed, use jasmine.Ajax.useMock()");
        }
    },

    useMock: function () {
        if (!jasmine.Ajax.isInstalled()) {
            var spec = jasmine.getEnv().currentSpec;
            spec.after(jasmine.Ajax.uninstallMock);

            jasmine.Ajax.installMock();
        }
    },

    installMock: function () {
        jasmine.Ajax.real = XMLHttpRequest;
        window.XMLHttpRequest = FakeXMLHttpRequest;
        jasmine.Ajax.installed = true;
    },

    uninstallMock: function () {
        jasmine.Ajax.assertInstalled();
        window.XMLHttpRequest = jasmine.Ajax.real;

        jasmine.Ajax.reset();
    },

    reset: function () {
        jasmine.Ajax.installed = false;
        jasmine.Ajax.real = null;
        jasmine.Ajax.server = null;
        jasmine.Ajax.responses = [];
    },

    installed: false
};