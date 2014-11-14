define(
    [
        'app'
    ],
    function (app) {
    
    "use strict";

    app.factory('notificationFactory', notificationFactory);

    function notificationFactory() {

        var events = {};

        function on(evt, cb) {
           if (events.hasOwnProperty(evt)) {
               events[evt].push(cb);
           } else {
               events[evt] = [cb];
           }
        }

        function trigger(evt, data) {
            if (events.hasOwnProperty(evt) && events[evt].length > 0) {

                events[evt].forEach(function(cb) {
                    
                    cb.apply(this, data);
                    
                });

            }
        }

        function off(evt, cb) {
            if (events.hasOwnProperty(evt) && events[evt].length > 0) {
                events[evt].forEach(function(value, index) {
                    if (value === cb) {
                        events[evt].splice(index, 1);
                    }
                });
            }
        }

        return {
            on      : on,
            off     : off,
            trigger : trigger
        }

    }
});

