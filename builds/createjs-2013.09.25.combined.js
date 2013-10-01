/*
* Event
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * A collection of Classes that are shared across all the CreateJS libraries.  The classes are included in the minified
 * files of each library and are available on the createsjs namespace directly.
 *
 * <h4>Example</h4>
 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
 *
 * @module CreateJS
 * @main CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Contains properties and methods shared by all events for use with
 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
 * 
 * Note that Event objects are often reused, so you should never
 * rely on an event object's state outside of the call stack it was received in.
 * @class Event
 * @param {String} type The event type.
 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
 * @constructor
 **/
var Event = function(type, bubbles, cancelable) {
  this.initialize(type, bubbles, cancelable);
};
var p = Event.prototype;

// events:

// public properties:

	/**
	 * The type of event.
	 * @property type
	 * @type String
	 **/
	p.type = null;

	/**
	 * The object that generated an event.
	 * @property target
	 * @type Object
	 * @default null
	 * @readonly
	*/
	p.target = null;

	/**
	 * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
	 * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
	 * is generated from childObj, then a listener on parentObj would receive the event with
	 * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
	 * @property currentTarget
	 * @type Object
	 * @default null
	 * @readonly
	*/
	p.currentTarget = null;

	/**
	 * For bubbling events, this indicates the current event phase:<OL>
	 * 	<LI> capture phase: starting from the top parent to the target</LI>
	 * 	<LI> at target phase: currently being dispatched from the target</LI>
	 * 	<LI> bubbling phase: from the target to the top parent</LI>
	 * </OL>
	 * @property eventPhase
	 * @type Number
	 * @default 0
	 * @readonly
	*/
	p.eventPhase = 0;

	/**
	 * Indicates whether the event will bubble through the display list.
	 * @property bubbles
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.bubbles = false;

	/**
	 * Indicates whether the default behaviour of this event can be cancelled via
	 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
	 * @property cancelable
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.cancelable = false;

	/**
	 * The epoch time at which this event was created.
	 * @property timeStamp
	 * @type Number
	 * @default 0
	 * @readonly
	*/
	p.timeStamp = 0;

	/**
	 * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
	 * on this event.
	 * @property defaultPrevented
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.defaultPrevented = false;

	/**
	 * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
	 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
	 * @property propagationStopped
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.propagationStopped = false;

	/**
	 * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
	 * on this event.
	 * @property immediatePropagationStopped
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.immediatePropagationStopped = false;
	
	/**
	 * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
	 * @property removed
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.removed = false;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @protected
	 **/
	p.initialize = function(type, bubbles, cancelable) {
		this.type = type;
		this.bubbles = bubbles;
		this.cancelable = cancelable;
		this.timeStamp = (new Date()).getTime();
	};

// public methods:

	/**
	 * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method preventDefault
	 **/
	p.preventDefault = function() {
		this.defaultPrevented = true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopPropagation
	 **/
	p.stopPropagation = function() {
		this.propagationStopped = true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
	 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopImmediatePropagation
	 **/
	p.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true;
	};
	
	/**
	 * Causes the active listener to be removed via removeEventListener();
	 * 
	 * 		myBtn.addEventListener("click", function(evt) {
	 * 			// do stuff...
	 * 			evt.remove(); // removes this listener.
	 * 		});
	 * 
	 * @method remove
	 **/
	p.remove = function() {
		this.removed = true;
	};
	
	/**
	 * Returns a clone of the Event instance.
	 * @method clone
	 * @return {Event} a clone of the Event instance.
	 **/
	p.clone = function() {
		return new Event(this.type, this.bubbles, this.cancelable);
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Event (type="+this.type+")]";
	};

createjs.Event = Event;
}());
/*
* EventDispatcher
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
 *
 * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
 * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
 * 
 * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
 * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
 * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
 * 
 * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
 * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The 
 * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
 * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
 * 
 * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
 * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also 
 * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
 *
 * <h4>Example</h4>
 * Add EventDispatcher capabilities to the "MyClass" class.
 *
 *      EventDispatcher.initialize(MyClass.prototype);
 *
 * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
 *
 *      instance.addEventListener("eventName", handlerMethod);
 *      function handlerMethod(event) {
 *          console.log(event.target + " Was Clicked");
 *      }
 *
 * <b>Maintaining proper scope</b><br />
 * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
 * method to subscribe to events simplifies this.
 *
 *      instance.addEventListener("click", function(event) {
 *          console.log(instance == this); // false, scope is ambiguous.
 *      });
 *      
 *      instance.on("click", function(event) {
 *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
 *      });
 * 
 * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage scope.
 *      
 *
 * @class EventDispatcher
 * @constructor
 **/
var EventDispatcher = function() {
/*	this.initialize(); */ // not needed.
};
var p = EventDispatcher.prototype;


	/**
	 * Static initializer to mix EventDispatcher methods into a target object or prototype.
	 * 
	 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
	 * 		EventDispatcher.initialize(myObject); // add to a specific instance
	 * 
	 * @method initialize
	 * @static
	 * @param {Object} target The target object to inject EventDispatcher methods into. This can be an instance or a
	 * prototype.
	 **/
	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.on = p.on;
		target.removeEventListener = target.off =  p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
		target._dispatchEvent = p._dispatchEvent;
	};
	
// constructor:

// private properties:
	/**
	 * @protected
	 * @property _listeners
	 * @type Object
	 **/
	p._listeners = null;

	/**
	 * @protected
	 * @property _captureListeners
	 * @type Object
	 **/
	p._captureListeners = null;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {};

// public methods:
	/**
	 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
	 * multiple callbacks getting fired.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.addEventListener("click", handleClick);
	 *      function handleClick(event) {
	 *         // Click happened.
	 *      }
	 *
	 * @method addEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function | Object} Returns the listener for chaining or assignment.
	 **/
	p.addEventListener = function(type, listener, useCapture) {
		var listeners;
		if (useCapture) {
			listeners = this._captureListeners = this._captureListeners||{};
		} else {
			listeners = this._listeners = this._listeners||{};
		}
		var arr = listeners[type];
		if (arr) { this.removeEventListener(type, listener, useCapture); }
		arr = listeners[type]; // remove may have deleted the array
		if (!arr) { listeners[type] = [listener];  }
		else { arr.push(listener); }
		return listener;
	};
	
	/**
	 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
	 * only run once, associate arbitrary data with the listener, and remove the listener.
	 * 
	 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
	 * The created anonymous function is returned for use with .removeEventListener (or .off).
	 * 
	 * <h4>Example</h4>
	 * 
	 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
	 * 		function handleClick(evt, data) {
	 * 			data.count -= 1;
	 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
	 * 			if (data.count == 0) {
	 * 				alert("clicked 3 times!");
	 * 				myBtn.off("click", listener);
	 * 				// alternately: evt.remove();
	 * 			}
	 * 		}
	 * 
	 * @method on
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Object} [scope] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
	 * @param {Boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
	 * @param {*} [data] Arbitrary data that will be included as the second parameter when the listener is called.
	 * @param {Boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
	 **/
	p.on = function(type, listener, scope, once, data, useCapture) {
		if (listener.handleEvent) {
			scope = scope||listener;
			listener = listener.handleEvent;
		}
		scope = scope||this;
		return this.addEventListener(type, function(evt) {
				listener.call(scope, evt, data);
				once&&evt.remove();
			}, useCapture);
	};

	/**
	 * Removes the specified event listener.
	 *
	 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
	 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
	 * closure will not work.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.removeEventListener("click", handleClick);
	 *
	 * @method removeEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.removeEventListener = function(type, listener, useCapture) {
		var listeners = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) { return; }
		var arr = listeners[type];
		if (!arr) { return; }
		for (var i=0,l=arr.length; i<l; i++) {
			if (arr[i] == listener) {
				if (l==1) { delete(listeners[type]); } // allows for faster checks.
				else { arr.splice(i,1); }
				break;
			}
		}
	};
	
	/**
	 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
	 * .on method.
	 *
	 * @method off
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.off = p.removeEventListener;

	/**
	 * Removes all listeners for the specified type, or all listeners of all types.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Remove all listeners
	 *      displayObject.removeAllEvenListeners();
	 *
	 *      // Remove all click listeners
	 *      displayObject.removeAllEventListeners("click");
	 *
	 * @method removeAllEventListeners
	 * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
	 **/
	p.removeAllEventListeners = function(type) {
		if (!type) { this._listeners = this._captureListeners = null; }
		else {
			if (this._listeners) { delete(this._listeners[type]); }
			if (this._captureListeners) { delete(this._captureListeners[type]); }
		}
	};

	/**
	 * Dispatches the specified event to all listeners.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Use a string event
	 *      this.dispatchEvent("complete");
	 *
	 *      // Use an Event instance
	 *      var event = new createjs.Event("progress");
	 *      this.dispatchEvent(event);
	 *
	 * @method dispatchEvent
	 * @param {Object | String | Event} eventObj An object with a "type" property, or a string type.
	 * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
	 * dispatchEvent will construct an Event instance with the specified type.
	 * @param {Object} [target] The object to use as the target property of the event object. This will default to the
	 * dispatching object. <b>This parameter is deprecated and will be removed.</b>
	 * @return {Boolean} Returns the value of eventObj.defaultPrevented.
	 **/
	p.dispatchEvent = function(eventObj, target) {
		if (typeof eventObj == "string") {
			// won't bubble, so skip everything if there's no listeners:
			var listeners = this._listeners;
			if (!listeners || !listeners[eventObj]) { return false; }
			eventObj = new createjs.Event(eventObj);
		}
		// TODO: deprecated. Target param is deprecated, only use case is MouseEvent/mousemove, remove.
		eventObj.target = target||this;

		if (!eventObj.bubbles || !this.parent) {
			this._dispatchEvent(eventObj, 2);
		} else {
			var top=this, list=[top];
			while (top.parent) { list.push(top = top.parent); }
			var i, l=list.length;

			// capture & atTarget
			for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
				list[i]._dispatchEvent(eventObj, 1+(i==0));
			}
			// bubbling
			for (i=1; i<l && !eventObj.propagationStopped; i++) {
				list[i]._dispatchEvent(eventObj, 3);
			}
		}
		return eventObj.defaultPrevented;
	};

	/**
	 * Indicates whether there is at least one listener for the specified event type and `useCapture` value.
	 * @method hasEventListener
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns true if there is at least one listener for the specified event.
	 **/
	p.hasEventListener = function(type) {
		var listeners = this._listeners, captureListeners = this._captureListeners;
		return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
	};

	/**
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[EventDispatcher]";
	};

// private methods:
	/**
	 * @method _dispatchEvent
	 * @param {Object | String | Event} eventObj
	 * @param {Object} eventPhase
	 * @protected
	 **/
	p._dispatchEvent = function(eventObj, eventPhase) {
		var l, listeners = (eventPhase==1) ? this._captureListeners : this._listeners;
		if (eventObj && listeners) {
			var arr = listeners[eventObj.type];
			if (!arr||!(l=arr.length)) { return; }
			eventObj.currentTarget = this;
			eventObj.eventPhase = eventPhase;
			eventObj.removed = false;
			arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
			for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
				var o = arr[i];
				if (o.handleEvent) { o.handleEvent(eventObj); }
				else { o(eventObj); }
				if (eventObj.removed) {
					this.off(eventObj.type, o, eventPhase==1);
					eventObj.removed = false;
				}
			}
		}
	};


createjs.EventDispatcher = EventDispatcher;
}());
/*
* IndexOf
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
  * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */
(function() {
	"use strict";

	/*
	 * Employs Duff's Device to make a more performant implementation of indexOf.
	 * see http://jsperf.com/duffs-indexof/2
	 * #method indexOf
	 * @param {Array} array Array to search for searchElement
	 * @param searchElement Element to search array for.
	 * @return {Number} The position of the first occurrence of a specified value searchElement in the passed in array ar.
	 * @constructor
	 */
	/* replaced with simple for loop for now, perhaps will be researched further
	createjs.indexOf = function (ar, searchElement) {
		var l = ar.length;

		var n = (l * 0.125) ^ 0;	// 0.125 == 1/8, using multiplication because it's faster in some browsers	// ^0 floors result
		for (var i = 0; i < n; i++) {
			if(searchElement === ar[i*8])   { return (i*8);}
			if(searchElement === ar[i*8+1]) { return (i*8+1);}
			if(searchElement === ar[i*8+2]) { return (i*8+2);}
			if(searchElement === ar[i*8+3]) { return (i*8+3);}
			if(searchElement === ar[i*8+4]) { return (i*8+4);}
			if(searchElement === ar[i*8+5]) { return (i*8+5);}
			if(searchElement === ar[i*8+6]) { return (i*8+6);}
			if(searchElement === ar[i*8+7]) { return (i*8+7);}
		}

		var n = l % 8;
		for (var i = 0; i < n; i++) {
			if (searchElement === ar[l-n+i]) {
				return l-n+i;
			}
		}

		return -1;
	}
	*/

	/**
	 * Finds the first occurrence of a specified value searchElement in the passed in array, and returns the index of
	 * that value.  Returns -1 if value is not found.
	 *
	 *      var i = createjs.indexOf(myArray, myElementToFind);
	 *
	 * @method indexOf
	 * @param {Array} array Array to search for searchElement
	 * @param searchElement Element to find in array.
	 * @return {Number} The first index of searchElement in array.
	 */
	createjs.indexOf = function (array, searchElement){
		for (var i = 0,l=array.length; i < l; i++) {
			if (searchElement === array[i]) {
				return i;
			}
		}
		return -1;
	}

}());/*
* UID
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Global utility for generating sequential unique ID numbers. The UID class uses a static interface (ex. <code>UID.get()</code>)
 * and should not be instantiated.
 * @class UID
 * @static
 **/
var UID = function() {
	throw "UID cannot be instantiated";
}

	/**
	 * @property _nextID
	 * @type Number
	 * @protected
	 **/
	UID._nextID = 0;

	/**
	 * Returns the next unique id.
	 * @method get
	 * @return {Number} The next unique id
	 * @static
	 **/
	UID.get = function() {
		return UID._nextID++;
	}

createjs.UID = UID;
}());
/*
* Ticker
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

// constructor:
/**
 * The Ticker provides  a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
 * event to be notified when a set time interval has elapsed.
 *
 * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
 * during times of high CPU load. The Ticker class uses a static interface (ex. <code>Ticker.getPaused()</code>) and
 * should not be instantiated.
 *
 * <h4>Example</h4>
 *      createjs.Ticker.addEventListener("tick", handleTick);
 *      function handleTick(event) {
 *          // Actions carried out each frame
 *          if (!event.paused) {
 *              // Actions carried out when the Ticker is not paused.
 *          }
 *      }
 *
 * To update a stage every tick, the {{#crossLink "Stage"}}{{/crossLink}} instance can also be used as a listener, as
 * it will automatically update when it receives a tick event:
 *
 *      createjs.Ticker.addEventListener("tick", stage);
 *
 * @class Ticker
 * @uses EventDispatcher
 * @static
 **/
var Ticker = function() {
	throw "Ticker cannot be instantiated.";
};

// constants:
	/**
	 * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
	 * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
	 * dispatches the tick when the time is within a certain threshold.
	 *
	 * This mode has a higher variance for time between frames than TIMEOUT, but does not require that content be time
	 * based as with RAF while gaining the benefits of that API (screen synch, background throttling).
	 *
	 * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
	 * framerates of 10, 12, 15, 20, and 30 work well.
	 *
	 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
	 * @property RAF_SYNCHED
	 * @static
	 * @type {String}
	 * @default "synched"
	 * @readonly
	 **/
	Ticker.RAF_SYNCHED = "synched";

	/**
	 * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
	 * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
	 * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the tick event object's "delta" properties
	 * to make this easier.
	 *
	 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
	 * @property RAF
	 * @static
	 * @type {String}
	 * @default "raf"
	 * @readonly
	 **/
	Ticker.RAF = "raf";

	/**
	 * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
	 * provide the benefits of requestAnimationFrame (screen synch, background throttling).
	 * @property RAF
	 * @static
	 * @type {String}
	 * @default "timer"
	 * @readonly
	 **/
	Ticker.TIMEOUT = "timeout";

// events:

	/**
	 * Dispatched each tick. The event will be dispatched to each listener even when the Ticker has been paused using
	 * {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          console.log("Paused:", event.paused, event.delta);
	 *      }
	 *
	 * @event tick
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Boolean} paused Indicates whether the ticker is currently paused.
	 * @param {Number} delta The time elapsed in ms since the last tick.
	 * @param {Number} time The total time in ms since Ticker was initialized.
	 * @param {Number} runTime The total time in ms that Ticker was not paused since it was initialized. For example,
	 * 	you could determine the amount of time that the Ticker has been paused since initialization with time-runTime.
	 * @since 0.6.0
	 */

// public static properties:
	/**
	 * Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}, and will be removed in a future version. If true, timingMode will
	 * use {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} by default.
	 * @deprecated Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}.
	 * @property useRAF
	 * @static
	 * @type {Boolean}
	 * @default false
	 **/
	Ticker.useRAF = false;

	/**
	 * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
	 * {{#crossLink "Ticker/TIMEOUT"}}{{/crossLink}}, {{#crossLink "Ticker/RAF"}}{{/crossLink}}, and
	 * {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} for mode details.
	 * @property timingMode
	 * @static
	 * @type {String}
	 * @default Ticker.TIMEOUT
	 **/
	Ticker.timingMode = null;

	/**
	 * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
	 * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
	 * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
	 * (ex. maxDelta=50 when running at 40fps).
	 * 
	 * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
	 * when using both delta and other values.
	 * 
	 * If 0, there is no maximum.
	 * @property maxDelta
	 * @static
	 * @type {number}
	 * @default 0
	 */
	Ticker.maxDelta = 0;

// mix-ins:
	// EventDispatcher methods:
	Ticker.removeEventListener = null;
	Ticker.removeAllEventListeners = null;
	Ticker.dispatchEvent = null;
	Ticker.hasEventListener = null;
	Ticker._listeners = null;
	createjs.EventDispatcher.initialize(Ticker); // inject EventDispatcher methods.
	Ticker._addEventListener = Ticker.addEventListener;
	Ticker.addEventListener = function() {
		!Ticker._inited&&Ticker.init();
		Ticker._addEventListener.apply(Ticker, arguments);
	};

// private static properties:
	
	/** 
	 * @property _paused
	 * @type {Boolean}
	 * @protected
	 **/
	Ticker._paused = false;

	/**
	 * @property _inited
	 * @type {Boolean}
	 * @protected
	 **/
	Ticker._inited = false;

	/**
	 * @property _startTime
	 * @type {Number}
	 * @protected
	 **/
	Ticker._startTime = 0;

	/**
	 * @property _pausedTime
	 * @type {Number}
	 * @protected
	 **/
	Ticker._pausedTime=0;

	/**
	 * The number of ticks that have passed
	 * @property _ticks
	 * @type {Number}
	 * @protected
	 **/
	Ticker._ticks = 0;

	/**
	 * The number of ticks that have passed while Ticker has been paused
	 * @property _pausedTicks
	 * @type {Number}
	 * @protected
	 **/
	Ticker._pausedTicks = 0;

	/**
	 * @property _interval
	 * @type {Number}
	 * @protected
	 **/
	Ticker._interval = 50;

	/**
	 * @property _lastTime
	 * @type {Number}
	 * @protected
	 **/
	Ticker._lastTime = 0;

	/**
	 * @property _times
	 * @type {Array}
	 * @protected
	 **/
	Ticker._times = null;

	/**
	 * @property _tickTimes
	 * @type {Array}
	 * @protected
	 **/
	Ticker._tickTimes = null;

	/**
	 * Stores the timeout or requestAnimationFrame id.
	 * @property _timerId
	 * @type {Number}
	 * @protected
	 **/
	Ticker._timerId = null;
	
	/**
	 * True if currently using requestAnimationFrame, false if using setTimeout.
	 * @property _raf
	 * @type {Boolean}
	 * @protected
	 **/
	Ticker._raf = true;

// public static methods:
	
	/**
	 * Starts the tick. This is called automatically when the first listener is added.
	 * @method init
	 * @static
	 **/
	Ticker.init = function() {
		if (Ticker._inited) { return; }
		Ticker._inited = true;
		Ticker._times = [];
		Ticker._tickTimes = [];
		Ticker._startTime = Ticker._getTime();
		Ticker._times.push(Ticker._lastTime = 0);
		Ticker.setInterval(Ticker._interval);
	};
	
	/**
	 * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
	 * @method reset
	 * @static
	 **/
	Ticker.reset = function() {
		if (Ticker._raf) {
			var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
			f&&f(Ticker._timerId);
		} else {
			clearTimeout(Ticker._timerId);
		}
		Ticker.removeAllEventListeners("tick");
	};
	
	/**
	 * Sets the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
	 *
	 * Note actual time between ticks may be more than requested depending on CPU load.
	 * @method setInterval
	 * @static
	 * @param {Number} interval Time in milliseconds between ticks. Default value is 50.
	 **/
	Ticker.setInterval = function(interval) {
		Ticker._interval = interval;
		if (!Ticker._inited) { return; }
		Ticker._setupTick();
	};

	/**
	 * Returns the current target time between ticks, as set with {{#crossLink "Ticker/setInterval"}}{{/crossLink}}.
	 * @method getInterval
	 * @static
	 * @return {Number} The current target interval in milliseconds between tick events.
	 **/
	Ticker.getInterval = function() {
		return Ticker._interval;
	};

	/**
	 * Sets the target frame rate in frames per second (FPS). For example, with an interval of 40, <code>getFPS()</code>
	 * will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
	 * @method setFPS
	 * @static
	 * @param {Number} value Target number of ticks broadcast per second.
	 **/
	Ticker.setFPS = function(value) {
		Ticker.setInterval(1000/value);
	};

	/**
	 * Returns the target frame rate in frames per second (FPS). For example, with an interval of 40, <code>getFPS()</code>
	 * will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
	 * @method getFPS
	 * @static
	 * @return {Number} The current target number of frames / ticks broadcast per second.
	 **/
	Ticker.getFPS = function() {
		return 1000/Ticker._interval;
	};

	/**
	 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
	 * because it only measures the time spent within the tick execution stack. 
	 * 
	 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between 
	 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that 
	 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
	 *
	 * Example 2: With a target FPS of 30, getFPS() returns 10fps, which indicates an average of 100ms between the end of
	 * one tick and the end of the next. However, getMeasuredTickTime() returns 20ms. This would indicate that something
	 * other than the tick is using ~80ms (another script, DOM rendering, etc).
	 * @method getMeasuredTickTime
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
	 * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
	 * @return {Number} The average time spent in a tick in milliseconds.
	 **/
	Ticker.getMeasuredTickTime = function(ticks) {
		var ttl=0, times=Ticker._tickTimes;
		if (times.length < 1) { return -1; }

		// by default, calculate average for the past ~1 second:
		ticks = Math.min(times.length, ticks||(Ticker.getFPS()|0));
		for (var i=0; i<ticks; i++) { ttl += times[i]; }
		return times/ticks;
	};

	/**
	 * Returns the actual frames / ticks per second.
	 * @method getMeasuredFPS
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
	 * Defaults to the number of ticks per second.
	 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
	 * from the target frames per second.
	 **/
	Ticker.getMeasuredFPS = function(ticks) {
		var times = Ticker._times;
		if (times.length < 2) { return -1; }

		// by default, calculate fps for the past ~1 second:
		ticks = Math.min(times.length-1, ticks||(Ticker.getFPS()|0));
		return 1000/((times[0]-times[ticks])/ticks);
	};

	/**
	 * Changes the "paused" state of the Ticker, which can be retrieved by the {{#crossLink "Ticker/getPaused"}}{{/crossLink}}
	 * method, and is passed as the "paused" property of the <code>tick</code> event. When the ticker is paused, all
	 * listeners will still receive a tick event, but the <code>paused</code> property will be false.
	 *
	 * Note that in EaselJS v0.5.0 and earlier, "pauseable" listeners would <strong>not</strong> receive the tick
	 * callback when Ticker was paused. This is no longer the case.
	 *
	 * <h4>Example</h4>
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      createjs.Ticker.setPaused(true);
	 *      function handleTick(event) {
	 *          console.log("Paused:", event.paused, createjs.Ticker.getPaused());
	 *      }
	 *
	 * @method setPaused
	 * @static
	 * @param {Boolean} value Indicates whether to pause (true) or unpause (false) Ticker.
	 **/
	Ticker.setPaused = function(value) {
		Ticker._paused = value;
	};

	/**
	 * Returns a boolean indicating whether Ticker is currently paused, as set with {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
	 * When the ticker is paused, all listeners will still receive a tick event, but this value will be false.
	 *
	 * Note that in EaselJS v0.5.0 and earlier, "pauseable" listeners would <strong>not</strong> receive the tick
	 * callback when Ticker was paused. This is no longer the case.
	 *
	 * <h4>Example</h4>
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      createjs.Ticker.setPaused(true);
	 *      function handleTick(event) {
	 *          console.log("Paused:", createjs.Ticker.getPaused());
	 *      }
	 *
	 * @static
	 * @return {Boolean} Whether the Ticker is currently paused.
	 **/
	Ticker.getPaused = function() {
		return Ticker._paused;
	};

	/**
	 * Returns the number of milliseconds that have elapsed since Ticker was initialized. For example, you could use
	 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
	 * @method getTime
	 * @static
	 * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
	 * If false, the value returned will be total time elapsed since the first tick event listener was added.
	 * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized.
	 **/
	Ticker.getTime = function(runTime) {
		return Ticker._getTime() - Ticker._startTime - (runTime ? Ticker._pausedTime : 0);
	};

	/**
	 * Similar to getTime(), but returns the time included with the current (or most recent) tick event object.
	 * @method getEventTime
	 * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
	 * @returns {number} The time or runTime property from the most recent tick event.
	 */
	Ticker.getEventTime = function(runTime) {
		return (Ticker._lastTime || Ticker._startTime) - (runTime ? Ticker._pausedTime : 0);
	};
	
	/**
	 * Returns the number of ticks that have been broadcast by Ticker.
	 * @method getTicks
	 * @static
	 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
	 * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
	 * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
	 * value. The default value is false.
	 * @return {Number} of ticks that have been broadcast.
	 **/
	Ticker.getTicks = function(pauseable) {
		return  Ticker._ticks - (pauseable ?Ticker._pausedTicks : 0);
	};

// private static methods:
	/**
	 * @method _handleSynch
	 * @static
	 * @protected
	 **/
	Ticker._handleSynch = function() {
		var time = Ticker._getTime() - Ticker._startTime;
		Ticker._timerId = null;
		Ticker._setupTick();

		// run if enough time has elapsed, with a little bit of flexibility to be early:
		if (time - Ticker._lastTime >= (Ticker._interval-1)*0.97) {
			Ticker._tick();
		}
	};

	/**
	 * @method _handleRAF
	 * @static
	 * @protected
	 **/
	Ticker._handleRAF = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _handleTimeout
	 * @static
	 * @protected
	 **/
	Ticker._handleTimeout = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _setupTick
	 * @static
	 * @protected
	 **/
	Ticker._setupTick = function() {
		if (Ticker._timerId != null) { return; } // avoid duplicates

		var mode = Ticker.timingMode||(Ticker.useRAF&&Ticker.RAF_SYNCHED);
		if (mode == Ticker.RAF_SYNCHED || mode == Ticker.RAF) {
			var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if (f) {
				Ticker._timerId = f(mode == Ticker.RAF ? Ticker._handleRAF : Ticker._handleSynch);
				Ticker._raf = true;
				return;
			}
		}
		Ticker._raf = false;
		Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval);
	};

	/**
	 * @method _tick
	 * @static
	 * @protected
	 **/
	Ticker._tick = function() {
		var time = Ticker._getTime()-Ticker._startTime;
		var elapsedTime = time-Ticker._lastTime;
		var paused = Ticker._paused;
		
		Ticker._ticks++;
		if (paused) {
			Ticker._pausedTicks++;
			Ticker._pausedTime += elapsedTime;
		}
		Ticker._lastTime = time;
		
		if (Ticker.hasEventListener("tick")) {
			var event = new createjs.Event("tick");
			var maxDelta = Ticker.maxDelta;
			event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
			event.paused = paused;
			event.time = time;
			event.runTime = time-Ticker._pausedTime;
			Ticker.dispatchEvent(event);
		}
		
		Ticker._tickTimes.unshift(Ticker._getTime()-time);
		while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }

		Ticker._times.unshift(time);
		while (Ticker._times.length > 100) { Ticker._times.pop(); }
	};

	/**
	 * @method _getTime
	 * @static
	 * @protected
	 **/
	var now = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
	Ticker._getTime = function() {
		return (now&&now.call(performance))||(new Date().getTime());
	};

createjs.Ticker = Ticker;
}());
/*
* MouseEvent
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

// TODO: deprecated. @uses EventDispatcher
/**
 * This is passed as the parameter to all mouse/pointer/touch related events on {{#crossLink "DisplayObject"}}{{/crossLink}}
 * instances.
 * @class MouseEvent
 * @param {String} type The event type.
 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
 * @param {Number} stageX The normalized x position relative to the stage.
 * @param {Number} stageY The normalized y position relative to the stage.
 * @param {MouseEvent} nativeEvent The native DOM event related to this mouse event.
 * @param {Number} pointerID The unique id for the pointer.
 * @param {Boolean} primary Indicates whether this is the primary pointer in a multitouch environment.
 * @param {Number} rawX The raw x position relative to the stage.
 * @param {Number} rawY The raw y position relative to the stage.
 * @extends Event
 * @uses EventDispatcher
 * @constructor
 **/
var MouseEvent = function(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY) {
	this.initialize(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY);
};
var p = MouseEvent.prototype = new createjs.Event();

// events:

	/**
	 * For MouseEvent objects of type "mousedown", mousemove events will be dispatched from the event object until the
	 * user releases the mouse anywhere. This enables you to listen to mouse move interactions for the duration of a
	 * press, which can be very useful for operations such as drag and drop.
	 *
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event mousemove
	 * @since 0.6.0
	 * @deprecated In favour of the DisplayObject "pressmove" event.
	 */

	/**
	 * For MouseEvent objects of type "mousedown", a mouseup event will be dispatched from the event object when the
	 * user releases the mouse anywhere. This enables you to listen for a corresponding mouse up from a specific press,
	 * which can be very useful for operations such as drag and drop.
	 *
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event mouseup
	 * @since 0.6.0
	 * @deprecated In favour of the DisplayObject "pressup" event.
	 */

// public properties:

	/**
	 * The normalized x position on the stage. This will always be within the range 0 to stage width.
	 * @property stageX
	 * @type Number
	*/
	p.stageX = 0;

	/**
	 * The normalized y position on the stage. This will always be within the range 0 to stage height.
	 * @property stageY
	 * @type Number
	 **/
	p.stageY = 0;

	/**
	 * The raw x position relative to the stage. Normally this will be the same as the stageX value, unless
	 * stage.mouseMoveOutside is true and the pointer is outside of the stage bounds.
	 * @property rawX
	 * @type Number
	*/
	p.rawX = 0;

	/**
	 * The raw y position relative to the stage. Normally this will be the same as the stageY value, unless
	 * stage.mouseMoveOutside is true and the pointer is outside of the stage bounds.
	 * @property rawY
	 * @type Number
	*/
	p.rawY = 0;

	/**
	 * The native MouseEvent generated by the browser. The properties and API for this
	 * event may differ between browsers. This property will be null if the
	 * EaselJS property was not directly generated from a native MouseEvent.
	 * @property nativeEvent
	 * @type MouseEvent
	 * @default null
	 **/
	p.nativeEvent = null;

	// TODO: deprecated:
	/**
	 * REMOVED. Use the {{#crossLink "DisplayObject"}}{{/crossLink}} {{#crossLink "DisplayObject/pressmove:event"}}{{/crossLink}}
	 * event.
	 * @property onMouseMove
	 * @type Function
	 * @deprecated Use the DisplayObject "pressmove" event.
	 */
	/**
	 * REMOVED. Use the {{#crossLink "DisplayObject"}}{{/crossLink}} {{#crossLink "DisplayObject/pressup:event"}}{{/crossLink}}
	 * event.
	 * @property onMouseUp
	 * @type Function
	 * @deprecated Use the DisplayObject "pressup" event.
	 */

	/**
	 * The unique id for the pointer (touch point or cursor). This will be either -1 for the mouse, or the system
	 * supplied id value.
	 * @property pointerID
	 * @type {Number}
	 */
	p.pointerID = 0;

	/**
	 * Indicates whether this is the primary pointer in a multitouch environment. This will always be true for the mouse.
	 * For touch pointers, the first pointer in the current stack will be considered the primary pointer.
	 * @property primary
	 * @type {Boolean}
	 */
	p.primary = false;

// mix-ins:
	// EventDispatcher methods:
	// TODO: deprecated:
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	createjs.EventDispatcher.initialize(p); // inject EventDispatcher methods.

// constructor:
	/**
	 * @property Event_initialize
	 * @private
	 * @type Function
	 **/
	p.Event_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @param {Number} stageX The normalized x position relative to the stage.
	 * @param {Number} stageY The normalized y position relative to the stage.
	 * @param {MouseEvent} nativeEvent The native DOM event related to this mouse event.
	 * @param {Number} pointerID The unique id for the pointer.
	 * @param {Boolean} primary Indicates whether this is the primary pointer in a multitouch environment.
	 * @param {Number} rawX The raw x position relative to the stage.
	 * @param {Number} rawY The raw y position relative to the stage.
	 * @protected
	 **/
	p.initialize = function(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY) {
		this.Event_initialize(type, bubbles, cancelable);
		this.stageX = stageX;
		this.stageY = stageY;
		this.nativeEvent = nativeEvent;
		this.pointerID = pointerID;
		this.primary = primary;
		this.rawX = (rawX==null)?stageX:rawX;
		this.rawY = (rawY==null)?stageY:rawY;
	};

// public methods:
	/**
	 * Returns a clone of the MouseEvent instance.
	 * @method clone
	 * @return {MouseEvent} a clone of the MouseEvent instance.
	 **/
	p.clone = function() {
		return new MouseEvent(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY);
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]";
	};

createjs.MouseEvent = MouseEvent;
}());
/*
* Matrix2D
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Represents an affine transformation matrix, and provides tools for constructing and concatenating matrixes.
 * @class Matrix2D
 * @param {Number} [a=1] Specifies the a property for the new matrix.
 * @param {Number} [b=0] Specifies the b property for the new matrix.
 * @param {Number} [c=0] Specifies the c property for the new matrix.
 * @param {Number} [d=1] Specifies the d property for the new matrix.
 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
 * @constructor
 **/
var Matrix2D = function(a, b, c, d, tx, ty) {
  this.initialize(a, b, c, d, tx, ty);
};
var p = Matrix2D.prototype;

// static public properties:

	/**
	 * An identity matrix, representing a null transformation.
	 * @property identity
	 * @static
	 * @type Matrix2D
	 * @readonly
	 **/
	Matrix2D.identity = null; // set at bottom of class definition.

	/**
	 * Multiplier for converting degrees to radians. Used internally by Matrix2D.
	 * @property DEG_TO_RAD
	 * @static
	 * @final
	 * @type Number
	 * @readonly
	 **/
	Matrix2D.DEG_TO_RAD = Math.PI/180;


// public properties:
	/**
	 * Position (0, 0) in a 3x3 affine transformation matrix.
	 * @property a
	 * @type Number
	 **/
	p.a = 1;

	/**
	 * Position (0, 1) in a 3x3 affine transformation matrix.
	 * @property b
	 * @type Number
	 **/
	p.b = 0;

	/**
	 * Position (1, 0) in a 3x3 affine transformation matrix.
	 * @property c
	 * @type Number
	 **/
	p.c = 0;

	/**
	 * Position (1, 1) in a 3x3 affine transformation matrix.
	 * @property d
	 * @type Number
	 **/
	p.d = 1;

	/**
	 * Position (2, 0) in a 3x3 affine transformation matrix.
	 * @property tx
	 * @type Number
	 **/
	p.tx = 0;

	/**
	 * Position (2, 1) in a 3x3 affine transformation matrix.
	 * @property ty
	 * @type Number
	 **/
	p.ty = 0;

	/**
	 * Property representing the alpha that will be applied to a display object. This is not part of matrix
	 * operations, but is used for operations like getConcatenatedMatrix to provide concatenated alpha values.
	 * @property alpha
	 * @type Number
	 **/
	p.alpha = 1;

	/**
	 * Property representing the shadow that will be applied to a display object. This is not part of matrix
	 * operations, but is used for operations like getConcatenatedMatrix to provide concatenated shadow values.
	 * @property shadow
	 * @type Shadow
	 **/
	p.shadow  = null;

	/**
	 * Property representing the compositeOperation that will be applied to a display object. This is not part of
	 * matrix operations, but is used for operations like getConcatenatedMatrix to provide concatenated
	 * compositeOperation values. You can find a list of valid composite operations at:
	 * <a href="https://developer.mozilla.org/en/Canvas_tutorial/Compositing">https://developer.mozilla.org/en/Canvas_tutorial/Compositing</a>
	 * @property compositeOperation
	 * @type String
	 **/
	p.compositeOperation = null;

// constructor:
	/**
	 * Initialization method. Can also be used to reinitialize the instance.
	 * @method initialize
	 * @param {Number} [a=1] Specifies the a property for the new matrix.
	 * @param {Number} [b=0] Specifies the b property for the new matrix.
	 * @param {Number} [c=0] Specifies the c property for the new matrix.
	 * @param {Number} [d=1] Specifies the d property for the new matrix.
	 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
	 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
	 * @return {Matrix2D} This instance. Useful for chaining method calls.
	*/
	p.initialize = function(a, b, c, d, tx, ty) {
		this.a = (a == null) ? 1 : a;
		this.b = b || 0;
		this.c = c || 0;
		this.d = (d == null) ? 1 : d;
		this.tx = tx || 0;
		this.ty = ty || 0;
		return this;
	};

// public methods:
	/**
	 * Concatenates the specified matrix properties with this matrix. All parameters are required.
	 * @method prepend
	 * @param {Number} a
	 * @param {Number} b
	 * @param {Number} c
	 * @param {Number} d
	 * @param {Number} tx
	 * @param {Number} ty
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.prepend = function(a, b, c, d, tx, ty) {
		var tx1 = this.tx;
		if (a != 1 || b != 0 || c != 0 || d != 1) {
			var a1 = this.a;
			var c1 = this.c;
			this.a  = a1*a+this.b*c;
			this.b  = a1*b+this.b*d;
			this.c  = c1*a+this.d*c;
			this.d  = c1*b+this.d*d;
		}
		this.tx = tx1*a+this.ty*c+tx;
		this.ty = tx1*b+this.ty*d+ty;
		return this;
	};

	/**
	 * Appends the specified matrix properties with this matrix. All parameters are required.
	 * @method append
	 * @param {Number} a
	 * @param {Number} b
	 * @param {Number} c
	 * @param {Number} d
	 * @param {Number} tx
	 * @param {Number} ty
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.append = function(a, b, c, d, tx, ty) {
		var a1 = this.a;
		var b1 = this.b;
		var c1 = this.c;
		var d1 = this.d;

		this.a  = a*a1+b*c1;
		this.b  = a*b1+b*d1;
		this.c  = c*a1+d*c1;
		this.d  = c*b1+d*d1;
		this.tx = tx*a1+ty*c1+this.tx;
		this.ty = tx*b1+ty*d1+this.ty;
		return this;
	};

	/**
	 * Prepends the specified matrix with this matrix.
	 * @method prependMatrix
	 * @param {Matrix2D} matrix
	 **/
	p.prependMatrix = function(matrix) {
		this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
		this.prependProperties(matrix.alpha, matrix.shadow,  matrix.compositeOperation);
		return this;
	};

	/**
	 * Appends the specified matrix with this matrix.
	 * @method appendMatrix
	 * @param {Matrix2D} matrix
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.appendMatrix = function(matrix) {
		this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
		this.appendProperties(matrix.alpha, matrix.shadow,  matrix.compositeOperation);
		return this;
	};

	/**
	 * Generates matrix properties from the specified display object transform properties, and prepends them with this matrix.
	 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
	 * mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
	 * @method prependTransform
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} scaleX
	 * @param {Number} scaleY
	 * @param {Number} rotation
	 * @param {Number} skewX
	 * @param {Number} skewY
	 * @param {Number} regX Optional.
	 * @param {Number} regY Optional.
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.prependTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
		if (rotation%360) {
			var r = rotation*Matrix2D.DEG_TO_RAD;
			var cos = Math.cos(r);
			var sin = Math.sin(r);
		} else {
			cos = 1;
			sin = 0;
		}

		if (regX || regY) {
			// append the registration offset:
			this.tx -= regX; this.ty -= regY;
		}
		if (skewX || skewY) {
			// TODO: can this be combined into a single prepend operation?
			skewX *= Matrix2D.DEG_TO_RAD;
			skewY *= Matrix2D.DEG_TO_RAD;
			this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
			this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
		} else {
			this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
		}
		return this;
	};

	/**
	 * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
	 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
	 * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
	 * @method appendTransform
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} scaleX
	 * @param {Number} scaleY
	 * @param {Number} rotation
	 * @param {Number} skewX
	 * @param {Number} skewY
	 * @param {Number} regX Optional.
	 * @param {Number} regY Optional.
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.appendTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
		if (rotation%360) {
			var r = rotation*Matrix2D.DEG_TO_RAD;
			var cos = Math.cos(r);
			var sin = Math.sin(r);
		} else {
			cos = 1;
			sin = 0;
		}

		if (skewX || skewY) {
			// TODO: can this be combined into a single append?
			skewX *= Matrix2D.DEG_TO_RAD;
			skewY *= Matrix2D.DEG_TO_RAD;
			this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
			this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
		} else {
			this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
		}

		if (regX || regY) {
			// prepend the registration offset:
			this.tx -= regX*this.a+regY*this.c; 
			this.ty -= regX*this.b+regY*this.d;
		}
		return this;
	};

	/**
	 * Applies a rotation transformation to the matrix.
	 * @method rotate
	 * @param {Number} angle The angle in radians. To use degrees, multiply by <code>Math.PI/180</code>.
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.rotate = function(angle) {
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);

		var a1 = this.a;
		var c1 = this.c;
		var tx1 = this.tx;

		this.a = a1*cos-this.b*sin;
		this.b = a1*sin+this.b*cos;
		this.c = c1*cos-this.d*sin;
		this.d = c1*sin+this.d*cos;
		this.tx = tx1*cos-this.ty*sin;
		this.ty = tx1*sin+this.ty*cos;
		return this;
	};

	/**
	 * Applies a skew transformation to the matrix.
	 * @method skew
	 * @param {Number} skewX The amount to skew horizontally in degrees.
	 * @param {Number} skewY The amount to skew vertically in degrees.
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	*/
	p.skew = function(skewX, skewY) {
		skewX = skewX*Matrix2D.DEG_TO_RAD;
		skewY = skewY*Matrix2D.DEG_TO_RAD;
		this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
		return this;
	};

	/**
	 * Applies a scale transformation to the matrix.
	 * @method scale
	 * @param {Number} x The amount to scale horizontally
	 * @param {Number} y The amount to scale vertically
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.scale = function(x, y) {
		this.a *= x;
		this.d *= y;
		this.c *= x;
		this.b *= y;
		this.tx *= x;
		this.ty *= y;
		return this;
	};

	/**
	 * Translates the matrix on the x and y axes.
	 * @method translate
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.translate = function(x, y) {
		this.tx += x;
		this.ty += y;
		return this;
	};

	/**
	 * Sets the properties of the matrix to those of an identity matrix (one that applies a null transformation).
	 * @method identity
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.identity = function() {
		this.alpha = this.a = this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;
		this.shadow = this.compositeOperation = null;
		return this;
	};

	/**
	 * Inverts the matrix, causing it to perform the opposite transformation.
	 * @method invert
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	 **/
	p.invert = function() {
		var a1 = this.a;
		var b1 = this.b;
		var c1 = this.c;
		var d1 = this.d;
		var tx1 = this.tx;
		var n = a1*d1-b1*c1;

		this.a = d1/n;
		this.b = -b1/n;
		this.c = -c1/n;
		this.d = a1/n;
		this.tx = (c1*this.ty-d1*tx1)/n;
		this.ty = -(a1*this.ty-b1*tx1)/n;
		return this;
	};

	/**
	 * Returns true if the matrix is an identity matrix.
	 * @method isIdentity
	 * @return {Boolean}
	 **/
	p.isIdentity = function() {
		return this.tx == 0 && this.ty == 0 && this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1;
	};

	/**
	 * Transforms a point according to this matrix.
	 * @method transformPoint
	 * @param {Number} x The x component of the point to transform.
	 * @param {Number} y The y component of the point to transform.
	 * @param {Point | Object} [pt] An object to copy the result into. If omitted a generic object with x/y properties will be returned.
	 **/
	p.transformPoint = function(x, y, pt) {
		pt = pt||{};
		pt.x = x*this.a+y*this.c+this.tx;
		pt.y = x*this.b+y*this.d+this.ty;
		return pt;
	};

	/**
	 * Decomposes the matrix into transform properties (x, y, scaleX, scaleY, and rotation). Note that this these values
	 * may not match the transform properties you used to generate the matrix, though they will produce the same visual
	 * results.
	 * @method decompose
	 * @param {Object} target The object to apply the transform properties to. If null, then a new object will be returned.
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	*/
	p.decompose = function(target) {
		// TODO: it would be nice to be able to solve for whether the matrix can be decomposed into only scale/rotation
		// even when scale is negative
		if (target == null) { target = {}; }
		target.x = this.tx;
		target.y = this.ty;
		target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
		target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);

		var skewX = Math.atan2(-this.c, this.d);
		var skewY = Math.atan2(this.b, this.a);

		if (skewX == skewY) {
			target.rotation = skewY/Matrix2D.DEG_TO_RAD;
			if (this.a < 0 && this.d >= 0) {
				target.rotation += (target.rotation <= 0) ? 180 : -180;
			}
			target.skewX = target.skewY = 0;
		} else {
			target.skewX = skewX/Matrix2D.DEG_TO_RAD;
			target.skewY = skewY/Matrix2D.DEG_TO_RAD;
		}
		return target;
	};

	/**
	 * Reinitializes all matrix properties to those specified.
	 * @method reinitialize
	 * @param {Number} [a=1] Specifies the a property for the new matrix.
	 * @param {Number} [b=0] Specifies the b property for the new matrix.
	 * @param {Number} [c=0] Specifies the c property for the new matrix.
	 * @param {Number} [d=1] Specifies the d property for the new matrix.
	 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
	 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
	 * @param {Number} [alpha=1] desired alpha value
	 * @param {Shadow} [shadow=null] desired shadow value
	 * @param {String} [compositeOperation=null] desired composite operation value
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	*/
	p.reinitialize = function(a, b, c, d, tx, ty, alpha, shadow, compositeOperation) {
		this.initialize(a,b,c,d,tx,ty);
		this.alpha = alpha == null ? 1 : alpha;
		this.shadow = shadow;
		this.compositeOperation = compositeOperation;
		return this;
	};
	
	/**
	 * Copies all properties from the specified matrix to this matrix.
	 * @method copy
	 * @param {Matrix2D} matrix The matrix to copy properties from.
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	*/
	p.copy = function(matrix) {
		return this.reinitialize(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty, matrix.alpha, matrix.shadow, matrix.compositeOperation);
	};

	/**
	 * Appends the specified visual properties to the current matrix.
	 * @method appendProperties
	 * @param {Number} alpha desired alpha value
	 * @param {Shadow} shadow desired shadow value
	 * @param {String} compositeOperation desired composite operation value
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	*/
	p.appendProperties = function(alpha, shadow, compositeOperation) {
		this.alpha *= alpha;
		this.shadow = shadow || this.shadow;
		this.compositeOperation = compositeOperation || this.compositeOperation;
		return this;
	};

	/**
	 * Prepends the specified visual properties to the current matrix.
	 * @method prependProperties
	 * @param {Number} alpha desired alpha value
	 * @param {Shadow} shadow desired shadow value
	 * @param {String} compositeOperation desired composite operation value
	 * @return {Matrix2D} This matrix. Useful for chaining method calls.
	*/
	p.prependProperties = function(alpha, shadow, compositeOperation) {
		this.alpha *= alpha;
		this.shadow = this.shadow || shadow;
		this.compositeOperation = this.compositeOperation || compositeOperation;
		return this;
	};

	/**
	 * Returns a clone of the Matrix2D instance.
	 * @method clone
	 * @return {Matrix2D} a clone of the Matrix2D instance.
	 **/
	p.clone = function() {
		return (new Matrix2D()).copy(this);
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]";
	};

	// this has to be populated after the class is defined:
	Matrix2D.identity = new Matrix2D();

createjs.Matrix2D = Matrix2D;
}());
/*
* Point
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Represents a point on a 2 dimensional x / y coordinate system.
 *
 * <h4>Example</h4>
 *      var point = new Point(0, 100);
 *
 * @class Point
 * @param {Number} [x=0] X position.
 * @param {Number} [y=0] Y position.
 * @constructor
 **/
var Point = function(x, y) {
  this.initialize(x, y);
};
var p = Point.prototype;

// public properties:

	/**
	 * X position.
	 * @property x
	 * @type Number
	 **/
	p.x = 0;

	/**
	 * Y position.
	 * @property y
	 * @type Number
	 **/
	p.y = 0;

// constructor:
	/** 
	 * Initialization method. Can also be used to reinitialize the instance.
	 * @method initialize
	 * @param {Number} [x=0] X position.
	 * @param {Number} [y=0] Y position.
	 * @return {Point} This instance. Useful for chaining method calls.
	*/
	p.initialize = function(x, y) {
		this.x = (x == null ? 0 : x);
		this.y = (y == null ? 0 : y);
		return this;
	};
	
// public methods:
	/**
	 * Copies all properties from the specified point to this point.
	 * @method copy
	 * @param {Point} point The point to copy properties from.
	 * @return {Point} This point. Useful for chaining method calls.
	*/
	p.copy = function(point) {
		return this.initialize(point.x, point.y);
	};
	
	/**
	 * Returns a clone of the Point instance.
	 * @method clone
	 * @return {Point} a clone of the Point instance.
	 **/
	p.clone = function() {
		return new Point(this.x, this.y);
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Point (x="+this.x+" y="+this.y+")]";
	};
	
createjs.Point = Point;
}());
/*
* Rectangle
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Represents a rectangle as defined by the points (x, y) and (x+width, y+height).
 *
 * @example
 *      var rect = new createjs.Rectangle(0, 0, 100, 100);
 *
 * @class Rectangle
 * @param {Number} [x=0] X position.
 * @param {Number} [y=0] Y position.
 * @param {Number} [width=0] The width of the Rectangle.
 * @param {Number} [height=0] The height of the Rectangle.
 * @constructor
 **/
var Rectangle = function(x, y, width, height) {
  this.initialize(x, y, width, height);
};
var p = Rectangle.prototype;

// public properties:
	/**
	 * X position.
	 * @property x
	 * @type Number
	 **/
	p.x = 0;

	/**
	 * Y position.
	 * @property y
	 * @type Number
	 **/
	p.y = 0;

	/**
	 * Width.
	 * @property width
	 * @type Number
	 **/
	p.width = 0;

	/**
	 * Height.
	 * @property height
	 * @type Number
	 **/
	p.height = 0;

// constructor:
	/** 
	 * Initialization method. Can also be used to reinitialize the instance.
	 * @method initialize
	 * @param {Number} [x=0] X position.
	 * @param {Number} [y=0] Y position.
	 * @param {Number} [width=0] The width of the Rectangle.
	 * @param {Number} [height=0] The height of the Rectangle.
	 * @return {Rectangle} This instance. Useful for chaining method calls.
	*/
	p.initialize = function(x, y, width, height) {
		this.x = x||0;
		this.y = y||0;
		this.width = width||0;
		this.height = height||0;
		return this;
	};
	
// public methods:
	/**
	 * Copies all properties from the specified rectangle to this rectangle.
	 * @method copy
	 * @param {Rectangle} rectangle The rectangle to copy properties from.
	 * @return {Rectangle} This rectangle. Useful for chaining method calls.
	*/
	p.copy = function(rectangle) {
		return this.initialize(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
	};
	
	/**
	 * Returns a clone of the Rectangle instance.
	 * @method clone
	 * @return {Rectangle} a clone of the Rectangle instance.
	 **/
	p.clone = function() {
		return new Rectangle(this.x, this.y, this.width, this.height);
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]";
	};
	
createjs.Rectangle = Rectangle;
}());
/*
* ButtonHelper
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * The ButtonHelper is a helper class to create interactive buttons from {{#crossLink "MovieClip"}}{{/crossLink}} or
 * {{#crossLink "Sprite"}}{{/crossLink}} instances. This class will intercept mouse events from an object, and
 * automatically call {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} or {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}},
 * to the respective animation labels, add a pointer cursor, and allows the user to define a hit state frame.
 *
 * The ButtonHelper instance does not need to be added to the stage, but a reference should be maintained to prevent
 * garbage collection.
 * 
 * Note that over states will not work unless you call {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}.
 *
 * <h4>Example</h4>
 *
 *      var helper = new createjs.ButtonHelper(myInstance, "out", "over", "down", false, myInstance, "hit");
 *      myInstance.addEventListener("click", handleClick);
 *      function handleClick(event) {
 *          // Click Happened.
 *      }
 *
 * @class ButtonHelper
 * @param {Sprite|MovieClip} target The instance to manage.
 * @param {String} [outLabel="out"] The label or animation to go to when the user rolls out of the button.
 * @param {String} [overLabel="over"] The label or animation to go to when the user rolls over the button.
 * @param {String} [downLabel="down"] The label or animation to go to when the user presses the button.
 * @param {Boolean} [play=false] If the helper should call "gotoAndPlay" or "gotoAndStop" on the button when changing
 * states.
 * @param {DisplayObject} [hitArea] An optional item to use as the hit state for the button. If this is not defined,
 * then the button's visible states will be used instead. Note that the same instance as the "target" argument can be
 * used for the hitState.
 * @param {String} [hitLabel] The label or animation on the hitArea instance that defines the hitArea bounds. If this is
 * null, then the default state of the hitArea will be used. *
 * @constructor
 */
var ButtonHelper = function(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
	this.initialize(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel);
};
var p = ButtonHelper.prototype;

// public properties:
	/**
	 * The target for this button helper.
	 * @property target
	 * @type MovieClip | Sprite
	 * @readonly
	 **/
	p.target = null;

	/**
	 * The label name or frame number to display when the user mouses out of the target. Defaults to "over".
	 * @property overLabel
	 * @type String | Number
	 **/
	p.overLabel = null;

	/**
	 * The label name or frame number to display when the user mouses over the target. Defaults to "out".
	 * @property outLabel
	 * @type String | Number
	 **/
	p.outLabel = null;

	/**
	 * The label name or frame number to display when the user presses on the target. Defaults to "down".
	 * @property downLabel
	 * @type String | Number
	 **/
	p.downLabel = null;

	/**
	 * If true, then ButtonHelper will call gotoAndPlay, if false, it will use gotoAndStop. Default is false.
	 * @property play
	 * @default false
	 * @type Boolean
	 **/
	p.play = false;

//  private properties
	/**
	 * @property _isPressed
	 * @type Boolean
	 * @protected
	 **/
	p._isPressed = false;

	/**
	 * @property _isOver
	 * @type Boolean
	 * @protected
	 **/
	p._isOver = false;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @param {Sprite|MovieClip} target The instance to manage.
	 * @param {String} [outLabel="out"] The label or animation to go to when the user rolls out of the button.
	 * @param {String} [overLabel="over"] The label or animation to go to when the user rolls over the button.
	 * @param {String} [downLabel="down"] The label or animation to go to when the user presses the button.
	 * @param {Boolean} [play=false] If the helper should call "gotoAndPlay" or "gotoAndStop" on the button when changing
	 * states.
	 * @param {DisplayObject} [hitArea] An optional item to use as the hit state for the button. If this is not defined,
	 * then the button's visible states will be used instead. Note that the same instance as the "target" argument can be
	 * used for the hitState.
	 * @param {String} [hitLabel] The label or animation on the hitArea instance that defines the hitArea bounds. If this is
	 * null, then the default state of the hitArea will be used.
	 * @protected
	 **/
	p.initialize = function(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
		if (!target.addEventListener) { return; }
		this.target = target;
		target.cursor = "pointer";
		this.overLabel = overLabel == null ? "over" : overLabel;
		this.outLabel = outLabel == null ? "out" : outLabel;
		this.downLabel = downLabel == null ? "down" : downLabel;
		this.play = play;
		this.setEnabled(true);
		this.handleEvent({});
		if (hitArea) {
			if (hitLabel) {
				hitArea.actionsEnabled = false;
				hitArea.gotoAndStop&&hitArea.gotoAndStop(hitLabel);
			}
			target.hitArea = hitArea;
		}
	};

// public methods:
	/**
	 * Enables or disables the button functionality on the target.
	 * @method setEnabled
	 * @param {Boolean} value
	 **/
	p.setEnabled = function(value) {
		var o = this.target;
		if (value) {
			o.addEventListener("rollover", this);
			o.addEventListener("rollout", this);
			o.addEventListener("mousedown", this);
			o.addEventListener("pressup", this);
		} else {
			o.removeEventListener("rollover", this);
			o.removeEventListener("rollout", this);
			o.removeEventListener("mousedown", this);
			o.removeEventListener("pressup", this);
		}
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[ButtonHelper]";
	};


// protected methods:
	/**
	 * @method handleEvent
	 * @param {Object} evt The mouse event to handle.
	 * @protected
	 **/
	p.handleEvent = function(evt) {
		var label, t = this.target, type = evt.type;

		if (type == "mousedown") {
			this._isPressed = true;
			label = this.downLabel;
		} else if (type == "pressup") {
			this._isPressed = false;
			label = this._isOver ? this.overLabel : this.outLabel;
		} else if (type == "rollover") {
			this._isOver = true;
			label = this._isPressed ? this.downLabel : this.overLabel;
		} else { // rollout and default
			this._isOver = false;
			label = this._isPressed ? this.overLabel : this.outLabel;
		}
		if (this.play) {
			t.gotoAndPlay&&t.gotoAndPlay(label);
		} else {
			t.gotoAndStop&&t.gotoAndStop(label);
		}
	};

createjs.ButtonHelper = ButtonHelper;
}());
/*
* Shadow
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * This class encapsulates the properties required to define a shadow to apply to a {{#crossLink "DisplayObject"}}{{/crossLink}}
 * via its <code>shadow</code> property.
 *
 * <h4>Example</h4>
 *      myImage.shadow = new createjs.Shadow("#000000", 5, 5, 10);
 *
 * @class Shadow
 * @constructor
 * @param {String} color The color of the shadow.
 * @param {Number} offsetX The x offset of the shadow in pixels.
 * @param {Number} offsetY The y offset of the shadow in pixels.
 * @param {Number} blur The size of the blurring effect.
 **/
var Shadow = function(color, offsetX, offsetY, blur) {
  this.initialize(color, offsetX, offsetY, blur);
};
var p = Shadow.prototype;

// static public properties:
	/**
	 * An identity shadow object (all properties are set to 0).
	 * @property identity
	 * @type Shadow
	 * @static
	 * @final
	 * @readonly
	 **/
	Shadow.identity = null; // set at bottom of class definition.

// public properties:
	/** The color of the shadow.
	 * property color
	 * @type String
	 * @default null
	 */
	p.color = null;

	/** The x offset of the shadow.
	 * property offsetX
	 * @type Number
	 * @default 0
	 */
	p.offsetX = 0;

	/** The y offset of the shadow.
	 * property offsetY
	 * @type Number
	 * @default 0
	 */
	p.offsetY = 0;

	/** The blur of the shadow.
	 * property blur
	 * @type Number
	 * @default 0
	 */
	p.blur = 0;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 * @param {String} color The color of the shadow.
	 * @param {Number} offsetX The x offset of the shadow.
	 * @param {Number} offsetY The y offset of the shadow.
	 * @param {Number} blur The size of the blurring effect.
	 **/
	p.initialize = function(color, offsetX, offsetY, blur) {
		this.color = color;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.blur = blur;
	};

// public methods:
	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Shadow]";
	};


	/**
	 * Returns a clone of this Shadow instance.
	 * @method clone
	 * @return {Shadow} A clone of the current Shadow instance.
	 **/
	p.clone = function() {
		return new Shadow(this.color, this.offsetX, this.offsetY, this.blur);
	};

	// this has to be populated after the class is defined:
	Shadow.identity = new Shadow("transparent", 0, 0, 0);

createjs.Shadow = Shadow;
}());
/*
* SpriteSheet
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
/**
 * Encapsulates the properties and methods associated with a sprite sheet. A sprite sheet is a series of images (usually
 * animation frames) combined into a larger image (or images). For example, an animation consisting of eight 100x100
 * images could be combined into a single 400x200 sprite sheet (4 frames across by 2 high).
 *
 * The data passed to the SpriteSheet constructor defines three critical pieces of information:<ol>
 *    <li> The image or images to use.</li>
 *    <li> The positions of individual image frames. This data can be represented in one of two ways:
 *    As a regular grid of sequential, equal-sized frames, or as individually defined, variable sized frames arranged in
 *    an irregular (non-sequential) fashion.</li>
 *    <li> Likewise, animations can be represented in two ways: As a series of sequential frames, defined by a start and
 *    end frame [0,3], or as a list of frames [0,1,2,3].</li>
 * </OL>
 *
 * <h4>SpriteSheet Format</h4>
 *
 *      data = {
 *          // DEFINING FRAMERATE:
 *          // this specifies the framerate that will be set on the SpriteSheet. See Spritesheet.framerate
 *          // for more information.
 *          framerate: 20,
 *
 *          // DEFINING IMAGES:
 *          // list of images or image URIs to use. SpriteSheet can handle preloading.
 *          // the order dictates their index value for frame definition.
 *          images: [image1, "path/to/image2.png"],
 *
 *          // DEFINING FRAMES:
 * 	        // the simple way to define frames, only requires frame size because frames are consecutive:
 * 	        // define frame width/height, and optionally the frame count and registration point x/y.
 * 	        // if count is omitted, it will be calculated automatically based on image dimensions.
 * 	        frames: {width:64, height:64, count:20, regX: 32, regY:64},
 *
 * 	        // OR, the complex way that defines individual rects for frames.
 * 	        // The 5th value is the image index per the list defined in "images" (defaults to 0).
 * 	        frames: [
 * 	        	// x, y, width, height, imageIndex, regX, regY
 * 	        	[0,0,64,64,0,32,64],
 * 	        	[64,0,96,64,0]
 * 	        ],
 *
 *          // DEFINING ANIMATIONS:
 *
 * 	        // simple animation definitions. Define a consecutive range of frames (begin to end inclusive).
 * 	        // optionally define a "next" animation to sequence to (or false to stop) and a playback "speed"
 * 	        animations: {
 * 	        	// start, end, next, speed
 * 	        	run: [0,8],
 * 	        	jump: [9,12,"run",2]
 * 	        }
 *
 *          // the complex approach which specifies every frame in the animation by index.
 *          animations: {
 *          	run: {
 *          		frames: [1,2,3,3,2,1]
 *          	},
 *          	jump: {
 *          		frames: [1,4,5,6,1],
 *          		next: "run",
 *          		speed: 2
 *          	},
 *          	stand: { frames: [7] }
 *          }
 *
 * 	        // the above two approaches can be combined, you can also use a single frame definition:
 * 	        animations: {
 * 	        	run: [0,8,true,2],
 * 	        	jump: {
 * 	        		frames: [8,9,10,9,8],
 * 	        		next: "run",
 * 	        		speed: 2
 * 	        	},
 * 	        	stand: 7
 * 	        }
 *      }
 *
 * <h4>Example</h4>
 * To define a simple sprite sheet, with a single image "sprites.jpg" arranged in a regular 50x50 grid with two
 * animations, "run" looping from frame 0-4 inclusive, and "jump" playing from frame 5-8 and sequencing back to run:
 *
 *      var data = {
 *          images: ["sprites.jpg"],
 *          frames: {width:50, height:50},
 *          animations: {run:[0,4], jump:[5,8,"run"]}
 *      };
 *      var spriteSheet = new createjs.SpriteSheet(data);
 *      var animation = new createjs.Sprite(spriteSheet, "run");
 *
 * @class SpriteSheet
 * @constructor
 * @param {Object} data An object describing the SpriteSheet data.
 * @extends EventDispatcher
 **/
var SpriteSheet = function(data) {
  this.initialize(data);
};
var p = SpriteSheet.prototype = new createjs.EventDispatcher();

// events:

	/**
	 * Dispatched when all images are loaded.  Note that this only fires if the images
	 * were not fully loaded when the sprite sheet was initialized. You should check the complete property
	 * to prior to adding a listener. Ex.
	 * <pre><code>var sheet = new SpriteSheet(data);
	 * if (!sheet.complete) {
	 *  &nbsp; // not preloaded, listen for the complete event:
	 *  &nbsp; sheet.addEventListener("complete", handler);
	 * }</code></pre>
	 * @event complete
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.6.0
	 */

// public properties:
	/**
	 * Indicates whether all images are finished loading.
	 * @property complete
	 * @type Boolean
	 * @readonly
	 **/
	p.complete = true;


	/**
	 * Specifies the framerate to use by default for Sprite instances using the SpriteSheet. See
	 * Sprite.framerate for more information.
	 * @property framerate
	 * @type Number
	 **/
	p.framerate = 0;

	// TODO: deprecated.
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SpriteSheet/complete:event"}}{{/crossLink}}
	 * event.
	 * @property onComplete
	 * @type Function
	 * @deprecated Use addEventListener and the "complete" event.
	 **/

// private properties:
	/**
	 * @property _animations
	 * @protected
	 **/
	p._animations = null;

	/**
	 * @property _frames
	 * @protected
	 **/
	p._frames = null;

	/**
	 * @property _images
	 * @protected
	 **/
	p._images = null;

	/**
	 * @property _data
	 * @protected
	 **/
	p._data = null;

	/**
	 * @property _loadCount
	 * @protected
	 **/
	p._loadCount = 0;

	// only used for simple frame defs:
	/**
	 * @property _frameHeight
	 * @protected
	 **/
	p._frameHeight = 0;

	/**
	 * @property _frameWidth
	 * @protected
	 **/
	p._frameWidth = 0;

	/**
	 * @property _numFrames
	 * @protected
	 **/
	p._numFrames = 0;

	/**
	 * @property _regX
	 * @protected
	 **/
	p._regX = 0;

	/**
	 * @property _regY
	 * @protected
	 **/
	p._regY = 0;

// constructor:
	/**
	 * @method initialize
	 * @param {Object} data An object describing the SpriteSheet data.
	 * @protected
	 **/
	p.initialize = function(data) {
		var i,l,o,a;
		if (data == null) { return; }

		this.framerate = data.framerate||0;

		// parse images:
		if (data.images && (l=data.images.length) > 0) {
			a = this._images = [];
			for (i=0; i<l; i++) {
				var img = data.images[i];
				if (typeof img == "string") {
					var src = img;
					img = new Image();
					img.src = src;
				}
				a.push(img);
				if (!img.getContext && !img.complete) {
					this._loadCount++;
					this.complete = false;
					(function(o) { img.onload = function() { o._handleImageLoad(); } })(this);
				}
			}
		}

		// parse frames:
		if (data.frames == null) { // nothing
		} else if (data.frames instanceof Array) {
			this._frames = [];
			a = data.frames;
			for (i=0,l=a.length;i<l;i++) {
				var arr = a[i];
				this._frames.push({image:this._images[arr[4]?arr[4]:0], rect:new createjs.Rectangle(arr[0],arr[1],arr[2],arr[3]), regX:arr[5]||0, regY:arr[6]||0 });
			}
		} else {
			o = data.frames;
			this._frameWidth = o.width;
			this._frameHeight = o.height;
			this._regX = o.regX||0;
			this._regY = o.regY||0;
			this._numFrames = o.count;
			if (this._loadCount == 0) { this._calculateFrames(); }
		}
		
		// parse animations:
		this._animations = [];
		if ((o=data.animations) != null) {
			this._data = {};
			var name;
			for (name in o) {
				var anim = {name:name};
				var obj = o[name];
				if (typeof obj == "number") { // single frame
					a = anim.frames = [obj];
				} else if (obj instanceof Array) { // simple
					if (obj.length == 1) { anim.frames = [obj[0]]; }
					else {
						anim.speed = obj[3];
						anim.next = obj[2];
						a = anim.frames = [];
						for (i=obj[0];i<=obj[1];i++) {
							a.push(i);
						}
					}
				} else { // complex
					anim.speed = obj.speed;
					anim.next = obj.next;
					var frames = obj.frames;
					a = anim.frames = (typeof frames == "number") ? [frames] : frames.slice(0);
				}
				if (anim.next === true || anim.next === undefined) { anim.next = name; } // loop
				if (anim.next === false || (a.length < 2 && anim.next == name)) { anim.next = null; } // stop
				if (!anim.speed) { anim.speed = 1; }
				this._animations.push(name);
				this._data[name] = anim;
			}
		}

	};

// public methods:
	/**
	 * Returns the total number of frames in the specified animation, or in the whole sprite
	 * sheet if the animation param is omitted.
     * @method getNumFrames
	 * @param {String} animation The name of the animation to get a frame count for.
	 * @return {Number} The number of frames in the animation, or in the entire sprite sheet if the animation param is omitted.
	*/
	p.getNumFrames = function(animation) {
		if (animation == null) {
			return this._frames ? this._frames.length : this._numFrames;
		} else {
			var data = this._data[animation];
			if (data == null) { return 0; }
			else { return data.frames.length; }
		}
	};

	/**
	 * Returns an array of all available animation names as strings.
	 * @method getAnimations
	 * @return {Array} an array of animation names available on this sprite sheet.
	 **/
	p.getAnimations = function() {
		return this._animations.slice(0);
	};

	/**
	 * Returns an object defining the specified animation. The returned object contains:<UL>
	 *     <LI>frames: an array of the frame ids in the animation</LI>
	 *     <LI>speed: the playback speed for this animation</LI>
	 *     <LI>name: the name of the animation</LI>
	 *     <LI>next: the default animation to play next. If the animation loops, the name and next property will be the
	 *     same.</LI>
	 * </UL>
	 * @method getAnimation
	 * @param {String} name The name of the animation to get.
	 * @return {Object} a generic object with frames, speed, name, and next properties.
	 **/
	p.getAnimation = function(name) {
		return this._data[name];
	};

	/**
	 * Returns an object specifying the image and source rect of the specified frame. The returned object has:<UL>
	 *     <LI>an image property holding a reference to the image object in which the frame is found</LI>
	 *     <LI>a rect property containing a Rectangle instance which defines the boundaries for the frame within that
	 *     image.</LI>
	 * </UL>
	 * @method getFrame
	 * @param {Number} frameIndex The index of the frame.
	 * @return {Object} a generic object with image and rect properties. Returns null if the frame does not exist.
	 **/
	p.getFrame = function(frameIndex) {
		var frame;
		if (this._frames && (frame=this._frames[frameIndex])) { return frame; }
		return null;
	};

	/**
	 * Returns a {{#crossLink "Rectangle"}}{{/crossLink}} instance defining the bounds of the specified frame relative
	 * to the origin. For example, a 90 x 70 frame with a regX of 50 and a regY of 40 would return:
	 *
	 *      [x=-50, y=-40, width=90, height=70]
	 *
	 * @method getFrameBounds
	 * @param {Number} frameIndex The index of the frame.
	 * @param {Rectangle} [rectangle] A Rectangle instance to copy the values into. By default a new instance is created.
	 * @return {Rectangle} A Rectangle instance. Returns null if the frame does not exist, or the image is not fully loaded.
	 **/
	p.getFrameBounds = function(frameIndex, rectangle) {
		var frame = this.getFrame(frameIndex);
		return frame ? (rectangle||new createjs.Rectangle()).initialize(-frame.regX, -frame.regY, frame.rect.width, frame.rect.height) : null;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[SpriteSheet]";
	};

	/**
	 * Returns a clone of the SpriteSheet instance.
	 * @method clone
	 * @return {SpriteSheet} a clone of the SpriteSheet instance.
	 **/
	p.clone = function() {
		// TODO: there isn't really any reason to clone SpriteSheet instances, because they can be reused.
		var o = new SpriteSheet();
		o.complete = this.complete;
		o._animations = this._animations;
		o._frames = this._frames;
		o._images = this._images;
		o._data = this._data;
		o._frameHeight = this._frameHeight;
		o._frameWidth = this._frameWidth;
		o._numFrames = this._numFrames;
		o._loadCount = this._loadCount;
		return o;
	};

// private methods:
	/**
	 * @method _handleImageLoad
	 * @protected
	 **/
	p._handleImageLoad = function() {
		if (--this._loadCount == 0) {
			this._calculateFrames();
			this.complete = true;
			this.dispatchEvent("complete");
		}
	};

	/**
	 * @method _calculateFrames
	 * @protected
	 **/
	p._calculateFrames = function() {
		if (this._frames || this._frameWidth == 0) { return; }
		this._frames = [];
		var ttlFrames = 0;
		var fw = this._frameWidth;
		var fh = this._frameHeight;
		for (var i=0,imgs = this._images; i<imgs.length; i++) {
			var img = imgs[i];
			var cols = (img.width+1)/fw|0;
			var rows = (img.height+1)/fh|0;
			var ttl = this._numFrames>0 ? Math.min(this._numFrames-ttlFrames,cols*rows) : cols*rows;
			for (var j=0;j<ttl;j++) {
				this._frames.push({image:img, rect:new createjs.Rectangle(j%cols*fw,(j/cols|0)*fh,fw,fh), regX:this._regX, regY:this._regY });
			}
			ttlFrames += ttl;
		}
		this._numFrames = ttlFrames;
	};

createjs.SpriteSheet = SpriteSheet;
}());
/*
* Graphics
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
* Inner class used by the {{#crossLink "Graphics"}}{{/crossLink}} class. Used to create the instruction lists used in Graphics:
* @class Command
* @protected
* @constructor
**/
function Command(f, params, path) {
	this.f = f;
	this.params = params;
	this.path = path==null ? true : path;
}

/**
* @method exec
* @protected
* @param {Object} scope
**/
Command.prototype.exec = function(scope) { this.f.apply(scope, this.params); };

/**
 * The Graphics class exposes an easy to use API for generating vector drawing instructions and drawing them to a
 * specified context. Note that you can use Graphics without any dependency on the Easel framework by calling {{#crossLink "DisplayObject/draw"}}{{/crossLink}}
 * directly, or it can be used with the {{#crossLink "Shape"}}{{/crossLink}} object to draw vector graphics within the
 * context of an Easel display list.
 *
 * <h4>Example</h4>
 *      var g = new createjs.Graphics();
 *	    g.setStrokeStyle(1);
 *	    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
 *	    g.beginFill(createjs.Graphics.getRGB(255,0,0));
 *	    g.drawCircle(0,0,3);
 *
 *	    var s = new createjs.Shape(g);
 *	    	s.x = 100;
 *	    	s.y = 100;
 *
 *	    stage.addChild(s);
 *	    stage.update();
 *
 * Note that all drawing methods in Graphics return the Graphics instance, so they can be chained together. For example,
 * the following line of code would generate the instructions to draw a rectangle with a red stroke and blue fill, then
 * render it to the specified context2D:
 *
 *      myGraphics.beginStroke("#F00").beginFill("#00F").drawRect(20, 20, 100, 50).draw(myContext2D);
 *
 * <h4>Tiny API</h4>
 * The Graphics class also includes a "tiny API", which is one or two-letter methods that are shortcuts for all of the
 * Graphics methods. These methods are great for creating compact instructions, and is used by the Toolkit for CreateJS
 * to generate readable code. All tiny methods are marked as protected, so you can view them by enabling protected
 * descriptions in the docs.
 *
 * <table>
 *     <tr><td><b>Tiny</b></td><td><b>Method</b></td><td><b>Tiny</b></td><td><b>Method</b></td></tr>
 *     <tr><td>mt</td><td>{{#crossLink "Graphics/moveTo"}}{{/crossLink}} </td>
 *     <td>lt</td> <td>{{#crossLink "Graphics/lineTo"}}{{/crossLink}}</td></tr>
 *     <tr><td>a/at</td><td>{{#crossLink "Graphics/arc"}}{{/crossLink}} / {{#crossLink "Graphics/arcTo"}}{{/crossLink}} </td>
 *     <td>bt</td><td>{{#crossLink "Graphics/bezierCurveTo"}}{{/crossLink}} </td></tr>
 *     <tr><td>qt</td><td>{{#crossLink "Graphics/quadraticCurveTo"}}{{/crossLink}} (also curveTo)</td>
 *     <td>r</td><td>{{#crossLink "Graphics/rect"}}{{/crossLink}} </td></tr>
 *     <tr><td>cp</td><td>{{#crossLink "Graphics/closePath"}}{{/crossLink}} </td>
 *     <td>c</td><td>{{#crossLink "Graphics/clear"}}{{/crossLink}} </td></tr>
 *     <tr><td>f</td><td>{{#crossLink "Graphics/beginFill"}}{{/crossLink}} </td>
 *     <td>lf</td><td>{{#crossLink "Graphics/beginLinearGradientFill"}}{{/crossLink}} </td></tr>
 *     <tr><td>rf</td><td>{{#crossLink "Graphics/beginRadialGradientFill"}}{{/crossLink}} </td>
 *     <td>bf</td><td>{{#crossLink "Graphics/beginBitmapFill"}}{{/crossLink}} </td></tr>
 *     <tr><td>ef</td><td>{{#crossLink "Graphics/endFill"}}{{/crossLink}} </td>
 *     <td>ss</td><td>{{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} </td></tr>
 *     <tr><td>s</td><td>{{#crossLink "Graphics/beginStroke"}}{{/crossLink}} </td>
 *     <td>ls</td><td>{{#crossLink "Graphics/beginLinearGradientStroke"}}{{/crossLink}} </td></tr>
 *     <tr><td>rs</td><td>{{#crossLink "Graphics/beginRadialGradientStroke"}}{{/crossLink}} </td>
 *     <td>bs</td><td>{{#crossLink "Graphics/beginBitmapStroke"}}{{/crossLink}} </td></tr>
 *     <tr><td>es</td><td>{{#crossLink "Graphics/endStroke"}}{{/crossLink}} </td>
 *     <td>dr</td><td>{{#crossLink "Graphics/drawRect"}}{{/crossLink}} </td></tr>
 *     <tr><td>rr</td><td>{{#crossLink "Graphics/drawRoundRect"}}{{/crossLink}} </td>
 *     <td>rc</td><td>{{#crossLink "Graphics/drawRoundRectComplex"}}{{/crossLink}} </td></tr>
 *     <tr><td>dc</td><td>{{#crossLink "Graphics/drawCircle"}}{{/crossLink}} </td>
 *     <td>de</td><td>{{#crossLink "Graphics/drawEllipse"}}{{/crossLink}} </td></tr>
 *     <tr><td>dp</td><td>{{#crossLink "Graphics/drawPolyStar"}}{{/crossLink}} </td>
 *     <td>p</td><td>{{#crossLink "Graphics/decodePath"}}{{/crossLink}} </td></tr>
 * </table>
 *
 * Here is the above example, using the tiny API instead.
 *
 *      myGraphics.s("#F00").f("#00F").r(20, 20, 100, 50).draw(myContext2D);
 *
 * @class Graphics
 * @constructor
 * @for Graphics
 **/
var Graphics = function() {
	this.initialize();
};
var p = Graphics.prototype;

// static public methods:


	/**
	 * Returns a CSS compatible color string based on the specified RGB numeric color values in the format
	 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)". For example,
	 *
	 *      createjs.Graphics.getRGB(50, 100, 150, 0.5);
	 *      // Returns "rgba(50,100,150,0.5)"
	 *
	 * It also supports passing a single hex color value as the first param, and an optional alpha value as the second
	 * param. For example,
	 *
	 *      createjs.Graphics.getRGB(0xFF00FF, 0.2);
	 *      // Returns "rgba(255,0,255,0.2)"
	 *
	 * @method getRGB
	 * @static
	 * @param {Number} r The red component for the color, between 0 and 0xFF (255).
	 * @param {Number} g The green component for the color, between 0 and 0xFF (255).
	 * @param {Number} b The blue component for the color, between 0 and 0xFF (255).
	 * @param {Number} [alpha] The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
	 * @return {String} A CSS compatible color string based on the specified RGB numeric color values in the format
	 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)".
	 **/
	Graphics.getRGB = function(r, g, b, alpha) {
		if (r != null && b == null) {
			alpha = g;
			b = r&0xFF;
			g = r>>8&0xFF;
			r = r>>16&0xFF;
		}
		if (alpha == null) {
			return "rgb("+r+","+g+","+b+")";
		} else {
			return "rgba("+r+","+g+","+b+","+alpha+")";
		}
	};

	/**
	 * Returns a CSS compatible color string based on the specified HSL numeric color values in the format "hsla(360,100,100,1.0)",
	 * or if alpha is null then in the format "hsl(360,100,100)".
	 *
	 *      createjs.Graphics.getHSL(150, 100, 70);
	 *      // Returns "hsl(150,100,70)"
	 *
	 * @method getHSL
	 * @static
	 * @param {Number} hue The hue component for the color, between 0 and 360.
	 * @param {Number} saturation The saturation component for the color, between 0 and 100.
	 * @param {Number} lightness The lightness component for the color, between 0 and 100.
	 * @param {Number} [alpha] The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
	 * @return {String} A CSS compatible color string based on the specified HSL numeric color values in the format
	 * "hsla(360,100,100,1.0)", or if alpha is null then in the format "hsl(360,100,100)".
	 **/
	Graphics.getHSL = function(hue, saturation, lightness, alpha) {
		if (alpha == null) {
			return "hsl("+(hue%360)+","+saturation+"%,"+lightness+"%)";
		} else {
			return "hsla("+(hue%360)+","+saturation+"%,"+lightness+"%,"+alpha+")";
		}
	};

// static properties:

	/**
	 * Exposes the Command class used internally by Graphics. Useful for extending the Graphics class or injecting
	 * functionality.
	 * @property Command
	 * @static
	 * @type {Function}
	 **/
	Graphics.Command = Command;

	/**
	 * Map of Base64 characters to values. Used by {{#crossLink "Graphics/decodePath"}}{{/crossLink}}.
	 * @property BASE_64
	 * @static
	 * @final
	 * @readonly
	 * @type {Object}
	 **/
	Graphics.BASE_64 = {"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25,"a":26,"b":27,"c":28,"d":29,"e":30,"f":31,"g":32,"h":33,"i":34,"j":35,"k":36,"l":37,"m":38,"n":39,"o":40,"p":41,"q":42,"r":43,"s":44,"t":45,"u":46,"v":47,"w":48,"x":49,"y":50,"z":51,"0":52,"1":53,"2":54,"3":55,"4":56,"5":57,"6":58,"7":59,"8":60,"9":61,"+":62,"/":63};


	/**
	 * Maps numeric values for the caps parameter of {{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} to
	 * corresponding string values. This is primarily for use with the tiny API. The mappings are as follows: 0 to
	 * "butt", 1 to "round", and 2 to "square".
	 * For example, to set the line caps to "square":
	 *
	 *      myGraphics.ss(16, 2);
	 *
	 * @property STROKE_CAPS_MAP
	 * @static
	 * @final
	 * @readonly
	 * @type {Array}
	 **/
	Graphics.STROKE_CAPS_MAP = ["butt", "round", "square"];

	/**
	 * Maps numeric values for the joints parameter of {{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} to
	 * corresponding string values. This is primarily for use with the tiny API. The mappings are as follows: 0 to
	 * "miter", 1 to "round", and 2 to "bevel".
	 * For example, to set the line joints to "bevel":
	 *
	 *      myGraphics.ss(16, 0, 2);
	 *
	 * @property STROKE_JOINTS_MAP
	 * @static
	 * @final
	 * @readonly
	 * @type {Array}
	 **/
	Graphics.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];

	/**
	 * @property _ctx
	 * @static
	 * @protected
	 * @type {CanvasRenderingContext2D}
	 **/
	 
	/**
	 * @property beginCmd
	 * @static
	 * @protected
	 * @type {Command}
	 **/
	 
	/**
	 * @property fillCmd
	 * @static
	 * @protected
	 * @type {Command}
	 **/
	 
	/**
	 * @property strokeCmd
	 * @static
	 * @protected
	 * @type {Command}
	 **/
	var canvas = (createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));
	if (canvas.getContext) {
		var ctx = Graphics._ctx = canvas.getContext("2d");
		Graphics.beginCmd = new Command(ctx.beginPath, [], false);
		Graphics.fillCmd = new Command(ctx.fill, [], false);
		Graphics.strokeCmd = new Command(ctx.stroke, [], false);
		canvas.width = canvas.height = 1;
	}
	
// public properties

// private properties
	/**
	 * @property _strokeInstructions
	 * @protected
	 * @type {Array}
	 **/
	p._strokeInstructions = null;

	/**
	 * @property _strokeStyleInstructions
	 * @protected
	 * @type {Array}
	 **/
	p._strokeStyleInstructions = null;

	/**
	 * @property _strokeIgnoreScale
	 * @protected
	 * @type Boolean
	 **/
	p._strokeIgnoreScale = false;

	/**
	 * @property _fillInstructions
	 * @protected
	 * @type {Array}
	 **/
	p._fillInstructions = null;

	/**
	 * @property _strokeMatrix
	 * @protected
	 * @type {Array}
	 **/
	p._fillMatrix = null;

	/**
	 * @property _instructions
	 * @protected
	 * @type {Array}
	 **/
	p._instructions = null;

	/**
	 * @property _oldInstructions
	 * @protected
	 * @type {Array}
	 **/
	p._oldInstructions = null;

	/**
	 * @property _activeInstructions
	 * @protected
	 * @type {Array}
	 **/
	p._activeInstructions = null;

	/**
	 * @property _active
	 * @protected
	 * @type {Boolean}
	 * @default false
	 **/
	p._active = false;

	/**
	 * @property _dirty
	 * @protected
	 * @type {Boolean}
	 * @default false
	 **/
	p._dirty = false;

	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {
		this.clear();
		this._ctx = Graphics._ctx;
	};

	/**
	 * Returns true if this Graphics instance has no drawing commands.
	 * @method isEmpty
	 * @return {Boolean} Returns true if this Graphics instance has no drawing commands.
	 **/
	p.isEmpty = function() {
		return !(this._instructions.length || this._oldInstructions.length || this._activeInstructions.length);
	};

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 **/
	p.draw = function(ctx) {
		if (this._dirty) { this._updateInstructions(); }
		var instr = this._instructions;
		for (var i=0, l=instr.length; i<l; i++) {
			instr[i].exec(ctx);
		}
	};

	/**
	 * Draws only the path described for this Graphics instance, skipping any non-path instructions, including fill and
	 * stroke descriptions. Used by <code>DisplayObject.clippingPath</code> to draw the clipping path, for example.
	 * @method drawAsPath
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 **/
	p.drawAsPath = function(ctx) {
		if (this._dirty) { this._updateInstructions(); }
		var instr, instrs = this._instructions;
		for (var i=0, l=instrs.length; i<l; i++) {
			// the first command is always a beginPath command.
			if ((instr = instrs[i]).path || i==0) { instr.exec(ctx); }
		}
	};

// public methods that map directly to context 2D calls:
	/**
	 * Moves the drawing point to the specified position. A tiny API method "mt" also exists.
	 * @method moveTo
	 * @param {Number} x The x coordinate the drawing point should move to.
	 * @param {Number} y The y coordinate the drawing point should move to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls).
	 **/
	p.moveTo = function(x, y) {
		this._activeInstructions.push(new Command(this._ctx.moveTo, [x, y]));
		return this;
	};

	/**
	 * Draws a line from the current drawing point to the specified position, which become the new current drawing
	 * point. A tiny API method "lt" also exists.
	 *
	 * For detailed information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#complex-shapes-(paths)">
	 * whatwg spec</a>.
	 * @method lineTo
	 * @param {Number} x The x coordinate the drawing point should draw to.
	 * @param {Number} y The y coordinate the drawing point should draw to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.lineTo = function(x, y) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new Command(this._ctx.lineTo, [x, y]));
		return this;
	};

	/**
	 * Draws an arc with the specified control points and radius.  For detailed information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arcto">
	 * whatwg spec</a>. A tiny API method "at" also exists.
	 * @method arcTo
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} x2
	 * @param {Number} y2
	 * @param {Number} radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.arcTo = function(x1, y1, x2, y2, radius) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new Command(this._ctx.arcTo, [x1, y1, x2, y2, radius]));
		return this;
	};

	/**
	 * Draws an arc defined by the radius, startAngle and endAngle arguments, centered at the position (x, y). For
	 * example, to draw a full circle with a radius of 20 centered at (100, 100):
	 *
	 *      arc(100, 100, 20, 0, Math.PI*2);
	 *
	 * For detailed information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arc">whatwg spec</a>.
	 * A tiny API method "a" also exists.
	 * @method arc
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} radius
	 * @param {Number} startAngle Measured in radians.
	 * @param {Number} endAngle Measured in radians.
	 * @param {Boolean} anticlockwise
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
		this._dirty = this._active = true;
		if (anticlockwise == null) { anticlockwise = false; }
		this._activeInstructions.push(new Command(this._ctx.arc, [x, y, radius, startAngle, endAngle, anticlockwise]));
		return this;
	};

	/**
	 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy). For detailed
	 * information, read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
	 * whatwg spec</a>. A tiny API method "qt" also exists.
	 * @method quadraticCurveTo
	 * @param {Number} cpx
	 * @param {Number} cpy
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.quadraticCurveTo = function(cpx, cpy, x, y) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new Command(this._ctx.quadraticCurveTo, [cpx, cpy, x, y]));
		return this;
	};

	/**
	 * Draws a bezier curve from the current drawing point to (x, y) using the control points (cp1x, cp1y) and (cp2x,
	 * cp2y). For detailed information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-beziercurveto">
	 * whatwg spec</a>. A tiny API method "bt" also exists.
	 * @method bezierCurveTo
	 * @param {Number} cp1x
	 * @param {Number} cp1y
	 * @param {Number} cp2x
	 * @param {Number} cp2y
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new Command(this._ctx.bezierCurveTo, [cp1x, cp1y, cp2x, cp2y, x, y]));
		return this;
	};

	/**
	 * Draws a rectangle at (x, y) with the specified width and height using the current fill and/or stroke.
	 * For detailed information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-rect">
	 * whatwg spec</a>. A tiny API method "r" also exists.
	 * @method rect
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rect = function(x, y, w, h) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new Command(this._ctx.rect, [x, y, w, h]));
		return this;
	};

	/**
	 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
	 * since the fill or stroke was last set. A tiny API method "cp" also exists.
	 * @method closePath
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.closePath = function() {
		if (this._active) {
			this._dirty = true;
			this._activeInstructions.push(new Command(this._ctx.closePath, []));
		}
		return this;
	};


// public methods that roughly map to Flash graphics APIs:
	/**
	 * Clears all drawing instructions, effectively resetting this Graphics instance. Any line and fill styles will need
	 * to be redefined to draw shapes following a clear call. A tiny API method "c" also exists.
	 * @method clear
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.clear = function() {
		this._instructions = [];
		this._oldInstructions = [];
		this._activeInstructions = [];
		this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = this._fillMatrix = null;
		this._active = this._dirty = this._strokeIgnoreScale = false;
		return this;
	};

	/**
	 * Begins a fill with the specified color. This ends the current sub-path. A tiny API method "f" also exists.
	 * @method beginFill
	 * @param {String} color A CSS compatible color value (ex. "red", "#FF0000", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no fill.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginFill = function(color) {
		if (this._active) { this._newPath(); }
		this._fillInstructions = color ? [new Command(this._setProp, ["fillStyle", color], false)] : null;
		this._fillMatrix = null;
		return this;
	};

	/**
	 * Begins a linear gradient fill defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
	 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
	 * square to display it:
	 *
	 *      myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
	 *
	 * A tiny API method "lf" also exists.
	 * @method beginLinearGradientFill
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient
	 * drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would draw
	 * the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
	 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginLinearGradientFill = function(colors, ratios, x0, y0, x1, y1) {
		if (this._active) { this._newPath(); }
		var o = this._ctx.createLinearGradient(x0, y0, x1, y1);
		for (var i=0, l=colors.length; i<l; i++) {
			o.addColorStop(ratios[i], colors[i]);
		}
		this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
		this._fillMatrix = null;
		return this;
	};

	/**
	 * Begins a radial gradient fill. This ends the current sub-path. For example, the following code defines a red to
	 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a circle to display it:
	 *
	 *      myGraphics.beginRadialGradientFill(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50).drawCircle(100, 100, 50);
	 *
	 * A tiny API method "rf" also exists.
	 * @method beginRadialGradientFill
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 Center position of the inner circle that defines the gradient.
	 * @param {Number} y0 Center position of the inner circle that defines the gradient.
	 * @param {Number} r0 Radius of the inner circle that defines the gradient.
	 * @param {Number} x1 Center position of the outer circle that defines the gradient.
	 * @param {Number} y1 Center position of the outer circle that defines the gradient.
	 * @param {Number} r1 Radius of the outer circle that defines the gradient.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginRadialGradientFill = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
		if (this._active) { this._newPath(); }
		var o = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
		for (var i=0, l=colors.length; i<l; i++) {
			o.addColorStop(ratios[i], colors[i]);
		}
		this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
		this._fillMatrix = null;
		return this;
	};

	/**
	 * Begins a pattern fill using the specified image. This ends the current sub-path. A tiny API method "bf" also
	 * exists.
	 * @method beginBitmapFill
	 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
	 * as the pattern.
	 * @param {String} repetition Optional. Indicates whether to repeat the image in the fill area. One of "repeat",
	 * "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat". Note that Firefox does not support "repeat-x" or
	 * "repeat-y" (latest tests were in FF 20.0), and will default to "repeat".
	 * @param {Matrix2D} matrix Optional. Specifies a transformation matrix for the bitmap fill. This transformation
	 * will be applied relative to the parent transform.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginBitmapFill = function(image, repetition, matrix) {
		if (this._active) { this._newPath(); }
		repetition = repetition || "";
		var o = this._ctx.createPattern(image, repetition);
		this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
		this._fillMatrix = matrix ? [matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty] : null;
		return this;
	};

	/**
	 * Ends the current sub-path, and begins a new one with no fill. Functionally identical to <code>beginFill(null)</code>.
	 * A tiny API method "ef" also exists.
	 * @method endFill
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.endFill = function() {
		return this.beginFill();
	};

	/**
	 * Sets the stroke style for the current sub-path. Like all drawing methods, this can be chained, so you can define
	 * the stroke style and color in a single line of code like so:
	 *
	 *      myGraphics.setStrokeStyle(8,"round").beginStroke("#F00");
	 *
	 * A tiny API method "ss" also exists.
	 * @method setStrokeStyle
	 * @param {Number} thickness The width of the stroke.
	 * @param {String | Number} [caps=0] Indicates the type of caps to use at the end of lines. One of butt,
	 * round, or square. Defaults to "butt". Also accepts the values 0 (butt), 1 (round), and 2 (square) for use with
	 * the tiny API.
	 * @param {String | Number} [joints=0] Specifies the type of joints that should be used where two lines meet.
	 * One of bevel, round, or miter. Defaults to "miter". Also accepts the values 0 (miter), 1 (round), and 2 (bevel)
	 * for use with the tiny API.
	 * @param {Number} [miterLimit=10] If joints is set to "miter", then you can specify a miter limit ratio which
	 * controls at what point a mitered joint will be clipped.
	 * @param {Boolean} [ignoreScale=false] If true, the stroke will be drawn at the specified thickness regardless
	 * of active transformations.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.setStrokeStyle = function(thickness, caps, joints, miterLimit, ignoreScale) {
		if (this._active) { this._newPath(); }
		this._strokeStyleInstructions = [
			new Command(this._setProp, ["lineWidth", (thickness == null ? "1" : thickness)], false),
			new Command(this._setProp, ["lineCap", (caps == null ? "butt" : (isNaN(caps) ? caps : Graphics.STROKE_CAPS_MAP[caps]))], false),
			new Command(this._setProp, ["lineJoin", (joints == null ? "miter" : (isNaN(joints) ? joints : Graphics.STROKE_JOINTS_MAP[joints]))], false),
			new Command(this._setProp, ["miterLimit", (miterLimit == null ? "10" : miterLimit)], false)
			];
		this._strokeIgnoreScale = ignoreScale;
		return this;
	};

	/**
	 * Begins a stroke with the specified color. This ends the current sub-path. A tiny API method "s" also exists.
	 * @method beginStroke
	 * @param {String} color A CSS compatible color value (ex. "#FF0000", "red", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no stroke.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginStroke = function(color) {
		if (this._active) { this._newPath(); }
		this._strokeInstructions = color ? [new Command(this._setProp, ["strokeStyle", color], false)] : null;
		return this;
	};

	/**
	 * Begins a linear gradient stroke defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
	 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
	 * square to display it:
	 *
	 *      myGraphics.setStrokeStyle(10).
	 *          beginLinearGradientStroke(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
	 *
	 * A tiny API method "ls" also exists.
	 * @method beginLinearGradientStroke
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
	 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginLinearGradientStroke = function(colors, ratios, x0, y0, x1, y1) {
		if (this._active) { this._newPath(); }
		var o = this._ctx.createLinearGradient(x0, y0, x1, y1);
		for (var i=0, l=colors.length; i<l; i++) {
			o.addColorStop(ratios[i], colors[i]);
		}
		this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
		return this;
	};


	/**
	 * Begins a radial gradient stroke. This ends the current sub-path. For example, the following code defines a red to
	 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a rectangle to display it:
	 *
	 *      myGraphics.setStrokeStyle(10)
	 *          .beginRadialGradientStroke(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50)
	 *          .drawRect(50, 90, 150, 110);
	 *
	 * A tiny API method "rs" also exists.
	 * @method beginRadialGradientStroke
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%, then draw the second color
	 * to 100%.
	 * @param {Number} x0 Center position of the inner circle that defines the gradient.
	 * @param {Number} y0 Center position of the inner circle that defines the gradient.
	 * @param {Number} r0 Radius of the inner circle that defines the gradient.
	 * @param {Number} x1 Center position of the outer circle that defines the gradient.
	 * @param {Number} y1 Center position of the outer circle that defines the gradient.
	 * @param {Number} r1 Radius of the outer circle that defines the gradient.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginRadialGradientStroke = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
		if (this._active) { this._newPath(); }
		var o = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
		for (var i=0, l=colors.length; i<l; i++) {
			o.addColorStop(ratios[i], colors[i]);
		}
		this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
		return this;
	};

	/**
	 * Begins a pattern fill using the specified image. This ends the current sub-path. Note that unlike bitmap fills,
	 * strokes do not currently support a matrix parameter due to limitations in the canvas API. A tiny API method "bs"
	 * also exists.
	 * @method beginBitmapStroke
	 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
	 * as the pattern.
	 * @param {String} [repetition=repeat] Optional. Indicates whether to repeat the image in the fill area. One of
	 * "repeat", "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat".
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.beginBitmapStroke = function(image, repetition) {
		// NOTE: matrix is not supported for stroke because transforms on strokes also affect the drawn stroke width.
		if (this._active) { this._newPath(); }
		repetition = repetition || "";
		var o = this._ctx.createPattern(image, repetition);
		this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
		return this;
	};

	/**
	 * Ends the current sub-path, and begins a new one with no stroke. Functionally identical to <code>beginStroke(null)</code>.
	 * A tiny API method "es" also exists.
	 * @method endStroke
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.endStroke = function() {
		this.beginStroke();
		return this;
	};

	/**
	 * Maps the familiar ActionScript <code>curveTo()</code> method to the functionally similar {{#crossLink "Graphics/quadraticCurveTo"}}{{/crossLink}}
	 * method.
	 * @method curveTo
	 * @type {Function}
	 **/
	p.curveTo = p.quadraticCurveTo;

	/**
	 * Maps the familiar ActionScript <code>drawRect()</code> method to the functionally similar {{#crossLink "Graphics/rect"}}{{/crossLink}}
	 * method.
	 * @method drawRect
	 * @type {Function}
	 **/
	p.drawRect = p.rect;

	/**
	 * Draws a rounded rectangle with all corners with the specified radius.
	 * @method drawRoundRect
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w
	 * @param {Number} h
	 * @param {Number} radius Corner radius.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.drawRoundRect = function(x, y, w, h, radius) {
		this.drawRoundRectComplex(x, y, w, h, radius, radius, radius, radius);
		return this;
	};

	/**
	 * Draws a rounded rectangle with different corner radii. Supports positive and negative corner radii. A tiny API
	 * method "rc" also exists.
	 * @method drawRoundRectComplex
	 * @param {Number} x The horizontal coordinate to draw the round rect.
	 * @param {Number} y The vertical coordinate to draw the round rect.
	 * @param {Number} w The width of the round rect.
	 * @param {Number} h The height of the round rect.
	 * @param {Number} radiusTL Top left corner radius.
	 * @param {Number} radiusTR Top right corner radius.
	 * @param {Number} radiusBR Bottom right corner radius.
	 * @param {Number} radiusBL Bottom left corner radius.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.drawRoundRectComplex = function(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL) {
		var max = (w<h?w:h)/2;
		var mTL=0, mTR=0, mBR=0, mBL=0;
		if (radiusTL < 0) { radiusTL *= (mTL=-1); }
		if (radiusTL > max) { radiusTL = max; }
		if (radiusTR < 0) { radiusTR *= (mTR=-1); }
		if (radiusTR > max) { radiusTR = max; }
		if (radiusBR < 0) { radiusBR *= (mBR=-1); }
		if (radiusBR > max) { radiusBR = max; }
		if (radiusBL < 0) { radiusBL *= (mBL=-1); }
		if (radiusBL > max) { radiusBL = max; }

		this._dirty = this._active = true;
		var arcTo=this._ctx.arcTo, lineTo=this._ctx.lineTo;
		this._activeInstructions.push(
			new Command(this._ctx.moveTo, [x+w-radiusTR, y]),
			new Command(arcTo, [x+w+radiusTR*mTR, y-radiusTR*mTR, x+w, y+radiusTR, radiusTR]),
			new Command(lineTo, [x+w, y+h-radiusBR]),
			new Command(arcTo, [x+w+radiusBR*mBR, y+h+radiusBR*mBR, x+w-radiusBR, y+h, radiusBR]),
			new Command(lineTo, [x+radiusBL, y+h]),
			new Command(arcTo, [x-radiusBL*mBL, y+h+radiusBL*mBL, x, y+h-radiusBL, radiusBL]),
			new Command(lineTo, [x, y+radiusTL]),
			new Command(arcTo, [x-radiusTL*mTL, y-radiusTL*mTL, x+radiusTL, y, radiusTL]),
			new Command(this._ctx.closePath)
		);
		return this;
	};

	/**
	 * Draws a circle with the specified radius at (x, y).
	 *
	 *      var g = new createjs.Graphics();
	 *	    g.setStrokeStyle(1);
	 *	    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
	 *	    g.beginFill(createjs.Graphics.getRGB(255,0,0));
	 *	    g.drawCircle(0,0,3);
	 *
	 *	    var s = new createjs.Shape(g);
	 *		s.x = 100;
	 *		s.y = 100;
	 *
	 *	    stage.addChild(s);
	 *	    stage.update();
	 *
	 * A tiny API method "dc" also exists.
	 * @method drawCircle
	 * @param {Number} x x coordinate center point of circle.
	 * @param {Number} y y coordinate center point of circle.
	 * @param {Number} radius Radius of circle.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.drawCircle = function(x, y, radius) {
		this.arc(x, y, radius, 0, Math.PI*2);
		return this;
	};

	/**
	 * Draws an ellipse (oval) with a specified width (w) and height (h). Similar to {{#crossLink "Graphics/drawCircle"}}{{/crossLink}},
	 * except the width and height can be different. A tiny API method "de" also exists.
	 * @method drawEllipse
	 * @param {Number} x x coordinate center point of ellipse.
	 * @param {Number} y y coordinate center point of ellipse.
	 * @param {Number} w height (horizontal diameter) of ellipse. The horizontal radius will be half of this number.
	 * @param {Number} h width (vertical diameter) of ellipse. The vertical radius will be half of this number.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.drawEllipse = function(x, y, w, h) {
		this._dirty = this._active = true;
		var k = 0.5522848;
		var ox = (w / 2) * k;
		var oy = (h / 2) * k;
		var xe = x + w;
		var ye = y + h;
		var xm = x + w / 2;
		var ym = y + h / 2;

		this._activeInstructions.push(
			new Command(this._ctx.moveTo, [x, ym]),
			new Command(this._ctx.bezierCurveTo, [x, ym-oy, xm-ox, y, xm, y]),
			new Command(this._ctx.bezierCurveTo, [xm+ox, y, xe, ym-oy, xe, ym]),
			new Command(this._ctx.bezierCurveTo, [xe, ym+oy, xm+ox, ye, xm, ye]),
			new Command(this._ctx.bezierCurveTo, [xm-ox, ye, x, ym+oy, x, ym])
		);
		return this;
	};

	/**
	 * Provides a method for injecting arbitrary Context2D (aka Canvas) API calls into a Graphics queue. The specified
	 * callback function will be called in sequence with other drawing instructions. The callback will be executed in the
	 * scope of the target canvas's Context2D object, and will be passed the data object as a parameter.
	 *
	 * This is an advanced feature. It can allow for powerful functionality, like injecting output from tools that
	 * export Context2D instructions, executing raw canvas calls within the context of the display list, or dynamically
	 * modifying colors or stroke styles within a Graphics instance over time, but it is not intended for general use.
	 *
	 * Within a Graphics queue, each path begins by applying the fill and stroke styles and settings, followed by
	 * drawing instructions, followed by the fill() and/or stroke() commands. This means that within a path, inject() can
	 * update the fill & stroke styles, but for it to be applied in a predictable manner, you must have begun a fill or
	 * stroke (as appropriate) normally via the Graphics API. For example:
	 *
	 * 	function setColor(color) {
	 * 		this.fillStyle = color;
	 * 	}
	 *
	 * 	// this will not draw anything - no fill was begun, so fill() is not called:
	 * 	myGraphics.inject(setColor, "red").drawRect(0,0,100,100);
	 *
	 * 	// this will draw the rect in green:
	 * 	myGraphics.beginFill("#000").inject(setColor, "green").drawRect(0,0,100,100);
	 *
	 * 	// this will draw both rects in blue, because there is only a single path
	 * 	// so the second inject overwrites the first:
	 * 	myGraphics.beginFill("#000").inject(setColor, "green").drawRect(0,0,100,100)
	 * 		.inject(setColor, "blue").drawRect(100,0,100,100);
	 *
	 * 	// this will draw the first rect in green, and the second in blue:
	 * 	myGraphics.beginFill("#000").inject(setColor, "green").drawRect(0,0,100,100)
	 * 		.beginFill("#000").inject(setColor, "blue").drawRect(100,0,100,100);
	 *
	 * @method inject
	 * @param {Function} callback The function to execute.
	 * @param {Object} data Arbitrary data that will be passed to the callback when it is executed.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.inject = function(callback, data) {
		this._dirty = this._active = true;

		this._activeInstructions.push(
			new Command(callback, [data])
		);
		return this;
	};

	/**
	 * Draws a star if pointSize is greater than 0, or a regular polygon if pointSize is 0 with the specified number of
	 * points. For example, the following code will draw a familiar 5 pointed star shape centered at 100, 100 and with a
	 * radius of 50:
	 *
	 *      myGraphics.beginFill("#FF0").drawPolyStar(100, 100, 50, 5, 0.6, -90);
	 *      // Note: -90 makes the first point vertical
	 *
	 * A tiny API method "dp" also exists.
	 *
	 * @method drawPolyStar
	 * @param {Number} x Position of the center of the shape.
	 * @param {Number} y Position of the center of the shape.
	 * @param {Number} radius The outer radius of the shape.
	 * @param {Number} sides The number of points on the star or sides on the polygon.
	 * @param {Number} pointSize The depth or "pointy-ness" of the star points. A pointSize of 0 will draw a regular
	 * polygon (no points), a pointSize of 1 will draw nothing because the points are infinitely pointy.
	 * @param {Number} angle The angle of the first point / corner. For example a value of 0 will draw the first point
	 * directly to the right of the center.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.drawPolyStar = function(x, y, radius, sides, pointSize, angle) {
		this._dirty = this._active = true;
		if (pointSize == null) { pointSize = 0; }
		pointSize = 1-pointSize;
		if (angle == null) { angle = 0; }
		else { angle /= 180/Math.PI; }
		var a = Math.PI/sides;

		this._activeInstructions.push(new Command(this._ctx.moveTo, [x+Math.cos(angle)*radius, y+Math.sin(angle)*radius]));
		for (var i=0; i<sides; i++) {
			angle += a;
			if (pointSize != 1) {
				this._activeInstructions.push(new Command(this._ctx.lineTo, [x+Math.cos(angle)*radius*pointSize, y+Math.sin(angle)*radius*pointSize]));
			}
			angle += a;
			this._activeInstructions.push(new Command(this._ctx.lineTo, [x+Math.cos(angle)*radius, y+Math.sin(angle)*radius]));
		}
		return this;
	};

	/**
	 * Decodes a compact encoded path string into a series of draw instructions.
	 * This format is not intended to be human readable, and is meant for use by authoring tools.
	 * The format uses a base64 character set, with each character representing 6 bits, to define a series of draw
	 * commands.
	 *
	 * Each command is comprised of a single "header" character followed by a variable number of alternating x and y
	 * position values. Reading the header bits from left to right (most to least significant): bits 1 to 3 specify the
	 * type of operation (0-moveTo, 1-lineTo, 2-quadraticCurveTo, 3-bezierCurveTo, 4-closePath, 5-7 unused). Bit 4
	 * indicates whether position values use 12 bits (2 characters) or 18 bits (3 characters), with a one indicating the
	 * latter. Bits 5 and 6 are currently unused.
	 *
	 * Following the header is a series of 0 (closePath), 2 (moveTo, lineTo), 4 (quadraticCurveTo), or 6 (bezierCurveTo)
	 * parameters. These parameters are alternating x/y positions represented by 2 or 3 characters (as indicated by the
	 * 4th bit in the command char). These characters consist of a 1 bit sign (1 is negative, 0 is positive), followed
	 * by an 11 (2 char) or 17 (3 char) bit integer value. All position values are in tenths of a pixel. Except in the
	 * case of move operations which are absolute, this value is a delta from the previous x or y position (as
	 * appropriate).
	 *
	 * For example, the string "A3cAAMAu4AAA" represents a line starting at -150,0 and ending at 150,0.
	 * <br />A - bits 000000. First 3 bits (000) indicate a moveTo operation. 4th bit (0) indicates 2 chars per
	 * parameter.
	 * <br />n0 - 110111011100. Absolute x position of -150.0px. First bit indicates a negative value, remaining bits
	 * indicate 1500 tenths of a pixel.
	 * <br />AA - 000000000000. Absolute y position of 0.
	 * <br />I - 001100. First 3 bits (001) indicate a lineTo operation. 4th bit (1) indicates 3 chars per parameter.
	 * <br />Au4 - 000000101110111000. An x delta of 300.0px, which is added to the previous x value of -150.0px to
	 * provide an absolute position of +150.0px.
	 * <br />AAA - 000000000000000000. A y delta value of 0.
	 *
	 * A tiny API method "p" also exists.
	 * @method decodePath
	 * @param {String} str The path string to decode.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.decodePath = function(str) {
		var instructions = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath];
		var paramCount = [2, 2, 4, 6, 0];
		var i=0, l=str.length;
		var params = [];
		var x=0, y=0;
		var base64 = Graphics.BASE_64;

		while (i<l) {
			var c = str.charAt(i);
			var n = base64[c];
			var fi = n>>3; // highest order bits 1-3 code for operation.
			var f = instructions[fi];
			// check that we have a valid instruction & that the unused bits are empty:
			if (!f || (n&3)) { throw("bad path data (@"+i+"): "+c); }
			var pl = paramCount[fi];
			if (!fi) { x=y=0; } // move operations reset the position.
			params.length = 0;
			i++;
			var charCount = (n>>2&1)+2;  // 4th header bit indicates number size for this operation.
			for (var p=0; p<pl; p++) {
				var num = base64[str.charAt(i)];
				var sign = (num>>5) ? -1 : 1;
				num = ((num&31)<<6)|(base64[str.charAt(i+1)]);
				if (charCount == 3) { num = (num<<6)|(base64[str.charAt(i+2)]); }
				num = sign*num/10;
				if (p%2) { x = (num += x); }
				else { y = (num += y); }
				params[p] = num;
				i += charCount;
			}
			f.apply(this,params);
		}
		return this;
	};

	/**
	 * Returns a clone of this Graphics instance.
	 * @method clone
	 * @return {Graphics} A clone of the current Graphics instance.
	 **/
	p.clone = function() {
		var o = new Graphics();
		o._instructions = this._instructions.slice();
		o._activeInstructions = this._activeInstructions.slice();
		o._oldInstructions = this._oldInstructions.slice();
		if (this._fillInstructions) { o._fillInstructions = this._fillInstructions.slice(); }
		if (this._strokeInstructions) { o._strokeInstructions = this._strokeInstructions.slice(); }
		if (this._strokeStyleInstructions) { o._strokeStyleInstructions = this._strokeStyleInstructions.slice(); }
		o._active = this._active;
		o._dirty = this._dirty;
		o._fillMatrix = this._fillMatrix;
		o._strokeIgnoreScale = this._strokeIgnoreScale;
		return o;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Graphics]";
	};


// tiny API:
	/** Shortcut to moveTo.
	 * @method mt
	 * @protected
	 * @type {Function}
	 **/
	p.mt = p.moveTo;

	/** Shortcut to lineTo.
	 * @method lt
	 * @protected
	 * @type {Function}
	 **/
	p.lt = p.lineTo;

	/** Shortcut to arcTo.
	 * @method at
	 * @protected
	 * @type {Function}
	 **/
	p.at = p.arcTo;

	/** Shortcut to bezierCurveTo.
	 * @method bt
	 * @protected
	 * @type {Function}
	 **/
	p.bt = p.bezierCurveTo;

	/** Shortcut to quadraticCurveTo / curveTo.
	 * @method qt
	 * @protected
	 * @type {Function}
	 **/
	p.qt = p.quadraticCurveTo;

	/** Shortcut to arc.
	 * @method a
	 * @protected
	 * @type {Function}
	 **/
	p.a = p.arc;

	/** Shortcut to rect.
	 * @method r
	 * @protected
	 * @type {Function}
	 **/
	p.r = p.rect;

	/** Shortcut to closePath.
	 * @method cp
	 * @protected
	 * @type {Function}
	 **/
	p.cp = p.closePath;

	/** Shortcut to clear.
	 * @method c
	 * @protected
	 * @type {Function}
	 **/
	p.c = p.clear;

	/** Shortcut to beginFill.
	 * @method f
	 * @protected
	 * @type {Function}
	 **/
	p.f = p.beginFill;

	/** Shortcut to beginLinearGradientFill.
	 * @method lf
	 * @protected
	 * @type {Function}
	 **/
	p.lf = p.beginLinearGradientFill;

	/** Shortcut to beginRadialGradientFill.
	 * @method rf
	 * @protected
	 * @type {Function}
	 **/
	p.rf = p.beginRadialGradientFill;

	/** Shortcut to beginBitmapFill.
	 * @method bf
	 * @protected
	 * @type {Function}
	 **/
	p.bf = p.beginBitmapFill;

	/** Shortcut to endFill.
	 * @method ef
	 * @protected
	 * @type {Function}
	 **/
	p.ef = p.endFill;

	/** Shortcut to setStrokeStyle.
	 * @method ss
	 * @protected
	 * @type {Function}
	 **/
	p.ss = p.setStrokeStyle;

	/** Shortcut to beginStroke.
	 * @method s
	 * @protected
	 * @type {Function}
	 **/
	p.s = p.beginStroke;

	/** Shortcut to beginLinearGradientStroke.
	 * @method ls
	 * @protected
	 * @type {Function}
	 **/
	p.ls = p.beginLinearGradientStroke;

	/** Shortcut to beginRadialGradientStroke.
	 * @method rs
	 * @protected
	 * @type {Function}
	 **/
	p.rs = p.beginRadialGradientStroke;

	/** Shortcut to beginBitmapStroke.
	 * @method bs
	 * @protected
	 * @type {Function}
	 **/
	p.bs = p.beginBitmapStroke;

	/** Shortcut to endStroke.
	 * @method es
	 * @protected
	 * @type {Function}
	 **/
	p.es = p.endStroke;

	/** Shortcut to drawRect.
	 * @method dr
	 * @protected
	 * @type {Function}
	 **/
	p.dr = p.drawRect;

	/** Shortcut to drawRoundRect.
	 * @method rr
	 * @protected
	 * @type {Function}
	 **/
	p.rr = p.drawRoundRect;

	/** Shortcut to drawRoundRectComplex.
	 * @method rc
	 * @protected
	 * @type {Function}
	 **/
	p.rc = p.drawRoundRectComplex;

	/** Shortcut to drawCircle.
	 * @method dc
	 * @protected
	 * @type {Function}
	 **/
	p.dc = p.drawCircle;

	/** Shortcut to drawEllipse.
	 * @method de
	 * @protected
	 * @type {Function}
	 **/
	p.de = p.drawEllipse;

	/** Shortcut to drawPolyStar.
	 * @method dp
	 * @protected
	 * @type {Function}
	 **/
	p.dp = p.drawPolyStar;

	/** Shortcut to decodePath.
	 * @method p
	 * @protected
	 * t@ype Function
	 **/
	p.p = p.decodePath;


// private methods:
	/**
	 * @method _updateInstructions
	 * @protected
	 **/
	p._updateInstructions = function() {
		this._instructions = this._oldInstructions.slice();
		this._instructions.push(Graphics.beginCmd);

		this._appendInstructions(this._fillInstructions);
		this._appendInstructions(this._strokeInstructions);
		this._appendInstructions(this._strokeInstructions&&this._strokeStyleInstructions);

		this._appendInstructions(this._activeInstructions);

		if (this._fillInstructions) {
			this._appendDraw(Graphics.fillCmd, this._fillMatrix);
		}
		if (this._strokeInstructions) {
			this._appendDraw(Graphics.strokeCmd, this._strokeIgnoreScale&&[1,0,0,1,0,0]);
		}
	};

	/**
	 * @method _appendInstructions
	 * @protected
	 **/
	p._appendInstructions = function(instructions) {
		if (instructions) { this._instructions.push.apply(this._instructions, instructions); }
	};

	/**
	 * @method _appendDraw
	 * @protected
	 **/
	p._appendDraw = function(command, matrixArr) {
		if (!matrixArr) { this._instructions.push(command); }
		else {
			this._instructions.push(
				new Command(this._ctx.save, [], false),
				new Command(this._ctx.transform, matrixArr, false),
				command,
				new Command(this._ctx.restore, [], false)
			);
		}
	};

	/**
	 * @method _newPath
	 * @protected
	 **/
	p._newPath = function() {
		if (this._dirty) { this._updateInstructions(); }
		this._oldInstructions = this._instructions;
		this._activeInstructions = [];
		this._active = this._dirty = false;
	};

	// used to create Commands that set properties:
	/**
	 * Used to create Commands that set properties
	 * @method _setProp
	 * @param {String} name
	 * @param {String} value
	 * @protected
	 **/
	p._setProp = function(name, value) {
		this[name] = value;
	};

createjs.Graphics = Graphics;
}());
/*
* DisplayObject
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * The EaselJS Javascript library provides a retained graphics mode for canvas including a full hierarchical display
 * list, a core interaction model, and helper classes to make working with 2D graphics in Canvas much easier.
 * EaselJS provides straight forward solutions for working with rich graphics and interactivity with HTML5 Canvas...
 *
 * <h4>Getting Started</h4>
 * To get started with Easel, create a {{#crossLink "Stage"}}{{/crossLink}} that wraps a CANVAS element, and add
 * {{#crossLink "DisplayObject"}}{{/crossLink}} instances as children. EaselJS supports:
 * <ul>
 *      <li>Images using {{#crossLink "Bitmap"}}{{/crossLink}}</li>
 *      <li>Vector graphics using {{#crossLink "Shape"}}{{/crossLink}} and {{#crossLink "Graphics"}}{{/crossLink}}</li>
 *      <li>Animated bitmaps using {{#crossLink "SpriteSheet"}}{{/crossLink}} and {{#crossLink "Sprite"}}{{/crossLink}}
 *      <li>Simple text instances using {{#crossLink "Text"}}{{/crossLink}}</li>
 *      <li>Containers that hold other DisplayObjects using {{#crossLink "Container"}}{{/crossLink}}</li>
 *      <li>Control HTML DOM elements using {{#crossLink "DOMElement"}}{{/crossLink}}</li>
 * </ul>
 *
 * All display objects can be added to the stage as children, or drawn to a canvas directly.
 *
 * <b>User Interactions</b><br />
 * All display objects on stage (except DOMElement) will dispatch events when interacted with using a mouse or
 * touch. EaselJS supports hover, press, and release events, as well as an easy-to-use drag-and-drop model. Check out
 * {{#crossLink "MouseEvent"}}{{/crossLink}} for more information.
 *
 * <h4>Simple Example</h4>
 * This example illustrates how to create and position a {{#crossLink "Shape"}}{{/crossLink}} on the {{#crossLink "Stage"}}{{/crossLink}}
 * using EaselJS' drawing API.
 *
 *	    //Create a stage by getting a reference to the canvas
 *	    stage = new createjs.Stage("demoCanvas");
 *	    //Create a Shape DisplayObject.
 *	    circle = new createjs.Shape();
 *	    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
 *	    //Set position of Shape instance.
 *	    circle.x = circle.y = 50;
 *	    //Add Shape instance to stage display list.
 *	    stage.addChild(circle);
 *	    //Update stage will render next frame
 *	    stage.update();
 *
 * <b>Simple Interaction Example</b><br>
 *
 *      displayObject.addEventListener("click", handleClick);
 *      function handleClick(event){
 *          // Click happenened
 *      }
 *
 *      displayObject.addEventListener("mousedown", handlePress);
 *      function handlePress(event) {
 *          // A mouse press happened.
 *          // Listen for mouse move while the mouse is down:
 *          event.addEventListener("mousemove", handleMove);
 *      }
 *      function handleMove(event) {
 *          // Check out the DragAndDrop example in GitHub for more
 *      }
 *
 * <b>Simple Animation Example</b><br />
 * This example moves the shape created in the previous demo across the screen.
 *
 *	    //Update stage will render next frame
 *	    createjs.Ticker.addEventListener("tick", handleTick);
 *
 *	    function handleTick() {
 *          //Circle will move 10 units to the right.
 *	    	circle.x += 10;
 *	    	//Will cause the circle to wrap back
 * 	    	if (circle.x > stage.canvas.width) { circle.x = 0; }
 *	    	stage.update();
 *	    }
 *
 * <h4>Other Features</h4>
 * EaselJS also has built in support for
 * <ul><li>Canvas features such as {{#crossLink "Shadow"}}{{/crossLink}} and CompositeOperation</li>
 *      <li>{{#crossLink "Ticker"}}{{/crossLink}}, a global heartbeat that objects can subscribe to</li>
 *      <li>Filters, including a provided {{#crossLink "ColorMatrixFilter"}}{{/crossLink}}, {{#crossLink "AlphaMaskFilter"}}{{/crossLink}},
 *      {{#crossLink "AlphaMapFilter"}}{{/crossLink}}, and {{#crossLink "BlurFilter"}}{{/crossLink}}. See {{#crossLink "Filter"}}{{/crossLink}}
 *      for more information</li>
 *      <li>A {{#crossLink "ButtonHelper"}}{{/crossLink}} utility, to easily create interactive buttons</li>
 *      <li>{{#crossLink "SpriteSheetUtils"}}{{/crossLink}} and a {{#crossLink "SpriteSheetBuilder"}}{{/crossLink}} to
 *      help build and manage {{#crossLink "SpriteSheet"}}{{/crossLink}} functionality at run-time.</li>
 * </ul>
 *
 * <h4>Browser Support</h4>
 * All modern browsers that support Canvas will support EaselJS (<a href="http://caniuse.com/canvas">http://caniuse.com/canvas</a>).
 * Browser performance may vary between platforms, for example, Android Canvas has poor hardware support, and is much
 * slower on average than most other browsers.
 *
 * @module EaselJS
 * @main EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
/**
 * DisplayObject is an abstract class that should not be constructed directly. Instead construct subclasses such as
 * {{#crossLink "Container"}}{{/crossLink}}, {{#crossLink "Bitmap"}}{{/crossLink}}, and {{#crossLink "Shape"}}{{/crossLink}}.
 * DisplayObject is the base class for all display classes in the EaselJS library. It defines the core properties and
 * methods that are shared between all display objects, such as transformation properties (x, y, scaleX, scaleY, etc),
 * caching, and mouse handlers.
 * @class DisplayObject
 * @extends EventDispatcher
 * @constructor
 **/
var DisplayObject = function() {
  this.initialize();
};
var p = DisplayObject.prototype = new createjs.EventDispatcher();

	/**
	 * Suppresses errors generated when using features like hitTest, mouse events, and {{#crossLink "getObjectsUnderPoint"}}{{/crossLink}}
	 * with cross domain content.
	 * @property suppressCrossDomainErrors
	 * @static
	 * @type {Boolean}
	 * @default false
	 **/
	DisplayObject.suppressCrossDomainErrors = false;

	/**
	 * @property _hitTestCanvas
	 * @type {HTMLCanvasElement | Object}
	 * @static
	 * @protected
	 **/
	 
	/**
	 * @property _hitTestContext
	 * @type {CanvasRenderingContext2D}
	 * @static
	 * @protected
	 **/
	var canvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"); // prevent errors on load in browsers without canvas.
	if (canvas.getContext) {
		DisplayObject._hitTestCanvas = canvas;
		DisplayObject._hitTestContext = canvas.getContext("2d");
		canvas.width = canvas.height = 1;
	}

	/**
	 * @property _nextCacheID
	 * @type {Number}
	 * @static
	 * @protected
	 **/
	DisplayObject._nextCacheID = 1;

// events:

	/**
	 * Dispatched when the user presses their left mouse button over the display object. See the 
	 * {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event mousedown
	 * @since 0.6.0
	 */
	 
	/**
	 * Dispatched when the user presses their left mouse button and then releases it while over the display object.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event click
	 * @since 0.6.0
	 */
	 
	/**
	 * Dispatched when the user double clicks their left mouse button over this display object.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event dblclick
	 * @since 0.6.0
	 */
	 
	/**
	 * Dispatched when the user's mouse enters this display object. This event must be enabled using 
	 * {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}. See also {{#crossLink "DisplayObject/rollover:event"}}{{/crossLink}}.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event mouseover
	 * @since 0.6.0
	 */

	/**
	 * Dispatched when the user's mouse leaves this display object. This event must be enabled using 
	 * {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}. See also {{#crossLink "DisplayObject/rollout:event"}}{{/crossLink}}.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event mouseout
	 * @since 0.6.0
	 */
	 
	/**
	 * This event is similar to {{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}, with the following
	 * differences: it does not bubble, and it considers {{#crossLink "Container"}}{{/crossLink}} instances as an
	 * aggregate of their content.
	 * 
	 * For example, myContainer contains two overlapping children: shapeA and shapeB. The user moves their mouse over
	 * shapeA and then directly on to shapeB. With a listener for {{#crossLink "mouseover:event"}}{{/crossLink}} on
	 * myContainer, two events would be received, each targeting a child element:<OL>
	 * <LI>when the mouse enters shapeA (target=shapeA)</LI>
	 * <LI>when the mouse enters shapeB (target=shapeB)</LI>
	 * </OL>
	 * However, with a listener for "rollover" instead, only a single event is received when the mouse first enters
	 * the aggregate myContainer content (target=myContainer).
	 * 
	 * This event must be enabled using {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event rollover
	 * @since 0.7.0
	 */
	 
	/**
	 * This event is similar to {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}, with the following
	 * differences: it does not bubble, and it considers {{#crossLink "Container"}}{{/crossLink}} instances as an
	 * aggregate of their content.
	 * 
	 * For example, myContainer contains two overlapping children: shapeA and shapeB. The user moves their mouse over
	 * shapeA, then directly on to shapeB, then off both. With a listener for {{#crossLink "mouseout:event"}}{{/crossLink}}
	 * on myContainer, two events would be received, each targeting a child element:<OL>
	 * <LI>when the mouse leaves shapeA (target=shapeA)</LI>
	 * <LI>when the mouse leaves shapeB (target=shapeB)</LI>
	 * </OL>
	 * However, with a listener for "rollout" instead, only a single event is received when the mouse leaves
	 * the aggregate myContainer content (target=myContainer).
	 * 
	 * This event must be enabled using {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event rollout
	 * @since 0.7.0
	 */
	 
	/**
	 * After a {{#crossLink "DisplayObject/mousedown:event"}}{{/crossLink}} occurs on a display object, a pressmove
	 * event will be generated on that object whenever the mouse moves until the mouse press is released. This can be
	 * useful for dragging and similar operations.
	 * @event pressmove
	 * @since 0.7.0
	 */
	 
	/**
	 * After a {{#crossLink "DisplayObject/mousedown:event"}}{{/crossLink}} occurs on a display object, a pressup event
	 * will be generated on that object when that mouse press is released. This can be useful for dragging and similar
	 * operations.
	 * @event pressup
	 * @since 0.7.0
	 */
	 
	/**
	 * Dispatched on each display object on a stage whenever the stage updates. This occurs immediately before the
	 * rendering (draw) pass. When {{#crossLink "Stage/update"}}{{/crossLink}} is called, first all display objects on
	 * the stage dispatch the tick event, then all of the display objects are drawn to stage. Children will have their
	 * {{#crossLink "tick:event"}}{{/crossLink}} event dispatched in order of their depth prior to the event being
	 * dispatched on their parent.
	 * @event tick
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Array} params An array containing any arguments that were passed to the Stage.update() method. For
	 *      example if you called stage.update("hello"), then the params would be ["hello"].
	 * @since 0.6.0
	 */

// public properties:
	/**
	 * The alpha (transparency) for this display object. 0 is fully transparent, 1 is fully opaque.
	 * @property alpha
	 * @type {Number}
	 * @default 1
	 **/
	p.alpha = 1;

	/**
	 * If a cache is active, this returns the canvas that holds the cached version of this display object. See {{#crossLink "cache"}}{{/crossLink}}
	 * for more information.
	 * @property cacheCanvas
	 * @type {HTMLCanvasElement | Object}
	 * @default null
	 * @readonly
	 **/
	p.cacheCanvas = null;

	/**
	 * Unique ID for this display object. Makes display objects easier for some uses.
	 * @property id
	 * @type {Number}
	 * @default -1
	 **/
	p.id = -1;

	/**
	 * Indicates whether to include this object when running mouse interactions. Setting this to `false` for children
	 * of a {{#crossLink "Container"}}{{/crossLink}} will cause events on the Container to not fire when that child is
	 * clicked. Note that setting this property to `false` does not prevent the {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}}
	 * method from returning the child.
	 * @property mouseEnabled
	 * @type {Boolean}
	 * @default true
	 **/
	p.mouseEnabled = true;

	/**
	 * An optional name for this display object. Included in {{#crossLink "DisplayObject/toString"}}{{/crossLink}} . Useful for
	 * debugging.
	 * @property name
	 * @type {String}
	 * @default null
	 **/
	p.name = null;

	/**
	 * A reference to the {{#crossLink "Container"}}{{/crossLink}} or {{#crossLink "Stage"}}{{/crossLink}} object that
	 * contains this display object, or null if it has not been added
	 * to one.
	 * @property parent
	 * @final
	 * @type {Container}
	 * @default null
	 * @readonly
	 **/
	p.parent = null;

	/**
	 * The left offset for this display object's registration point. For example, to make a 100x100px Bitmap rotate
	 * around its center, you would set regX and {{#crossLink "DisplayObject/regY:property"}}{{/crossLink}} to 50.
	 * @property regX
	 * @type {Number}
	 * @default 0
	 **/
	p.regX = 0;

	/**
	 * The y offset for this display object's registration point. For example, to make a 100x100px Bitmap rotate around
	 * its center, you would set {{#crossLink "DisplayObject/regX:property"}}{{/crossLink}} and regY to 50.
	 * @property regY
	 * @type {Number}
	 * @default 0
	 **/
	p.regY = 0;

	/**
	 * The rotation in degrees for this display object.
	 * @property rotation
	 * @type {Number}
	 * @default 0
	 **/
	p.rotation = 0;

	/**
	 * The factor to stretch this display object horizontally. For example, setting scaleX to 2 will stretch the display
	 * object to twice its nominal width. To horizontally flip an object, set the scale to a negative number.
	 * @property scaleX
	 * @type {Number}
	 * @default 1
	 **/
	p.scaleX = 1;

	/**
	 * The factor to stretch this display object vertically. For example, setting scaleY to 0.5 will stretch the display
	 * object to half its nominal height. To vertically flip an object, set the scale to a negative number.
	 * @property scaleY
	 * @type {Number}
	 * @default 1
	 **/
	p.scaleY = 1;

	/**
	 * The factor to skew this display object horizontally.
	 * @property skewX
	 * @type {Number}
	 * @default 0
	 **/
	p.skewX = 0;

	/**
	 * The factor to skew this display object vertically.
	 * @property skewY
	 * @type {Number}
	 * @default 0
	 **/
	p.skewY = 0;

	/**
	 * A shadow object that defines the shadow to render on this display object. Set to `null` to remove a shadow. If
	 * null, this property is inherited from the parent container.
	 * @property shadow
	 * @type {Shadow}
	 * @default null
	 **/
	p.shadow = null;

	/**
	 * Indicates whether this display object should be rendered to the canvas and included when running the Stage
	 * {{#crossLink "Stage/getObjectsUnderPoint"}}{{/crossLink}} method.
	 * @property visible
	 * @type {Boolean}
	 * @default true
	 **/
	p.visible = true;

	/**
	 * The x (horizontal) position of the display object, relative to its parent.
	 * @property x
	 * @type {Number}
	 * @default 0
	 **/
	p.x = 0;

	/** The y (vertical) position of the display object, relative to its parent.
	 * @property y
	 * @type {Number}
	 * @default 0
	 **/
	p.y = 0;

	/**
	 * The composite operation indicates how the pixels of this display object will be composited with the elements
	 * behind it. If `null`, this property is inherited from the parent container. For more information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#compositing">
	 * whatwg spec on compositing</a>.
	 * @property compositeOperation
	 * @type {String}
	 * @default null
	 **/
	p.compositeOperation = null;

	/**
	 * Indicates whether the display object should have its x & y position rounded prior to drawing it to stage.
	 * Snapping to whole pixels can result in a sharper and faster draw for images (ex. Bitmap & cached objects).
	 * This only applies if the enclosing stage has {{#crossLink "Stage/snapPixelsEnabled:property"}}{{/crossLink}} set
	 * to `true`. The snapToPixel property is `true` by default for {{#crossLink "Bitmap"}}{{/crossLink}} and {{#crossLink "Sprite"}}{{/crossLink}}
	 * instances, and `false` for all other display objects.
	 *
	 * Note that this applies only rounds the display object's local position. You should ensure that all of the display
	 * object's ancestors (parent containers) are also on a whole pixel. You can do this by setting the ancestors'
	 * snapToPixel property to `true`.
	 * @property snapToPixel
	 * @type {Boolean}
	 * @default false
	 * @deprecated Hardware acceleration in modern browsers makes this unnecessary.
	 **/
	p.snapToPixel = false;
	
	// TODO: remove handler docs in future:
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/mousedown:event"}}{{/crossLink}}
	 * event.
	 * @property onPress
	 * @type {Function}
	 * @deprecated Use addEventListener and the "mousedown" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/click:event"}}{{/crossLink}}
	 * event.
	 * @property onClick
	 * @type {Function}
	 * @deprecated Use addEventListener and the "click" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/dblclick:event"}}{{/crossLink}}
	 * event.
	 * @property onDoubleClick
	 * @type {Function}
	 * @deprecated Use addEventListener and the "dblclick" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}
	 * event.
	 * @property onMouseOver
	 * @type {Function}
	 * @deprecated Use addEventListener and the "mouseover" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}
	 * event.
	 * @property onMouseOut
	 * @type {Function}
	 * @deprecated Use addEventListener and the "mouseout" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}}
	 * event.
	 * @property onTick
	 * @type {Function}
	 * @deprecatedtick
	 */

	/**
	 * An array of Filter objects to apply to this display object. Filters are only applied / updated when {{#crossLink "cache"}}{{/crossLink}}
	 * or {{#crossLink "updateCache"}}{{/crossLink}} is called on the display object, and only apply to the area that is
	 * cached.
	 * @property filters
	 * @type {Array}
	 * @default null
	 **/
	p.filters = null;

	/**
	 * Returns an ID number that uniquely identifies the current cache for this display object. This can be used to
	 * determine if the cache has changed since a previous check.
	 * @property cacheID
	 * @type {Number}
	 * @default 0
	 */
	p.cacheID = 0;
	
	/**
	 * A Shape instance that defines a vector mask (clipping path) for this display object.  The shape's transformation
	 * will be applied relative to the display object's parent coordinates (as if it were a child of the parent).
	 * @property mask
	 * @type {Shape}
	 * @default null
	 */
	p.mask = null;
	
	/**
	 * A display object that will be tested when checking mouse interactions or testing {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}}.
	 * The hit area will have its transformation applied relative to this display object's coordinate space (as though
	 * the hit test object were a child of this display object and relative to its regX/Y). The hitArea will be tested
	 * using only its own `alpha` value regardless of the alpha value on the target display object, or the target's
	 * ancestors (parents).
	 * 
	 * If set on a {{#crossLink "Container"}}{{/crossLink}}, children of the Container will not receive mouse events.
	 * This is similar to setting {{#crossLink "mouseChildren"}}{{/crossLink}} to false.
	 *
	 * Note that hitArea is NOT currently used by the `hitTest()` method, nor is it supported for {{#crossLink "Stage"}}{{/crossLink}}.
	 * @property hitArea
	 * @type {DisplayObject}
	 * @default null
	 */
	p.hitArea = null;
	
	/**
	 * A CSS cursor (ex. "pointer", "help", "text", etc) that will be displayed when the user hovers over this display
	 * object. You must enable mouseover events using the {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}} method to
	 * use this property. Setting a non-null cursor on a Container will override the cursor set on its descendants.
	 * @property cursor
	 * @type {String}
	 * @default null
	 */
	p.cursor = null;

// private properties:

	/**
	 * @property _cacheOffsetX
	 * @protected
	 * @type {Number}
	 * @default 0
	 **/
	p._cacheOffsetX = 0;

	/**
	 * @property _cacheOffsetY
	 * @protected
	 * @type {Number}
	 * @default 0
	 **/
	p._cacheOffsetY = 0;
	
	/**
	 * @property _cacheScale
	 * @protected
	 * @type {Number}
	 * @default 1
	 **/
	p._cacheScale = 1;

	/**
	* @property _cacheDataURLID
	* @protected
	* @type {Number}
	* @default 0
	*/
	p._cacheDataURLID = 0;
	
	/**
	* @property _cacheDataURL
	* @protected
	* @type {String}
	* @default null
	*/
	p._cacheDataURL = null;

	/**
	 * @property _matrix
	 * @protected
	 * @type {Matrix2D}
	 * @default null
	 **/
	p._matrix = null;

	/**
	 * @property _rectangle
	 * @protected
	 * @type {Rectangle}
	 * @default null
	 **/
	p._rectangle = null;

	/**
	 * @property _bounds
	 * @protected
	 * @type {Rectangle}
	 * @default null
	 **/
	p._bounds = null;
	

// constructor:
	// separated so it can be easily addressed in subclasses:

	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	*/
	p.initialize = function() {
		this.id = createjs.UID.get();
		this._matrix = new createjs.Matrix2D();
		this._rectangle = new createjs.Rectangle();
	};

// public methods:
	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
	};

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns <code>true</code> if the draw was handled (useful for overriding functionality).
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache. For example,
	 * used for drawing the cache (to prevent it from simply drawing an existing cache back into itself).
	 **/
	p.draw = function(ctx, ignoreCache) {
		var cacheCanvas = this.cacheCanvas;
		if (ignoreCache || !cacheCanvas) { return false; }
		var scale = this._cacheScale, offX = this._cacheOffsetX, offY = this._cacheOffsetY, fBounds;
		if (fBounds = this._applyFilterBounds(offX, offY, 0, 0)) {
			offX = fBounds.x;
			offY = fBounds.y;
		}
		ctx.drawImage(cacheCanvas, offX, offY, cacheCanvas.width/scale, cacheCanvas.height/scale);
		return true;
	};
	
	/**
	 * Applies this display object's transformation, alpha, globalCompositeOperation, clipping path (mask), and shadow
	 * to the specified context. This is typically called prior to {{#crossLink "DisplayObject/draw"}}{{/crossLink}}.
	 * @method updateContext
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D to update.
	 **/
	p.updateContext = function(ctx) {
		var mtx, mask=this.mask, o=this;
		
		if (mask && mask.graphics && !mask.graphics.isEmpty()) {
			mtx = mask.getMatrix(mask._matrix);
			ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
			
			mask.graphics.drawAsPath(ctx);
			ctx.clip();
			
			mtx.invert();
			ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
		}
		
		mtx = o._matrix.identity().appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
		// TODO: should be a better way to manage this setting. For now, using dynamic access to avoid circular dependencies:
		if (createjs["Stage"]._snapToPixelEnabled && o.snapToPixel) { ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx+0.5|0, mtx.ty+0.5|0); }
		else { ctx.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty); }
		ctx.globalAlpha *= o.alpha;
		if (o.compositeOperation) { ctx.globalCompositeOperation = o.compositeOperation; }
		if (o.shadow) { this._applyShadow(ctx, o.shadow); }
	};

	/**
	 * Draws the display object into a new canvas, which is then used for subsequent draws. For complex content
	 * that does not change frequently (ex. a Container with many children that do not move, or a complex vector Shape),
	 * this can provide for much faster rendering because the content does not need to be re-rendered each tick. The
	 * cached display object can be moved, rotated, faded, etc freely, however if its content changes, you must
	 * manually update the cache by calling <code>updateCache()</code> or <code>cache()</code> again. You must specify
	 * the cache area via the x, y, w, and h parameters. This defines the rectangle that will be rendered and cached
	 * using this display object's coordinates.
	 *
	 * <h4>Example</h4>
	 * For example if you defined a Shape that drew a circle at 0, 0 with a radius of 25:
	 *
	 *      var shape = new createjs.Shape();
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 25);
	 *      myShape.cache(-25, -25, 50, 50);
	 *
	 * Note that filters need to be defined <em>before</em> the cache is applied. Check out the {{#crossLink "Filter"}}{{/crossLink}}
	 * class for more information. Some filters (ex. BlurFilter) will not work as expected in conjunction with the scale param.
	 * 
	 * Usually, the resulting cacheCanvas will have the dimensions width*scale by height*scale, however some filters (ex. BlurFilter)
	 * will add padding to the canvas dimensions.
	 *
	 * @method cache
	 * @param {Number} x The x coordinate origin for the cache region.
	 * @param {Number} y The y coordinate origin for the cache region.
	 * @param {Number} width The width of the cache region.
	 * @param {Number} height The height of the cache region.
	 * @param {Number} [scale=1] The scale at which the cache will be created. For example, if you cache a vector shape using
	 * 	myShape.cache(0,0,100,100,2) then the resulting cacheCanvas will be 200x200 px. This lets you scale and rotate
	 * 	cached elements with greater fidelity. Default is 1.
	 **/
	p.cache = function(x, y, width, height, scale) {
		// draw to canvas.
		scale = scale||1;
		if (!this.cacheCanvas) { this.cacheCanvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"); }
		this._cacheWidth = width;
		this._cacheHeight = height;
		this._cacheOffsetX = x;
		this._cacheOffsetY = y;
		this._cacheScale = scale;
		this.updateCache();
	};

	/**
	 * Redraws the display object to its cache. Calling updateCache without an active cache will throw an error.
	 * If compositeOperation is null the current cache will be cleared prior to drawing. Otherwise the display object
	 * will be drawn over the existing cache using the specified compositeOperation.
	 *
	 * <h4>Example</h4>
	 * Clear the current graphics of a cached shape, draw some new instructions, and then update the cache. The new line
	 * will be drawn on top of the old one.
	 *
	 *      // Not shown: Creating the shape, and caching it.
	 *      shapeInstance.clear();
	 *      shapeInstance.setStrokeStyle(3).beginStroke("#ff0000").moveTo(100, 100).lineTo(200,200);
	 *      shapeInstance.updateCache();
	 *
	 * @method updateCache
	 * @param {String} compositeOperation The compositeOperation to use, or null to clear the cache and redraw it.
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#compositing">
	 * whatwg spec on compositing</a>.
	 **/
	p.updateCache = function(compositeOperation) {
		var cacheCanvas = this.cacheCanvas, scale = this._cacheScale, offX = this._cacheOffsetX*scale, offY = this._cacheOffsetY*scale;
		var w = this._cacheWidth, h = this._cacheHeight, fBounds;
		if (!cacheCanvas) { throw "cache() must be called before updateCache()"; }
		var ctx = cacheCanvas.getContext("2d");
		
		// update bounds based on filters:
		if (fBounds = this._applyFilterBounds(offX, offY, w, h)) {
			offX = fBounds.x;
			offY = fBounds.y;
			w = fBounds.width;
			h = fBounds.height;
		}
		
		w = Math.ceil(w*scale);
		h = Math.ceil(h*scale);
		if (w != cacheCanvas.width || h != cacheCanvas.height) {
			// TODO: it would be nice to preserve the content if there is a compositeOperation.
			cacheCanvas.width = w;
			cacheCanvas.height = h;
		} else if (!compositeOperation) {
			ctx.clearRect(0, 0, w+1, h+1);
		}
		
		ctx.save();
		ctx.globalCompositeOperation = compositeOperation;
		ctx.setTransform(scale, 0, 0, scale, -offX, -offY);
		this.draw(ctx, true);
		// TODO: filters and cache scale don't play well together at present.
		this._applyFilters();
		ctx.restore();
		this.cacheID = DisplayObject._nextCacheID++;
	};

	/**
	 * Clears the current cache. See {{#crossLink "DisplayObject/cache"}}{{/crossLink}} for more information.
	 * @method uncache
	 **/
	p.uncache = function() {
		this._cacheDataURL = this.cacheCanvas = null;
		this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
		this._cacheScale = 1;
	};
	
	/**
	 * Returns a data URL for the cache, or null if this display object is not cached.
	 * Uses cacheID to ensure a new data URL is not generated if the cache has not changed.
	 * @method getCacheDataURL
	 * @return {String} The image data url for the cache.
	 **/
	p.getCacheDataURL = function() {
		if (!this.cacheCanvas) { return null; }
		if (this.cacheID != this._cacheDataURLID) { this._cacheDataURL = this.cacheCanvas.toDataURL(); }
		return this._cacheDataURL;
	};

	/**
	 * Returns the stage that this display object will be rendered on, or null if it has not been added to one.
	 * @method getStage
	 * @return {Stage} The Stage instance that the display object is a descendent of. null if the DisplayObject has not
	 * been added to a Stage.
	 **/
	p.getStage = function() {
		var o = this;
		while (o.parent) {
			o = o.parent;
		}
		// using dynamic access to avoid circular dependencies;
		if (o instanceof createjs["Stage"]) { return o; }
		return null;
	};

	/**
	 * Transforms the specified x and y position from the coordinate space of the display object
	 * to the global (stage) coordinate space. For example, this could be used to position an HTML label
	 * over a specific point on a nested display object. Returns a Point instance with x and y properties
	 * correlating to the transformed coordinates on the stage.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.x = 300;
	 *      displayObject.y = 200;
	 *      stage.addChild(displayObject);
	 *      var point = myDisplayObject.localToGlobal(100, 100);
	 *      // Results in x=400, y=300
	 *
	 * @method localToGlobal
	 * @param {Number} x The x position in the source display object to transform.
	 * @param {Number} y The y position in the source display object to transform.
	 * @return {Point} A Point instance with x and y properties correlating to the transformed coordinates
	 * on the stage.
	 **/
	p.localToGlobal = function(x, y) {
		var mtx = this.getConcatenatedMatrix(this._matrix);
		if (mtx == null) { return null; }
		mtx.append(1, 0, 0, 1, x, y);
		return new createjs.Point(mtx.tx, mtx.ty);
	};

	/**
	 * Transforms the specified x and y position from the global (stage) coordinate space to the
	 * coordinate space of the display object. For example, this could be used to determine
	 * the current mouse position within the display object. Returns a Point instance with x and y properties
	 * correlating to the transformed position in the display object's coordinate space.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.x = 300;
	 *      displayObject.y = 200;
	 *      stage.addChild(displayObject);
	 *      var point = myDisplayObject.globalToLocal(100, 100);
	 *      // Results in x=-200, y=-100
	 *
	 * @method globalToLocal
	 * @param {Number} x The x position on the stage to transform.
	 * @param {Number} y The y position on the stage to transform.
	 * @return {Point} A Point instance with x and y properties correlating to the transformed position in the
	 * display object's coordinate space.
	 **/
	p.globalToLocal = function(x, y) {
		var mtx = this.getConcatenatedMatrix(this._matrix);
		if (mtx == null) { return null; }
		mtx.invert();
		mtx.append(1, 0, 0, 1, x, y);
		return new createjs.Point(mtx.tx, mtx.ty);
	};

	/**
	 * Transforms the specified x and y position from the coordinate space of this display object to the coordinate
	 * space of the target display object. Returns a Point instance with x and y properties correlating to the
	 * transformed position in the target's coordinate space. Effectively the same as using the following code with
	 * {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}} and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
	 *
	 *      var pt = this.localToGlobal(x, y);
	 *      pt = target.globalToLocal(pt.x, pt.y);
	 *
	 * @method localToLocal
	 * @param {Number} x The x position in the source display object to transform.
	 * @param {Number} y The y position on the source display object to transform.
	 * @param {DisplayObject} target The target display object to which the coordinates will be transformed.
	 * @return {Point} Returns a Point instance with x and y properties correlating to the transformed position
	 * in the target's coordinate space.
	 **/
	p.localToLocal = function(x, y, target) {
		var pt = this.localToGlobal(x, y);
		return target.globalToLocal(pt.x, pt.y);
	};

	/**
	 * Shortcut method to quickly set the transform properties on the display object. All parameters are optional.
	 * Omitted parameters will have the default value set.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.setTransform(100, 100, 2, 2);
	 *
	 * @method setTransform
	 * @param {Number} [x=0] The horizontal translation (x position) in pixels
	 * @param {Number} [y=0] The vertical translation (y position) in pixels
	 * @param {Number} [scaleX=1] The horizontal scale, as a percentage of 1
	 * @param {Number} [scaleY=1] the vertical scale, as a percentage of 1
	 * @param {Number} [rotation=0] The rotation, in degrees
	 * @param {Number} [skewX=0] The horizontal skew factor
	 * @param {Number} [skewY=0] The vertical skew factor
	 * @param {Number} [regX=0] The horizontal registration point in pixels
	 * @param {Number} [regY=0] The vertical registration point in pixels
	 * @return {DisplayObject} Returns this instance. Useful for chaining commands.
	*/
	p.setTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
		this.x = x || 0;
		this.y = y || 0;
		this.scaleX = scaleX == null ? 1 : scaleX;
		this.scaleY = scaleY == null ? 1 : scaleY;
		this.rotation = rotation || 0;
		this.skewX = skewX || 0;
		this.skewY = skewY || 0;
		this.regX = regX || 0;
		this.regY = regY || 0;
		return this;
	};
	
	/**
	 * Returns a matrix based on this object's transform.
	 * @method getMatrix
	 * @param {Matrix2D} matrix Optional. A Matrix2D object to populate with the calculated values. If null, a new
	 * Matrix object is returned.
	 * @return {Matrix2D} A matrix representing this display object's transform.
	 **/
	p.getMatrix = function(matrix) {
		var o = this;
		return (matrix ? matrix.identity() : new createjs.Matrix2D()).appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).appendProperties(o.alpha, o.shadow, o.compositeOperation);
	};
	
	/**
	 * Generates a concatenated Matrix2D object representing the combined transform of the display object and all of its
	 * parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}). This can
	 * be used to transform positions between coordinate spaces, such as with {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}}
	 * and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
	 * @method getConcatenatedMatrix
	 * @param {Matrix2D} [mtx] A {{#crossLink "Matrix2D"}}{{/crossLink}} object to populate with the calculated values.
	 * If null, a new Matrix2D object is returned.
	 * @return {Matrix2D} a concatenated Matrix2D object representing the combined transform of the display object and
	 * all of its parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}).
	 **/
	p.getConcatenatedMatrix = function(matrix) {
		if (matrix) { matrix.identity(); }
		else { matrix = new createjs.Matrix2D(); }
		var o = this;
		while (o != null) {
			matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).prependProperties(o.alpha, o.shadow, o.compositeOperation);
			o = o.parent;
		}
		return matrix;
	};

	/**
	 * Tests whether the display object intersects the specified local point (ie. draws a pixel with alpha > 0 at
	 * the specified position). This ignores the alpha, shadow and compositeOperation of the display object, and all
	 * transform properties including regX/Y.
	 *
	 * <h4>Example</h4>
	 *
	 *      stage.addEventListener("stagemousedown", handleMouseDown);
	 *      function handleMouseDown(event) {
	 *          var hit = myShape.hitTest(event.stageX, event.stageY);
	 *      }
	 *
	 * Please note that shape-to-shape collision is not currently supported by EaselJS.
	 * @method hitTest
	 * @param {Number} x The x position to check in the display object's local coordinates.
	 * @param {Number} y The y position to check in the display object's local coordinates.
	 * @return {Boolean} A Boolean indicting whether a visible portion of the DisplayObject intersect the specified
	 * local Point.
	*/
	p.hitTest = function(x, y) {
		// TODO: update with support for .hitArea and update hitArea docs?
		var ctx = DisplayObject._hitTestContext;
		ctx.setTransform(1, 0, 0, 1, -x, -y);
		this.draw(ctx);

		var hit = this._testHit(ctx);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, 2, 2);
		return hit;
	};
	
	/**
	 * Provides a chainable shortcut method for setting a number of properties on a DisplayObject instance.
	 *
	 * <h4>Example</h4>
	 *
	 *      var myGraphics = new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 25);
	 *      var shape = stage.addChild(new Shape())
	 *          .set({graphics:myGraphics, x:100, y:100, alpha:0.5});
	 *
	 * @method set
	 * @param {Object} props A generic object containing properties to copy to the DisplayObject instance.
	 * @return {DisplayObject} Returns The DisplayObject instance the method is called on (useful for chaining calls.)
	*/
	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};
	
	/**
	 * Returns a rectangle representing this object's bounds in its local coordinate system (ie. with no transformation).
	 * Objects that have been cached will return the bounds of the cache.
	 * 
	 * Not all display objects can calculate their own bounds (ex. Shape). For these objects, you can use 
	 * {{#crossLink "DisplayObject/setBounds"}}{{/crossLink}} so that they are included when calculating Container
	 * bounds.
	 * 
	 * <table>
	 * 	<tr><td><b>All</b></td><td>
	 * 		All display objects support setting bounds manually using setBounds(). Likewise, display objects that
	 * 		have been cached using cache() will return the bounds of their cache. Manual and cache bounds will override
	 * 		the automatic calculations listed below.
	 * 	</td></tr>
	 * 	<tr><td><b>Bitmap</b></td><td>
	 * 		Returns the width and height of the sourceRect (if specified) or image, extending from (x=0,y=0).
	 * 	</td></tr>
	 * 	<tr><td><b>Sprite</b></td><td>
	 * 		Returns the bounds of the current frame. May have non-zero x/y if a frame registration point was specified
	 * 		in the spritesheet data. See also {{#crossLink "SpriteSheet/getFrameBounds"}}{{/crossLink}}
	 * 	</td></tr>
	 * 	<tr><td><b>Container</b></td><td>
	 * 		Returns the aggregate (combined) bounds of all children that return a non-null value from getBounds().
	 * 	</td></tr>
	 * 	<tr><td><b>Shape</b></td><td>
	 * 		Does not currently support automatic bounds calculations. Use setBounds() to manually define bounds.
	 * 	</td></tr>
	 * 	<tr><td><b>Text</b></td><td>
	 * 		Returns approximate bounds. Horizontal values (x/width) are quite accurate, but vertical values (y/height) are
	 * 		not, especially when using textBaseline values other than "top".
	 * 	</td></tr>
	 * 	<tr><td><b>BitmapText</b></td><td>
	 * 		Returns approximate bounds. Values will be more accurate if spritesheet frame registration points are close
	 * 		to (x=0,y=0).
	 * 	</td></tr>
	* </table>
	 * 
	 * Bounds can be expensive to calculate for some objects (ex. text, or containers with many children), and
	 * are recalculated each time you call getBounds(). You can prevent recalculation on static objects by setting the
	 * bounds explicitly:
	 * 
	 * 	var bounds = obj.getBounds();
	 * 	obj.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
	 * 	// getBounds will now use the set values, instead of recalculating
	 * 
	 * To reduce memory impact, the returned Rectangle instance may be reused internally; clone the instance or copy its
	 * values if you need to retain it.
	 * 
	 * 	var myBounds = obj.getBounds().clone();
	 * 	// OR:
	 * 	myRect.copy(obj.getBounds());
	 * 
	 * @method getBounds
	 * @return {Rectangle} A Rectangle instance representing the bounds, or null if bounds are not available for this
	 * object.
	 **/
	p.getBounds = function() {
		if (this._bounds) { return this._rectangle.copy(this._bounds); }
		var cacheCanvas = this.cacheCanvas;
		if (cacheCanvas) {
			var scale = this._cacheScale;
			return this._rectangle.initialize(this._cacheOffsetX, this._cacheOffsetY, cacheCanvas.width/scale, cacheCanvas.height/scale);
		}
		return null;
	};
	
	/**
	 * Returns a rectangle representing this object's bounds in its parent's coordinate system (ie. with transformations applied).
	 * Objects that have been cached will return the transformed bounds of the cache.
	 * 
	 * Not all display objects can calculate their own bounds (ex. Shape). For these objects, you can use 
	 * {{#crossLink "DisplayObject/setBounds"}}{{/crossLink}} so that they are included when calculating Container
	 * bounds.
	 * 
	 * To reduce memory impact, the returned Rectangle instance may be reused internally; clone the instance or copy its
	 * values if you need to retain it.
	 * 
	 * Container instances calculate aggregate bounds for all children that return bounds via getBounds.
	 * @method getTransformedBounds
	 * @return {Rectangle} A Rectangle instance representing the bounds, or null if bounds are not available for this object.
	 **/
	p.getTransformedBounds = function() {
		return this._getBounds();
	};
	
	/**
	 * Allows you to manually specify the bounds of an object that either cannot calculate their own bounds (ex. Shape &
	 * Text) for future reference, or so the object can be included in Container bounds. Manually set bounds will always
	 * override calculated bounds.
	 * 
	 * The bounds should be specified in the object's local (untransformed) coordinates. For example, a Shape instance
	 * with a 25px radius circle centered at 0,0 would have bounds of (-25, -25, 50, 50).
	 * @method setBounds
	 * @param {Number} x The x origin of the bounds. Pass null to remove the manual bounds.
	 * @param {Number} y The y origin of the bounds.
	 * @param {Number} width The width of the bounds.
	 * @param {Number} height The height of the bounds.
	 **/
	p.setBounds = function(x, y, width, height) {
		if (x == null) { this._bounds = x; }
		this._bounds = (this._bounds || new createjs.Rectangle()).initialize(x, y, width, height);
	};

	/**
	 * Returns a clone of this DisplayObject. Some properties that are specific to this instance's current context are
	 * reverted to their defaults (for example .parent). Also note that caches are not maintained across clones.
	 * @method clone
	 * @return {DisplayObject} A clone of the current DisplayObject instance.
	 **/
	p.clone = function() {
		var o = new DisplayObject();
		this.cloneProps(o);
		return o;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[DisplayObject (name="+  this.name +")]";
	};

// private methods:

	// separated so it can be used more easily in subclasses:
	/**
	 * @method cloneProps
	 * @protected
	 * @param {DisplayObject} o The DisplayObject instance which will have properties from the current DisplayObject
	 * instance copied into.
	 **/
	p.cloneProps = function(o) {
		o.alpha = this.alpha;
		o.name = this.name;
		o.regX = this.regX;
		o.regY = this.regY;
		o.rotation = this.rotation;
		o.scaleX = this.scaleX;
		o.scaleY = this.scaleY;
		o.shadow = this.shadow;
		o.skewX = this.skewX;
		o.skewY = this.skewY;
		o.visible = this.visible;
		o.x  = this.x;
		o.y = this.y;
		o._bounds = this._bounds;
		o.mouseEnabled = this.mouseEnabled;
		o.compositeOperation = this.compositeOperation;
	};

	/**
	 * @method _applyShadow
	 * @protected
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Shadow} shadow
	 **/
	p._applyShadow = function(ctx, shadow) {
		shadow = shadow || Shadow.identity;
		ctx.shadowColor = shadow.color;
		ctx.shadowOffsetX = shadow.offsetX;
		ctx.shadowOffsetY = shadow.offsetY;
		ctx.shadowBlur = shadow.blur;
	};
	
	
	/**
	 * @method _tick
	 * @param {Array} params Parameters to pass on to any listeners of the tick function. This will usually include the
	 * properties from the {{#crossLink "Ticker"}}{{/crossLink}} "tick" event, such as `delta` and `paused`, but may
	 * be undefined or contain other values depending on the usage by the application.
	 * @protected
	 **/
	p._tick = function(params) {
		// because tick can be really performance sensitive, we'll inline some of the dispatchEvent work.
		var ls = this._listeners;
		if (ls && ls["tick"]) {
			var evt = new createjs.Event("tick");
			evt.params = params;
			this._dispatchEvent(evt, this, 2);
		}
	};

	/**
	 * @method _testHit
	 * @protected
	 * @param {CanvasRenderingContext2D} ctx
	 * @return {Boolean}
	 **/
	p._testHit = function(ctx) {
		try {
			var hit = ctx.getImageData(0, 0, 1, 1).data[3] > 1;
		} catch (e) {
			if (!DisplayObject.suppressCrossDomainErrors) {
				throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
			}
		}
		return hit;
	};

	/**
	 * @method _applyFilters
	 * @protected
	 **/
	p._applyFilters = function() {
		if (!this.filters || this.filters.length == 0 || !this.cacheCanvas) { return; }
		var l = this.filters.length;
		var ctx = this.cacheCanvas.getContext("2d");
		var w = this.cacheCanvas.width;
		var h = this.cacheCanvas.height;
		for (var i=0; i<l; i++) {
			this.filters[i].applyFilter(ctx, 0, 0, w, h);
		}
	};
	
	/**
	 * @method _applyFilterBounds
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @return {Rectangle}
	 * @protected
	 **/
	p._applyFilterBounds = function(x, y, width, height) {
		var bounds, l, filters = this.filters;
		if (!filters || !(l=filters.length)) { return; }
		
		for (var i=0; i<l; i++) {
			var f = this.filters[i];
			var fBounds = f.getBounds&&f.getBounds();
			if (!fBounds) { continue; }
			if (!bounds) { bounds = this._rectangle.initialize(x,y,width,height); }
			bounds.x += fBounds.x;
			bounds.y += fBounds.y;
			bounds.width += fBounds.width;
			bounds.height += fBounds.height;
		}
		return bounds;
	};
	
	/**
	 * @method _getBounds
	 * @param {Matrix2D} matrix
	 * @param {Boolean} ignoreTransform If true, does not apply this object's transform.
	 * @return {Rectangle}
	 * @protected
	 **/
	p._getBounds = function(matrix, ignoreTransform){
		return this._transformBounds(this.getBounds(), matrix, ignoreTransform);
	};
	
	/**
	 * @method _transformBounds
	 * @param {Rectangle} bounds
	 * @param {Matrix2D} matrix
	 * @param {Boolean} ignoreTransform
	 * @return {Rectangle}
	 * @protected
	 **/
	p._transformBounds = function(bounds, matrix, ignoreTransform) {
		if (!bounds) { return bounds; }
		var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;
		var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);
		
		if (x || y) { mtx.appendTransform(0,0,1,1,0,0,0,-x,-y); }
		if (matrix) { mtx.prependMatrix(matrix); }
		
		var x_a = width*mtx.a, x_b = width*mtx.b;
		var y_c = height*mtx.c, y_d = height*mtx.d;
		var tx = mtx.tx, ty = mtx.ty;
		
		var minX = tx, maxX = tx, minY = ty, maxY = ty;

		if ((x = x_a + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
		if ((x = x_a + y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
		if ((x = y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
		
		if ((y = x_b + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
		if ((y = x_b + y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
		if ((y = y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
		
		return bounds.initialize(minX, minY, maxX-minX, maxY-minY);
	};

createjs.DisplayObject = DisplayObject;
}());/*
* Container
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

// namespace:
this.createjs = this.createjs||{};

(function() {

/**
 * A Container is a nestable display list that allows you to work with compound display elements. For  example you could
 * group arm, leg, torso and head {{#crossLink "Bitmap"}}{{/crossLink}} instances together into a Person Container, and
 * transform them as a group, while still being able to move the individual parts relative to each other. Children of
 * containers have their <code>transform</code> and <code>alpha</code> properties concatenated with their parent
 * Container.
 *
 * For example, a {{#crossLink "Shape"}}{{/crossLink}} with x=100 and alpha=0.5, placed in a Container with <code>x=50</code>
 * and <code>alpha=0.7</code> will be rendered to the canvas at <code>x=150</code> and <code>alpha=0.35</code>.
 * Containers have some overhead, so you generally shouldn't create a Container to hold a single child.
 *
 * <h4>Example</h4>
 *      var container = new createjs.Container();
 *      container.addChild(bitmapInstance, shapeInstance);
 *      container.x = 100;
 *
 * @class Container
 * @extends DisplayObject
 * @constructor
 **/
var Container = function() {
  this.initialize();
};
var p = Container.prototype = new createjs.DisplayObject();

// public properties:
	/**
	 * The array of children in the display list. You should usually use the child management methods such as
	 * {{#crossLink "Container/addChild"}}{{/crossLink}}, {{#crossLink "Container/removeChild"}}{{/crossLink}},
	 * {{#crossLink "Container/swapChildren"}}{{/crossLink}}, etc, rather than accessing this directly, but it is
	 * included for advanced uses.
	 * @property children
	 * @type Array
	 * @default null
	 **/
	p.children = null;
	
	/**
	 * Indicates whether the children of this container are independently enabled for mouse/pointer interaction.
	 * If false, the children will be aggregated under the container - for example, a click on a child shape would
	 * trigger a click event on the container.
	 * @property mouseChildren
	 * @type Boolean
	 * @default true
	 **/
	p.mouseChildren = true;

// constructor:

	/**
	 * @property DisplayObject_initialize
	 * @type Function
	 * @private
	 **/
	p.DisplayObject_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	*/
	p.initialize = function() {
		this.DisplayObject_initialize();
		this.children = [];
	};

// public methods:

	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		var hasContent = this.cacheCanvas || this.children.length;
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
	};

	/**
	 * @property DisplayObject_draw
	 * @type Function
	 * @private
	 **/
	p.DisplayObject_draw = p.draw;

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 **/
	p.draw = function(ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
		
		// this ensures we don't have issues with display list changes that occur during a draw:
		var list = this.children.slice(0);
		for (var i=0,l=list.length; i<l; i++) {
			var child = list[i];
			if (!child.isVisible()) { continue; }
			
			// draw the child:
			ctx.save();
			child.updateContext(ctx);
			child.draw(ctx);
			ctx.restore();
		}
		return true;
	};
	
	/**
	 * Adds a child to the top of the display list.
	 *
	 * <h4>Example</h4>
	 *      container.addChild(bitmapInstance);
	 *
	 *  You can also add multiple children at once:
	 *
	 *      container.addChild(bitmapInstance, shapeInstance, textInstance);
	 *
	 * @method addChild
	 * @param {DisplayObject} child The display object to add.
	 * @return {DisplayObject} The child that was added, or the last child if multiple children were added.
	 **/
	p.addChild = function(child) {
		if (child == null) { return child; }
		var l = arguments.length;
		if (l > 1) {
			for (var i=0; i<l; i++) { this.addChild(arguments[i]); }
			return arguments[l-1];
		}
		if (child.parent) { child.parent.removeChild(child); }
		child.parent = this;
		this.children.push(child);
		return child;
	};

	/**
	 * Adds a child to the display list at the specified index, bumping children at equal or greater indexes up one, and
	 * setting its parent to this Container.
	 *
	 * <h4>Example</h4>
	 *      addChildAt(child1, index);
	 *
	 * You can also add multiple children, such as:
	 *
	 *      addChildAt(child1, child2, ..., index);
	 *
	 * The index must be between 0 and numChildren. For example, to add myShape under otherShape in the display list,
	 * you could use:
	 *
	 *      container.addChildAt(myShape, container.getChildIndex(otherShape));
	 *
	 * This would also bump otherShape's index up by one. Fails silently if the index is out of range.
	 *
	 * @method addChildAt
	 * @param {DisplayObject} child The display object to add.
	 * @param {Number} index The index to add the child at.
	 * @return {DisplayObject} Returns the last child that was added, or the last child if multiple children were added.
	 **/
	p.addChildAt = function(child, index) {
		var l = arguments.length;
		var indx = arguments[l-1]; // can't use the same name as the index param or it replaces arguments[1]
		if (indx < 0 || indx > this.children.length) { return arguments[l-2]; }
		if (l > 2) {
			for (var i=0; i<l-1; i++) { this.addChildAt(arguments[i], indx+i); }
			return arguments[l-2];
		}
		if (child.parent) { child.parent.removeChild(child); }
		child.parent = this;
		this.children.splice(index, 0, child);
		return child;
	};

	/**
	 * Removes the specified child from the display list. Note that it is faster to use removeChildAt() if the index is
	 * already known.
	 *
	 * <h4>Example</h4>
	 *      container.removeChild(child);
	 *
	 * You can also remove multiple children:
	 *
	 *      removeChild(child1, child2, ...);
	 *
	 * Returns true if the child (or children) was removed, or false if it was not in the display list.
	 * @method removeChild
	 * @param {DisplayObject} child The child to remove.
	 * @return {Boolean} true if the child (or children) was removed, or false if it was not in the display list.
	 **/
	p.removeChild = function(child) {
		var l = arguments.length;
		if (l > 1) {
			var good = true;
			for (var i=0; i<l; i++) { good = good && this.removeChild(arguments[i]); }
			return good;
		}
		return this.removeChildAt(createjs.indexOf(this.children, child));
	};

	/**
	 * Removes the child at the specified index from the display list, and sets its parent to null.
	 *
	 * <h4>Example</h4>
	 *
	 *      container.removeChildAt(2);
	 *
	 * You can also remove multiple children:
	 *
	 *      container.removeChild(2, 7, ...)
	 *
	 * Returns true if the child (or children) was removed, or false if any index was out of range.
	 * @method removeChildAt
	 * @param {Number} index The index of the child to remove.
	 * @return {Boolean} true if the child (or children) was removed, or false if any index was out of range.
	 **/
	p.removeChildAt = function(index) {
		var l = arguments.length;
		if (l > 1) {
			var a = [];
			for (var i=0; i<l; i++) { a[i] = arguments[i]; }
			a.sort(function(a, b) { return b-a; });
			var good = true;
			for (var i=0; i<l; i++) { good = good && this.removeChildAt(a[i]); }
			return good;
		}
		if (index < 0 || index > this.children.length-1) { return false; }
		var child = this.children[index];
		if (child) { child.parent = null; }
		this.children.splice(index, 1);
		return true;
	};

	/**
	 * Removes all children from the display list.
	 *
	 * <h4>Example</h4>
	 *      container.removeAlLChildren();
	 *
	 * @method removeAllChildren
	 **/
	p.removeAllChildren = function() {
		var kids = this.children;
		while (kids.length) { kids.pop().parent = null; }
	};

	/**
	 * Returns the child at the specified index.
	 *
	 * <h4>Example</h4>
	 *      container.getChildAt(2);
	 *
	 * @method getChildAt
	 * @param {Number} index The index of the child to return.
	 * @return {DisplayObject} The child at the specified index. Returns null if there is no child at the index.
	 **/
	p.getChildAt = function(index) {
		return this.children[index];
	};
	
	/**
	 * Returns the child with the specified name.
	 * @method getChildByName
	 * @param {String} name The name of the child to return.
	 * @return {DisplayObject} The child with the specified name.
	 **/
	p.getChildByName = function(name) {
		var kids = this.children;
		for (var i=0,l=kids.length;i<l;i++) {
			if(kids[i].name == name) { return kids[i]; }
		}
		return null;
	};

	/**
	 * Performs an array sort operation on the child list.
	 *
	 * <h4>Example</h4>
	 *      var sortFunction = function(item1, item2, options) {
	 *          if (item1 > item2) { return 1; }
	 *          if (item1 < item2) { return -1; }
	 *          return 0;
	 *      }
	 *      container.sortChildren(sortFunction);
	 *
	 * @method sortChildren
	 * @param {Function} sortFunction the function to use to sort the child list. See JavaScript's <code>Array.sort</code>
	 * documentation for details.
	 **/
	p.sortChildren = function(sortFunction) {
		this.children.sort(sortFunction);
	};

	/**
	 * Returns the index of the specified child in the display list, or -1 if it is not in the display list.
	 *
	 * <h4>Example</h4>
	 *      var index = container.getChildIndex(child);
	 *
	 * @method getChildIndex
	 * @param {DisplayObject} child The child to return the index of.
	 * @return {Number} The index of the specified child. -1 if the child is not found.
	 **/
	p.getChildIndex = function(child) {
		return createjs.indexOf(this.children, child);
	};

	/**
	 * Returns the number of children in the display list.
	 * @method getNumChildren
	 * @return {Number} The number of children in the display list.
	 **/
	p.getNumChildren = function() {
		return this.children.length;
	};
	
	/**
	 * Swaps the children at the specified indexes. Fails silently if either index is out of range.
	 * @method swapChildrenAt
	 * @param {Number} index1
	 * @param {Number} index2
	 **/
	p.swapChildrenAt = function(index1, index2) {
		var kids = this.children;
		var o1 = kids[index1];
		var o2 = kids[index2];
		if (!o1 || !o2) { return; }
		kids[index1] = o2;
		kids[index2] = o1;
	};
	
	/**
	 * Swaps the specified children's depth in the display list. Fails silently if either child is not a child of this
	 * Container.
	 * @method swapChildren
	 * @param {DisplayObject} child1
	 * @param {DisplayObject} child2
	 **/
	p.swapChildren = function(child1, child2) {
		var kids = this.children;
		var index1,index2;
		for (var i=0,l=kids.length;i<l;i++) {
			if (kids[i] == child1) { index1 = i; }
			if (kids[i] == child2) { index2 = i; }
			if (index1 != null && index2 != null) { break; }
		}
		if (i==l) { return; } // TODO: throw error?
		kids[index1] = child2;
		kids[index2] = child1;
	};
	
	/**
	 * Changes the depth of the specified child. Fails silently if the child is not a child of this container, or the index is out of range.
	 * @param {DisplayObject} child
	 * @param {Number} index  
	 * @method setChildIndex
	 **/
	p.setChildIndex = function(child, index) {
		var kids = this.children, l=kids.length;
		if (child.parent != this || index < 0 || index >= l) { return; }
		for (var i=0;i<l;i++) {
			if (kids[i] == child) { break; }
		}
		if (i==l || i == index) { return; }
		kids.splice(i,1);
		kids.splice(index,0,child);
	};

	/**
	 * Returns true if the specified display object either is this container or is a descendent (child, grandchild, etc)
	 * of this container.
	 * @method contains
	 * @param {DisplayObject} child The DisplayObject to be checked.
	 * @return {Boolean} true if the specified display object either is this container or is a descendent.
	 **/
	p.contains = function(child) {
		while (child) {
			if (child == this) { return true; }
			child = child.parent;
		}
		return false;
	};

	/**
	 * Tests whether the display object intersects the specified local point (ie. draws a pixel with alpha > 0 at the
	 * specified position). This ignores the alpha, shadow and compositeOperation of the display object, and all
	 * transform properties including regX/Y.
	 * @method hitTest
	 * @param {Number} x The x position to check in the display object's local coordinates.
	 * @param {Number} y The y position to check in the display object's local coordinates.
	 * @return {Boolean} A Boolean indicating whether there is a visible section of a DisplayObject that overlaps the specified
	 * coordinates.
	 **/
	p.hitTest = function(x, y) {
		// TODO: optimize to use the fast cache check where possible.
		return (this.getObjectUnderPoint(x, y) != null);
	};

	/**
	 * Returns an array of all display objects under the specified coordinates that are in this container's display
	 * list. This routine ignores any display objects with mouseEnabled set to false. The array will be sorted in order
	 * of visual depth, with the top-most display object at index 0. This uses shape based hit detection, and can be an
	 * expensive operation to run, so it is best to use it carefully. For example, if testing for objects under the
	 * mouse, test on tick (instead of on mousemove), and only if the mouse's position has changed.
	 * @method getObjectsUnderPoint
	 * @param {Number} x The x position in the container to test.
	 * @param {Number} y The y position in the container to test.
	 * @return {Array} An Array of DisplayObjects under the specified coordinates.
	 **/
	p.getObjectsUnderPoint = function(x, y) {
		var arr = [];
		var pt = this.localToGlobal(x, y);
		this._getObjectsUnderPoint(pt.x, pt.y, arr);
		return arr;
	};

	/**
	 * Similar to {{#crossLink "Container/getObjectsUnderPoint()"}}{{/crossLink}}, but returns only the top-most display
	 * object. This runs significantly faster than <code>getObjectsUnderPoint()<code>, but is still an expensive
	 * operation. See {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}} for more information.
	 * @method getObjectUnderPoint
	 * @param {Number} x The x position in the container to test.
	 * @param {Number} y The y position in the container to test.
	 * @return {DisplayObject} The top-most display object under the specified coordinates.
	 **/
	p.getObjectUnderPoint = function(x, y) {
		var pt = this.localToGlobal(x, y);
		return this._getObjectsUnderPoint(pt.x, pt.y);
	};
	
	/**
	 * @property DisplayObject_getBounds
	 * @type Function
	 * @protected
	 **/
	p.DisplayObject_getBounds = p.getBounds; 
	
	/**
	 * Docced in superclass.
	 */
	p.getBounds = function() {
		return this._getBounds(null, true);
	};
	
	
	/**
	 * Docced in superclass.
	 */
	p.getTransformedBounds = function() {
		return this._getBounds();
	};

	/**
	 * Returns a clone of this Container. Some properties that are specific to this instance's current context are
	 * reverted to their defaults (for example .parent).
	 * @method clone
	 * @param {Boolean} recursive If true, all of the descendants of this container will be cloned recursively. If false, the
	 * properties of the container will be cloned, but the new instance will not have any children.
	 * @return {Container} A clone of the current Container instance.
	 **/
	p.clone = function(recursive) {
		var o = new Container();
		this.cloneProps(o);
		if (recursive) {
			var arr = o.children = [];
			for (var i=0, l=this.children.length; i<l; i++) {
				var clone = this.children[i].clone(recursive);
				clone.parent = o;
				arr.push(clone);
			}
		}
		return o;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Container (name="+  this.name +")]";
	};

// private properties:
	/**
	 * @property DisplayObject__tick
	 * @type Function
	 * @private
	 **/
	p.DisplayObject__tick = p._tick;
	
	/**
	 * @method _tick
	 * @param {Array} params Parameters to pass onto the DisplayObject {{#crossLink "DisplayObject/tick"}}{{/crossLink}}
	 * function.
	 * @protected
	 **/
	p._tick = function(params) {
		for (var i=this.children.length-1; i>=0; i--) {
			var child = this.children[i];
			if (child._tick) { child._tick(params); }
		}
		this.DisplayObject__tick(params);
	};

	/**
	 * @method _getObjectsUnderPoint
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Array} arr
	 * @param {Boolean} mouse If true, it will respect mouse interaction properties like mouseEnabled, mouseChildren, and hitArea.
	 * @return {Array}
	 * @protected
	 **/
	p._getObjectsUnderPoint = function(x, y, arr, mouse) {
		var ctx = createjs.DisplayObject._hitTestContext;
		var mtx = this._matrix;

		// draw children one at a time, and check if we get a hit:
		var l = this.children.length;
		for (var i=l-1; i>=0; i--) {
			var child = this.children[i];
			var hitArea = mouse&&child.hitArea;
			if (!child.visible || (!hitArea && !child.isVisible()) || (mouse && !child.mouseEnabled)) { continue; }
			// if a child container has a hitArea then we only need to check its hitArea, so we can treat it as a normal DO:
			if (!hitArea && child instanceof Container) {
				var result = child._getObjectsUnderPoint(x, y, arr, mouse);
				if (!arr && result) { return result; }
			} else {
				child.getConcatenatedMatrix(mtx);
				
				if (hitArea) {
					mtx.appendTransform(hitArea.x, hitArea.y, hitArea.scaleX, hitArea.scaleY, hitArea.rotation, hitArea.skewX, hitArea.skewY, hitArea.regX, hitArea.regY);
					mtx.alpha = hitArea.alpha;
				}
				
				ctx.globalAlpha = mtx.alpha;
				ctx.setTransform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx-x, mtx.ty-y);
				(hitArea||child).draw(ctx);
				if (!this._testHit(ctx)) { continue; }
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, 2, 2);
				if (arr) { arr.push(child); }
				else { return (mouse && !this.mouseChildren) ? this : child; }
			}
		}
		return null;
	};
	
	/**
	 * @method _getBounds
	 * @param {Matrix2D} matrix
	 * @param {Boolean} ignoreTransform If true, does not apply this object's transform.
	 * @return {Rectangle}
	 * @protected
	 **/
	p._getBounds = function(matrix, ignoreTransform) {
		var bounds = this.DisplayObject_getBounds();
		if (bounds) { return this._transformBounds(bounds, matrix, ignoreTransform); }
		
		var minX, maxX, minY, maxY;
		var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);
		if (matrix) { mtx.prependMatrix(matrix); }
		
		var l = this.children.length;
		for (var i=0; i<l; i++) {
			var child = this.children[i];
			if (!child.visible || !(bounds = child._getBounds(mtx))) { continue; }
			var x1=bounds.x, y1=bounds.y, x2=x1+bounds.width, y2=y1+bounds.height;
			if (x1 < minX || minX == null) { minX = x1; }
			if (x2 > maxX || maxX == null) { maxX = x2; }
			if (y1 < minY || minY == null) { minY = y1; }
			if (y2 > maxY || maxY == null) { maxY = y2; }
		}
		
		return (maxX == null) ? null : this._rectangle.initialize(minX, minY, maxX-minX, maxY-minY);
	};

createjs.Container = Container;
}());/*
* Stage
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * A stage is the root level {{#crossLink "Container"}}{{/crossLink}} for a display list. Each time its {{#crossLink "Stage/tick"}}{{/crossLink}}
 * method is called, it will render its display list to its target canvas.
 *
 * <h4>Example</h4>
 * This example creates a stage, adds a child to it, then uses {{#crossLink "Ticker"}}{{/crossLink}} to update the child
 * and redraw the stage using {{#crossLink "Stage/update"}}{{/crossLink}}.
 *
 *      var stage = new createjs.Stage("canvasElementId");
 *      var image = new createjs.Bitmap("imagePath.png");
 *      stage.addChild(image);
 *      createjs.Ticker.addEventListener("tick", handleTick);
 *      function handleTick(event) {
 *          image.x += 10;
 *          stage.update();
 *      }
 *
 * @class Stage
 * @extends Container
 * @constructor
 * @param {HTMLCanvasElement | String | Object} canvas A canvas object that the Stage will render to, or the string id
 * of a canvas object in the current document.
 **/
var Stage = function(canvas) {
  this.initialize(canvas);
};
var p = Stage.prototype = new createjs.Container();

// static properties:
	/**
	 * @property _snapToPixelEnabled
	 * @protected
	 * @static
	 * @type {Boolean}
	 * @default false
	 * @deprecated Hardware acceleration in modern browsers makes this unnecessary.
	 **/
	Stage._snapToPixelEnabled = false; // snapToPixelEnabled is temporarily copied here during a draw to provide global access.

// events:

	/**
	 * Dispatched when the user moves the mouse over the canvas.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event stagemousemove
	 * @since 0.6.0
	 */

	/**
	 * Dispatched when the user presses their left mouse button on the canvas. See the {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * class for a listing of event properties.
	 * @event stagemousedown
	 * @since 0.6.0
	 */

	/**
	 * Dispatched when the user the user releases the mouse button anywhere that the page can detect it (this varies slightly between browsers).
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 * @event stagemouseup
	 * @since 0.6.0
	 */

	/**
	 * Dispatched when the mouse moves from within the canvas area (mouseInBounds == true) to outside it (mouseInBounds == false).
	 * This is currently only dispatched for mouse input (not touch). See the {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * class for a listing of event properties.
	 * @event mouseleave
	 * @since 0.7.0
	 */

	/**
	 * Dispatched when the mouse moves into the canvas area (mouseInBounds == false) from outside it (mouseInBounds == true).
	 * This is currently only dispatched for mouse input (not touch). See the {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * class for a listing of event properties.
	 * @event mouseenter
	 * @since 0.7.0
	 */
	 
	/**
	 * Dispatched each update immediately before the tick event is propagated through the display list. Does not fire if
	 * tickOnUpdate is false.
	 * @event tickstart
	 * @since 0.7.0
	 */
	 
	/**
	 * Dispatched each update immediately after the tick event is propagated through the display list. Does not fire if
	 * tickOnUpdate is false. Precedes the "drawstart" event.
	 * @event tickend
	 * @since 0.7.0
	 */
	 
	/**
	 * Dispatched each update immediately before the canvas is cleared and the display list is drawn to it.
	 * @event drawstart
	 * @since 0.7.0
	 */
	 
	/**
	 * Dispatched each update immediately after the display list is drawn to the canvas and the canvas context is restored.
	 * @event drawend
	 * @since 0.7.0
	 */

// public properties:
	/**
	 * Indicates whether the stage should automatically clear the canvas before each render. You can set this to <code>false</code>
	 * to manually control clearing (for generative art, or when pointing multiple stages at the same canvas for
	 * example).
	 *
	 * <h4>Example</h4>
	 *
	 *      var stage = new createjs.Stage("canvasId");
	 *      stage.autoClear = false;
	 *
	 * @property autoClear
	 * @type Boolean
	 * @default true
	 **/
	p.autoClear = true;

	/**
	 * The canvas the stage will render to. Multiple stages can share a single canvas, but you must disable autoClear for all but the
	 * first stage that will be ticked (or they will clear each other's render).
	 *
	 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
	 * new canvas or mouse events will not work as expected. For example:
	 *
	 *      myStage.enableDOMEvents(false);
	 *      myStage.canvas = anotherCanvas;
	 *      myStage.enableDOMEvents(true);
	 *
	 * @property canvas
	 * @type HTMLCanvasElement | Object
	 **/
	p.canvas = null;

	/**
	 * The current mouse X position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
	 * position over the canvas, and mouseInBounds will be set to false.
	 * @property mouseX
	 * @type Number
	 * @readonly
	 **/
	p.mouseX = 0;

	/**
	 * The current mouse Y position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
	 * position over the canvas, and mouseInBounds will be set to false.
	 * @property mouseY
	 * @type Number
	 * @readonly
	 **/
	p.mouseY = 0;

	// TODO: deprecated.
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the "{{#crossLink "Stage/stagemousemove:event"}}{{/crossLink}}
	 * event.
	 * @property onMouseMove
	 * @type Function
	 * @deprecated Use addEventListener and the "stagemousemove" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Stage/stagemouseup:event"}}{{/crossLink}}
	 * event.
	 * @property onMouseUp
	 * @type Function
	 * @deprecated Use addEventListener and the "stagemouseup" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Stage/stagemousedown:event"}}{{/crossLink}}
	 * event.
	 * @property onMouseDown
	 * @type Function
	 * @deprecated Use addEventListener and the "stagemousedown" event.
	 */

	// TODO: deprecated.
	/**
	 * Indicates whether this stage should use the {{#crossLink "DisplayObject/snapToPixel"}}{{/crossLink}} property of
	 * display objects when rendering them.
	 * @property snapToPixelEnabled
	 * @type Boolean
	 * @default false
	 * @deprecated Hardware acceleration makes this not beneficial
	 **/
	p.snapToPixelEnabled = false;

	/**
	 * Indicates whether the mouse is currently within the bounds of the canvas.
	 * @property mouseInBounds
	 * @type Boolean
	 * @default false
	 **/
	p.mouseInBounds = false;

	/**
	 * If true, tick callbacks will be called on all display objects on the stage prior to rendering to the canvas.
	 * @property tickOnUpdate
	 * @type Boolean
	 * @default true
	 **/
	p.tickOnUpdate = true;

	/**
	 * If true, mouse move events will continue to be called when the mouse leaves the target canvas. See
	 * {{#crossLink "Stage/mouseInBounds:property"}}{{/crossLink}}, and {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * x/y/rawX/rawY.
	 * @property mouseMoveOutside
	 * @type Boolean
	 * @default false
	 **/
	p.mouseMoveOutside = false;
	
	// TODO: confirm naming and inclusion.
	/**
	 * NOTE: this name is not final. Feedback is appreciated.
	 *
	 * The stage assigned to this property will have mouse interactions relayed to it after this stage handles them.
	 * This can be useful in cases where you have multiple canvases layered on top of one another and want your mouse
	 * events to pass through. For example, this would relay mouse events from topStage to bottomStage:
	 *
	 *      topStage.nextStage = bottomStage;
	 *
	 * Note that each stage handles the interactions independently. As such, you could have a click register on an
	 * object in the top stage, and another click register in the bottom stage. Consider using a single canvas with
	 * cached {{#crossLink "Container"}}{{/crossLink}} instances instead of multiple canvases.
	 *
	 * MouseOver, MouseOut, RollOver, and RollOut interactions will not be passed through. They must be enabled using
	 * {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}} for each stage individually.
	 * 
	 * In most instances, you will also want to disable DOM events for the next stage to avoid duplicate interactions.
	 * myNextStage.enableDOMEvents(false);
	 * 
	 * @property nextStage
	 * @type Stage
	 **/
	p.nextStage = null;

	/**
	 * The hitArea property is not supported for Stage.
	 * @property hitArea
	 * @type {DisplayObject}
	 * @default null
	 */

// private properties:

	/**
	 * Holds objects with data for each active pointer id. Each object has the following properties:
	 * x, y, event, target, overTarget, overX, overY, inBounds, posEvtObj (native event that last updated position)
	 * @property _pointerData
	 * @type {Object}
	 * @private
	 */
	p._pointerData = null;

	/**
	 * Number of active pointers.
	 * @property _pointerCount
	 * @type {Object}
	 * @private
	 */
	p._pointerCount = 0;

	/**
	 * The ID of the primary pointer.
	 * @property _primaryPointerID
	 * @type {Object}
	 * @private
	 */
	p._primaryPointerID = null;

	/**
	 * @property _mouseOverIntervalID
	 * @protected
	 * @type Number
	 **/
	p._mouseOverIntervalID = null;

// constructor:
	/**
	 * @property DisplayObject_initialize
	 * @type Function
	 * @private
	 **/
	p.Container_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @param {HTMLCanvasElement | String | Object} canvas A canvas object, or the string id of a canvas object in the current document.
	 * @protected
	 **/
	p.initialize = function(canvas) {
		this.Container_initialize();
		this.canvas = (typeof canvas == "string") ? document.getElementById(canvas) : canvas;
		this._pointerData = {};
		this.enableDOMEvents(true);
	};

// public methods:

	/**
	 * Each time the update method is called, the stage will tick all descendants (see: {{#crossLink "DisplayObject/tick"}}{{/crossLink}})
	 * and then render the display list to the canvas. Any parameters passed to `update()` will be passed on to any
	 * {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}} event handlers.
	 *
	 * Some time-based features in EaselJS (for example {{#crossLink "Sprite/framerate"}}{{/crossLink}} require that
	 * a tick event object (or equivalent) be passed as the first parameter to update(). For example:
	 *
	 *      Ticker.addEventListener("tick", handleTick);
	 * 	    function handleTick(evtObj) {
	 * 	     	// do some work here, then update the stage, passing through the event object:
	 * 	    	myStage.update(evtObj);
	 * 	    }
	 *
	 * @method update
	 * @param {*} [params]* Params to include when ticking descendants. The first param should usually be a tick event.
	 **/
	p.update = function(params) {
		if (!this.canvas) { return; }
		if (this.tickOnUpdate) {
			this.dispatchEvent("tickstart");  // TODO: make cancellable?
			this._tick((arguments.length ? arguments : null));
			this.dispatchEvent("tickend");
		}
		this.dispatchEvent("drawstart"); // TODO: make cancellable?
		Stage._snapToPixelEnabled = this.snapToPixelEnabled;
		if (this.autoClear) { this.clear(); }
		var ctx = this.canvas.getContext("2d");
		ctx.save();
		this.updateContext(ctx);
		this.draw(ctx, false);
		ctx.restore();
		this.dispatchEvent("drawend");
	};

	/**
	 * Default event handler that calls the Stage {{#crossLink "Stage/update"}}{{/crossLink}} method when a {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}}
	 * event is received. This allows you to register a Stage instance as a event listener on {{#crossLink "Ticker"}}{{/crossLink}}
	 * directly, using:
	 *
	 *      Ticker.addEventListener("tick", myStage");
	 *
	 * Note that if you subscribe to ticks using this pattern, then the tick event object will be passed through to
	 * display object tick handlers, instead of <code>delta</code> and <code>paused</code> parameters.
	 * @property handleEvent
	 * @type Function
	 **/
	p.handleEvent = function(evt) {
		if (evt.type == "tick") { this.update(evt); }
	};

	/**
	 * Clears the target canvas. Useful if {{#crossLink "Stage/autoClear:property"}}{{/crossLink}} is set to `false`.
	 * @method clear
	 **/
	p.clear = function() {
		if (!this.canvas) { return; }
		var ctx = this.canvas.getContext("2d");
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, this.canvas.width+1, this.canvas.height+1);
	};

	/**
	 * Returns a data url that contains a Base64-encoded image of the contents of the stage. The returned data url can
	 * be specified as the src value of an image element.
	 * @method toDataURL
	 * @param {String} backgroundColor The background color to be used for the generated image. The value can be any value HTML color
	 * value, including HEX colors, rgb and rgba. The default value is a transparent background.
	 * @param {String} mimeType The MIME type of the image format to be create. The default is "image/png". If an unknown MIME type
	 * is passed in, or if the browser does not support the specified MIME type, the default value will be used.
	 * @return {String} a Base64 encoded image.
	 **/
	p.toDataURL = function(backgroundColor, mimeType) {
		if(!mimeType) {
			mimeType = "image/png";
		}

		var ctx = this.canvas.getContext('2d');
		var w = this.canvas.width;
		var h = this.canvas.height;

		var data;

		if(backgroundColor) {

			//get the current ImageData for the canvas.
			data = ctx.getImageData(0, 0, w, h);

			//store the current globalCompositeOperation
			var compositeOperation = ctx.globalCompositeOperation;

			//set to draw behind current content
			ctx.globalCompositeOperation = "destination-over";

			//set background color
			ctx.fillStyle = backgroundColor;

			//draw background on entire canvas
			ctx.fillRect(0, 0, w, h);
		}

		//get the image data from the canvas
		var dataURL = this.canvas.toDataURL(mimeType);

		if(backgroundColor) {
			//clear the canvas
			ctx.clearRect (0, 0, w+1, h+1);

			//restore it with original settings
			ctx.putImageData(data, 0, 0);

			//reset the globalCompositeOperation to what it was
			ctx.globalCompositeOperation = compositeOperation;
		}

		return dataURL;
	};

	/**
	 * Enables or disables (by passing a frequency of 0) mouse over ({{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}
	 * and {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}) and roll over events ({{#crossLink "DisplayObject/rollover:event"}}{{/crossLink}}
	 * and {{#crossLink "DisplayObject/rollout:event"}}{{/crossLink}}) for this stage's display list. These events can
	 * be expensive to generate, so they are disabled by default. The frequency of the events can be controlled
	 * independently of mouse move events via the optional `frequency` parameter.
	 *
	 * <h4>Example</h4>
	 *      var stage = new createjs.Stage("canvasId");
	 *      stage.enableMouseOver(10); // 10 updates per second
	 *
	 * @method enableMouseOver
	 * @param {Number} [frequency=20] Optional param specifying the maximum number of times per second to broadcast
	 * mouse over/out events. Set to 0 to disable mouse over events completely. Maximum is 50. A lower frequency is less
	 * responsive, but uses less CPU.
	 **/
	p.enableMouseOver = function(frequency) {
		if (this._mouseOverIntervalID) {
			clearInterval(this._mouseOverIntervalID);
			this._mouseOverIntervalID = null;
			if (frequency == 0) {
				this._testMouseOver(true);
			}
		}
		if (frequency == null) { frequency = 20; }
		else if (frequency <= 0) { return; }
		var o = this;
		this._mouseOverIntervalID = setInterval(function(){ o._testMouseOver(); }, 1000/Math.min(50,frequency));
	};

	/**
	 * Enables or disables the event listeners that stage adds to DOM elements (window, document and canvas). It is good
	 * practice to disable events when disposing of a Stage instance, otherwise the stage will continue to receive
	 * events from the page.
	 *
	 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
	 * new canvas or mouse events will not work as expected. For example:
	 *
	 *      myStage.enableDOMEvents(false);
	 *      myStage.canvas = anotherCanvas;
	 *      myStage.enableDOMEvents(true);
	 *
	 * @method enableDOMEvents
	 * @param {Boolean} [enable=true] Indicates whether to enable or disable the events. Default is true.
	 **/
	p.enableDOMEvents = function(enable) {
		if (enable == null) { enable = true; }
		var n, o, ls = this._eventListeners;
		if (!enable && ls) {
			for (n in ls) {
				o = ls[n];
				o.t.removeEventListener(n, o.f, false);
			}
			this._eventListeners = null;
		} else if (enable && !ls && this.canvas) {
			var t = window.addEventListener ? window : document;
			var _this = this;
			ls = this._eventListeners = {};
			ls["mouseup"] = {t:t, f:function(e) { _this._handleMouseUp(e)} };
			ls["mousemove"] = {t:t, f:function(e) { _this._handleMouseMove(e)} };
			ls["dblclick"] = {t:t, f:function(e) { _this._handleDoubleClick(e)} };
			ls["mousedown"] = {t:this.canvas, f:function(e) { _this._handleMouseDown(e)} };

			for (n in ls) {
				o = ls[n];
				o.t.addEventListener(n, o.f, false);
			}
		}
	};

	/**
	 * Returns a clone of this Stage.
	 * @return {Stage} A clone of the current Container instance.
	 **/
	p.clone = function() {
		var o = new Stage(null);
		this.cloneProps(o);
		return o;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Stage (name="+  this.name +")]";
	};

	// private methods:

	/**
	 * @method _getElementRect
	 * @protected
	 * @param {HTMLElement} e
	 **/
	p._getElementRect = function(e) {
		var bounds;
		try { bounds = e.getBoundingClientRect(); } // this can fail on disconnected DOM elements in IE9
		catch (err) { bounds = {top: e.offsetTop, left: e.offsetLeft, width:e.offsetWidth, height:e.offsetHeight}; }

		var offX = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0);
		var offY = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop  || document.body.clientTop  || 0);

		var styles = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle; // IE <9 compatibility.
		var padL = parseInt(styles.paddingLeft)+parseInt(styles.borderLeftWidth);
		var padT = parseInt(styles.paddingTop)+parseInt(styles.borderTopWidth);
		var padR = parseInt(styles.paddingRight)+parseInt(styles.borderRightWidth);
		var padB = parseInt(styles.paddingBottom)+parseInt(styles.borderBottomWidth);

		// note: in some browsers bounds properties are read only.
		return {
			left: bounds.left+offX+padL,
			right: bounds.right+offX-padR,
			top: bounds.top+offY+padT,
			bottom: bounds.bottom+offY-padB
		}
	};

	/**
	 * @method _getPointerData
	 * @protected
	 * @param {Number} id
	 **/
	p._getPointerData = function(id) {
		var data = this._pointerData[id];
		if (!data) {
			data = this._pointerData[id] = {x:0,y:0};
			// if it's the first new touch, then make it the primary pointer id:
			if (this._primaryPointerID == null) { this._primaryPointerID = id; }
		}
		return data;
	};

	/**
	 * @method _handleMouseMove
	 * @protected
	 * @param {MouseEvent} e
	 **/
	p._handleMouseMove = function(e) {
		if(!e){ e = window.event; }
		this._handlePointerMove(-1, e, e.pageX, e.pageY);
	};

	/**
	 * @method _handlePointerMove
	 * @protected
	 * @param {Number} id
	 * @param {Event} e
	 * @param {Number} pageX
	 * @param {Number} pageY
	 **/
	p._handlePointerMove = function(id, e, pageX, pageY) {
		if (!this.canvas) { return; }
		var o = this._getPointerData(id);

		var inBounds = o.inBounds;
		this._updatePointerPosition(id, e, pageX, pageY);
		if (!inBounds && !o.inBounds && !this.mouseMoveOutside) { return; }
		if (id == -1 && o.inBounds == !inBounds) {
			this._dispatchMouseEvent(this, (inBounds ? "mouseleave" : "mouseenter"), false, id, o, e);
		}
		
		this._dispatchMouseEvent(this, "stagemousemove", false, id, o, e);
		this._dispatchMouseEvent(o.target, "pressmove", true, id, o, e);

		// TODO: deprecated:
		var oEvent = o.event;
		if (oEvent && oEvent.hasEventListener("mousemove")) {
			// this doesn't use _dispatchMouseEvent because it requires re-targeting.
			oEvent.dispatchEvent(new createjs.MouseEvent("mousemove", false, false, o.x, o.y, e, id, (id == this._primaryPointerID), o.rawX, o.rawY), oTarget);
		}

		this.nextStage&&this.nextStage._handlePointerMove(id, e, pageX, pageY);
	};

	/**
	 * @method _updatePointerPosition
	 * @protected
	 * @param {Number} id
	 * @param {Event} e
	 * @param {Number} pageX
	 * @param {Number} pageY
	 **/
	p._updatePointerPosition = function(id, e, pageX, pageY) {
		var rect = this._getElementRect(this.canvas);
		pageX -= rect.left;
		pageY -= rect.top;

		var w = this.canvas.width;
		var h = this.canvas.height;
		pageX /= (rect.right-rect.left)/w;
		pageY /= (rect.bottom-rect.top)/h;
		var o = this._getPointerData(id);
		if (o.inBounds = (pageX >= 0 && pageY >= 0 && pageX <= w-1 && pageY <= h-1)) {
			o.x = pageX;
			o.y = pageY;
		} else if (this.mouseMoveOutside) {
			o.x = pageX < 0 ? 0 : (pageX > w-1 ? w-1 : pageX);
			o.y = pageY < 0 ? 0 : (pageY > h-1 ? h-1 : pageY);
		}

		o.posEvtObj = e;
		o.rawX = pageX;
		o.rawY = pageY;

		if (id == this._primaryPointerID) {
			this.mouseX = o.x;
			this.mouseY = o.y;
			this.mouseInBounds = o.inBounds;
		}
	};

	/**
	 * @method _handleMouseUp
	 * @protected
	 * @param {MouseEvent} e
	 **/
	p._handleMouseUp = function(e) {
		this._handlePointerUp(-1, e, false);
	};

	/**
	 * @method _handlePointerUp
	 * @protected
	 * @param {Number} id
	 * @param {Event} e
	 * @param {Boolean} clear
	 **/
	p._handlePointerUp = function(id, e, clear) {
		var o = this._getPointerData(id);

		this._dispatchMouseEvent(this, "stagemouseup", false, id, o, e);

		var oTarget = o.target;
		if (oTarget) {
			if (this._getObjectsUnderPoint(o.x, o.y, null, true) == oTarget) {
				this._dispatchMouseEvent(oTarget, "click", true, id, o, e);
			}
			this._dispatchMouseEvent(oTarget, "pressup", true, id, o, e);
		}

		// TODO: deprecated:
		var oEvent = o.event;
		if (oEvent && oEvent.hasEventListener("mouseup")) {
			// this doesn't use _dispatchMouseEvent because it requires re-targeting.
			oEvent.dispatchEvent(new createjs.MouseEvent("mouseup", false, false, o.x, o.y, e, id, (id==this._primaryPointerID), o.rawX, o.rawY), oTarget);
		}

		if (clear) {
			if (id==this._primaryPointerID) { this._primaryPointerID = null; }
			delete(this._pointerData[id]);
		} else { o.event = o.target = null; }

		this.nextStage&&this.nextStage._handlePointerUp(id, e, clear);
	};

	/**
	 * @method _handleMouseDown
	 * @protected
	 * @param {MouseEvent} e
	 **/
	p._handleMouseDown = function(e) {
		this._handlePointerDown(-1, e);
	};

	/**
	 * @method _handlePointerDown
	 * @protected
	 * @param {Number} id
	 * @param {Event} e
	 * @param {Number} pageX
	 * @param {Number} pageY
	 **/
	p._handlePointerDown = function(id, e, pageX, pageY) {
		if (pageY != null) { this._updatePointerPosition(id, e, pageX, pageY); }
		var o = this._getPointerData(id);

		this._dispatchMouseEvent(this, "stagemousedown", false, id, o, e);

		o.target = this._getObjectsUnderPoint(o.x, o.y, null, true);
		this._dispatchMouseEvent(o.target, "mousedown", true, id, o, e);

		this.nextStage&&this.nextStage._handlePointerDown(id, e, pageX, pageY);
	};

	/**
	 * @method _testMouseOver
	 * @param {Boolean} clear If true, clears the mouseover / rollover (ie. no target)
	 * @protected
	 **/
	p._testMouseOver = function(clear) {
		// only update if the mouse position has changed. This provides a lot of optimization, but has some trade-offs.
		if (this._primaryPointerID != -1 || (!clear && this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) { return; }
		var o = this._getPointerData(-1);
		var e = o.posEvtObj;
		var target, common = -1, cursor="", t, i, l;
		
		if (clear || this.mouseInBounds && e && e.target == this.canvas) {
			target = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true);
			this._mouseOverX = this.mouseX;
			this._mouseOverY = this.mouseY;
		}

		var oldList = this._mouseOverTarget||[];
		var oldTarget = oldList[oldList.length-1];
		var list = this._mouseOverTarget = [];

		// generate ancestor list and check for cursor:
		t = target;
		while (t) {
			list.unshift(t);
			if (t.cursor != null) { cursor = t.cursor; }
			t = t.parent;
		}
		this.canvas.style.cursor = cursor;

		// find common ancestor:
		for (i=0,l=list.length; i<l; i++) {
			if (list[i] != oldList[i]) { break; }
			common = i;
		}

		if (oldTarget != target) {
			this._dispatchMouseEvent(oldTarget, "mouseout", true, -1, o, e);
		}

		for (i=oldList.length-1; i>common; i--) {
			this._dispatchMouseEvent(oldList[i], "rollout", false, -1, o, e);
		}

		for (i=list.length-1; i>common; i--) {
			this._dispatchMouseEvent(list[i], "rollover", false, -1, o, e);
		}

		if (oldTarget != target) {
			this._dispatchMouseEvent(target, "mouseover", true, -1, o, e);
		}

	};

	/**
	 * @method _handleDoubleClick
	 * @protected
	 * @param {MouseEvent} e
	 **/
	p._handleDoubleClick = function(e) {
		var o = this._getPointerData(-1);
		var target = this._getObjectsUnderPoint(o.x, o.y, null, true);
		this._dispatchMouseEvent(target, "dblclick", true, -1, o, e);

		this.nextStage&&this.nextStage._handleDoubleClick(e);
	};

	/**
	 * @method _dispatchMouseEvent
	 * @protected
	 * @param {DisplayObject} target
	 * @param {String} type
	 * @param {Boolean} bubbles
	 * @param {Number} pointerId
	 * @param {Object} o
	 * @param {MouseEvent} [nativeEvent]
	 **/
	p._dispatchMouseEvent = function(target, type, bubbles, pointerId, o, nativeEvent) {
		// TODO: might be worth either reusing MouseEvent instances, or adding a willTrigger method to avoid GC.
		if (!target || (!bubbles && !target.hasEventListener(type))) { return; }
		/*
		// TODO: account for stage transformations:
		this._mtx = this.getConcatenatedMatrix(this._mtx).invert();
		var pt = this._mtx.transformPoint(o.x, o.y);
		var evt = new createjs.MouseEvent(type, bubbles, false, pt.x, pt.y, nativeEvent, pointerId, pointerId==this._primaryPointerID, o.rawX, o.rawY);
		*/
		var evt = new createjs.MouseEvent(type, bubbles, false, o.x, o.y, nativeEvent, pointerId, pointerId==this._primaryPointerID, o.rawX, o.rawY);
		target.dispatchEvent(evt);
	};

createjs.Stage = Stage;
}());
/*
* Bitmap
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
* @module EaselJS
*/

// namespace:
this.createjs = this.createjs||{};

(function() {

/**
 * A Bitmap represents an Image, Canvas, or Video in the display list. A Bitmap can be instantiated using an existing
 * HTML element, or a string.
 *
 * <h4>Example</h4>
 *      var bitmap = new createjs.Bitmap("imagePath.jpg");
 *
 * <strong>Notes:</strong>
 * <ol>
 *     <li>When a string path or image tag that is not yet loaded is used, the stage may need to be redrawn before it
 *      will be displayed.</li>
 *     <li>Bitmaps with an SVG source currently will not respect an alpha value other than 0 or 1. To get around this,
 *     the Bitmap can be cached.</li>
 *     <li>Bitmaps with an SVG source will taint the canvas with cross-origin data, which prevents interactivity. This
 *     happens in all browsers except recent Firefox builds.</li>
 * </ol>
 *
 * @class Bitmap
 * @extends DisplayObject
 * @constructor
 * @param {Image | HTMLCanvasElement | HTMLVideoElement | String} imageOrUri The source object or URI to an image to
 * display. This can be either an Image, Canvas, or Video object, or a string URI to an image file to load and use.
 * If it is a URI, a new Image object will be constructed and assigned to the .image property.
 **/
var Bitmap = function(imageOrUri) {
  this.initialize(imageOrUri);
};
var p = Bitmap.prototype = new createjs.DisplayObject();

// public properties:
	/**
	 * The image to render. This can be an Image, a Canvas, or a Video.
	 * @property image
	 * @type Image | HTMLCanvasElement | HTMLVideoElement
	 **/
	p.image = null;
	
	/**
	 * Whether or not the Bitmap should be draw to the canvas at whole pixel coordinates.
	 * @property snapToPixel
	 * @type Boolean
	 * @default true
	 **/
	p.snapToPixel = true;

	/**
	 * Specifies an area of the source image to draw. If omitted, the whole image will be drawn.
	 * @property sourceRect
	 * @type Rectangle
	 * @default null
	 */
	p.sourceRect = null;
	
	// constructor:

	/**
	 * @property DisplayObject_initialize
	 * @type Function
	 * @private
	 **/
	p.DisplayObject_initialize = p.initialize;

	/** 
	 * Initialization method.
	 * @method initialize
	 * @param {Image | HTMLCanvasElement | HTMLVideoElement | String} imageOrUri The source object or URI to an image to
	 * display. This can be either an Image, Canvas, or Video object, or a string URI to an image file to load and use.
	 * If it is a URI, a new Image object will be constructed and assigned to the `.image` property.
	 * @protected
	 **/
	p.initialize = function(imageOrUri) {
		this.DisplayObject_initialize();
		if (typeof imageOrUri == "string") {
			this.image = new Image();
			this.image.src = imageOrUri;
		} else {
			this.image = imageOrUri;
		}
	};
	
// public methods:

	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		var hasContent = this.cacheCanvas || (this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2));
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
	};

	/**
	 * @property DisplayObject_draw
	 * @type Function
	 * @protected
	 **/
	p.DisplayObject_draw = p.draw;

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 **/
	p.draw = function(ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
		var rect = this.sourceRect;
		if (rect) {
			ctx.drawImage(this.image, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
		} else {
			ctx.drawImage(this.image, 0, 0);
		}
		return true;
	};
	
	//Note, the doc sections below document using the specified APIs (from DisplayObject)  from
	//Bitmap. This is why they have no method implementations.
	
	/**
	 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
	 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
	 *
	 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
	 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
	 * method.
	 * @method cache
	 **/
	
	/**
	 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
	 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
	 *
	 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
	 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
	 * method.
	 * @method updateCache
	 **/
	
	/**
	 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
	 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
	 *
	 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
	 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
	 * method.
	 * @method uncache
	 **/
	 
	/**
	 * @property DisplayObject_getBounds
	 * @type Function
	 * @protected
	 **/
	p.DisplayObject_getBounds = p.getBounds;

	/**
	 * Docced in superclass.
	 */
	p.getBounds = function() {
		var rect = this.DisplayObject_getBounds();
		if (rect) { return rect; }
		var o = this.sourceRect || this.image;
		var hasContent = (this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2));
		return hasContent ? this._rectangle.initialize(0, 0, o.width, o.height) : null;
	};
	
	/**
	 * Returns a clone of the Bitmap instance.
	 * @method clone
	 * @return {Bitmap} a clone of the Bitmap instance.
	 **/
	p.clone = function() {
		var o = new Bitmap(this.image);
		if (this.sourceRect) { o.sourceRect = this.sourceRect.clone(); }
		this.cloneProps(o);
		return o;
	};
	
	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Bitmap (name="+  this.name +")]";
	};

// private methods:

createjs.Bitmap = Bitmap;
}());/*
* Sprite
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Displays a frame or sequence of frames (ie. an animation) from a SpriteSheet instance. A sprite sheet is a series of
 * images (usually animation frames) combined into a single image. For example, an animation consisting of 8 100x100
 * images could be combined into a 400x200 sprite sheet (4 frames across by 2 high). You can display individual frames,
 * play frames as an animation, and even sequence animations together.
 *
 * See the {{#crossLink "SpriteSheet"}}{{/crossLink}} class for more information on setting up frames and animations.
 *
 * <h4>Example</h4>
 *      var instance = new createjs.Sprite(spriteSheet);
 *      instance.gotoAndStop("frameName");
 *
 * Until {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} or {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}} is called,
 * only the first defined frame defined in the sprite sheet will be displayed.
 *
 * @class Sprite
 * @extends DisplayObject
 * @constructor
 * @param {SpriteSheet} spriteSheet The SpriteSheet instance to play back. This includes the source image(s), frame
 * dimensions, and frame data. See {{#crossLink "SpriteSheet"}}{{/crossLink}} for more information.
 * @param {String|Number} frameOrAnimation The frame number or animation to play initially.
 **/
var Sprite = function(spriteSheet, frameOrAnimation) {
  this.initialize(spriteSheet, frameOrAnimation);
};
var p = Sprite.prototype = new createjs.DisplayObject();

// events:

	/**
	 * Dispatched when an animation reaches its ends.
	 * @event animationend
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {String} name The name of the animation that just ended.
	 * @param {String} next The name of the next animation that will be played, or null. This will be the same as name if the animation is looping.
	 * @since 0.6.0
	 */

// public properties:
	// TODO: deprecated.
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Sprite/animationend:event"}}{{/crossLink}}
	 * event.
	 * @property onAnimationEnd
	 * @type {Function}
	 * @deprecated Use addEventListener and the "animationend" event.
	 */

	/**
	 * The frame index that will be drawn when draw is called. Note that with some {{#crossLink "SpriteSheet"}}{{/crossLink}}
	 * definitions, this will advance non-sequentially. This will always be an integer value.
	 * @property currentFrame
	 * @type {Number}
	 * @default 0
	 * @readonly
	 **/
	p.currentFrame = 0;

	/**
	 * Returns the name of the currently playing animation.
	 * @property currentAnimation
	 * @type {String}
	 * @final
	 * @readonly
	 **/
	p.currentAnimation = null;

	/**
	 * Prevents the animation from advancing each tick automatically. For example, you could create a sprite
	 * sheet of icons, set paused to true, and display the appropriate icon by setting <code>currentFrame</code>.
	 * @property paused
	 * @type {Boolean}
	 * @default false
	 **/
	p.paused = true;

	/**
	 * The SpriteSheet instance to play back. This includes the source image, frame dimensions, and frame
	 * data. See {{#crossLink "SpriteSheet"}}{{/crossLink}} for more information.
	 * @property spriteSheet
	 * @type {SpriteSheet}
	 * @readonly
	 **/
	p.spriteSheet = null;

	/**
	 * Whether or not the image should be draw to the canvas at whole pixel coordinates.
	 * @property snapToPixel
	 * @type {Boolean}
	 * @default true
	 **/
	p.snapToPixel = true;

	/**
	 * @property offset
	 * @type {Number}
	 * @default 0
	 * @deprecated Not applicable to the new timing model in v0.7.0 and higher.
	 */
	p.offset = 0;

	/**
	 * Specifies the current frame index within the currently playing animation. When playing normally, this will increase
	 * from 0 to n-1, where n is the number of frames in the current animation.
	 *
	 * This could be a non-integer value if
	 * using time-based playback (see {{#crossLink "Sprite/framerate"}}{{/crossLink}}, or if the animation's speed is
	 * not an integer.
	 * @property currentAnimationFrame
	 * @type {Number}
	 * @default 0
	 **/
	p.currentAnimationFrame = 0;

	/**
	 * By default Sprite instances advance one frame per tick. Specifying a framerate for the Sprite (or its related
	 * SpriteSheet) will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
	 * framerate.
	 *
	 * For example, if a Sprite with a framerate of 10 is placed on a Stage being updated at 40fps, then the Sprite will
	 * advance roughly one frame every 4 ticks. This will not be exact, because the time between each tick will
	 * vary slightly between frames.
	 *
	 * This feature is dependent on the tick event object (or an object with an appropriate "delta" property) being
	 * passed into {{#crossLink "Stage/update"}}{{/crossLink}}.
	 * @property framerate
	 * @type {Number}
	 * @default 0
	 **/
	p.framerate = 0;

// private properties:
	/**
	 * @property _advanceCount
	 * @protected
	 * @type {Number}
	 * @default 0
	 **/
	p._advanceCount = 0;

	/**
	 * @property _animation
	 * @protected
	 * @type {Object}
	 * @default null
	 **/
	p._animation = null;

	/**
	 * @property _animation
	 * @protected
	 * @type {Object}
	 * @default null
	 **/
	p._currentFrame = null;

// constructor:
	/**
	 * @property DisplayObject_initialize
	 * @type {Function}
	 * @private
	 **/
	p.DisplayObject_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	*/
	p.initialize = function(spriteSheet, frameOrAnimation) {
		this.DisplayObject_initialize();
		this.spriteSheet = spriteSheet;
		if (frameOrAnimation) { this.gotoAndPlay(frameOrAnimation); }
	};

	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		var hasContent = this.cacheCanvas || this.spriteSheet.complete;
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
	};

	/**
	 * @property DisplayObject_draw
	 * @type {Function}
	 * @private
	 **/
	p.DisplayObject_draw = p.draw;

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 **/
	p.draw = function(ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
		this._normalizeFrame();
		var o = this.spriteSheet.getFrame(this._currentFrame|0);
		if (!o) { return false; }
		var rect = o.rect;
		ctx.drawImage(o.image, rect.x, rect.y, rect.width, rect.height, -o.regX, -o.regY, rect.width, rect.height);
		return true;
	};

	//Note, the doc sections below document using the specified APIs (from DisplayObject)  from
	//Bitmap. This is why they have no method implementations.

	/**
	 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
	 * You should not cache Bitmap instances as it can degrade performance.
	 * @method cache
	 **/

	/**
	 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
	 * You should not cache Bitmap instances as it can degrade performance.
	 * @method updateCache
	 **/

	/**
	 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
	 * You should not cache Bitmap instances as it can degrade performance.
	 * @method uncache
	 **/

	/**
	 * Play (unpause) the current animation. The Sprite will be paused if either {{#crossLink "Sprite/stop"}}{{/crossLink}}
	 * or {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} is called. Single frame animations will remain
	 * unchanged.
	 * @method play
	 **/
	p.play = function() {
		this.paused = false;
	};

	/**
	 * Stop playing a running animation. The Sprite will be playing if {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}}
	 * is called. Note that calling {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}} or {{#crossLink "Sprite/play"}}{{/crossLink}}
	 * will resume playback.
	 * @method stop
	 **/
	p.stop = function() {
		this.paused = true;
	};

	/**
	 * Sets paused to false and plays the specified animation name, named frame, or frame number.
	 * @method gotoAndPlay
	 * @param {String|Number} frameOrAnimation The frame number or animation name that the playhead should move to
	 * and begin playing.
	 **/
	p.gotoAndPlay = function(frameOrAnimation) {
		this.paused = false;
		this._goto(frameOrAnimation);
	};

	/**
	 * Sets paused to true and seeks to the specified animation name, named frame, or frame number.
	 * @method gotoAndStop
	 * @param {String|Number} frameOrAnimation The frame number or animation name that the playhead should move to
	 * and stop.
	 **/
	p.gotoAndStop = function(frameOrAnimation) {
		this.paused = true;
		this._goto(frameOrAnimation);
	};

	/**
	 * Advances the playhead. This occurs automatically each tick by default.
	 * @param [time] {Number} The amount of time in ms to advance by. Only applicable if framerate is set on the Sprite
	 * or its SpriteSheet.
	 * @method advance
	*/
	p.advance = function(time) {
		var speed = (this._animation&&this._animation.speed)||1;
		var fps = this.framerate || this.spriteSheet.framerate;
		var t = (fps && time != null) ? time/(1000/fps) : 1;
		if (this._animation) { this.currentAnimationFrame+=t*speed; }
		else { this._currentFrame+=t*speed; }
		this._normalizeFrame();
	};
	
	/**
	 * @property DisplayObject_getBounds
	 * @type Function
	 * @protected
	 **/
	p.DisplayObject_getBounds = p.getBounds; 
	
	/**
	 * Returns a {{#crossLink "Rectangle"}}{{/crossLink}} instance defining the bounds of the current frame relative to
	 * the origin. For example, a 90 x 70 frame with <code>regX=50</code> and <code>regY=40</code> would return a
	 * rectangle with [x=-50, y=-40, width=90, height=70]. This ignores transformations on the display object.
	 *
	 * Also see the SpriteSheet {{#crossLink "SpriteSheet/getFrameBounds"}}{{/crossLink}} method.
	 * @method getBounds
	 * @return {Rectangle} A Rectangle instance. Returns null if the frame does not exist, or the image is not fully
	 * loaded.
	 **/
	p.getBounds = function() {
		// TODO: should this normalizeFrame?
		return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle);
	};

	/**
	 * Returns a clone of the Sprite instance. Note that the same SpriteSheet is shared between cloned
	 * instances.
	 * @method clone
	 * @return {Sprite} a clone of the Sprite instance.
	 **/
	p.clone = function() {
		var o = new Sprite(this.spriteSheet);
		this.cloneProps(o);
		return o;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Sprite (name="+  this.name +")]";
	};

// private methods:
	/**
	 * @property DisplayObject__tick
	 * @type {Function}
	 * @private
	 **/
	p.DisplayObject__tick = p._tick;

	/**
	 * Advances the <code>currentFrame</code> if paused is not true. This is called automatically when the {{#crossLink "Stage"}}{{/crossLink}}
	 * ticks.
	 * @protected
	 * @method _tick
	 **/
	p._tick = function(params) {
		if (!this.paused) {
			this.advance(params&&params[0]&&params[0].delta);
		}
		this.DisplayObject__tick(params);
	};


	/**
	 * Normalizes the current frame, advancing animations and dispatching callbacks as appropriate.
	 * @protected
	 * @method _normalizeFrame
	 **/
	p._normalizeFrame = function() {
		var animation = this._animation;
		var paused = this.paused;
		var frame = this._currentFrame;
		var animFrame = this.currentAnimationFrame;
		var l;

		if (animation) {
			l = animation.frames.length;
			if ((animFrame|0) >= l) {
				var next = animation.next;
				if (this._dispatchAnimationEnd(animation, frame, paused, next, l-1)) {
					// something changed in the event stack.
				} else if (next) {
					// sequence. Automatically calls _normalizeFrame again.
					return this._goto(next, animFrame - l);
				} else {
					// end.
					this.paused = true;
					animFrame = this.currentAnimationFrame = animation.frames.length-1;
					this._currentFrame = animation.frames[animFrame];
				}
			} else {
				this._currentFrame = animation.frames[animFrame|0];
			}
		} else {
			l = this.spriteSheet.getNumFrames();
			if (frame >= l) {
				if (!this._dispatchAnimationEnd(animation, frame, paused, l-1)) {
					// looped.
					if ((this._currentFrame -= l) >= l) { return this._normalizeFrame(); }
				}
			}
		}
		this.currentFrame = this._currentFrame|0;
	};

	/**
	 * Dispatches the "animationend" event. Returns true if a handler changed the animation (ex. calling {{#crossLink "Sprite/stop"}}{{/crossLink}},
	 * {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}}, etc.)
	 * @property _dispatchAnimationEnd
	 * @private
	 * @type {Function}
	 **/
	p._dispatchAnimationEnd = function(animation, frame, paused, next, end) {
		var name = animation ? animation.name : null;
		if (this.hasEventListener("animationend")) {
			var evt = new createjs.Event("animationend");
			evt.name = name;
			evt.next = next;
			this.dispatchEvent(evt);
		}
		// TODO: is this right?
		if (!paused && this.paused) { this.currentAnimationFrame = end; }
		return (this.paused != paused || this._animation != animation || this._currentFrame != frame);
	};

	/**
	 * @property DisplayObject_cloneProps
	 * @private
	 * @type {Function}
	 **/
	p.DisplayObject_cloneProps = p.cloneProps;

	/**
	 * @method cloneProps
	 * @param {Text} o
	 * @protected
	 **/
	p.cloneProps = function(o) {
		this.DisplayObject_cloneProps(o);
		o.currentFrame = this.currentFrame;
		o._currentFrame = this._currentFrame;
		o.currentAnimation = this.currentAnimation;
		o.paused = this.paused;
		o._animation = this._animation;
		o.currentAnimationFrame = this.currentAnimationFrame;
		o.framerate = this.framerate;
	};

	/**
	 * Moves the playhead to the specified frame number or animation.
	 * @method _goto
	 * @param {String|Number} frameOrAnimation The frame number or animation that the playhead should move to.
	 * @param {Boolean} [frame] The frame of the animation to go to. Defaults to 0.
	 * @protected
	 **/
	p._goto = function(frameOrAnimation, frame) {
		if (isNaN(frameOrAnimation)) {
			var data = this.spriteSheet.getAnimation(frameOrAnimation);
			if (data) {
				this.currentAnimationFrame = frame||0;
				this._animation = data;
				this.currentAnimation = frameOrAnimation;
				this._normalizeFrame();
			}
		} else {
			this.currentAnimationFrame = 0;
			this.currentAnimation = this._animation = null;
			this._currentFrame = frameOrAnimation;
			this._normalizeFrame();
		}
	};

createjs.Sprite = Sprite;
}());
/*
* BitmapAnimation
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
/**
 * Deprecated in favour of {{#crossLink "Sprite"}}{{/crossLink}}.
 *
 * @class BitmapAnimation
 * @extends DisplayObject
 * @constructor
 * @param {SpriteSheet} spriteSheet The SpriteSheet instance to play back. This includes the source image(s), frame
 * dimensions, and frame data. See {{#crossLink "SpriteSheet"}}{{/crossLink}} for more information.
 * @deprecated Renamed to Sprite. Will be removed in a future version.
 **/

var e = "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
if (!createjs.Sprite) { throw(e); }
(createjs.BitmapAnimation = function(spriteSheet) {
  console.log(e);
  this.initialize(spriteSheet);
}).prototype = new createjs.Sprite();
})();
/*
* Shape
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * A Shape allows you to display vector art in the display list. It composites a {{#crossLink "Graphics"}}{{/crossLink}}
 * instance which exposes all of the vector drawing methods. The Graphics instance can be shared between multiple Shape
 * instances to display the same vector graphics with different positions or transforms.
 *
 * If the vector art will not
 * change between draws, you may want to use the {{#crossLink "DisplayObject/cache"}}{{/crossLink}} method to reduce the
 * rendering cost.
 *
 * <h4>Example</h4>
 *      var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
 *      var shape = new createjs.Shape(graphics);
 *
 *      //Alternatively use can also use the graphics property of the Shape class to renderer the same as above.
 *      var shape = new createjs.Shape();
 *      shape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
 *
 * @class Shape
 * @extends DisplayObject
 * @constructor
 * @param {Graphics} graphics Optional. The graphics instance to display. If null, a new Graphics instance will be created.
 **/
var Shape = function(graphics) {
  this.initialize(graphics);
}
var p = Shape.prototype = new createjs.DisplayObject();

// public properties:
	/**
	 * The graphics instance to display.
	 * @property graphics
	 * @type Graphics
	 **/
	p.graphics = null;

// constructor:
	/**
	 * @property DisplayObject_initialize
	 * @private
	 * @type Function
	 **/
	p.DisplayObject_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @param {Graphics} graphics
	 * @protected
	 **/
	p.initialize = function(graphics) {
		this.DisplayObject_initialize();
		this.graphics = graphics ? graphics : new createjs.Graphics();
	}

	/**
	 * Returns true or false indicating whether the Shape would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the Shape would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		var hasContent = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
	};

	/**
	 * @property DisplayObject_draw
	 * @private
	 * @type Function
	 **/
	p.DisplayObject_draw = p.draw;

	/**
	 * Draws the Shape into the specified context ignoring its visible, alpha, shadow, and transform. Returns true if
	 * the draw was handled (useful for overriding functionality).
	 *
	 * <i>NOTE: This method is mainly for internal use, though it may be useful for advanced uses.</i>
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache. For example,
	 * used for drawing the cache (to prevent it from simply drawing an existing cache back into itself).
	 **/
	p.draw = function(ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
		this.graphics.draw(ctx);
		return true;
	}

	/**
	 * Returns a clone of this Shape. Some properties that are specific to this instance's current context are reverted to
	 * their defaults (for example .parent).
	 * @method clone
	 * @param {Boolean} recursive If true, this Shape's {{#crossLink "Graphics"}}{{/crossLink}} instance will also be
	 * cloned. If false, the Graphics instance will be shared with the new Shape.
	 **/
	p.clone = function(recursive) {
		var o = new Shape((recursive && this.graphics) ? this.graphics.clone() : this.graphics);
		this.cloneProps(o);
		return o;
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Shape (name="+  this.name +")]";
	}

createjs.Shape = Shape;
}());
/*
* Text
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Display one or more lines of dynamic text (not user editable) in the display list. Line wrapping support (using the
 * lineWidth) is very basic, wrapping on spaces and tabs only. Note that as an alternative to Text, you can position HTML
 * text above or below the canvas relative to items in the display list using the {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}}
 * method, or using {{#crossLink "DOMElement"}}{{/crossLink}}.
 *
 * <b>Please note that Text does not support HTML text, and can only display one font style at a time.</b> To use
 * multiple font styles, you will need to create multiple text instances, and position them manually.
 *
 * <h4>Example</h4>
 *      var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
 *      text.x = 100;
 *      text.textBaseline = "alphabetic";
 *
 * CreateJS Text supports web fonts (the same rules as Canvas). The font must be loaded and supported by the browser
 * before it can be displayed.
 *
 * <strong>Note:</strong> Text can be expensive to generate, so cache instances where possible. Be aware that not all
 * browsers will render Text exactly the same.
 * @class Text
 * @extends DisplayObject
 * @constructor
 * @param {String} [text] The text to display.
 * @param {String} [font] The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold
 * 36px Arial").
 * @param {String} [color] The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex.
 * "#F00", "red", or "#FF0000").
 **/
var Text = function(text, font, color) {
  this.initialize(text, font, color);
};
var p = Text.prototype = new createjs.DisplayObject();

	/**
	 * @property _workingContext
	 * @type CanvasRenderingContext2D
	 * @private
	 **/
	var canvas = (createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));
	if (canvas.getContext) { Text._workingContext = canvas.getContext("2d"); canvas.width = canvas.height = 1; }
	
// static properties:
	/**
	 * Lookup table for the ratio to offset bounds x calculations based on the textAlign property.
	 * @property H_OFFSETS
	 * @type Object
	 * @protected
	 * @static
	 **/
	Text.H_OFFSETS = {start: 0, left: 0, center: -0.5, end: -1, right: -1};
	
	/**
	 * Lookup table for the ratio to offset bounds y calculations based on the textBaseline property.
	 * @property H_OFFSETS
	 * @type Object
	 * @protected
	 * @static
	 **/
	Text.V_OFFSETS = {top: 0, hanging: -0.01, middle: -0.4, alphabetic: -0.8, ideographic: -0.85, bottom: -1};

// public properties:
	/**
	 * The text to display.
	 * @property text
	 * @type String
	 **/
	p.text = "";

	/**
	 * The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold 36px Arial").
	 * @property font
	 * @type String
	 **/
	p.font = null;

	/**
	 * The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex. "#F00"). Default is "#000".
	 * It will also accept valid canvas fillStyle values.
	 * @property color
	 * @type String
	 **/
	p.color = null;

	/**
	 * The horizontal text alignment. Any of "start", "end", "left", "right", and "center". For detailed
	 * information view the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
	 * whatwg spec</a>. Default is "left".
	 * @property textAlign
	 * @type String
	 **/
	p.textAlign = "left";

	/**
	 * The vertical alignment point on the font. Any of "top", "hanging", "middle", "alphabetic", "ideographic", or
	 * "bottom". For detailed information view the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
	 * whatwg spec</a>. Default is "top".
	 * @property textBaseline
	 * @type String
	*/
	p.textBaseline = "top";

	/**
	 * The maximum width to draw the text. If maxWidth is specified (not null), the text will be condensed or
	 * shrunk to make it fit in this width. For detailed information view the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
	 * whatwg spec</a>.
	 * @property maxWidth
	 * @type Number
	*/
	p.maxWidth = null;

	/**
	 * If greater than 0, the text will be drawn as a stroke (outline) of the specified width.
	 * @property outline
	 * @type Number
	 **/
	p.outline = 0;

	/**
	 * Indicates the line height (vertical distance between baselines) for multi-line text. If null or 0,
	 * the value of getMeasuredLineHeight is used.
	 * @property lineHeight
	 * @type Number
	 **/
	p.lineHeight = 0;

	/**
	 * Indicates the maximum width for a line of text before it is wrapped to multiple lines. If null,
	 * the text will not be wrapped.
	 * @property lineWidth
	 * @type Number
	 **/
	p.lineWidth = null;

// private properties:

// constructor:
	/**
	 * @property DisplayObject_initialize
	 * @private
	 * @type Function
	 **/
	p.DisplayObject_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @param {String} [text] The text to display.
	 * @param {String} [font] The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold
	 * 36px Arial").
	 * @param {String} [color] The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex.
	 * "#F00", "red", or "#FF0000").
	 * @protected
	*/
	p.initialize = function(text, font, color) {
		this.DisplayObject_initialize();
		this.text = text;
		this.font = font;
		this.color = color;
	};

	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		var hasContent = this.cacheCanvas || (this.text != null && this.text !== "");
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
	};

	/**
	 * @property DisplayObject_draw
	 * @private
	 * @type Function
	 **/
	p.DisplayObject_draw = p.draw;

	/**
	 * Draws the Text into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 **/
	p.draw = function(ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

		var col = this.color || "#000";
		if (this.outline) { ctx.strokeStyle = col; ctx.lineWidth = this.outline*1; }
		else { ctx.fillStyle = col; }
		
		this._drawText(this._prepContext(ctx));
		return true;
	};

	/**
	 * Returns the measured, untransformed width of the text without wrapping. Use getBounds for a more robust value.
	 * @method getMeasuredWidth
	 * @return {Number} The measured, untransformed width of the text.
	 **/
	p.getMeasuredWidth = function() {
		return this._prepContext(Text._workingContext).measureText(this.text).width;
	};

	/**
	 * Returns an approximate line height of the text, ignoring the lineHeight property. This is based on the measured
	 * width of a "M" character multiplied by 1.2, which provides an approximate line height for most fonts.
	 * @method getMeasuredLineHeight
	 * @return {Number} an approximate line height of the text, ignoring the lineHeight property. This is
	 * based on the measured width of a "M" character multiplied by 1.2, which approximates em for most fonts.
	 **/
	p.getMeasuredLineHeight = function() {
		return this._prepContext(Text._workingContext).measureText("M").width*1.2;
	};

	/**
	 * Returns the approximate height of multi-line text by multiplying the number of lines against either the
	 * <code>lineHeight</code> (if specified) or {{#crossLink "Text/getMeasuredLineHeight"}}{{/crossLink}}. Note that
	 * this operation requires the text flowing logic to run, which has an associated CPU cost.
	 * @method getMeasuredHeight
	 * @return {Number} The approximate height of the untransformed multi-line text.
	 **/
	p.getMeasuredHeight = function() {
		return this._drawText(null,{}).height;
	};
	
	/**
	 * @property DisplayObject_getBounds
	 * @type Function
	 * @protected
	 **/
	p.DisplayObject_getBounds = p.getBounds;

	/**
	 * Docced in superclass.
	 */
	p.getBounds = function() {
		var rect = this.DisplayObject_getBounds();
		if (rect) { return rect; }
		if (this.text == null || this.text == "") { return null; }
		var o = this._drawText(null, {});
		var w = (this.maxWidth && this.maxWidth < o.width) ? this.maxWidth : o.width;
		var x = w * Text.H_OFFSETS[this.textAlign||"left"];
		var lineHeight = this.lineHeight||this.getMeasuredLineHeight();
		var y = lineHeight * Text.V_OFFSETS[this.textBaseline||"top"];
		return this._rectangle.initialize(x, y, w, o.height);
	};

	/**
	 * Returns a clone of the Text instance.
	 * @method clone
	 * @return {Text} a clone of the Text instance.
	 **/
	p.clone = function() {
		var o = new Text(this.text, this.font, this.color);
		this.cloneProps(o);
		return o;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Text (text="+  (this.text.length > 20 ? this.text.substr(0, 17)+"..." : this.text) +")]";
	};

// private methods:

	/**
	 * @property DisplayObject_cloneProps
	 * @private
	 * @type Function
	 **/
	p.DisplayObject_cloneProps = p.cloneProps;

	/**
	 * @method cloneProps
	 * @param {Text} o
	 * @protected
	 **/
	p.cloneProps = function(o) {
		this.DisplayObject_cloneProps(o);
		o.textAlign = this.textAlign;
		o.textBaseline = this.textBaseline;
		o.maxWidth = this.maxWidth;
		o.outline = this.outline;
		o.lineHeight = this.lineHeight;
		o.lineWidth = this.lineWidth;
	};

	/**
	 * @method _getWorkingContext
	 * @param {CanvasRenderingContext2D} ctx
	 * @return {CanvasRenderingContext2D}
	 * @protected
	 **/
	p._prepContext = function(ctx) {
		ctx.font = this.font;
		ctx.textAlign = this.textAlign||"left";
		ctx.textBaseline = this.textBaseline||"top";
		return ctx;
	};

	/**
	 * Draws multiline text.
	 * @method _drawText
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} o
	 * @return {Object}
	 * @protected
	 **/
	p._drawText = function(ctx, o) {
		var paint = !!ctx;
		if (!paint) { ctx = this._prepContext(Text._workingContext); }
		var lineHeight = this.lineHeight||this.getMeasuredLineHeight();
		
		var maxW = 0, count = 0;
		var lines = String(this.text).split(/(?:\r\n|\r|\n)/);
		for (var i=0, l=lines.length; i<l; i++) {
			var str = lines[i];
			var w = null;
			
			if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {
				// text wrapping:
				var words = str.split(/(\s)/);
				str = words[0];
				w = ctx.measureText(str).width;
				
				for (var j=1, jl=words.length; j<jl; j+=2) {
					// Line needs to wrap:
					var wordW = ctx.measureText(words[j] + words[j+1]).width;
					if (w + wordW > this.lineWidth) {
						if (paint) { this._drawTextLine(ctx, str, count*lineHeight); }
						if (w > maxW) { maxW = w; }
						str = words[j+1];
						w = ctx.measureText(str).width;
						count++;
					} else {
						str += words[j] + words[j+1];
						w += wordW;
					}
				}
			}
			
			if (paint) { this._drawTextLine(ctx, str, count*lineHeight); }
			if (o && w == null) { w = ctx.measureText(str).width; }
			if (w > maxW) { maxW = w; }
			count++;
		}
		
		if (o) {
			o.count = count;
			o.width = maxW;
			o.height = count*lineHeight;
		}
		return o;
	};

	/**
	 * @method _drawTextLine
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {String} text
	 * @param {Number} y
	 * @protected
	 **/
	p._drawTextLine = function(ctx, text, y) {
		// Chrome 17 will fail to draw the text if the last param is included but null, so we feed it a large value instead:
			if (this.outline) { ctx.strokeText(text, 0, y, this.maxWidth||0xFFFF); }
			else { ctx.fillText(text, 0, y, this.maxWidth||0xFFFF); }

	};

createjs.Text = Text;
}());
/*
* BitmapText
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

this.createjs = this.createjs || {};

(function () {
	"use strict";

/**
 * Displays text using bitmap glyphs defined in a sprite sheet. Multi-line text is supported
 * using new line characters, but automatic wrapping is not supported. See the 
 * {{#crossLink "BitmapText/spriteSheet:attribute"}}{{/crossLink}}
 * property for more information on defining glyphs.
 * @class BitmapText
 * @extends DisplayObject
 * @param {String} [text=""] The text to display.
 * @param {SpriteSheet} [spriteSheet=null] The spritesheet that defines the character glyphs.
 * @constructor
 **/
function BitmapText(text, spriteSheet) {
	this.initialize(text, spriteSheet);
}
var p = BitmapText.prototype = new createjs.DisplayObject();

// static properties:

// events:

// public properties:
	/**
	 * The text to display.
	 * @property text
	 * @type String
	 * @default ""
	 **/
	p.text = "";
	
	/**
	 * A SpriteSheet instance that defines the glyphs for this bitmap text. Each glyph/character
	 * should have a single frame animation defined in the sprite sheet named the same as
	 * corresponding character. For example, the following animation definition:
	 *
	 * 		"A": {frames: [0]}
	 *
	 * would indicate that the frame at index 0 of the spritesheet should be drawn for the "A" character. The short form
	 * is also acceptable:
	 * 
	 * 		"A": 0
	 *
	 * Note that if a character in the text is not found in the sprite sheet, it will also
	 * try to use the alternate case (upper or lower).
	 *
	 * See SpriteSheet for more information on defining sprite sheet data.
	 * @property spriteSheet
	 * @type String
	 * @default null
	 **/
	p.spriteSheet = null;

	/**
	 * The height of each line of text. If 0, then it will use a line height calculated
	 * by checking for the height of the "1", "T", or "L" character (in that order). If
	 * those characters are not defined, it will use the height of the first frame of the
	 * sprite sheet.
	 * @property lineHeight
	 * @type Number
	 * @default 0
	 **/
	p.lineHeight = 0;

	/**
	 * This spacing (in pixels) will be added after each character in the output.
	 * @property letterSpacing
	 * @type Number
	 * @default 0
	 **/
	p.letterSpacing = 0;

	/**
	 * If a space character is not defined in the sprite sheet, then empty pixels equal to
	 * spaceWidth will be inserted instead. If  0, then it will use a value calculated
	 * by checking for the width of the "1", "E", or "A" character (in that order). If
	 * those characters are not defined, it will use the width of the first frame of the
	 * sprite sheet.
	 * @property spaceWidth
	 * @type Number
	 * @default 0
	 **/
	p.spaceWidth = 0;
	
// private properties:
	
// constructor:
	/**
	 * @property DisplayObject_initialize
	 * @type Function
	 * @protected
	 **/
	p.DisplayObject_initialize = p.initialize;
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @param {String} [text=""] The text to display.
	 * @param {SpriteSheet} [spriteSheet=null] The spritesheet that defines the character glyphs.
	 * @protected
	 **/
	p.initialize = function (text, spriteSheet) {
		this.DisplayObject_initialize();

		this.text = text;
		this.spriteSheet = spriteSheet;
	};
	
// public methods:
	/**
	 * @property DisplayObject_draw
	 * @type Function
	 * @protected
	 **/
	p.DisplayObject_draw = p.draw;
	
	/**
	 * Draws the display object into the specified context ignoring it's visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 **/
	p.draw = function(ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
		this._drawText(ctx);
	};
	
	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		var hasContent = this.cacheCanvas || (this.spriteSheet && this.spriteSheet.complete && this.text);
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
	};
	
	/**
	 * Docced in superclass.
	 */
	p.getBounds = function() {
		var bounds = this._rectangle;
		this._drawText(null, bounds);
		return bounds.width ? bounds : null;
	};

// private methods:
	/**
	 * @method _getFrame
	 * @param {String} character
	 * @param {SpriteSheet} spriteSheet
	 * @protected
	 **/
	p._getFrame = function(character, spriteSheet) {
		var c, o = spriteSheet.getAnimation(character);
		if (!o) {
			(character != (c = character.toUpperCase())) || (character != (c = character.toLowerCase())) || (c=null);
			if (c) { o = spriteSheet.getAnimation(c); }
		}
		return o && spriteSheet.getFrame(o.frames[0]);
	};
	
	/**
	 * @method _getLineHeight
	 * @param {SpriteSheet} ss
	 * @protected
	 **/
	p._getLineHeight = function(ss) {
		var frame = this._getFrame("1",ss) || this._getFrame("T",ss) || this._getFrame("L",ss) || ss.getFrame(0);
		return frame ? frame.rect.height : 1;
	};
	
	/**
	 * @method _getSpaceWidth
	 * @param {SpriteSheet} ss
	 * @protected
	 **/
	p._getSpaceWidth = function(ss) {
		var frame = this._getFrame("1",ss) || this._getFrame("l",ss) || this._getFrame("e",ss) || this._getFrame("a",ss) || ss.getFrame(0);
		return frame ? frame.rect.width : 1;
	};
	
	/**
	 * @method _drawText
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object | Rectangle} bounds
	 * @protected
	 **/
	p._drawText = function(ctx, bounds) {
		var w, h, rx, x=0, y=0, spaceW=this.spaceWidth, lineH=this.lineHeight, ss=this.spriteSheet;
				
		var hasSpace = !!this._getFrame(" ", ss);
		if (!hasSpace && spaceW==0) { spaceW = this._getSpaceWidth(ss); }
		if (lineH==0) { lineH = this._getLineHeight(ss); }
		
		var maxX = 0;
		for(var i=0, l=this.text.length; i<l; i++) {
			var character = this.text.charAt(i);
			if (!hasSpace && character == " ") {
				x += spaceW;
				continue;
			} else if (character=="\n" || character=="\r") {
				if (character=="\r" && this.text.charAt(i+1) == "\n") { i++; } // crlf
				if (x-rx > maxX) { maxX = x-rx; }
				x = 0;
				y += lineH;
				continue;
			}

			var o = this._getFrame(character, ss);
			if (!o) { continue; }
			var rect = o.rect;
			rx = o.regX;
			w = rect.width;
			ctx&&ctx.drawImage(o.image, rect.x, rect.y, w, h=rect.height, x-rx, y-o.regY, w, h);
			
			x += w + this.letterSpacing;
		}
		if (x-rx > maxX) { maxX = x-rx; }
		
		if (bounds) {
			bounds.width = maxX-this.letterSpacing;
			bounds.height = y+lineH;
		}
	};

	createjs.BitmapText = BitmapText;
}());/*
* SpriteSheetUtils
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
// constructor:
/**
 * The SpriteSheetUtils class is a collection of static methods for working with {{#crossLink "SpriteSheet"}}{{/crossLink}}s.
 * A sprite sheet is a series of images (usually animation frames) combined into a single image on a regular grid. For
 * example, an animation consisting of 8 100x100 images could be combined into a 400x200 sprite sheet (4 frames across
 * by 2 high). The SpriteSheetUtils class uses a static interface and should not be instantiated.
 * @class SpriteSheetUtils
 * @static
 **/
var SpriteSheetUtils = function() {
	throw "SpriteSheetUtils cannot be instantiated";
};

	/**
	 * @property _workingCanvas
	 * @static
	 * @type HTMLCanvasElement | Object
	 * @protected
	*/
	
	/**
	 * @property _workingContext
	 * @static
	 * @type CanvasRenderingContext2D
	 * @protected
	*/
	var canvas = (createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));
	if (canvas.getContext) {
		SpriteSheetUtils._workingCanvas = canvas;
		SpriteSheetUtils._workingContext = canvas.getContext("2d");
		canvas.width = canvas.height = 1;
	}

	

// public static methods:
	/**
	 * <b>This is an experimental method, and may be buggy. Please report issues.</b><br/><br/>
	 * Extends the existing sprite sheet by flipping the original frames horizontally, vertically, or both,
	 * and adding appropriate animation & frame data. The flipped animations will have a suffix added to their names
	 * (_h, _v, _hv as appropriate). Make sure the sprite sheet images are fully loaded before using this method.
	 * <br/><br/>
	 * For example:<br/>
	 * SpriteSheetUtils.addFlippedFrames(mySpriteSheet, true, true);
	 * The above would add frames that are flipped horizontally AND frames that are flipped vertically.
	 * <br/><br/>
	 * Note that you can also flip any display object by setting its scaleX or scaleY to a negative value. On some
	 * browsers (especially those without hardware accelerated canvas) this can result in slightly degraded performance,
	 * which is why addFlippedFrames is available.
	 * @method addFlippedFrames
	 * @static
	 * @param {SpriteSheet} spriteSheet
	 * @param {Boolean} horizontal If true, horizontally flipped frames will be added.
	 * @param {Boolean} vertical If true, vertically flipped frames will be added.
	 * @param {Boolean} both If true, frames that are flipped both horizontally and vertically will be added.
	 * @deprecated Modern browsers perform better when flipping via a transform (ex. scaleX=-1) rendering this obsolete.
	 **/
	SpriteSheetUtils.addFlippedFrames = function(spriteSheet, horizontal, vertical, both) {
		if (!horizontal && !vertical && !both) { return; }

		var count = 0;
		if (horizontal) { SpriteSheetUtils._flip(spriteSheet,++count,true,false); }
		if (vertical) { SpriteSheetUtils._flip(spriteSheet,++count,false,true); }
		if (both) { SpriteSheetUtils._flip(spriteSheet,++count,true,true); }
	};

	/**
	 * Returns a single frame of the specified sprite sheet as a new PNG image. An example of when this may be useful is
	 * to use a spritesheet frame as the source for a bitmap fill.
	 *
	 * <strong>WARNING:</strong> In almost all cases it is better to display a single frame using a {{#crossLink "Sprite"}}{{/crossLink}}
	 * with a {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} call than it is to slice out a frame using this
	 * method and display it with a Bitmap instance. You can also crop an image using the {{#crossLink "Bitmap/sourceRect"}}{{/crossLink}}
	 * property of {{#crossLink "Bitmap"}}{{/crossLink}}.
	 *
	 * The extractFrame method may cause cross-domain warnings since it accesses pixels directly on the canvas.
	 * @method extractFrame
	 * @static
	 * @param {Image} spriteSheet The SpriteSheet instance to extract a frame from.
	 * @param {Number|String} frameOrAnimation The frame number or animation name to extract. If an animation
	 * name is specified, only the first frame of the animation will be extracted.
	 * @return {Image} a single frame of the specified sprite sheet as a new PNG image.
	*/
	SpriteSheetUtils.extractFrame = function(spriteSheet, frameOrAnimation) {
		if (isNaN(frameOrAnimation)) {
			frameOrAnimation = spriteSheet.getAnimation(frameOrAnimation).frames[0];
		}
		var data = spriteSheet.getFrame(frameOrAnimation);
		if (!data) { return null; }
		var r = data.rect;
		var canvas = SpriteSheetUtils._workingCanvas;
		canvas.width = r.width;
		canvas.height = r.height;
		SpriteSheetUtils._workingContext.drawImage(data.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
		var img = new Image();
		img.src = canvas.toDataURL("image/png");
		return img;
	};

	/**
	 * Merges the rgb channels of one image with the alpha channel of another. This can be used to combine a compressed
	 * JPEG image containing color data with a PNG32 monochromatic image containing alpha data. With certain types of
	 * images (those with detail that lend itself to JPEG compression) this can provide significant file size savings
	 * versus a single RGBA PNG32. This method is very fast (generally on the order of 1-2 ms to run).
	 * @method mergeAlpha
	 * @static
	 * @param {Image} rbgImage The image (or canvas) containing the RGB channels to use.
	 * @param {Image} alphaImage The image (or canvas) containing the alpha channel to use.
	 * @param {Canvas} canvas Optional. If specified, this canvas will be used and returned. If not, a new canvas will be created.
	 * @return {Canvas} A canvas with the combined image data. This can be used as a source for Bitmap or SpriteSheet.
	 * @deprecated Tools such as ImageAlpha generally provide better results. This will be moved to sandbox in the future.
	*/
	SpriteSheetUtils.mergeAlpha = function(rgbImage, alphaImage, canvas) {
		if (!canvas) { canvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"); }
		canvas.width = Math.max(alphaImage.width, rgbImage.width);
		canvas.height = Math.max(alphaImage.height, rgbImage.height);
		var ctx = canvas.getContext("2d");
		ctx.save();
		ctx.drawImage(rgbImage,0,0);
		ctx.globalCompositeOperation = "destination-in";
		ctx.drawImage(alphaImage,0,0);
		ctx.restore();
		return canvas;
	};


// private static methods:
	SpriteSheetUtils._flip = function(spriteSheet, count, h, v) {
		var imgs = spriteSheet._images;
		var canvas = SpriteSheetUtils._workingCanvas;
		var ctx = SpriteSheetUtils._workingContext;
		var il = imgs.length/count;
		for (var i=0;i<il;i++) {
			var src = imgs[i];
			src.__tmp = i; // a bit hacky, but faster than doing indexOf below.
			ctx.setTransform(1,0,0,1,0,0);
			ctx.clearRect(0,0,canvas.width+1,canvas.height+1);
			canvas.width = src.width;
			canvas.height = src.height;
			ctx.setTransform(h?-1:1, 0, 0, v?-1:1, h?src.width:0, v?src.height:0);
			ctx.drawImage(src,0,0);
			var img = new Image();
			img.src = canvas.toDataURL("image/png");
			// work around a strange bug in Safari:
			img.width = src.width;
			img.height = src.height;
			imgs.push(img);
		}

		var frames = spriteSheet._frames;
		var fl = frames.length/count;
		for (i=0;i<fl;i++) {
			src = frames[i];
			var rect = src.rect.clone();
			img = imgs[src.image.__tmp+il*count];

			var frame = {image:img,rect:rect,regX:src.regX,regY:src.regY};
			if (h) {
				rect.x = img.width-rect.x-rect.width; // update rect
				frame.regX = rect.width-src.regX; // update registration point
			}
			if (v) {
				rect.y = img.height-rect.y-rect.height;  // update rect
				frame.regY = rect.height-src.regY; // update registration point
			}
			frames.push(frame);
		}

		var sfx = "_"+(h?"h":"")+(v?"v":"");
		var names = spriteSheet._animations;
		var data = spriteSheet._data;
		var al = names.length/count;
		for (i=0;i<al;i++) {
			var name = names[i];
			src = data[name];
			var anim = {name:name+sfx,frequency:src.frequency,next:src.next,frames:[]};
			if (src.next) { anim.next += sfx; }
			frames = src.frames;
			for (var j=0,l=frames.length;j<l;j++) {
				anim.frames.push(frames[j]+fl*count);
			}
			data[anim.name] = anim;
			names.push(anim.name);
		}
	};


createjs.SpriteSheetUtils = SpriteSheetUtils;
}());
/*
* SpriteSheetBuilder
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * The SpriteSheetBuilder allows you to generate sprite sheets at run time from any display object. This can allow
 * you to maintain your assets as vector graphics (for low file size), and render them at run time as sprite sheets
 * for better performance.
 *
 * Sprite sheets can be built either synchronously, or asynchronously, so that large sprite sheets can be generated
 * without locking the UI.
 *
 * Note that the "images" used in the generated sprite sheet are actually canvas elements, and that they will be sized
 * to the nearest power of 2 up to the value of <code>maxWidth</code> or <code>maxHeight</code>.
 * @class SpriteSheetBuilder
 * @extends EventDispatcher
 * @constructor
 **/
var SpriteSheetBuilder = function() {
  this.initialize();
};
var p = SpriteSheetBuilder.prototype = new createjs.EventDispatcher;

// constants:
	SpriteSheetBuilder.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
	SpriteSheetBuilder.ERR_RUNNING = "a build is already running";

// events:

	/**
	 * Dispatched when a build completes.
	 * @event complete
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.6.0
	 */

	/**
	 * Dispatched when an asynchronous build has progress.
	 * @event complete
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Number} progress The current progress value (0-1).
	 * @since 0.6.0
	 */

// public properties:

	/**
	 * The maximum width for the images (not individual frames) in the generated sprite sheet. It is recommended to use
	 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
	 * additional images will be created as needed.
	 * @property maxWidth
	 * @type Number
	 * @default 2048
	*/
	p.maxWidth = 2048;

	/**
	 * The maximum height for the images (not individual frames) in the generated sprite sheet. It is recommended to use
	 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
	 * additional images will be created as needed.
	 * @property maxHeight
	 * @type Number
	 * @default 2048
	 **/
	p.maxHeight = 2048;

	/**
	 * The sprite sheet that was generated. This will be null before a build is completed successfully.
	 * @property spriteSheet
	 * @type SpriteSheet
	 **/
	p.spriteSheet = null;

	/**
	 * The scale to apply when drawing all frames to the sprite sheet. This is multiplied against any scale specified
	 * in the addFrame call. This can be used, for example, to generate a sprite sheet at run time that is tailored to
	 * the a specific device resolution (ex. tablet vs mobile).
	 * @property scale
	 * @type Number
	 * @default 1
	 **/
	p.scale = 1;

	/**
	* The padding to use between frames. This is helpful to preserve antialiasing on drawn vector content.
	* @property padding
	* @type Number
	* @default 1
	**/
	p.padding = 1;

	/**
	 * A number from 0.01 to 0.99 that indicates what percentage of time the builder can use. This can be
	 * thought of as the number of seconds per second the builder will use. For example, with a timeSlice value of 0.3,
	 * the builder will run 20 times per second, using approximately 15ms per build (30% of available time, or 0.3s per second).
	 * Defaults to 0.3.
	 * @property timeSlice
	 * @type Number
	 * @default 0.3
	 **/
	p.timeSlice = 0.3;

	/**
	 * A value between 0 and 1 that indicates the progress of a build, or -1 if a build has not
	 * been initiated.
	 * @property progress
	 * @type Number
	 * @default -1
	 * @readonly
	 **/
	p.progress = -1;

	// TODO: deprecated.
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SpriteSheetBuilder/complete:event"}}{{/crossLink}}
	 * event.
	 * @property onComplete
	 * @type Function
	 * @deprecated Use addEventListener and the "complete" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SpriteSheetBuilder/progress:event"}}{{/crossLink}}
	 * event.
	 * @property onProgress
	 * @type Function
	 * @deprecated Use addEventListener and the "progress" event.
	 */

// private properties:

	/**
	 * @property _frames
	 * @protected
	 * @type Array
	 **/
	p._frames = null;

	/**
	 * @property _animations
	 * @protected
	 * @type Array
	 **/
	p._animations = null;

	/**
	 * @property _data
	 * @protected
	 * @type Array
	 **/
	p._data = null;

	/**
	 * @property _nextFrameIndex
	 * @protected
	 * @type Number
	 **/
	p._nextFrameIndex = 0;

	/**
	 * @property _index
	 * @protected
	 * @type Number
	 **/
	p._index = 0;

	/**
	 * @property _timerID
	 * @protected
	 * @type Number
	 **/
	p._timerID = null;

	/**
	 * @property _scale
	 * @protected
	 * @type Number
	 **/
	p._scale = 1;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {
		this._frames = [];
		this._animations = {};
	};

// public methods:

	/**
	 * Adds a frame to the {{#crossLink "SpriteSheet"}}{{/crossLink}}. Note that the frame will not be drawn until you
	 * call {{#crossLink "SpriteSheetBuilder/build"}}{{/crossLink}} method. The optional setup params allow you to have
	 * a function run immediately before the draw occurs. For example, this allows you to add a single source multiple
	 * times, but manipulate it or its children to change it to generate different frames.
	 *
	 * Note that the source's transformations (x, y, scale, rotate, alpha) will be ignored, except for regX/Y. To apply
	 * transforms to a source object and have them captured in the sprite sheet, simply place it into a {{#crossLink "Container"}}{{/crossLink}}
	 * and pass in the Container as the source.
	 * @method addFrame
	 * @param {DisplayObject} source The source {{#crossLink "DisplayObject"}}{{/crossLink}}  to draw as the frame.
	 * @param {Rectangle} [sourceRect] A {{#crossLink "Rectangle"}}{{/crossLink}} defining the portion of the
	 * source to draw to the frame. If not specified, it will look for a <code>getBounds</code> method, bounds property,
	 * or <code>nominalBounds</code> property on the source to use. If one is not found, the frame will be skipped.
	 * @param {Number} [scale=1] Optional. The scale to draw this frame at. Default is 1.
	 * @param {Function} [setupFunction] Optional. A function to call immediately before drawing this frame.
	 * @param {Array} [setupParams] Parameters to pass to the setup function.
	 * @param {Object} [setupScope] The scope to call the setupFunction in.
	 * @return {Number} The index of the frame that was just added, or null if a sourceRect could not be determined.
	 **/
	p.addFrame = function(source, sourceRect, scale, setupFunction, setupParams, setupScope) {
		if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
		var rect = sourceRect||source.bounds||source.nominalBounds;
		if (!rect&&source.getBounds) { rect = source.getBounds(); }
		if (!rect) { return null; }
		scale = scale||1;
		return this._frames.push({source:source, sourceRect:rect, scale:scale, funct:setupFunction, params:setupParams, scope:setupScope, index:this._frames.length, height:rect.height*scale})-1;
	};

	/**
	 * Adds an animation that will be included in the created sprite sheet.
	 * @method addAnimation
	 * @param {String} name The name for the animation.
	 * @param {Array} frames An array of frame indexes that comprise the animation. Ex. [3,6,5] would describe an animation
	 * that played frame indexes 3, 6, and 5 in that order.
	 * @param {String} [next] Specifies the name of the animation to continue to after this animation ends. You can
	 * also pass false to have the animation stop when it ends. By default it will loop to the start of the same animation.
	 * @param {Number} [frequency] Specifies a frame advance frequency for this animation. For example, a value
	 * of 2 would cause the animation to advance every second tick.
	 **/
	p.addAnimation = function(name, frames, next, frequency) {
		if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
		this._animations[name] = {frames:frames, next:next, frequency:frequency};
	};

	/**
	 * This will take a MovieClip, and add its frames and labels to this builder. Labels will be added as an animation
	 * running from the label index to the next label. For example, if there is a label named "foo" at frame 0 and a label
	 * named "bar" at frame 10, in a MovieClip with 15 frames, it will add an animation named "foo" that runs from frame
	 * index 0 to 9, and an animation named "bar" that runs from frame index 10 to 14.
	 *
	 * Note that this will iterate through the full MovieClip with actionsEnabled set to false, ending on the last frame.
	 * @method addMovieClip
	 * @param {MovieClip} source The source MovieClip to add to the sprite sheet.
	 * @param {Rectangle} [sourceRect] A {{#crossLink "Rectangle"}}{{/crossLink}} defining the portion of the source to
	 * draw to the frame. If not specified, it will look for a <code>getBounds</code> method, <code>frameBounds</code>
	 * Array, <code>bounds</code> property, or <code>nominalBounds</code> property on the source to use. If one is not
	 * found, the MovieClip will be skipped.
	 * @param {Number} [scale=1] The scale to draw the movie clip at.
	 **/
	p.addMovieClip = function(source, sourceRect, scale) {
		if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
		var rects = source.frameBounds;
		var rect = sourceRect||source.bounds||source.nominalBounds;
		if (!rect&&source.getBounds) { rect = source.getBounds(); }
		if (!rect && !rects) { return null; }

		var baseFrameIndex = this._frames.length;
		var duration = source.timeline.duration;
		for (var i=0; i<duration; i++) {
			var r = (rects&&rects[i]) ? rects[i] : rect;
			this.addFrame(source, r, scale, function(frame) {
				var ae = this.actionsEnabled;
				this.actionsEnabled = false;
				this.gotoAndStop(frame);
				this.actionsEnabled = ae;
			}, [i], source);
		}
		var labels = source.timeline._labels;
		var lbls = [];
		for (var n in labels) {
			lbls.push({index:labels[n], label:n});
		}
		if (lbls.length) {
			lbls.sort(function(a,b){ return a.index-b.index; });
			for (var i=0,l=lbls.length; i<l; i++) {
				var label = lbls[i].label;
				var start = baseFrameIndex+lbls[i].index;
				var end = baseFrameIndex+((i == l-1) ? duration : lbls[i+1].index);
				var frames = [];
				for (var j=start; j<end; j++) { frames.push(j); }
				this.addAnimation(label, frames, true); // for now, this loops all animations.
			}
		}
	};

	/**
	 * Builds a SpriteSheet instance based on the current frames.
	 * @method build
	 * @return SpriteSheet The created SpriteSheet instance, or null if a build is already running or an error occurred.
	 **/
	p.build = function() {
		if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
		this._startBuild();
		while (this._drawNext()) {}
		this._endBuild();
		return this.spriteSheet;
	};

	/**
	 * Asynchronously builds a {{#crossLink "SpriteSheet"}}{{/crossLink}} instance based on the current frames. It will
	 * run 20 times per second, using an amount of time defined by <code>timeSlice</code>. When it is complete it will
	 * call the specified callback.
	 * @method buildAsync
	 * @param {Number} [timeSlice] Sets the timeSlice property on this instance.
	 **/
	p.buildAsync = function(timeSlice) {
		if (this._data) { throw SpriteSheetBuilder.ERR_RUNNING; }
		this.timeSlice = timeSlice;
		this._startBuild();
		var _this = this;
		this._timerID = setTimeout(function() { _this._run(); }, 50-Math.max(0.01, Math.min(0.99, this.timeSlice||0.3))*50);
	};

	/**
	 * Stops the current asynchronous build.
	 * @method stopAsync
	 **/
	p.stopAsync = function() {
		clearTimeout(this._timerID);
		this._data = null;
	};

	/**
	 * SpriteSheetBuilder instances cannot be cloned.
	 * @method clone
	 **/
	p.clone = function() {
		throw("SpriteSheetBuilder cannot be cloned.");
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[SpriteSheetBuilder]";
	};

// private methods:
	/**
	 * @method _startBuild
	 * @protected
	 **/
	p._startBuild = function() {
		var pad = this.padding||0;
		this.progress = 0;
		this.spriteSheet = null;
		this._index = 0;
		this._scale = this.scale;
		var dataFrames = [];
		this._data = {
			images: [],
			frames: dataFrames,
			animations: this._animations // TODO: should we "clone" _animations in case someone adds more animations after a build?
		};

		var frames = this._frames.slice();
		frames.sort(function(a,b) { return (a.height<=b.height) ? -1 : 1; });

		if (frames[frames.length-1].height+pad*2 > this.maxHeight) { throw SpriteSheetBuilder.ERR_DIMENSIONS; }
		var y=0, x=0;
		var img = 0;
		while (frames.length) {
			var o = this._fillRow(frames, y, img, dataFrames, pad);
			if (o.w > x) { x = o.w; }
			y += o.h;
			if (!o.h || !frames.length) {
				var canvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");
				canvas.width = this._getSize(x,this.maxWidth);
				canvas.height = this._getSize(y,this.maxHeight);
				this._data.images[img] = canvas;
				if (!o.h) {
					x=y=0;
					img++;
				}
			}
		}
	};

	/**
	 * @method _getSize
	 * @protected
	 * @return {Number} The width & height of the row.
	 **/
	p._getSize = function(size,max) {
		var pow = 4;
		while (Math.pow(2,++pow) < size){}
		return Math.min(max,Math.pow(2,pow));
	};

	/**
	 * @method _fillRow
	 * @param {Array} frames
	 * @param {Number} y
	 * @param {Image} img
	 * @param {Object} dataFrames
	 * @param {Number} pad
	 * @protected
	 * @return {Number} The width & height of the row.
	 **/
	p._fillRow = function(frames, y, img, dataFrames, pad) {
		var w = this.maxWidth;
		var maxH = this.maxHeight;
		y += pad;
		var h = maxH-y;
		var x = pad;
		var height = 0;
		for (var i=frames.length-1; i>=0; i--) {
			var frame = frames[i];
			var sc = this._scale*frame.scale;
			var rect = frame.sourceRect;
			var source = frame.source;
			var rx = Math.floor(sc*rect.x-pad);
			var ry = Math.floor(sc*rect.y-pad);
			var rh = Math.ceil(sc*rect.height+pad*2);
			var rw = Math.ceil(sc*rect.width+pad*2);
			if (rw > w) { throw SpriteSheetBuilder.ERR_DIMENSIONS; }
			if (rh > h || x+rw > w) { continue; }
			frame.img = img;
			frame.rect = new createjs.Rectangle(x,y,rw,rh);
			height = height || rh;
			frames.splice(i,1);
			dataFrames[frame.index] = [x,y,rw,rh,img,Math.round(-rx+sc*source.regX-pad),Math.round(-ry+sc*source.regY-pad)];
			x += rw;
		}
		return {w:x, h:height};
	};

	/**
	 * @method _endBuild
	 * @protected
	 **/
	p._endBuild = function() {
		this.spriteSheet = new createjs.SpriteSheet(this._data);
		this._data = null;
		this.progress = 1;
		this.dispatchEvent("complete");
	};

	/**
	 * @method _run
	 * @protected
	 **/
	p._run = function() {
		var ts = Math.max(0.01, Math.min(0.99, this.timeSlice||0.3))*50;
		var t = (new Date()).getTime()+ts;
		var complete = false;
		while (t > (new Date()).getTime()) {
			if (!this._drawNext()) { complete = true; break; }
		}
		if (complete) {
			this._endBuild();
		} else {
			var _this = this;
			this._timerID = setTimeout(function() { _this._run(); }, 50-ts);
		}
		var p = this.progress = this._index/this._frames.length;
		if (this.hasEventListener("progress")) {
			var evt = new createjs.Event("progress");
			evt.progress = p;
			this.dispatchEvent(evt);
		}
	};

	/**
	 * @method _drawNext
	 * @protected
	 * @return Boolean Returns false if this is the last draw.
	 **/
	p._drawNext = function() {
		var frame = this._frames[this._index];
		var sc = frame.scale*this._scale;
		var rect = frame.rect;
		var sourceRect = frame.sourceRect;
		var canvas = this._data.images[frame.img];
		var ctx = canvas.getContext("2d");
		frame.funct&&frame.funct.apply(frame.scope, frame.params);
		ctx.save();
		ctx.beginPath();
		ctx.rect(rect.x, rect.y, rect.width, rect.height);
		ctx.clip();
		ctx.translate(Math.ceil(rect.x-sourceRect.x*sc), Math.ceil(rect.y-sourceRect.y*sc));
		ctx.scale(sc,sc);
		frame.source.draw(ctx); // display object will draw itself.
		ctx.restore();
		return (++this._index) < this._frames.length;
	};

createjs.SpriteSheetBuilder = SpriteSheetBuilder;
}());
/*
* DOMElement
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
// TODO: fix problems with rotation.
// TODO: exclude from getObjectsUnderPoint

/**
 * <b>This class is still experimental, and more advanced use is likely to be buggy. Please report bugs.</b>
 *
 * A DOMElement allows you to associate a HTMLElement with the display list. It will be transformed
 * within the DOM as though it is child of the {{#crossLink "Container"}}{{/crossLink}} it is added to. However, it is
 * not rendered to canvas, and as such will retain whatever z-index it has relative to the canvas (ie. it will be
 * drawn in front of or behind the canvas).
 *
 * The position of a DOMElement is relative to their parent node in the DOM. It is recommended that
 * the DOM Object be added to a div that also contains the canvas so that they share the same position
 * on the page.
 *
 * DOMElement is useful for positioning HTML elements over top of canvas content, and for elements
 * that you want to display outside the bounds of the canvas. For example, a tooltip with rich HTML
 * content.
 *
 * <h4>Mouse Interaction</h4>
 *
 * DOMElement instances are not full EaselJS display objects, and do not participate in EaselJS mouse
 * events or support methods like hitTest. To get mouse events from a DOMElement, you must instead add handlers to
 * the htmlElement (note, this does not support EventDispatcher)
 *
 *      var domElement = new createjs.DOMElement(htmlElement);
 *      domElement.htmlElement.onclick = function() {
 *          console.log("clicked");
 *      }
 *
 * @class DOMElement
 * @extends DisplayObject
 * @constructor
 * @param {HTMLElement} htmlElement A reference or id for the DOM element to manage.
 */
var DOMElement = function(htmlElement) {
  this.initialize(htmlElement);
};
var p = DOMElement.prototype = new createjs.DisplayObject();

// public properties:
	/**
	 * The DOM object to manage.
	 * @property htmlElement
	 * @type HTMLElement
	 */
	p.htmlElement = null;

// private properties:
	/**
	 * @property _oldMtx
	 * @type Matrix2D
	 * @protected
	 */
	p._oldMtx = null;
	
	/**
	 * @property _visible
	 * @type Boolean
	 * @protected
	 */
	p._visible = false;

// constructor:
	/**
	 * @property DisplayObject_initialize
	 * @type Function
	 * @private
	 */
	p.DisplayObject_initialize = p.initialize;

	/**
	 * Initialization method.
	 * @method initialize
	 * @param {HTMLElement} htmlElement A reference or id for the DOM element to manage.
	 * @protected
	*/
	p.initialize = function(htmlElement) {
		if (typeof(htmlElement)=="string") { htmlElement = document.getElementById(htmlElement); }
		this.DisplayObject_initialize();
		this.mouseEnabled = false;
		this.htmlElement = htmlElement;
		var style = htmlElement.style;
		// this relies on the _tick method because draw isn't called if a parent is not visible.
		style.position = "absolute";
		style.transformOrigin = style.WebkitTransformOrigin = style.msTransformOrigin = style.MozTransformOrigin = style.OTransformOrigin = "0% 0%";
	};

// public methods:
	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 */
	p.isVisible = function() {
		return this.htmlElement != null;
	};

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 */
	p.draw = function(ctx, ignoreCache) {
		// this relies on the _tick method because draw isn't called if a parent is not visible.
		if (this.visible) { this._visible = true; }
		// the actual update happens in _handleDrawEnd
		return true;
	};

	/**
	 * Not applicable to DOMElement.
	 * @method cache
	 */
	p.cache = function() {};

	/**
	 * Not applicable to DOMElement.
	 * @method uncache
	 */
	p.uncache = function() {};

	/**
	 * Not applicable to DOMElement.
	 * @method updateCache
	 */
	p.updateCache = function() {};

	/**
	 * Not applicable to DOMElement.
	 * @method hitArea
	 */
	p.hitTest = function() {};

	/**
	 * Not applicable to DOMElement.
	 * @method localToGlobal
	 */
	p.localToGlobal = function() {};

	/**
	 * Not applicable to DOMElement.
	 * @method globalToLocal
	 */
	p.globalToLocal = function() {};

	/**
	 * Not applicable to DOMElement.
	 * @method localToLocal
	 */
	p.localToLocal = function() {};

	/**
	 * DOMElement cannot be cloned. Throws an error.
	 * @method clone
	 */
	p.clone = function() {
		throw("DOMElement cannot be cloned.")
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[DOMElement (name="+  this.name +")]";
	};

	/**
     * Interaction events should be added to `htmlElement`, and not the DOMElement instance, since DOMElement instances
	 * are not full EaselJS display objects and do not participate in EaselJS mouse events.
	 * @event click
	 */

     /**
     * Interaction events should be added to `htmlElement`, and not the DOMElement instance, since DOMElement instances
 	 * are not full EaselJS display objects and do not participate in EaselJS mouse events.
	 * @event dblClick
	 */

     /**
      * Interaction events should be added to `htmlElement`, and not the DOMElement instance, since DOMElement instances
 	  * are not full EaselJS display objects and do not participate in EaselJS mouse events.
	  * @event mousedown
	  */

     /**
      * The HTMLElement can listen for the mouseover event, not the DOMElement instance.
      * Since DOMElement instances are not full EaselJS display objects and do not participate in EaselJS mouse events.
      * @event mouseover
	  */

     /**
      * Not applicable to DOMElement.
	  * @event tick
	  */


// private methods:
	/**
	 * @property DisplayObject__tick
	 * @type Function
	 * @protected
	 */
	p.DisplayObject__tick = p._tick;

	/**
	 * @method _tick
	 * @param {Array} params Parameters to pass onto the DisplayObject {{#crossLink "DisplayObject/tick"}}{{/crossLink}}
	 * function.
	 * @protected
	 */
	p._tick = function(params) {
		var stage = this.getStage();
		this._visible = false;
		stage&&stage.on("drawend", this._handleDrawEnd, this, true);
		this.DisplayObject__tick(params);
	};
	
	/**
	 * @method _handleDrawEnd
	 * @param {Event} evt
	 * @protected
	 */
	p._handleDrawEnd = function(evt) {
		var o = this.htmlElement;
		if (!o) { return; }
		var style = o.style;
		
		var visibility = this._visible ? "visible" : "hidden";
		if (visibility != style.visibility) { style.visibility = visibility; }
		if (!this._visible) { return; }
		
		var mtx = this.getConcatenatedMatrix(this._matrix);
		var oMtx = this._oldMtx;
		var n = 10000; // precision
		if (!oMtx || oMtx.alpha != mtx.alpha) {
			style.opacity = ""+(mtx.alpha*n|0)/n;
			if (oMtx) { oMtx.alpha = mtx.alpha; }
		}
		if (!oMtx || oMtx.tx != mtx.tx || oMtx.ty != mtx.ty || oMtx.a != mtx.a || oMtx.b != mtx.b || oMtx.c != mtx.c || oMtx.d != mtx.d) {
			var str = "matrix(" + (mtx.a*n|0)/n +","+ (mtx.b*n|0)/n +","+ (mtx.c*n|0)/n +","+ (mtx.d*n|0)/n +","+ (mtx.tx+0.5|0);
			style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str +","+ (mtx.ty+0.5|0) +")";
			style.MozTransform = str +"px,"+ (mtx.ty+0.5|0) +"px)";
			this._oldMtx = oMtx ? oMtx.copy(mtx) : mtx.clone();
		}
	};

createjs.DOMElement = DOMElement;
}());
/*
* Filter
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Base class that all filters should inherit from. Filters need to be applied to objects that have been cached using
 * the {{#crossLink "DisplayObject/cache"}}{{/crossLink}} method. If an object changes, please cache it again, or use
 * {{#crossLink "DisplayObject/updateCache"}}{{/crossLink}}. Note that the filters must be applied before caching.
 *
 * <h4>Example</h4>
 *      myInstance.filters = [
 *          new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0),
 *          new createjs.BlurFilter(5, 5, 10)
 *      ];
 *      myInstance.cache(0,0, 100, 100);
 *
 * Note that each filter can implement a {{#crossLink "Filter/getBounds"}}{{/crossLink}} method, which returns the
 * margins that need to be applied in order to fully display the filter. For example, the {{#crossLink "BlurFilter"}}{{/crossLink}}
 * will cause an object to feather outwards, resulting in a margin around the shape.
 *
 * <h4>EaselJS Filters</h4>
 * EaselJS comes with a number of pre-built filters. Note that individual filters are not compiled into the minified
 * version of EaselJS. To use them, you must include them manually in the HTML.
 * <ul><li>{{#crossLink "AlphaMapFilter"}}{{/crossLink}} : Map a greyscale image to the alpha channel of a display object</li>
 *      <li>{{#crossLink "AlphaMaskFilter"}}{{/crossLink}}: Map an image's alpha channel to the alpha channel of a display object</li>
 *      <li>{{#crossLink "BlurFilter"}}{{/crossLink}}: Apply vertical and horizontal blur to a display object</li>
 *      <li>{{#crossLink "ColorFilter"}}{{/crossLink}}: Color transform a display object</li>
 *      <li>{{#crossLink "ColorMatrixFilter"}}{{/crossLink}}: Transform an image using a {{#crossLink "ColorMatrix"}}{{/crossLink}}</li>
 * </ul>
 *
 * @class Filter
 * @constructor
 **/
var Filter = function() {
  this.initialize();
};
var p = Filter.prototype;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {}

// public methods:
	/**
	 * Returns a rectangle with values indicating the margins required to draw the filter or null.
	 * For example, a filter that will extend the drawing area 4 pixels to the left, and 7 pixels to the right
	 * (but no pixels up or down) would return a rectangle with (x=-4, y=0, width=11, height=0).
	 * @method getBounds
	 * @return {Rectangle} a rectangle object indicating the margins required to draw the filter or null if the filter does not effect bounds.
	 **/
	p.getBounds = function() {
		return null;
	};

	/**
	 * Applies the filter to the specified context.
	 * @method applyFilter
	 * @param {CanvasRenderingContext2D} ctx The 2D context to use as the source.
	 * @param {Number} x The x position to use for the source rect.
	 * @param {Number} y The y position to use for the source rect.
	 * @param {Number} width The width to use for the source rect.
	 * @param {Number} height The height to use for the source rect.
	 * @param {CanvasRenderingContext2D} [targetCtx] The 2D context to draw the result to. Defaults to the context passed to ctx.
	 * @param {Number} [targetX] The x position to draw the result to. Defaults to the value passed to x.
	 * @param {Number} [targetY] The y position to draw the result to. Defaults to the value passed to y.
	 * @return {Boolean} If the filter was applied successfully.
	 **/
	p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Filter]";
	};

	/**
	 * Returns a clone of this Filter instance.
	 * @method clone
	 * @return {Filter} A clone of the current Filter instance.
	 **/
	p.clone = function() {
		return new Filter();
	};

createjs.Filter = Filter;
}());
/*
* BlurFilter
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Applies a box blur to DisplayObjects. Note that this filter is fairly CPU intensive, particularly if the quality is
 * set higher than 1.
 *
 * <h4>Example</h4>
 * This example creates a red circle, and then applies a 5 pixel blur to it. It uses the {{#crossLink "Filter/getBounds"}}{{/crossLink}}
 * method to account for the spread that the blur causes.
 *
 *      var shape = new createjs.Shape().set({x:100,y:100});
 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
 *
 *      var blurFilter = new createjs.BlurFilter(5, 5, 1);
 *      shape.filters = [blurFilter];
 *      var bounds = blurFilter.getBounds();
 *
 *      shape.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
 *
 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
 * @class BlurFilter
 * @extends Filter
 * @constructor
 * @param {Number} [blurX=0] The horizontal blur radius in pixels.
 * @param {Number} [blurY=0] The vertical blur radius in pixels.
 * @param {Number} [quality=1] The number of blur iterations.
 **/
var BlurFilter = function( blurX, blurY, quality ) {
  this.initialize( blurX, blurY, quality );
};
var p = BlurFilter.prototype = new createjs.Filter();

// constructor:
	/** @ignore */
	p.initialize = function( blurX, blurY, quality ) {
		if ( isNaN(blurX) || blurX < 0 ) blurX = 0;
		this.blurX = blurX | 0;
		if ( isNaN(blurY) || blurY < 0 ) blurY = 0;
		this.blurY = blurY | 0;
		if ( isNaN(quality) || quality < 1  ) quality = 1;
		this.quality = quality | 0;
	};

// public properties:

	/**
	 * Horizontal blur radius in pixels
	 * @property blurX
	 * @default 0
	 * @type Number
	 **/
	p.blurX = 0;

	/**
	 * Vertical blur radius in pixels
	 * @property blurY
	 * @default 0
	 * @type Number
	 **/
	p.blurY = 0;

	/**
	 * Number of blur iterations. For example, a value of 1 will produce a rough blur. A value of 2 will produce a
	 * smoother blur, but take twice as long to run.
	 * @property quality
	 * @default 1
	 * @type Number
	 **/
	p.quality = 1;
	
	//TODO: There might be a better better way to place these two lookup tables:
	p.mul_table = [ 1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1];
        
   
	p.shg_table = [0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9];

// public methods:
	/** docced in super class **/
	p.getBounds = function() {
		var q = Math.pow(this.quality, 0.6)*0.5;
		return new createjs.Rectangle(-this.blurX*q,-this.blurY*q,2*this.blurX*q,2*this.blurY*q);
	};

	p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
		targetCtx = targetCtx || ctx;
		if (targetX == null) { targetX = x; }
		if (targetY == null) { targetY = y; }
		try {
			var imageData = ctx.getImageData(x, y, width, height);
		} catch(e) {
			//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
			return false;
		}

		var radiusX = this.blurX/2;
		if ( isNaN(radiusX) || radiusX < 0 ) return false;
		radiusX |= 0;

		var radiusY = this.blurY/2;
		if ( isNaN(radiusY) || radiusY < 0 ) return false;
		radiusY |= 0;

		if ( radiusX == 0 && radiusY == 0 ) return false;

		var iterations = this.quality;
		if ( isNaN(iterations) || iterations < 1  ) iterations = 1;
		iterations |= 0;
		if ( iterations > 3 ) iterations = 3;
		if ( iterations < 1 ) iterations = 1;

		var pixels = imageData.data;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, 
		r_out_sum, g_out_sum, b_out_sum, a_out_sum,
		r_in_sum, g_in_sum, b_in_sum, a_in_sum, 
		pr, pg, pb, pa, rbs;

		var divx = radiusX + radiusX + 1;
		var divy = radiusY + radiusY + 1;
		var w4 = width << 2;
		var widthMinus1  = width - 1;
		var heightMinus1 = height - 1;
		var rxp1  = radiusX + 1;
		var ryp1  = radiusY + 1;
		var stackStartX = {r:0,b:0,g:0,a:0,next:null};
		var stackx = stackStartX;
		for ( i = 1; i < divx; i++ )
		{
			stackx = stackx.next = {r:0,b:0,g:0,a:0,next:null};
			if ( i == rxp1 ) var stackEndX = stackx;
		}
		stackx.next = stackStartX;
		
		var stackStartY = {r:0,b:0,g:0,a:0,next:null};
		var stacky = stackStartY;
		for ( i = 1; i < divy; i++ )
		{
			stacky = stacky.next = {r:0,b:0,g:0,a:0,next:null};
			if ( i == ryp1 ) var stackEndY = stacky;
		}
		stacky.next = stackStartY;
		
		var stackIn = null;



		
		while ( iterations-- > 0 ) {
			yw = yi = 0;
			var mul_sum = this.mul_table[radiusX];
			var shg_sum = this.shg_table[radiusX];
			for ( y = height; --y > -1; )
			{
				r_sum = rxp1 * ( pr = pixels[yi] );
				g_sum = rxp1 * ( pg = pixels[yi+1] );
				b_sum = rxp1 * ( pb = pixels[yi+2] );
				a_sum = rxp1 * ( pa = pixels[yi+3] );

				stackx = stackStartX;

				for( i = rxp1; --i > -1; )
				{
					stackx.r = pr;
					stackx.g = pg;
					stackx.b = pb;
					stackx.a = pa;
					stackx = stackx.next;
				}

				for( i = 1; i < rxp1; i++ )
				{
					p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
					r_sum += ( stackx.r = pixels[p]);
					g_sum += ( stackx.g = pixels[p+1]);
					b_sum += ( stackx.b = pixels[p+2]);
					a_sum += ( stackx.a = pixels[p+3]);

					stackx = stackx.next;
				}

				stackIn = stackStartX;
				for ( x = 0; x < width; x++ )
				{
					pixels[yi++] = (r_sum * mul_sum) >>> shg_sum;
					pixels[yi++] = (g_sum * mul_sum) >>> shg_sum;
					pixels[yi++] = (b_sum * mul_sum) >>> shg_sum;
					pixels[yi++] = (a_sum * mul_sum) >>> shg_sum;

					p =  ( yw + ( ( p = x + radiusX + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

					r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
					g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
					b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
					a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);

					stackIn = stackIn.next;

				}
				yw += width;
			}

			mul_sum = this.mul_table[radiusY];
			shg_sum = this.shg_table[radiusY];
			for ( x = 0; x < width; x++ )
			{
				yi = x << 2;

				r_sum = ryp1 * ( pr = pixels[yi]);
				g_sum = ryp1 * ( pg = pixels[yi+1]);
				b_sum = ryp1 * ( pb = pixels[yi+2]);
				a_sum = ryp1 * ( pa = pixels[yi+3]);

				stacky = stackStartY;

				for( i = 0; i < ryp1; i++ )
				{
					stacky.r = pr;
					stacky.g = pg;
					stacky.b = pb;
					stacky.a = pa;
					stacky = stacky.next;
				}

				yp = width;

				for( i = 1; i <= radiusY; i++ )
				{
					yi = ( yp + x ) << 2;

					r_sum += ( stacky.r = pixels[yi]);
					g_sum += ( stacky.g = pixels[yi+1]);
					b_sum += ( stacky.b = pixels[yi+2]);
					a_sum += ( stacky.a = pixels[yi+3]);

					stacky = stacky.next;

					if( i < heightMinus1 )
					{
						yp += width;
					}
				}

				yi = x;
				stackIn = stackStartY;
				if ( iterations > 0 )
				{
					for ( y = 0; y < height; y++ )
					{
						p = yi << 2;
						pixels[p+3] = pa =(a_sum * mul_sum) >>> shg_sum;
						if ( pa > 0 )
						{
							pixels[p]   = ((r_sum * mul_sum) >>> shg_sum ); 
							pixels[p+1] = ((g_sum * mul_sum) >>> shg_sum );
							pixels[p+2] = ((b_sum * mul_sum) >>> shg_sum );
						} else {
							pixels[p] = pixels[p+1] = pixels[p+2] = 0
						}

						p = ( x + (( ( p = y + ryp1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

						r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
						g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
						b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
						a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);

						stackIn = stackIn.next;

						yi += width;
					}
				} else {
					for ( y = 0; y < height; y++ )
					{
						p = yi << 2;
						pixels[p+3] = pa =(a_sum * mul_sum) >>> shg_sum;
						if ( pa > 0 )
						{
							pa = 255 / pa;
							pixels[p]   = ((r_sum * mul_sum) >>> shg_sum ) * pa; 
							pixels[p+1] = ((g_sum * mul_sum) >>> shg_sum ) * pa;
							pixels[p+2] = ((b_sum * mul_sum) >>> shg_sum ) * pa;
						} else {
							pixels[p] = pixels[p+1] = pixels[p+2] = 0
						}

						p = ( x + (( ( p = y + ryp1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

						r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
						g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
						b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
						a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);

						stackIn = stackIn.next;

						yi += width;
					}
				}
			}
		}
		targetCtx.putImageData(imageData, targetX, targetY);
		return true;
	};

	/**
	 * Returns a clone of this object.
	 * @return {BlurFilter}
	 **/
	p.clone = function() {
		return new BlurFilter(this.blurX, this.blurY, this.quality);
	};

	p.toString = function() {
		return "[BlurFilter]";
	};

	createjs.BlurFilter = BlurFilter;

}());
/*
 * AlphaMapFilter
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
	"use strict";
	/**
	 * Applies a greyscale alpha map image (or canvas) to the target, such that the alpha channel of the result will
	 * be copied from the red channel of the map, and the RGB channels will be copied from the target.
	 *
	 * Generally, it is recommended that you use {{#crossLink "AlphaMaskFilter"}}{{/crossLink}}, because it has much
	 * better performance.
	 *
	 * <h4>Example</h4>
	 * This example draws a red->blue box, caches it, and then uses the cache canvas as an alpha map on a 100x100 image.
	 *
	 *       var box = new createjs.Shape();
	 *       box.graphics.beginLinearGradientFill(["#ff0000", "#0000ff"], [0, 1], 0, 0, 0, 100)
	 *       box.graphics.drawRect(0, 0, 100, 100);
	 *       box.cache(0, 0, 100, 100);
	 *
	 *       var bmp = new createjs.Bitmap("path/to/image.jpg");
	 *       bmp.filters = [
	 *           new createjs.AlphaMapFilter(box.cacheCanvas)
	 *       ];
	 *       bmp.cache(0, 0, 100, 100);
	 *       stage.addChild(bmp);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
	 * @class AlphaMapFilter
	 * @extends Filter
	 * @constructor
	 * @param {Image|HTMLCanvasElement} alphaMap The greyscale image (or canvas) to use as the alpha value for the
	 * result. This should be exactly the same dimensions as the target.
	 **/
	var AlphaMapFilter = function (alphaMap) {
		this.initialize(alphaMap);
	};
	var p = AlphaMapFilter.prototype = new createjs.Filter();

// constructor:
	/** @ignore */
	p.initialize = function (alphaMap) {
		this.alphaMap = alphaMap;
	};

// public properties:

	/**
	 * The greyscale image (or canvas) to use as the alpha value for the result. This should be exactly the same
	 * dimensions as the target.
	 * @property alphaMap
	 * @type Image|HTMLCanvasElement
	 **/
	p.alphaMap = null;

// private properties:
	p._alphaMap = null;
	p._mapData = null;

// public methods:

	p.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
		if (!this.alphaMap) {
			return true;
		}
		if (!this._prepAlphaMap()) {
			return false;
		}
		targetCtx = targetCtx || ctx;
		if (targetX == null) {
			targetX = x;
		}
		if (targetY == null) {
			targetY = y;
		}

		try {
			var imageData = ctx.getImageData(x, y, width, height);
		} catch (e) {
			//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
			return false;
		}
		var data = imageData.data;
		var map = this._mapData;
		var l = data.length;
		for(var i = 0; i < l; i += 4) {
			data[i + 3] = map[i] || 0;
		}
		imageData.data = data;
		targetCtx.putImageData(imageData, targetX, targetY);
		return true;
	};

	/**
	 * Returns a clone of this object.
	 * @return {AlphaMapFilter} A clone of the current AlphaMapFilter instance.
	 **/
	p.clone = function () {
		return new AlphaMapFilter(this.alphaMap);
	};

	p.toString = function () {
		return "[AlphaMapFilter]";
	};

// private methods:
	p._prepAlphaMap = function () {
		if (!this.alphaMap) {
			return false;
		}
		if (this.alphaMap == this._alphaMap && this._mapData) {
			return true;
		}

		this._mapData = null;
		var map = this._alphaMap = this.alphaMap;
		var canvas = map;
		var ctx;
		if (map instanceof HTMLCanvasElement) {
			ctx = canvas.getContext("2d");
		} else {
			canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
			canvas.width = map.width;
			canvas.height = map.height;
			ctx = canvas.getContext("2d");
			ctx.drawImage(map, 0, 0);
		}

		try {
			var imgData = ctx.getImageData(0, 0, map.width, map.height);
		} catch (e) {
			//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
			return false;
		}
		this._mapData = imgData.data;
		return true;
	};

	createjs.AlphaMapFilter = AlphaMapFilter;

}());
/*
 * AlphaMaskFilter
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
	"use strict";

	/**
	 * Applies the alpha from the mask image (or canvas) to the target, such that the alpha channel of the result will
	 * be derived from the mask, and the RGB channels will be copied from the target. This can be used, for example, to
	 * apply an alpha mask to a display object. This can also be used to combine a JPG compressed RGB image with a PNG32
	 * alpha mask, which can result in a much smaller file size than a single PNG32 containing ARGB.
	 *
	 * <b>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters correctly.</b>
	 *
	 * <h4>Example</h4>
	 * This example draws a gradient box, then caches it and uses the "cacheCanvas" as the alpha mask on a 100x100 image.
	 *
	 *      var box = new createjs.Shape();
	 *      box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], 0, 0, 100, 100)
	 *      box.graphics.drawRect(0, 0, 100, 100);
	 *      box.cache(0, 0, 100, 100);
	 *
	 *      var bmp = new createjs.Bitmap("path/to/image.jpg");
	 *      bmp.filters = [
	 *          new createjs.AlphaMaskFilter(box.cacheCanvas)
	 *      ];
	 *      bmp.cache(0, 0, 100, 100);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
	 * @class AlphaMaskFilter
	 * @extends Filter
	 * @constructor
	 * @param {Image} mask
	 **/
	var AlphaMaskFilter = function (mask) {
		this.initialize(mask);
	};
	var p = AlphaMaskFilter.prototype = new createjs.Filter();

// constructor:
	/** @ignore */
	p.initialize = function (mask) {
		this.mask = mask;
	};

// public properties:

	/**
	 * The image (or canvas) to use as the mask.
	 * @property mask
	 * @type Image
	 **/
	p.mask = null;

// public methods:

	/**
	 * Applies the filter to the specified context.
	 *
	 * <strong>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters
	 * correctly.</strong>
	 * @method applyFilter
	 * @param {CanvasRenderingContext2D} ctx The 2D context to use as the source.
	 * @param {Number} x The x position to use for the source rect.
	 * @param {Number} y The y position to use for the source rect.
	 * @param {Number} width The width to use for the source rect.
	 * @param {Number} height The height to use for the source rect.
	 * @param {CanvasRenderingContext2D} [targetCtx] The 2D context to draw the result to. Defaults to the context passed to ctx.
	 * @param {Number} [targetX] The x position to draw the result to. Defaults to the value passed to x.
	 * @param {Number} [targetY] The y position to draw the result to. Defaults to the value passed to y.
	 * @return {Boolean} If the filter was applied successfully.
	 **/
	p.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
		if (!this.mask) {
			return true;
		}
		targetCtx = targetCtx || ctx;
		if (targetX == null) {
			targetX = x;
		}
		if (targetY == null) {
			targetY = y;
		}

		targetCtx.save();
		if (ctx != targetCtx) {
			// TODO: support targetCtx and targetX/Y
			// clearRect, then draw the ctx in?
		}

		targetCtx.globalCompositeOperation = "destination-in";
		targetCtx.drawImage(this.mask, targetX, targetY);
		targetCtx.restore();
		return true;
	};

	/**
	 * Returns a clone of this object.
	 * @return {AlphaMaskFilter}
	 **/
	p.clone = function () {
		return new AlphaMaskFilter(this.mask);
	};

	p.toString = function () {
		return "[AlphaMaskFilter]";
	};

// private methods:


	createjs.AlphaMaskFilter = AlphaMaskFilter;
}());
/*
* ColorFilter
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Applies a color transform to DisplayObjects.
 *
 * <h4>Example</h4>
 * This example draws a red circle, and then transforms it to Blue. This is accomplished by multiplying all the channels
 * to 0 (except alpha, which is set to 1), and then adding 255 to the blue channel.
 *
 *      var shape = new createjs.Shape().set({x:100,y:100});
 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
 *
 *      shape.filters = [
 *          new createjs.ColorFilter(0,0,0,1, 0,0,255,0)
 *      ];
 *      shape.cache(-50, -50, 100, 100);
 *
 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
 * @class ColorFilter
 * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
 * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
 * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
 * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
 * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
 * between -255 and 255.
 * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
  * between -255 and 255.
 * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
  * between -255 and 255.
 * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
  * between -255 and 255.
 * @constructor
 * @extends Filter
 **/
var ColorFilter = function(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
  this.initialize(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset);
}
var p = ColorFilter.prototype = new createjs.Filter();

// public properties:
	/**
	 * Red channel multiplier.
	 * @property redMultiplier
	 * @type Number
	 **/
	p.redMultiplier = 1;

	/**
	 * Green channel multiplier.
	 * @property greenMultiplier
	 * @type Number
	 **/
	p.greenMultiplier = 1;

	/**
	 * Blue channel multiplier.
	 * @property blueMultiplier
	 * @type Number
	 **/
	p.blueMultiplier = 1;

	/**
	 * Alpha channel multiplier.
	 * @property alphaMultiplier
	 * @type Number
	 **/
	p.alphaMultiplier = 1;

	/**
	 * Red channel offset (added to value).
	 * @property redOffset
	 * @type Number
	 **/
	p.redOffset = 0;

	/**
	 * Green channel offset (added to value).
	 * @property greenOffset
	 * @type Number
	 **/
	p.greenOffset = 0;

	/**
	 * Blue channel offset (added to value).
	 * @property blueOffset
	 * @type Number
	 **/
	p.blueOffset = 0;

	/**
	 * Alpha channel offset (added to value).
	 * @property alphaOffset
	 * @type Number
	 **/
	p.alphaOffset = 0;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
	 * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
	 * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
	 * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
	 * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
	 * between -255 and 255.
	 * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
	 * between -255 and 255.
	 * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
	 * between -255 and 255.
	 * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
	 * between -255 and 255.
	 * @protected
	 **/
	p.initialize = function(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
		this.redMultiplier = redMultiplier != null ? redMultiplier : 1;
		this.greenMultiplier = greenMultiplier != null ? greenMultiplier : 1;
		this.blueMultiplier = blueMultiplier != null ? blueMultiplier : 1;
		this.alphaMultiplier = alphaMultiplier != null ? alphaMultiplier : 1;
		this.redOffset = redOffset || 0;
		this.greenOffset = greenOffset || 0;
		this.blueOffset = blueOffset || 0;
		this.alphaOffset = alphaOffset || 0;
	}

// public methods:
	p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
		targetCtx = targetCtx || ctx;
		if (targetX == null) { targetX = x; }
		if (targetY == null) { targetY = y; }
		try {
			var imageData = ctx.getImageData(x, y, width, height);
		} catch(e) {
			//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
			return false;
		}
		var data = imageData.data;
		var l = data.length;
		for (var i=0; i<l; i+=4) {
			data[i] = data[i]*this.redMultiplier+this.redOffset;
			data[i+1] = data[i+1]*this.greenMultiplier+this.greenOffset;
			data[i+2] = data[i+2]*this.blueMultiplier+this.blueOffset;
			data[i+3] = data[i+3]*this.alphaMultiplier+this.alphaOffset;
		}
		targetCtx.putImageData(imageData, targetX, targetY);
		return true;
	}

	p.toString = function() {
		return "[ColorFilter]";
	}

	/**
	 * Returns a clone of this ColorFilter instance.
	 * @method clone
	 * @return {ColorFilter} A clone of the current ColorFilter instance.
	 **/
	p.clone = function() {
		return new ColorFilter(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
	}

	createjs.ColorFilter = ColorFilter;

}());
/*
* ColorMatrix
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

	/**
	 * Provides helper functions for assembling a matrix for use with the {{#crossLink "ColorMatrixFilter"}}{{/crossLink}},
	 * or can be used directly as the matrix for a ColorMatrixFilter. Most methods return the instance to facilitate
	 * chained calls.
	 *
	 * <h4>Example</h4>
	 *      myColorMatrix.adjustHue(20).adjustBrightness(50);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an example of how to apply filters, or {{#crossLink "ColorMatrixFilter"}}{{/crossLink}}
	 * for an example of how to use ColorMatrix to change a DisplayObject's color.
	 * @class ColorMatrix
	 * @param {Number} brightness
	 * @param {Number} contrast
	 * @param {Number} saturation
	 * @param {Number} hue
	 * @constructor
	 * @extends Array
	 **/
	var ColorMatrix = function(brightness, contrast, saturation, hue) {
	  this.initialize(brightness, contrast, saturation, hue);
	};
	var p = ColorMatrix.prototype = [];

	/**
	 * Array of delta values for contrast calculations.
	 * @property DELTA_INDEX
	 * @type Array
	 * @protected
	 * @static
	 **/
	ColorMatrix.DELTA_INDEX = [
		0,    0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1,  0.11,
		0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24,
		0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42,
		0.44, 0.46, 0.48, 0.5,  0.53, 0.56, 0.59, 0.62, 0.65, 0.68,
		0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98,
		1.0,  1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54,
		1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0,  2.12, 2.25,
		2.37, 2.50, 2.62, 2.75, 2.87, 3.0,  3.2,  3.4,  3.6,  3.8,
		4.0,  4.3,  4.7,  4.9,  5.0,  5.5,  6.0,  6.5,  6.8,  7.0,
		7.3,  7.5,  7.8,  8.0,  8.4,  8.7,  9.0,  9.4,  9.6,  9.8,
		10.0
	];

	/**
	 * Identity matrix values.
	 * @property IDENTITY_MATRIX
	 * @type Array
	 * @protected
	 * @static
	 **/
	ColorMatrix.IDENTITY_MATRIX = [
		1,0,0,0,0,
		0,1,0,0,0,
		0,0,1,0,0,
		0,0,0,1,0,
		0,0,0,0,1
	];

	/**
	 * The constant length of a color matrix.
	 * @property LENGTH
	 * @type Number
	 * @protected
	 * @static
	 **/
	ColorMatrix.LENGTH = ColorMatrix.IDENTITY_MATRIX.length;


	/**
	 * Initialization method.
	 * @method initialize
	 * @param {Number} brightness
	 * @param {Number} contrast
	 * @param {Number} saturation
	 * @param {Number} hue
	 * @protected
	 */
	p.initialize = function(brightness,contrast,saturation,hue) {
		this.reset();
		this.adjustColor(brightness,contrast,saturation,hue);
		return this;
	};

	/**
	 * Resets the matrix to identity values.
	 * @method reset
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 */
	p.reset = function() {
		return this.copyMatrix(ColorMatrix.IDENTITY_MATRIX);
	};

	/**
	 * Shortcut method to adjust brightness, contrast, saturation and hue.
	 * Equivalent to calling adjustHue(hue), adjustContrast(contrast),
	 * adjustBrightness(brightness), adjustSaturation(saturation), in that order.
	 * @method adjustColor
	 * @param {Number} brightness
	 * @param {Number} contrast
	 * @param {Number} saturation
	 * @param {Number} hue
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 **/
	p.adjustColor = function(brightness,contrast,saturation,hue) {
		this.adjustHue(hue);
		this.adjustContrast(contrast);
		this.adjustBrightness(brightness);
		return this.adjustSaturation(saturation);
	};

	/**
	 * Adjusts the brightness of pixel color by adding the specified value to the red, green and blue channels.
	 * Positive values will make the image brighter, negative values will make it darker.
	 * @method adjustBrightness
	 * @param {Number} value A value between -255 & 255 that will be added to the RGB channels.
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 **/
	p.adjustBrightness = function(value) {
		if (value == 0 || isNaN(value)) { return this; }
		value = this._cleanValue(value,255);
		this._multiplyMatrix([
			1,0,0,0,value,
			0,1,0,0,value,
			0,0,1,0,value,
			0,0,0,1,0,
			0,0,0,0,1
		]);
		return this;
	};

	/**
	 * Adjusts the contrast of pixel color.
	 * Positive values will increase contrast, negative values will decrease contrast.
	 * @method adjustContrast
	 * @param {Number} value A value between -100 & 100.
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 **/
	p.adjustContrast = function(value) {
		if (value == 0 || isNaN(value)) { return this; }
		value = this._cleanValue(value,100);
		var x;
		if (value<0) {
			x = 127+value/100*127;
		} else {
			x = value%1;
			if (x == 0) {
				x = ColorMatrix.DELTA_INDEX[value];
			} else {
				x = ColorMatrix.DELTA_INDEX[(value<<0)]*(1-x)+ColorMatrix.DELTA_INDEX[(value<<0)+1]*x; // use linear interpolation for more granularity.
			}
			x = x*127+127;
		}
		this._multiplyMatrix([
			x/127,0,0,0,0.5*(127-x),
			0,x/127,0,0,0.5*(127-x),
			0,0,x/127,0,0.5*(127-x),
			0,0,0,1,0,
			0,0,0,0,1
		]);
		return this;
	};

	/**
	 * Adjusts the color saturation of the pixel.
	 * Positive values will increase saturation, negative values will decrease saturation (trend towards greyscale).
	 * @method adjustSaturation
	 * @param {Number} value A value between -100 & 100.
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 **/
	p.adjustSaturation = function(value) {
		if (value == 0 || isNaN(value)) { return this; }
		value = this._cleanValue(value,100);
		var x = 1+((value > 0) ? 3*value/100 : value/100);
		var lumR = 0.3086;
		var lumG = 0.6094;
		var lumB = 0.0820;
		this._multiplyMatrix([
			lumR*(1-x)+x,lumG*(1-x),lumB*(1-x),0,0,
			lumR*(1-x),lumG*(1-x)+x,lumB*(1-x),0,0,
			lumR*(1-x),lumG*(1-x),lumB*(1-x)+x,0,0,
			0,0,0,1,0,
			0,0,0,0,1
		]);
		return this;
	};


	/**
	 * Adjusts the hue of the pixel color.
	 * @method adjustHue
	 * @param {Number} value A value between -180 & 180.
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 **/
	p.adjustHue = function(value) {
		if (value == 0 || isNaN(value)) { return this; }
		value = this._cleanValue(value,180)/180*Math.PI;
		var cosVal = Math.cos(value);
		var sinVal = Math.sin(value);
		var lumR = 0.213;
		var lumG = 0.715;
		var lumB = 0.072;
		this._multiplyMatrix([
			lumR+cosVal*(1-lumR)+sinVal*(-lumR),lumG+cosVal*(-lumG)+sinVal*(-lumG),lumB+cosVal*(-lumB)+sinVal*(1-lumB),0,0,
			lumR+cosVal*(-lumR)+sinVal*(0.143),lumG+cosVal*(1-lumG)+sinVal*(0.140),lumB+cosVal*(-lumB)+sinVal*(-0.283),0,0,
			lumR+cosVal*(-lumR)+sinVal*(-(1-lumR)),lumG+cosVal*(-lumG)+sinVal*(lumG),lumB+cosVal*(1-lumB)+sinVal*(lumB),0,0,
			0,0,0,1,0,
			0,0,0,0,1
		]);
		return this;
	};

	/**
	 * Concatenates (multiplies) the specified matrix with this one.
	 * @method concat
	 * @param {Array} matrix An array or ColorMatrix instance.
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 **/
	p.concat = function(matrix) {
		matrix = this._fixMatrix(matrix);
		if (matrix.length != ColorMatrix.LENGTH) { return this; }
		this._multiplyMatrix(matrix);
		return this;
	};

	/**
	 * Returns a clone of this ColorMatrix.
	 * @method clone
	 * @return {ColorMatrix} A clone of this ColorMatrix.
	 **/
	p.clone = function() {
		return new ColorMatrix(this);
	};

	/**
	 * Return a length 25 (5x5) array instance containing this matrix's values.
	 * @method toArray
	 * @return {Array} An array holding this matrix's values.
	 **/
	p.toArray = function() {
		return this.slice(0,ColorMatrix.LENGTH);
	};

	/**
	 * Copy the specified matrix's values to this matrix.
	 * @method copyMatrix
	 * @param {Array} matrix An array or ColorMatrix instance.
	 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
	 **/
	p.copyMatrix = function(matrix) {
		var l = ColorMatrix.LENGTH;
		for (var i=0;i<l;i++) {
			this[i] = matrix[i];
		}
		return this;
	};

// private methods:

	/**
	 * @method _multiplyMatrix
	 * @param {Array} matrix
	 * @protected
	 **/
	p._multiplyMatrix = function(matrix) {
		var col = [];

		for (var i=0;i<5;i++) {
			for (var j=0;j<5;j++) {
				col[j] = this[j+i*5];
			}
			for (var j=0;j<5;j++) {
				var val=0;
				for (var k=0;k<5;k++) {
					val += matrix[j+k*5]*col[k];
				}
				this[j+i*5] = val;
			}
		}
	};

	/**
	 * Make sure values are within the specified range, hue has a limit of 180, brightness is 255, others are 100.
	 * @method _cleanValue
	 * @param {Number} value The raw number
	 * @param {Number} limit The maximum that the number can be. The minimum is the limit * -1.
	 * @protected
	 **/
	p._cleanValue = function(value, limit) {
		return Math.min(limit,Math.max(-limit,value));
	};

	//
	/**
	 * Makes sure matrixes are 5x5 (25 long).
	 * @method _fixMatrix
	 * @param {Array} matrix
	 * @protected
	 **/
	p._fixMatrix = function(matrix) {
		if (matrix instanceof ColorMatrix) { matrix = matrix.slice(0); }
		if (matrix.length < ColorMatrix.LENGTH) {
			matrix = matrix.slice(0,matrix.length).concat(ColorMatrix.IDENTITY_MATRIX.slice(matrix.length,ColorMatrix.LENGTH));
		} else if (matrix.length > ColorMatrix.LENGTH) {
			matrix = matrix.slice(0,ColorMatrix.LENGTH);
		}
		return matrix;
	};

	createjs.ColorMatrix = ColorMatrix;

}());
/*
* ColorMatrixFilter
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Allows you to carry out complex color operations such as modifying saturation, brightness, or inverting. See the
 * {{#crossLink "ColorMatrix"}}{{/crossLink}} for more information on changing colors. For an easier color transform,
 * consider the {{#crossLink "ColorFilter"}}{{/crossLink}}.
 *
 * <h4>Example</h4>
 * This example creates a red circle, inverts its hue, and then saturates it to brighten it up.
 *
 *      var shape = new createjs.Shape().set({x:100,y:100});
 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
 *
 *      var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
 *      shape.filters = [
 *          new createjs.ColorMatrixFilter(matrix)
 *      ];
 *
 *      shape.cache(-50, -50, 100, 100);
 *
 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
 * @class ColorMatrixFilter
 * @constructor
 * @extends Filter
 * @param {Array} matrix A 4x5 matrix describing the color operation to perform. See also the {{#crossLink "ColorMatrix"}}{{/crossLink}}
 * class.
 **/
var ColorMatrixFilter = function(matrix) {
  this.initialize(matrix);
};
var p = ColorMatrixFilter.prototype = new createjs.Filter();

// public properties:
	p.matrix = null;

// constructor:
	// TODO: detailed docs.
	/**
	 * @method initialize
	 * @protected
	 * @param {Array} matrix A 4x5 matrix describing the color operation to perform.
	 **/
	p.initialize = function(matrix) {
		this.matrix = matrix;
	};

// public methods:
	p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
		targetCtx = targetCtx || ctx;
		if (targetX == null) { targetX = x; }
		if (targetY == null) { targetY = y; }
		try {
			var imageData = ctx.getImageData(x, y, width, height);
		} catch(e) {
			//if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
			return false;
		}
		var data = imageData.data;
		var l = data.length;
		var r,g,b,a;
		var mtx = this.matrix;
		var m0 =  mtx[0],  m1 =  mtx[1],  m2 =  mtx[2],  m3 =  mtx[3],  m4 =  mtx[4];
		var m5 =  mtx[5],  m6 =  mtx[6],  m7 =  mtx[7],  m8 =  mtx[8],  m9 =  mtx[9];
		var m10 = mtx[10], m11 = mtx[11], m12 = mtx[12], m13 = mtx[13], m14 = mtx[14];
		var m15 = mtx[15], m16 = mtx[16], m17 = mtx[17], m18 = mtx[18], m19 = mtx[19];

		for (var i=0; i<l; i+=4) {
			r = data[i];
			g = data[i+1];
			b = data[i+2];
			a = data[i+3];
			data[i] = r*m0+g*m1+b*m2+a*m3+m4; // red
			data[i+1] = r*m5+g*m6+b*m7+a*m8+m9; // green
			data[i+2] = r*m10+g*m11+b*m12+a*m13+m14; // blue
			data[i+3] = r*m15+g*m16+b*m17+a*m18+m19; // alpha
		}
		targetCtx.putImageData(imageData, targetX, targetY);
		return true;
	};

	p.toString = function() {
		return "[ColorMatrixFilter]";
	};

	/**
	 * Returns a clone of this ColorMatrixFilter instance.
	 * @method clone
	 * @return {ColorMatrixFilter} A clone of the current ColorMatrixFilter instance.
	 **/
	p.clone = function() {
		return new ColorMatrixFilter(this.matrix);
	};

	createjs.ColorMatrixFilter = ColorMatrixFilter;

}());
/*
* Touch
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

// TODO: support for double tap.
/**
 * Global utility for working with multi-touch enabled devices in EaselJS. Currently supports W3C Touch API (iOS and
 * modern Android browser) and the Pointer API (IE).
 *
 * Ensure that you {{#crossLink "Touch/disable"}}{{/crossLink}} touch when cleaning up your application.
 * Note that you do not have to check if touch is supported to enable it, as it will fail gracefully if it is not
 * supported.
 *
 * <h4>Example</h4>
 *
 *      var stage = new createjs.Stage("canvasId");
 *      createjs.Touch.enable(stage);
 *
 * <strong>Note:</strong> It is important to disable Touch on a stage that you are no longer using:
 *
 *      createjs.Touch.disable(stage);
 *
 * @class Touch
 * @static
 **/
var Touch = function() {
	throw "Touch cannot be instantiated";
};

// Public static methods:
	/**
	 * Returns true if touch is supported in the current browser.
	 * @method isSupported
	 * @return {Boolean} Indicates whether touch is supported in the current browser.
	 * @static
	 **/
	Touch.isSupported = function() {
		return	('ontouchstart' in window) || // iOS
					(window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0); // IE10
	};

	/**
	 * Enables touch interaction for the specified EaselJS stage. Currently supports iOS (and compatible browsers, such
	 * as modern Android browsers), and IE10. Supports both single touch and multi-touch modes. Extends the EaselJS
	 * MouseEvent model, but without support for double click or over/out events. See <code>MouseEvent.pointerID</code>
	 * for more information.
	 * @method enable
	 * @param {Stage} stage The stage to enable touch on.
	 * @param {Boolean} [singleTouch=false] If true, only a single touch will be active at a time.
	 * @param {Boolean} [allowDefault=false] If true, then default gesture actions (ex. scrolling, zooming) will be
	 * allowed when the user is interacting with the target canvas.
	 * @return {Boolean} Returns true if touch was successfully enabled on the target stage.
	 * @static
	 **/
	Touch.enable = function(stage, singleTouch, allowDefault) {
		if (!stage || !stage.canvas || !Touch.isSupported()) { return false; }

		// inject required properties on stage:
		stage.__touch = {pointers:{}, multitouch:!singleTouch, preventDefault:!allowDefault, count:0};

		// note that in the future we may need to disable the standard mouse event model before adding
		// these to prevent duplicate calls. It doesn't seem to be an issue with iOS devices though.
		if ('ontouchstart' in window) { Touch._IOS_enable(stage); }
		else if (window.navigator['msPointerEnabled']) { Touch._IE_enable(stage); }
		return true;
	};

	/**
	 * Removes all listeners that were set up when calling Touch.enable on a stage.
	 * @method disable
	 * @param {Stage} stage The stage to disable touch on.
	 * @static
	 **/
	Touch.disable = function(stage) {
		if (!stage) { return; }
		if ('ontouchstart' in window) { Touch._IOS_disable(stage); }
		else if (window.navigator['msPointerEnabled']) { Touch._IE_disable(stage); }
	};

// Private static methods:

	/**
	 * @method _IOS_enable
	 * @protected
	 * @param {Stage} stage
	 * @static
	 **/
	Touch._IOS_enable = function(stage) {
		var canvas = stage.canvas;
		var f = stage.__touch.f = function(e) { Touch._IOS_handleEvent(stage,e); };
		canvas.addEventListener("touchstart", f, false);
		canvas.addEventListener("touchmove", f, false);
		canvas.addEventListener("touchend", f, false);
		canvas.addEventListener("touchcancel", f, false);
	};

	/**
	 * @method _IOS_disable
	 * @protected
	 * @param {Stage} stage
	 * @static
	 **/
	Touch._IOS_disable = function(stage) {
		var canvas = stage.canvas;
		if (!canvas) { return; }
		var f = stage.__touch.f;
		canvas.removeEventListener("touchstart", f, false);
		canvas.removeEventListener("touchmove", f, false);
		canvas.removeEventListener("touchend", f, false);
		canvas.removeEventListener("touchcancel", f, false);
	};

	/**
	 * @method _IOS_handleEvent
	 * @param {Stage} stage
	 * @param {Object} e The event to handle
	 * @protected
	 * @static
	 **/
	Touch._IOS_handleEvent = function(stage, e) {
		if (!stage) { return; }
		if (stage.__touch.preventDefault) { e.preventDefault&&e.preventDefault(); }
		var touches = e.changedTouches;
		var type = e.type;
		for (var i= 0,l=touches.length; i<l; i++) {
			var touch = touches[i];
			var id = touch.identifier;
			if (touch.target != stage.canvas) { continue; }

			if (type == "touchstart") {
				this._handleStart(stage, id, e, touch.pageX, touch.pageY);
			} else if (type == "touchmove") {
				this._handleMove(stage, id, e, touch.pageX, touch.pageY);
			} else if (type == "touchend" || type == "touchcancel") {
				this._handleEnd(stage, id, e);
			}
		}
	};

	/**
	 * @method _IE_enable
	 * @protected
	 * @param {Stage} stage
	 * @static
	 **/
	Touch._IE_enable = function(stage) {
		var canvas = stage.canvas;
		var f = stage.__touch.f = function(e) { Touch._IE_handleEvent(stage,e); };
		canvas.addEventListener("MSPointerDown", f, false);
		window.addEventListener("MSPointerMove", f, false);
		window.addEventListener("MSPointerUp", f, false);
		window.addEventListener("MSPointerCancel", f, false);
		if (stage.__touch.preventDefault) { canvas.style.msTouchAction = "none"; }
		stage.__touch.activeIDs = {};
	};

	/**
	 * @method _IE_disable
	 * @protected
	 * @param {Stage} stage
	 * @static
	 **/
	Touch._IE_disable = function(stage) {
		var f = stage.__touch.f;
		window.removeEventListener("MSPointerMove", f, false);
		window.removeEventListener("MSPointerUp", f, false);
		window.removeEventListener("MSPointerCancel", f, false);
		if (stage.canvas) {
			stage.canvas.removeEventListener("MSPointerDown", f, false);
		}
	};

	/**
	 * @method _IE_handleEvent
	 * @param {Stage} stage
	 * @param {Object} e The event to handle.
	 * @protected
	 * @static
	 **/
	Touch._IE_handleEvent = function(stage, e) {
		if (!stage) { return; }
		if (stage.__touch.preventDefault) { e.preventDefault&&e.preventDefault(); }
		var type = e.type;
		var id = e.pointerId;
		var ids = stage.__touch.activeIDs;

		if (type == "MSPointerDown") {
			if (e.srcElement != stage.canvas) { return; }
			ids[id] = true;
			this._handleStart(stage, id, e, e.pageX, e.pageY);
		} else if (ids[id]) { // it's an id we're watching
			if (type == "MSPointerMove") {
				this._handleMove(stage, id, e, e.pageX, e.pageY);
			} else if (type == "MSPointerUp" || type == "MSPointerCancel") {
				delete(ids[id]);
				this._handleEnd(stage, id, e);
			}
		}
	};


	/**
	 * @method _handleStart
	 * @param {Stage} stage
	 * @param {String|Number} id
	 * @param {Object} e
	 * @param {Number} x
	 * @param {Number} y
	 * @protected
	 **/
	Touch._handleStart = function(stage, id, e, x, y) {
		var props = stage.__touch;
		if (!props.multitouch && props.count) { return; }
		var ids = props.pointers;
		if (ids[id]) { return; }
		ids[id] = true;
		props.count++;
		stage._handlePointerDown(id, e, x, y);
	};

	/**
	 * @method _handleMove
	 * @param {Stage} stage
	 * @param {String|Number} id
	 * @param {Object} e
	 * @param {Number} x
	 * @param {Number} y
	 * @protected
	 **/
	Touch._handleMove = function(stage, id, e, x, y) {
		if (!stage.__touch.pointers[id]) { return; }
		stage._handlePointerMove(id, e, x, y);
	};

	/**
	 * @method _handleEnd
	 * @param {Stage} stage
	 * @param {String|Number} id
	 * @param {Object} e
	 * @protected
	 **/
	Touch._handleEnd = function(stage, id, e) {
		// TODO: cancel should be handled differently for proper UI (ex. an up would trigger a click, a cancel would more closely resemble an out).
		var props = stage.__touch;
		var ids = props.pointers;
		if (!ids[id]) { return; }
		props.count--;
		stage._handlePointerUp(id, e, true);
		delete(ids[id]);
	};


createjs.Touch = Touch;
}());
/**
 * @module EaselJS
 */
this.createjs = this.createjs || {};

(function() {
	"use strict";

	/**
	 * Static class holding library specific information such as the version and buildDate of
	 * the library.
	 * @class EaselJS
	 **/
	var s = createjs.EaselJS = createjs.EaselJS || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*version*/"NEXT"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*date*/"Tue, 01 Oct 2013 16:03:38 GMT"; // injected by build process

})();
this.createjs = this.createjs||{};

(function() {
	"use strict";

	/**
	 * Static class holding library specific information such as the version and buildDate of
	 * the library.
	 *
	 * The old PreloadJS class has been renamed to LoadQueue. Please see the {{#crossLink "LoadQueue"}}{{/crossLink}}
	 * class for information on loading files.
	 * @class PreloadJS
	 **/
	var s = createjs.PreloadJS = createjs.PreloadJS || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*version*/"NEXT"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*date*/"Tue, 01 Oct 2013 16:03:38 GMT"; // injected by build process

})();
/*
* Proxy
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

/**
 * Various utilities that the CreateJS Suite uses. Utilities are created as separate files, and will be available on the
 * createjs namespace directly:
 *
 * <h4>Example</h4>
 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
 *
 * @class Utility Methods
 * @main Utility Methods
 */

(function() {
	"use strict";

	/**
	 * A function proxy for methods. By default, JavaScript methods do not maintain scope, so passing a method as a
	 * callback will result in the method getting called in the scope of the caller. Using a proxy ensures that the
	 * method gets called in the correct scope.
	 *
	 * Additional arguments can be passed that will be applied to the function when it is called.
	 *
	 * <h4>Example</h4>
	 *      myObject.addEventListener("event", createjs.proxy(myHandler, this, arg1, arg2));
	 *
	 *      function myHandler(arg1, arg2) {
	 *           // This gets called when myObject.myCallback is executed.
	 *      }
	 *
	 * @method proxy
	 * @param {Function} method The function to call
	 * @param {Object} scope The scope to call the method name on
	 * @param {mixed} [arg] * Arguments that are appended to the callback for additional params.
	 * @public
	 * @static
	 */
	createjs.proxy = function (method, scope) {
		var aArgs = Array.prototype.slice.call(arguments, 2);
		return function () {
			return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs));
		};
	}

}());/*
* AbstractLoader
* Visit http://createjs.com/ for documentation, updates and examples.
*
*
* Copyright (c) 2012 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module PreloadJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
	/**
	 * The base loader, which defines all the generic callbacks and events. All loaders extend this class, including the
	 * {{#crossLink "LoadQueue"}}{{/crossLink}}.
	 * @class AbstractLoader
	 * @uses EventDispatcher
	 */
	var AbstractLoader = function () {
		this.init();
	};

	AbstractLoader.prototype = {};
	var p = AbstractLoader.prototype;
	var s = AbstractLoader;

	/**
	 * The RegExp pattern to use to parse file URIs. This supports simple file names, as well as full domain URIs with
	 * query strings. The resulting match is: protocol:$1 domain:$2 path:$3 file:$4 extension:$5 query:$6.
	 * @property FILE_PATTERN
	 * @type {RegExp}
	 * @static
	 * @protected
	 */
	s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;

	/**
	 * If the loader has completed loading. This provides a quick check, but also ensures that the different approaches
	 * used for loading do not pile up resulting in more than one <code>complete</code> event.
	 * @property loaded
	 * @type {Boolean}
	 * @default false
	 */
	p.loaded = false;

	/**
	 * Determine if the loader was canceled. Canceled loads will not fire complete events. Note that
	 * {{#crossLink "LoadQueue"}}{{/crossLink}} queues should be closed using {{#crossLink "AbstractLoader/close"}}{{/crossLink}}
	 * instead of canceled.
	 * @property canceled
	 * @type {Boolean}
	 * @default false
	 */
	p.canceled = false;

	/**
	 * The current load progress (percentage) for this item. This will be a number between 0 and 1.
	 * @property progress
	 * @type {Number}
	 * @default 0
	 */
	p.progress = 0;

	/**
	 * The item this loader represents. Note that this is null in a {{#crossLink "LoadQueue"}}{{/crossLink}}, but will
	 * be available on loaders such as {{#crossLink "XHRLoader"}}{{/crossLink}} and {{#crossLink "TagLoader"}}{{/crossLink}}.
	 * @property _item
	 * @type {Object}
	 * @private
	 */
	p._item = null;

	/**
	 * A path that will be prepended on to the item's source parameter before it is loaded.
	 * @property _basePath
	 * @type {String}
	 * @private
	 * @since 0.3.1
	 */
	p._basePath = null;

// Events
	/**
	 * The event that is fired when the overall progress changes.
	 * @event progress
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Number} loaded The amount that has been loaded so far. Note that this is may just be a percentage of 1,
	 * since file sizes can not be determined before a load is kicked off, if at all.
	 * @param {Number} total The total number of bytes. Note that this may just be 1.
	 * @param {Number} progress The ratio that has been loaded between 0 and 1.
	 * @since 0.3.0
	 */

	/**
	 * The event that is fired when a load starts.
	 * @event loadstart
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.3.1
	 */

	/**
	 * The event that is fired when the entire queue has been loaded.
	 * @event complete
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.3.0
	 */

	/**
	 * The event that is fired when the loader encounters an error. If the error was encountered by a file, the event will
	 * contain the item that caused the error. There may be additional properties such as the error reason on event
	 * objects.
	 * @event error
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Object} [item] The item that was being loaded that caused the error. The item was specified in
	 * the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} or {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}
	 * call. If only a string path or tag was specified, the object will contain that value as a property.
	 * @param {String} [error] The error object or text.
	 * @since 0.3.0
	 */

	//TODO: Deprecated
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "AbstractLoader/progress:event"}}{{/crossLink}}
	 * event.
	 * @property onProgress
	 * @type {Function}
	 * @deprecated Use addEventListener and the "progress" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "AbstractLoader/loadstart:event"}}{{/crossLink}}
	 * event.
	 * @property onLoadStart
	 * @type {Function}
	 * @deprecated Use addEventListener and the "loadstart" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "AbstractLoader/complete:event"}}{{/crossLink}}
	 * event.
	 * @property onComplete
	 * @type {Function}
	 * @deprecated Use addEventListener and the "complete" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "AbstractLoader/error:event"}}{{/crossLink}}
	 * event.
	 * @property onError
	 * @type {Function}
	 * @deprecated Use addEventListener and the "error" event.
	 */


// mix-ins:
	// EventDispatcher methods:
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	createjs.EventDispatcher.initialize(p);


	/**
	 * Get a reference to the manifest item that is loaded by this loader. In most cases this will be the value that was
	 * passed into {{#crossLink "LoadQueue"}}{{/crossLink}} using {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} or
	 * {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}. However if only a String path was passed in, then it will
	 * be an Object created by the LoadQueue.
	 * @return {Object} The manifest item that this loader is responsible for loading.
	 */
	p.getItem = function() {
		return this._item;
	};

	/**
	 * Initialize the loader. This is called by the constructor.
	 * @method init
	 * @private
	 */
	p.init = function () {};

	/**
	 * Begin loading the queued items. This method can be called when a {{#crossLink "LoadQueue"}}{{/crossLink}} is set
	 * up but not started immediately.
	 * @example
	 *      var queue = new createjs.LoadQueue();
	 *      queue.addEventListener("complete", handleComplete);
	 *      queue.loadManifest(fileArray, false); // Note the 2nd argument that tells the queue not to start loading yet
	 *      queue.load();
	 * @method load
	 */
	p.load = function() {};

	/**
	 * Close the active queue. Closing a queue completely empties the queue, and prevents any remaining items from
	 * starting to download. Note that currently any active loads will remain open, and events may be processed.
	 *
	 * To stop and restart a queue, use the {{#crossLink "LoadQueue/setPaused"}}{{/crossLink}} method instead.
	 * @method close
	 */
	p.close = function() {};


//Callback proxies
	/**
	 * Dispatch a loadstart event. Please see the {{#crossLink "AbstractLoader/loadstart:event"}}{{/crossLink}} event
	 * for details on the event payload.
	 * @method _sendLoadStart
	 * @protected
	 */
	p._sendLoadStart = function() {
		if (this._isCanceled()) { return; }
		this.dispatchEvent("loadstart");
	};

	/**
	 * Dispatch a progress event. Please see the {{#crossLink "AbstractLoader/progress:event"}}{{/crossLink}} event for
	 * details on the event payload.
	 * @method _sendProgress
	 * @param {Number | Object} value The progress of the loaded item, or an object containing <code>loaded</code>
	 * and <code>total</code> properties.
	 * @protected
	 */
	p._sendProgress = function(value) {
		if (this._isCanceled()) { return; }
		var event = null;
		if (typeof(value) == "number") {
			this.progress = value;
			event = new createjs.Event("progress");
			event.loaded = this.progress;
			event.total = 1;
		} else {
			event = value;
			this.progress = value.loaded / value.total;
			if (isNaN(this.progress) || this.progress == Infinity) { this.progress = 0; }
		}
		event.progress = this.progress;
		this.hasEventListener("progress") && this.dispatchEvent(event);
	};

	/**
	 * Dispatch a complete event. Please see the {{#crossLink "AbstractLoader/complete:event"}}{{/crossLink}} event
	 * for details on the event payload.
	 * @method _sendComplete
	 * @protected
	 */
	p._sendComplete = function() {
		if (this._isCanceled()) { return; }
		this.dispatchEvent("complete");
	};

	/**
	 * Dispatch an error event. Please see the {{#crossLink "AbstractLoader/error:event"}}{{/crossLink}} event for
	 * details on the event payload.
	 * @method _sendError
	 * @param {Object} event The event object containing specific error properties.
	 * @protected
	 */
	p._sendError = function(event) {
		if (this._isCanceled() || !this.hasEventListener("error")) { return; }
		if (event == null) {
			event = new createjs.Event("error");
		}
		this.dispatchEvent(event);
	};

	/**
	 * Determine if the load has been canceled. This is important to ensure that method calls or asynchronous events
	 * do not cause issues after the queue has been cleaned up.
	 * @method _isCanceled
	 * @return {Boolean} If the loader has been canceled.
	 * @protected
	 */
	p._isCanceled = function() {
		if (window.createjs == null || this.canceled) {
			return true;
		}
		return false;
	};

	/**
	 * Parse a file URI using the <code>AbstractLoader.FILE_PATTERN</code> RegExp pattern.
	 * @method _parseURI
	 * @param {String} path The file path to parse.
	 * @return {Array} The matched file contents. Please see the <code>AbstractLoader.FILE_PATTERN</code> property for
	 * details on the return value. This will return null if it does not match.
	 * @protected
	 */
	p._parseURI = function(path) {
		if (!path) { return null; }
		return path.match(s.FILE_PATTERN);
	};

	/**
	 * Formats an object into a query string for either a POST or GET request.
	 * @method _formatQueryString
	 * @param {Object} data The data to convert to a query string.
	 * @param {Array} [query] Existing name/value pairs to append on to this query.
	 * @private
	 */
	p._formatQueryString = function(data, query) {
		if (data == null) {
			throw new Error('You must specify data.');
		}
		var params = [];
		for (var n in data) {
			params.push(n+'='+escape(data[n]));
		}
		if (query) {
			params = params.concat(query);
		}
		return params.join('&');
	};

	/**
	 * A utility method that builds a file path using a source, a basePath, and a data object, and formats it into a new
	 * path. All of the loaders in PreloadJS use this method to compile paths when loading.
	 * @method buildPath
	 * @param {String} src The source path to add values to.
	 * @param {String} [basePath] A string to prepend to the file path. Sources beginning with http:// or similar will
	 * not receive a base path.
	 * @param {Object} [data] Object used to append values to this request as a query string. Existing parameters on the
	 * path will be preserved.
	 * @returns {string} A formatted string that contains the path and the supplied parameters.
	 * @since 0.3.1
	 */
	p.buildPath = function(src, _basePath, data) {
		if (_basePath != null) {
			var match = this._parseURI(src);
			// IE 7,8 Return empty string here.
			if (match == null || match[1] == null || match[1] == '') {
				src = _basePath + src;
			}
		}
		if (data == null) {
			return src;
		}

		var query = [];
		var idx = src.indexOf('?');

		if (idx != -1) {
			var q = src.slice(idx+1);
			query = query.concat(q.split('&'));
		}

		if (idx != -1) {
			return src.slice(0, idx) + '?' + this._formatQueryString(data, query);
		} else {
			return src + '?' + this._formatQueryString(data, query);
		}
	};

	/**
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[PreloadJS AbstractLoader]";
	};

	createjs.AbstractLoader = AbstractLoader;

}());
/*
* LoadQueue
* Visit http://createjs.com/ for documentation, updates and examples.
*
*
* Copyright (c) 2012 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
/**
 * PreloadJS provides a consistent way to preload content for use in HTML applications. Preloading can be done using
 * HTML tags, as well as XHR.
 *
 * By default, PreloadJS will try and load content using XHR, since it provides better support for progress and
 * completion events, <b>however due to cross-domain issues, it may still be preferable to use tag-based loading
 * instead</b>. Note that some content requires XHR to work (plain text, web audio), and some requires tags (HTML audio).
 * Note this is handled automatically where possible.
 *
 * PreloadJS currently supports all modern browsers, and we have done our best to include support for most older
 * browsers. If you find an issue with any specific OS/browser combination, please visit http://community.createjs.com/
 * and report it.
 *
 * <h4>Getting Started</h4>
 * To get started, check out the {{#crossLink "LoadQueue"}}{{/crossLink}} class, which includes a quick overview of how
 * to load files and process results.
 *
 * <h4>Example</h4>
 *      var queue = new createjs.LoadQueue();
 *      queue.installPlugin(createjs.Sound);
 *      queue.addEventListener("complete", handleComplete);
 *      queue.loadFile({id:"sound", src:"http://path/to/sound.mp3"});
 *      queue.loadManifest([
 *          {id: "myImage", src:"path/to/myImage.jpg"}
 *      ]);
 *      function handleComplete() {
 *          createjs.Sound.play("sound");
 *          var image = queue.getResult("myImage");
 *          document.body.appendChild(image);
 *      }
 *
 * <b>Important note on plugins:</b> Plugins must be installed <i>before</i> items are added to the queue, otherwise
 * they will not be processed, even if the load has not actually kicked off yet. Plugin functionality is handled when
 * the items are added to the LoadQueue.
 *
 * <h4>Browser Support</h4>
 * PreloadJS is partially supported in all browsers, and fully supported in all modern browsers. Known exceptions:
 * <ul><li>XHR loading of any content will not work in many older browsers (See a matrix here: <a href="http://caniuse.com/xhr2">http://caniuse.com/xhr2</a>).
 *      In many cases, you can fall back on tag loading (images, audio, CSS, scripts, SVG, and JSONP). Text and
 *      WebAudio will only work with XHR.</li>
 *      <li>Some formats have poor support for complete events in IE 6, 7, and 8 (SVG, tag loading of scripts, XML/JSON)</li>
 *      <li>Opera has poor support for SVG loading with XHR</li>
 *      <li>CSS loading in Android and Safari will not work with tags (currently, a workaround is in progress)</li>
 * </li>
 *
 * @module PreloadJS
 * @main PreloadJS
 */

// namespace:
this.createjs = this.createjs||{};

//TODO: addHeadTags support

/*
TODO: WINDOWS ISSUES
	* No error for HTML audio in IE 678
	* SVG no failure error in IE 67 (maybe 8) TAGS AND XHR
	* No script complete handler in IE 67 TAGS (XHR is fine)
	* No XML/JSON in IE6 TAGS
	* Need to hide loading SVG in Opera TAGS
	* No CSS onload/readystatechange in Safari or Android TAGS (requires rule checking)
	* SVG no load or failure in Opera XHR
	* Reported issues with IE7/8
 */

(function() {
	"use strict";

	/**
	 * The LoadQueue class is the main API for preloading content. LoadQueue is a load manager, which maintains
	 * a single file, or a queue of files.
	 *
	 * <b>Creating a Queue</b><br />
	 * To use LoadQueue, create a LoadQueue instance. If you want to force tag loading where possible, set the useXHR
	 * argument to false.
	 *
	 *      var queue = new createjs.LoadQueue(true);
	 *
	 * <b>Listening for Events</b><br />
	 * Add any listeners you want to the queue. Since PreloadJS 0.3.0, the {{#crossLink "EventDispatcher"}}{{/crossLink}}
	 * lets you add as many listeners as you want for events. You can subscribe to complete, error, fileload, progress,
	 * and fileprogress.
	 *
	 *      queue.addEventListener("fileload", handleFileLoad);
	 *      queue.addEventListener("complete", handleComplete);
	 *
	 * <b>Adding files and manifests</b><br />
	 * Add files you want to load using {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} or add multiple files at a
	 * time using {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}. Files are appended to the queue, so you can use
	 * these methods as many times as you like, whenever you like.
	 *
	 *      queue.loadFile("filePath/file.jpg");
	 *      queue.loadFile({id:"image", src:"filePath/file.jpg"});
	 *      queue.loadManifest(["filePath/file.jpg", {id:"image", src:"filePath/file.jpg"}];
	 *
	 * If you pass <code>false</code> as the second parameter, the queue will not immediately load the files (unless it
	 * has already been started). Call the {{#crossLink "AbstractLoader/load"}}{{/crossLink}} method to begin a paused queue.
	 * Note that a paused queue will automatically resume when new files are added to it.
	 *
	 *      queue.load();
	 *
	 * <b>File Types</b><br />
	 * The file type of a manifest item is auto-determined by the file extension. The pattern matching in PreloadJS
	 * should handle the majority of standard file and url formats, and works with common file extensions. If you have
	 * either a non-standard file extension, or are serving the file using a proxy script, then you can pass in a
	 * <code>type</code> property with any manifest item.
	 *
	 *      queue.loadFile({src:"path/to/myFile.mp3x", type:createjs.LoadQueue.SOUND});
	 *
	 *      // Note that PreloadJS will not read a file extension from the query string
	 *      queue.loadFile({src:"http://server.com/proxy?file=image.jpg"}, type:createjs.LoadQueue.IMAGE});
	 *
	 * Supported types include:
	 * <ul>
	 *     <li>createjs.LoadQueue.BINARY (Raw binary data via XHR)</li>
	 *     <li>createjs.LoadQueue.CSS (CSS files)</li>
	 *     <li>createjs.LoadQueue.IMAGE (Common image formats)</li>
	 *     <li>createjs.LoadQueue.JAVASCRIPT (JavaScript files)</li>
	 *     <li>createjs.LoadQueue.JSON (JSON data)</li>
	 *     <li>createjs.LoadQueue.JSONP (JSON files cross-domain)</li>
	 *     <li>createjs.LoadQueue.SOUND (Audio file formats)</li>
	 *     <li>createjs.LoadQueue.SVG (SVG files)</li>
	 *     <li>createjs.LoadQueue.TEXT (Text files - XHR only)</li>
	 *     <li>createjs.LoadQueue.XML (XML data)</li>
	 * </ul>
	 *
	 * <b>Handling Results</b><br />
	 * When a file is finished downloading, a "fileload" event is dispatched. In an example above, there is an event
	 * listener snippet for fileload. Loaded files are always an object that can be used immediately, including:
	 * <ul>
	  *     <li>Image: An &lt;img /&gt; tag</li>
	  *     <li>Audio: An &lt;audio /&gt; tag</a>
	  *     <li>JavaScript: A &lt;script /&gt; tag</li>
	  *     <li>CSS: A &lt;link /&gt; tag</li>
	  *     <li>XML: An XML DOM node</li>
	  *     <li>SVG: An &lt;object /&gt; tag</li>
	  *     <li>JSON: A formatted JavaScript Object</li>
	  *     <li>Text: Raw text</li>
	  *     <li>Binary: The binary loaded result</li>
	  * </ul>
	 *
	 *      function handleFileLoad(event) {
	 *          var item = event.item; // A reference to the item that was passed in
	 *          var type = item.type;
	 *
	 *          // Add any images to the page body.
	 *          if (type == createjs.LoadQueue.IMAGE) {
	 *              document.body.appendChild(event.result);
	 *          }
	 *      }
	 *
	 * At any time after the file has been loaded (usually after the queue has completed), any result can be looked up
	 * via its "id" using {{#crossLink "LoadQueue/getResult"}}{{/crossLink}}. If no id was provided, then the "src" or
	 * file path can be used instead. It is recommended to always pass an id.
	 *
	 *      var image = queue.getResult("image");
	 *      document.body.appendChild(image);
	 *
	 * Raw loaded content can be accessed using the <code>rawResult</code> property of the <code>fileload</code> event,
	 * or can be looked up using {{#crossLink "LoadQueue/getResult"}}{{/crossLink}}, and <code>true</code> as the 2nd
	 * parameter. This is only applicable for content that has been parsed for the browser, specifically, JavaScript,
	 * CSS, XML, SVG, and JSON objects.
	 *
	 *      var image = queue.getResult("image", true);
	 *
	 * <b>Plugins</b><br />
	 * LoadQueue has a simple plugin architecture to help process and preload content. For example, to preload audio,
	 * make sure to install the <a href="http://soundjs.com">SoundJS</a> Sound class, which will help preload HTML
	 * audio, Flash audio, and WebAudio files. This should be installed <b>before</b> loading any audio files.
	 *
	 *      queue.installPlugin(createjs.Sound);
	 *
	 * <h4>Known Browser Issues</h4>
	 * <ul>
	 *     <li>Browsers without audio support can not load audio files.</li>
	 *     <li>Safari on Mac OS X can only play HTML audio if QuickTime is installed</li>
	 *     <li>HTML Audio tags will only download until their <code>canPlayThrough</code> event is fired. Browsers other
	 *     than Chrome will continue to download in the background.</li>
	 *     <li>When loading scripts using tags, they are automatically added to the document.</li>
	 *     <li>Scripts loaded via XHR may not be properly inspectable with browser tools.</li>
	 *     <li>IE6 and IE7 (and some other browsers) may not be able to load XML, Text, or JSON, since they require
	 *     XHR to work.</li>
	 *     <li>Content loaded via tags will not show progress, and will continue to download in the background when
	 *     canceled, although no events will be dispatched.</li>
	 * </ul>
	 *
	 * @class LoadQueue
	 * @param {Boolean} [useXHR=true] Determines whether the preload instance will favor loading with XHR (XML HTTP Requests),
	 * or HTML tags. When this is <code>false</code>, LoadQueue will use tag loading when possible, and fall back on XHR
	 * when necessary.
	 * @param {String} basePath A path that will be prepended on to the source parameter of all items in the queue
	 * before they are loaded.  Sources beginning with http:// or similar will not receive a base path.
	 * Note that a basePath provided to any loadFile or loadManifest call will override the
	 * basePath specified on the LoadQueue constructor.
	 * @constructor
	 * @extends AbstractLoader
	 */
	var LoadQueue = function(useXHR, basePath) {
		this.init(useXHR, basePath);
	};

	var p = LoadQueue.prototype = new createjs.AbstractLoader();
	var s = LoadQueue;

	/**
	 * Time in milliseconds to assume a load has failed.
	 * @property LOAD_TIMEOUT
	 * @type {Number}
	 * @default 8000
	 * @static
	 */
	s.LOAD_TIMEOUT = 8000;

// Preload Types
	/**
	 * The preload type for generic binary types. Note that images and sound files are treated as binary.
	 * @property BINARY
	 * @type {String}
	 * @default binary
	 * @static
	 */
	s.BINARY = "binary";

	/**
	 * The preload type for css files. CSS files are loaded into a LINK or STYLE tag (depending on the load type)
	 * @property CSS
	 * @type {String}
	 * @default css
	 * @static
	 */
	s.CSS = "css";

	/**
	 * The preload type for image files, usually png, gif, or jpg/jpeg. Images are loaded into an IMAGE tag.
	 * @property IMAGE
	 * @type {String}
	 * @default image
	 * @static
	 */
	s.IMAGE = "image";

	/**
	 * The preload type for javascript files, usually with the "js" file extension. JavaScript files are loaded into a
	 * SCRIPT tag.
	 * @property JAVASCRIPT
	 * @type {String}
	 * @default javascript
	 * @static
	 */
	s.JAVASCRIPT = "javascript";

	/**
	 * The preload type for json files, usually with the "json" file extension. JSON data is loaded and parsed into a
	 * JavaScript object.
	 * @property JSON
	 * @type {String}
	 * @default json
	 * @static
	 */
	s.JSON = "json";

	/**
	 * The preload type for jsonp files, usually with the "json" file extension. JSOON data is loaded and parsed into a
	 * JavaScript object. You are required to pass a callback parameter that matches the jsonp result.
	 * @property JSONP
	 * @type {String}
	 * @default jsonp
	 * @static
	 */
	s.JSONP = "jsonp";

	/**
	 * The preload type for sound files, usually mp3, ogg, or wav. Audio is loaded into an AUDIO tag.
	 * @property SOUND
	 * @type {String}
	 * @default sound
	 * @static
	 */
	s.SOUND = "sound";

	/**
     * The preload type for SVG files.
	 * @property SVG
	 * @type {String}
	 * @default svg
	 * @static
	 */
	s.SVG = "svg";

	/**
	 * The preload type for text files, which is also the default file type if the type can not be determined. Text is
	 * loaded as raw text.
	 * @property TEXT
	 * @type {String}
	 * @default text
	 * @static
	 */
	s.TEXT = "text";

	/**
	 * The preload type for xml files. XML is loaded into an XML document.
	 * @property XML
	 * @type {String}
	 * @default xml
	 * @static
	 */
	s.XML = "xml";

	/**
	 * Defines a POST request, use for a method value when loading data.
	 *
	 * @type {string}
	 */
	s.POST = 'POST';

	/**
	 * Defines a GET request, use for a method value when loading data.
	 *
	 * @type {string}
	 */
	s.GET = 'GET';


// Prototype
	/**
	 * Use XMLHttpRequest (XHR) when possible. Note that LoadQueue will default to tag loading or XHR loading depending
	 * on the requirements for a media type. For example, HTML audio can not be loaded with XHR, and WebAudio can not be
	 * loaded with tags, so it will default the the correct type instead of using the user-defined type.
	 *
	 * <b>Note: This property is read-only.</b> To change it, please use the {{#crossLink "LoadQueue/setUseXHR"}}{{/crossLink}}
	 * method.
	 *
	 * @property useXHR
	 * @type {Boolean}
	 * @readOnly
	 * @default true
	 */
	p.useXHR = true;

	/**
	 * Does LoadQueue stop processing the current queue when an error is encountered.
	 * @property stopOnError
	 * @type {Boolean}
	 * @default false
	 */
	p.stopOnError = false;

	/**
	 * Ensure loaded scripts "complete" in the order they are specified. Note that scripts loaded via tags will only
	 * load one at a time, and will be added to the document when they are loaded.
	 * @property maintainScriptOrder
	 * @type {Boolean}
	 * @default true
	 */
	p.maintainScriptOrder = true;

	/*
	 * LM: Not Implemented.
	 * Automatically add tags to the HEAD of the document when they are loaded. Note that when loading JavaScript
	 * using a tag-based approach (<code>useXHR=false</code>), tags are automatically added to the HEAD in order to
	 * load them.
	 * @property addHeadTags
	 * @type {Boolean}
	 * @default trues
	 */
	//p.addHeadTags = true;

	/**
	 * The next preload queue to process when this one is complete. If an error is thrown in the current queue, and
	 * <code>loadQueue.stopOnError</code> is <code>true</code>, the next queue will not be processed.
	 * @property next
	 * @type {LoadQueue}
	 * @default null
	 */
	p.next = null;

// Events
	/**
	 * This event is fired when an individual file has loaded, and been processed.
	 * @event fileload
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Object} item The file item which was specified in the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}}
	 * or {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}} call. If only a string path or tag was specified, the
	 * object will contain that value as a property.
	 * @param {Object} result The HTML tag or parsed result of the loaded item.
	 * @param {Object} rawResult The unprocessed result, usually the raw text or binary data before it is converted
	 * to a usable object.
	 * @since 0.3.0
	 */

	/**
	 * This event is fired when an an individual file progress changes.
	 * @event fileprogress
	 * @param {Object} The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Object} item The file item which was specified in the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}}
	 * or {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}} call. If only a string path or tag was specified, the
	 * object will contain that value as a property.
	 * @param {Number} loaded The number of bytes that have been loaded. Note that this may just be a percentage of 1.
	 * @param {Number} total The total number of bytes. If it is unknown, the value is 1.
	 * @param {Number} progress The amount that has been loaded between 0 and 1.
	 * @since 0.3.0
	 */

	/**
	 * This event is fired when an individual file starts to load.
	 * @event filestart
	 * @param {Object} The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Object} item The file item which was specified in the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}}
	 * or {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}} call. If only a string path or tag was specified, the
	 * object will contain that value as a property.
	 */

	//TODO: Deprecated
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "LoadQueue/fileload:event"}}{{/crossLink}}
	 * event.
	 * @property onFileLoad
	 * @type {Function}
	 * @deprecated Use addEventListener and the "fileload" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "LoadQueue/fileprogress:event"}}{{/crossLink}}
	 * event.
	 * @property onFileProgress
	 * @type {Function}
	 * @deprecated Use addEventListener and the "fileprogress" event.
	 */


// Protected
	/**
	 * An object hash of callbacks that are fired for each file type before the file is loaded, giving plugins the
	 * ability to override properties of the load. Please see the {{#crossLink "LoadQueue/installPlugin"}}{{/crossLink}}
	 * method for more information.
	 * @property _typeCallbacks
	 * @type {Object}
	 * @private
	 */
	p._typeCallbacks = null;

	/**
	 * An object hash of callbacks that are fired for each file extension before the file is loaded, giving plugins the
	 * ability to override properties of the load. Please see the {{#crossLink "LoadQueue/installPlugin"}}{{/crossLink}}
	 * method for more information.
	 * @property _extensionCallbacks
	 * @type {null}
	 * @private
	 */
	p._extensionCallbacks = null;

	/**
	 * Determines if the loadStart event was dispatched already. This event is only fired one time, when the first
	 * file is requested.
	 * @property _loadStartWasDispatched
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	p._loadStartWasDispatched = false;

	/**
	 * The number of maximum open connections that a loadQueue tries to maintain. Please see
	 * {{#crossLink "LoadQueue/setMaxConnections"}}{{/crossLink}} for more information.
	 * @property _maxConnections
	 * @type {Number}
	 * @default 1
	 * @private
	 */
	p._maxConnections = 1;

	/**
	 * Determines if there is currently a script loading. This helps ensure that only a single script loads at once when
	 * using a script tag to do preloading.
	 * @property _currentlyLoadingScript
	 * @type {Boolean}
	 * @private
	 */
	p._currentlyLoadingScript = null;

	/**
	 * An array containing the currently downloading files.
	 * @property _currentLoads
	 * @type {Array}
	 * @private
	 */
	p._currentLoads = null;

	/**
	 * An array containing the queued items that have not yet started downloading.
	 * @property _loadQueue
	 * @type {Array}
	 * @private
	 */
	p._loadQueue = null;

	/**
	 * An array containing downloads that have not completed, so that the LoadQueue can be properly reset.
	 * @property _loadQueueBackup
	 * @type {Array}
	 * @private
	 */
	p._loadQueueBackup = null;

	/**
	 * An object hash of items that have finished downloading, indexed by item IDs.
	 * @property _loadItemsById
	 * @type {Object}
	 * @private
	 */
	p._loadItemsById = null;

	/**
	 * An object hash of items that have finished downloading, indexed by item source.
	 * @property _loadItemsBySrc
	 * @type {Object}
	 * @private
	 */
	p._loadItemsBySrc = null;

	/**
	 * An object hash of loaded items, indexed by the ID of the load item.
	 * @property _loadedResults
	 * @type {Object}
	 * @private
	 */
	p._loadedResults = null;

	/**
	 * An object hash of un-parsed loaded items, indexed by the ID of the load item.
	 * @property _loadedRawResults
	 * @type {Object}
	 * @private
	 */
	p._loadedRawResults = null;

	/**
	 * The number of items that have been requested. This helps manage an overall progress without knowing how large
	 * the files are before they are downloaded.
	 * @property _numItems
	 * @type {Number}
	 * @default 0
	 * @private
	 */
	p._numItems = 0;

	/**
	 * The number of items that have completed loaded. This helps manage an overall progress without knowing how large
	 * the files are before they are downloaded.
	 * @property _numItemsLoaded
	 * @type {Number}
	 * @default 0
	 * @private
	 */
	p._numItemsLoaded = 0;

	/**
	 * A list of scripts in the order they were requested. This helps ensure that scripts are "completed" in the right
	 * order.
	 * @property _scriptOrder
	 * @type {Array}
	 * @private
	 */
	p._scriptOrder = null;

	/**
	 * A list of scripts that have been loaded. Items are added to this list as <code>null</code> when they are
	 * requested, contain the loaded item if it has completed, but not been dispatched to the user, and <code>true</true>
	 * once they are complete and have been dispatched.
	 * @property _loadedScripts
	 * @type {Array}
	 * @private
	 */
	p._loadedScripts = null;

	// Overrides abstract method in AbstractLoader
	p.init = function(useXHR, basePath) {
		this._numItems = this._numItemsLoaded = 0;
		this._paused = false;
		this._loadStartWasDispatched = false;

		this._currentLoads = [];
		this._loadQueue = [];
		this._loadQueueBackup = [];
		this._scriptOrder = [];
		this._loadedScripts = [];
		this._loadItemsById = {};
		this._loadItemsBySrc = {};
		this._loadedResults = {};
		this._loadedRawResults = {};

		// Callbacks for plugins
		this._typeCallbacks = {};
		this._extensionCallbacks = {};

		this._basePath = basePath;
		this.setUseXHR(useXHR);
	};

	/**
	 * Change the usXHR value. Note that if this is set to true, it may fail depending on the browser's capabilities.
	 * @method setUseXHR
	 * @param {Boolean} value The new useXHR value to set.
	 * @return {Boolean} The new useXHR value. If XHR is not supported by the browser, this will return false, even if
	 * the provided value argument was true.
	 * @since 0.3.0
	 */
	p.setUseXHR = function(value) {
		// Determine if we can use XHR. XHR defaults to TRUE, but the browser may not support it.
		//TODO: Should we be checking for the other XHR types? Might have to do a try/catch on the different types similar to createXHR.
		this.useXHR = (value != false && window.XMLHttpRequest != null);
		return this.useXHR;
	};

	/**
	 * Stops all queued and loading items, and clears the queue. This also removes all internal references to loaded
	 * content, and allows the queue to be used again. Items that have not yet started can be kicked off again using
	 * the {{#crossLink "AbstractLoader/load"}}{{/crossLink}} method.
	 * @method removeAll
	 * @since 0.3.0
	 */
	p.removeAll = function() {
		this.remove();
	};

	/**
	 * Stops an item from being loaded, and removes it from the queue. If nothing is passed, all items are removed.
	 * This also removes internal references to loaded item(s).
	 * @method remove
	 * @param {String | Array} idsOrUrls The id or ids to remove from this queue. You can pass an item, an array of
	 * items, or multiple items as arguments.
	 * @since 0.3.0
	 */
	p.remove = function(idsOrUrls) {
		var args = null;

		if (idsOrUrls && !(idsOrUrls instanceof Array)) {
			args = [idsOrUrls];
		} else if (idsOrUrls) {
			args = idsOrUrls;
		} else if (arguments.length > 0) {
			return;
		}

		var itemsWereRemoved = false;

		// Destroy everything
		if (!args) {
			this.close();

			for (var n in this._loadItemsById) {
				this._disposeItem(this._loadItemsById[n]);
			}

			this.init(this.useXHR);

		// Remove specific items
		} else {
			while (args.length) {
				var item = args.pop();
				var r = this.getResult(item);

				//Remove from the main load Queue
				for (i = this._loadQueue.length-1;i>=0;i--) {
					loadItem = this._loadQueue[i].getItem();
					if (loadItem.id == item || loadItem.src == item) {
						this._loadQueue.splice(i,1)[0].cancel();
						break;
					}
				}

				//Remove from the backup queue
				for (i = this._loadQueueBackup.length-1;i>=0;i--) {
					loadItem = this._loadQueueBackup[i].getItem();
					if (loadItem.id == item || loadItem.src == item) {
						this._loadQueueBackup.splice(i,1)[0].cancel();
						break;
					}
				}

				if (r) {
					delete this._loadItemsById[r.id];
					delete this._loadItemsBySrc[r.src];
					this._disposeItem(r);
				} else {
					for (var i=this._currentLoads.length-1;i>=0;i--) {
						var loadItem = this._currentLoads[i].getItem();
						if (loadItem.id == item || loadItem.src == item) {
							this._currentLoads.splice(i,1)[0].cancel();
							itemsWereRemoved = true;
							break;
						}
					}
				}
			}

			// If this was called during a load, try to load the next item.
			if (itemsWereRemoved) {
				this._loadNext();
			}
		}
	};

	/**
	 * Stops all open loads, destroys any loaded items, and resets the queue, so all items can
	 * be reloaded again by calling {{#crossLink "AbstractLoader/load"}}{{/crossLink}}. Items are not removed from the
	 * queue. To remove items use the {{#crossLink "LoadQueue/remove"}}{{/crossLink}} or
	 * {{#crossLink "LoadQueue/removeAll"}}{{/crossLink}} method.
	 * @method reset
	 * @since 0.3.0
	 */
	p.reset = function() {
		this.close();
		for (var n in this._loadItemsById) {
			this._disposeItem(this._loadItemsById[n]);
		}

		//Reset the queue to its start state
		var a = [];
		for (i=0,l=this._loadQueueBackup.length;i<l;i++) {
			a.push(this._loadQueueBackup[i].getItem());
		}

		this.loadManifest(a, false);
	};

	/**
	 * Determine if a specific type should be loaded as a binary file. Currently, only images and items marked
	 * specifically as "binary" are loaded as binary. Note that audio is <b>not</b> a binary type, as we can not play
	 * back using an audio tag if it is loaded as binary. Plugins can change the item type to binary to ensure they get
	 * a binary result to work with. Binary files are loaded using XHR2.
	 * @method isBinary
	 * @param {String} type The item type.
	 * @return If the specified type is binary.
	 * @private
	 */
	s.isBinary = function(type) {
		switch (type) {
			case createjs.LoadQueue.IMAGE:
			case createjs.LoadQueue.BINARY:
				return true;
			default:
				return false;
		}
	};

	/**
	 * Register a plugin. Plugins can map to both load types (sound, image, etc), or can map to specific extensions
	 * (png, mp3, etc). Currently, only one plugin can exist per type/extension. Plugins must return an object containing:
	 *  <ul><li>callback: The function to call</li>
	 *      <li>types: An array of types to handle</li>
	 *      <li>extensions: An array of extensions to handle. This only fires if an applicable type handler has not fired.</li></ul>
	 * Note that even though a plugin might match both a type and extension handler, the type handler takes priority and
     * is the only one that gets fired.  For example if you have a handler for type=sound, and a handler for extension=mp3,
     * only the type handler would fire when an mp3 file is loaded.
	 * @method installPlugin
	 * @param {Function} plugin The plugin to install
	 */
	p.installPlugin = function(plugin) {
		if (plugin == null || plugin.getPreloadHandlers == null) { return; }
		var map = plugin.getPreloadHandlers();
		if (map.types != null) {
			for (var i=0, l=map.types.length; i<l; i++) {
				this._typeCallbacks[map.types[i]] = map.callback;
			}
		}
		if (map.extensions != null) {
			for (i=0, l=map.extensions.length; i<l; i++) {
				this._extensionCallbacks[map.extensions[i]] = map.callback;
			}
		}
	};

	/**
	 * Set the maximum number of concurrent connections. Note that browsers and servers may have a built-in maximum
	 * number of open connections, so any additional connections may remain in a pending state until the browser
	 * opens the connection. Note that when loading scripts using tags, with <code>maintainScriptOrder=true</code>, only
	 * one script is loaded at a time due to browser limitations.
	 * @method setMaxConnections
	 * @param {Number} value The number of concurrent loads to allow. By default, only a single connection per LoadQueue
	 * is open at any time.
	 */
	p.setMaxConnections = function (value) {
		this._maxConnections = value;
		if (!this._paused && this._loadQueue.length > 0) {
			this._loadNext();
		}
	}

	/**
	 * Load a single file. To add multiple files at once, use the {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}
	 * method.
	 *
	 * Note that files are always appended to the current queue, so this method can be used multiple times to add files.
	 * To clear the queue first, use the {{#crossLink "AbstractLoader/close"}}{{/crossLink}} method.
	 * @method loadFile
	 * @param {Object | String} file The file object or path to load. A file can be either
     * <ol>
     *     <li>a path to a resource (string). Note that this kind of load item will be
     *     converted to an object (see below) in the background.</li>
     *     <li>OR an object that contains:<ul>
     *         <li>src: The source of the file that is being loaded. This property is <b>required</b>. The source can
	 *         either be a string (recommended), or an HTML tag.</li>
     *         <li>type: The type of file that will be loaded (image, sound, json, etc). PreloadJS does auto-detection
	 *         of types using the extension. Supported types are defined on LoadQueue, such as <code>LoadQueue.IMAGE</code>.
	 *         It is recommended that a type is specified when a non-standard file URI (such as a php script) us used.</li>
     *         <li>id: A string identifier which can be used to reference the loaded object.</li>
	 *         <li>callback: Optional, used for JSONP requests, to define what method to call when the JSONP is loaded.</li>
     *         <li>data: An arbitrary data object, which is included with the loaded object</li>
	 *         <li>method: used to define if this request uses GET or POST when sending data to the server. Default; GET</li>
	 *         <li>values: Optional object of name/value pairs to send to the server.</li>
     *     </ul>
     * </ol>
	 * @param {Boolean} [loadNow=true] Kick off an immediate load (true) or wait for a load call (false). The default
	 * value is true. If the queue is paused using {{#crossLink "LoadQueue/setPaused"}}{{/crossLink}}, and the value is
	 * true, the queue will resume automatically.
	 * @param {String} [basePath] An optional base path prepended to the file source when the file is loaded.
	 * Sources beginning with http:// or similar will not receive a base path.
	 * The load item will not be modified.
	 */
	p.loadFile = function(file, loadNow, basePath) {
		if (file == null) {
			var event = new createjs.Event("error");
			event.text = "PRELOAD_NO_FILE";
			this._sendError(event);
			return;
		}
		this._addItem(file, basePath);

		if (loadNow !== false) {
			this.setPaused(false);
		} else {
			this.setPaused(true);
		}
	}

	/**
	 * Load an array of items. To load a single file, use the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} method.
	 * The files in the manifest are requested in the same order, but may complete in a different order if the max
	 * connections are set above 1 using {{#crossLink "LoadQueue/setMaxConnections"}}{{/crossLink}}. Scripts will load
	 * in the right order as long as <code>loadQueue.maintainScriptOrder</code> is true (which is default).
	 *
	 * Note that files are always appended to the current queue, so this method can be used multiple times to add files.
	 * To clear the queue first, use the {{#crossLink "AbstractLoader/close"}}{{/crossLink}} method.
	 * @method loadManifest
	 * @param {Array} manifest The list of files to load. Each file can be either:
	 * <ol>
	 *     <li>a path to a resource (string). Note that this kind of load item will be
	 *      converted to an object (see below) in the background.</li>
	 *     <li>OR an object that contains:<ul>
	 *         <li>src: The source of the file that is being loaded. This property is <b>required</b>.
	 *         The source can either be a string (recommended), or an HTML tag. </li>
	 *         <li>type: The type of file that will be loaded (image, sound, json, etc). PreloadJS does auto-detection
	 *         of types using the extension. Supported types are defined on LoadQueue, such as <code>LoadQueue.IMAGE</code>.
	 *         It is recommended that a type is specified when a non-standard file URI (such as a php script) us used.</li>
	 *         <li>id: A string identifier which can be used to reference the loaded object.</li>
	 *         <li>data: An arbitrary data object, which is returned with the loaded object</li>
	 *     </ul>
	 * </ol>
	 * @param {Boolean} [loadNow=true] Kick off an immediate load (true) or wait for a load call (false). The default
	 * value is true. If the queue is paused using {{#crossLink "LoadQueue/setPaused"}}{{/crossLink}} and this value is
	 * true, the queue will resume automatically.
	 * @param {String} [basePath] An optional base path prepended to each of the files' source when the file is loaded.
	 * Sources beginning with http:// or similar will not receive a base path.
	 * The load items will not be modified.
	 */
	p.loadManifest = function(manifest, loadNow, basePath) {
		var data = null;

		if (manifest instanceof Array) {
			if (manifest.length == 0) {
				var event = new createjs.Event("error");
				event.text = "PRELOAD_MANIFEST_EMPTY";
				this._sendError(event);
				return;
			}
			data = manifest;
		} else {
			if (manifest == null) {
				var event = new createjs.Event("error");
				event.text = "PRELOAD_MANIFEST_NULL";
				this._sendError(event);
				return;
			}
			data = [manifest];
		}

		for (var i=0, l=data.length; i<l; i++) {
			this._addItem(data[i], basePath);
		}

		if (loadNow !== false) {
			this.setPaused(false);
		} else {
			this.setPaused(true);
		}

	};

	// Overrides abstract method in AbstractLoader
	p.load = function() {
		this.setPaused(false);
	};

	/**
	 * Look up a load item using either the "id" or "src" that was specified when loading it.
	 * @method getItem
	 * @param {String} value The <code>id</code> or <code>src</code> of the load item.
	 * @return {Object} The load item that was initially requested using {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}}
	 * or {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}. This object is also returned via the "fileload" event
	 * as the "item" parameter.
	 */
	p.getItem = function(value) {
		return this._loadItemsById[value] || this._loadItemsBySrc[value];
	};

	/**
	 * Look up a loaded result using either the "id" or "src" that was specified when loading it.
	 * @method getResult
	 * @param {String} value The <code>id</code> or <code>src</code> of the load item.
	 * @param {Boolean} [rawResult=false] Return a raw result instead of a formatted result. This applies to content
	 * loaded via XHR such as scripts, XML, CSS, and Images. If there is no raw result, the formatted result will be
	 * returned instead.
	 * @return {Object} A result object containing the content that was loaded, such as:
     * <ul>
	 *      <li>An image tag (&lt;image /&gt;) for images</li>
	 *      <li>A script tag for JavaScript (&lt;script /&gt;). Note that scripts loaded with tags may be added to the
	 *      HTML head.</li>
	 *      <li>A style tag for CSS (&lt;style /&gt;)</li>
	 *      <li>Raw text for TEXT</li>
	 *      <li>A formatted JavaScript object defined by JSON</li>
	 *      <li>An XML document</li>
	 *      <li>An binary arraybuffer loaded by XHR</li>
	 *      <li>An audio tag (&lt;audio &gt;) for HTML audio. Note that it is recommended to use SoundJS APIs to play
	 *      loaded audio. Specifically, audio loaded by Flash and WebAudio will return a loader object using this method
	 *      which can not be used to play audio back.</li>
	 * </ul>
     * This object is also returned via the "fileload" event as the "item" parameter. Note that if a raw result is
	 * requested, but not found, the result will be returned instead.
	 */
	p.getResult = function(value, rawResult) {
		var item = this._loadItemsById[value] || this._loadItemsBySrc[value];
		if (item == null) { return null; }
		var id = item.id;
		if (rawResult && this._loadedRawResults[id]) {
			return this._loadedRawResults[id];
		}
		return this._loadedResults[id];
	};

	/**
	 * Pause or resume the current load. Active loads will not be cancelled, but the next items in the queue will not
	 * be processed when active loads complete. LoadQueues are not paused by default.
	 * @method setPaused
	 * @param {Boolean} value Whether the queue should be paused or not.
	 */
	p.setPaused = function(value) {
		this._paused = value;
		if (!this._paused) {
			this._loadNext();
		}
	};

	// Overrides abstract method in AbstractLoader
	p.close = function() {
		while (this._currentLoads.length) {
			this._currentLoads.pop().cancel();
		}
		this._scriptOrder.length = 0;
		this._loadedScripts.length = 0;
		this.loadStartWasDispatched = false;
	};


//Protected Methods
	/**
	 * Add an item to the queue. Items are formatted into a usable object containing all the properties necessary to
	 * load the content. The load queue is populated with the loader instance that handles preloading, and not the load
	 * item that was passed in by the user. To look up the load item by id or src, use the {{#crossLink "LoadQueue.getItem"}}{{/crossLink}}
	 * method.
	 * @method _addItem
	 * @param {String|Object} value The item to add to the queue.
	 * @param {String} basePath A path to prepend to the item's source.
	 * 	Sources beginning with http:// or similar will not receive a base path.
	 * @private
	 */
	p._addItem = function(value, basePath) {
		var item = this._createLoadItem(value);
		if (item == null) { return; } // Sometimes plugins or types should be skipped.
		var loader = this._createLoader(item, basePath);
		if (loader != null) {
			this._loadQueue.push(loader);
			this._loadQueueBackup.push(loader);

			this._numItems++;
			this._updateProgress();

			// Only worry about script order when using XHR to load scripts. Tags are only loading one at a time.
			if (this.maintainScriptOrder
					&& item.type == createjs.LoadQueue.JAVASCRIPT
					&& loader instanceof createjs.XHRLoader) {
				this._scriptOrder.push(item);
				this._loadedScripts.push(null);
			}
		}
	};

	/**
	 * Create a refined load item, which contains all the required properties (src, type, extension, tag). The type of
	 * item is determined by browser support, requirements based on the file type, and developer settings. For example,
	 * XHR is only used for file types that support it in new browsers.
	 *
	 * Before the item is returned, any plugins registered to handle the type or extension will be fired, which may
	 * alter the load item.
	 * @method _createLoadItem
	 * @param {String | Object | HTMLAudioElement | HTMLImageElement} value The item that needs to be preloaded.
	 * @return {Object} The loader instance that will be used.
	 * @private
	 */
	p._createLoadItem = function(value) {
		var item = null;

		// Create/modify a load item
		switch(typeof(value)) {
			case "string":
				item = {
					src: value
				}; break;
			case "object":
				if (window.HTMLAudioElement && value instanceof HTMLAudioElement) {
					item = {
						tag: value,
						src: item.tag.src,
						type: createjs.LoadQueue.SOUND
					};
				} else {
					item = value;
				}
				break;
			default:
				return null;
		}

		// Note: This does NOT account for basePath. It should be fine.
		var match = this._parseURI(item.src);
		if (match != null) { item.ext = match[5]; }
		if (item.type == null) {
			item.type = this._getTypeByExtension(item.ext);
		}

		if (item.type == createjs.LoadQueue.JSON && item.callback != null) {
			item.type = createjs.LoadQueue.JSONP;
		}

		if (item.type == createjs.LoadQueue.JSONP && item.callback == null) {
			throw new Error('callback is required for loading JSONP requests.');
		}

		// Create a tag for the item. This ensures there is something to either load with or populate when finished.
		if (item.tag == null) {
			item.tag = this._createTag(item.type);
		}

		// If there's no id, set one now.
		if (item.id == null || item.id == "") {
            item.id = item.src;
		}

		// Give plugins a chance to modify the loadItem:
		var customHandler = this._typeCallbacks[item.type] || this._extensionCallbacks[item.ext];
		if (customHandler) {
			var result = customHandler(item.src, item.type, item.id, item.data);
			//Plugin will handle the load, so just ignore it.
			if (result === false) {
				return null;

			// Load as normal:
			} else if (result === true) {
				// Do Nothing

			// Result is a loader class:
			} else {
				if (result.src != null) { item.src = result.src; }
				if (result.id != null) { item.id = result.id; }
				if (result.tag != null && result.tag.load instanceof Function) { //Item has what we need load
					item.tag = result.tag;
				}
                if (result.completeHandler != null) {item.completeHandler = result.completeHandler;}  // we have to call back this function when we are done loading
			}

			// Allow type overriding:
			if (result.type) { item.type = result.type; }

			// Update the extension in case the type changed:
			match = this._parseURI(item.src);
			if (match != null && match[5] != null) { item.ext = match[5].toLowerCase(); }
		}

		// Store the item for lookup. This also helps clean-up later.
		this._loadItemsById[item.id] = item;
		this._loadItemsBySrc[item.src] = item;

		return item;
	};

	/**
	 * Create a loader for a load item.
	 * @method _createLoader
	 * @param {Object} item A formatted load item that can be used to generate a loader.
	 * @param {String} basePath A path that will be prepended on to the source parameter of all items in the queue before they are loaded. Note that a basePath provided to any loadFile or loadManifest call will override the basePath specified on the LoadQueue constructor.
	 * @return {AbstractLoader} A loader that can be used to load content.
	 * @private
	 */
	p._createLoader = function(item, basePath) {
		// Initially, try and use the provided/supported XHR mode:
		var useXHR = this.useXHR;

		// Determine the XHR usage overrides:
		switch (item.type) {
			case createjs.LoadQueue.JSON:
			case createjs.LoadQueue.XML:
			case createjs.LoadQueue.TEXT:
				useXHR = true; // Always use XHR2 with text/XML
				break;
			case createjs.LoadQueue.SOUND:
			case createjs.LoadQueue.JSONP:
				useXHR = false; // Never load audio using XHR. WebAudio will provide its own loader.
				break;
			case null:
				return null;
			// Note: IMAGE, CSS, SCRIPT, SVG can all use TAGS or XHR.
		}

		// If no basepath was provided here (from _addItem), then use the LoadQueue._basePath instead.
		if (basePath == null) { basePath = this._basePath; }

		if (useXHR) {
			return new createjs.XHRLoader(item, basePath);
		} else {
			return new createjs.TagLoader(item, basePath);
		}
	};


	/**
	 * Load the next item in the queue. If the queue is empty (all items have been loaded), then the complete event
	 * is processed. The queue will "fill up" any empty slots, up to the max connection specified using
	 * {{#crossLink "LoadQueue.setMaxConnections"}}{{/crossLink}} method. The only exception is scripts that are loaded
	 * using tags, which have to be loaded one at a time to maintain load order.
	 * @method _loadNext
	 * @private
	 */
	p._loadNext = function() {
		if (this._paused) { return; }

		// Only dispatch loadstart event when the first file is loaded.
		if (!this._loadStartWasDispatched) {
			this._sendLoadStart();
			this._loadStartWasDispatched = true;
		}

		// The queue has completed.
		if (this._numItems == this._numItemsLoaded) {
			this.loaded = true;
			this._sendComplete();

			// Load the next queue, if it has been defined.
			if (this.next && this.next.load) {
				this.next.load();
			}
		} else {
			this.loaded = false;
		}

		// Must iterate forwards to load in the right order.
		for (var i=0; i<this._loadQueue.length; i++) {
			if (this._currentLoads.length >= this._maxConnections) { break; }
			var loader = this._loadQueue[i];

			// Determine if we should be only loading one at a time:
			if (this.maintainScriptOrder
					&& loader instanceof createjs.TagLoader
					&& loader.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
				if (this._currentlyLoadingScript) { continue; } // Later items in the queue might not be scripts.
				this._currentlyLoadingScript = true;
			}
			this._loadQueue.splice(i, 1);
  			i--;
            this._loadItem(loader);
		}
	};

	/**
	 * Begin loading an item. Events are not added to the loaders until the load starts.
	 * @method _loadItem
	 * @param {AbstractLoader} loader The loader instance to start. Currently, this will be an XHRLoader or TagLoader.
	 * @private
	 */
	p._loadItem = function(loader) {
		loader.addEventListener("progress", createjs.proxy(this._handleProgress, this));
		loader.addEventListener("complete", createjs.proxy(this._handleFileComplete, this));
		loader.addEventListener("error", createjs.proxy(this._handleFileError, this));
		this._currentLoads.push(loader);
		this._sendFileStart(loader.getItem());
		loader.load();
	};

	/**
	 * The callback that is fired when a loader encounters an error. The queue will continue loading unless {{#crossLink "LoadQueue/stopOnError:property"}}{{/crossLink}}
	 * is set to `true`.
	 * @method _handleFileError
	 * @param {Object} event The error event, containing relevant error information.
	 * @private
	 */
	p._handleFileError = function(event) {
		var loader = event.target;
		this._numItemsLoaded++;
		this._updateProgress();

		var event = new createjs.Event("error");
		event.text = "FILE_LOAD_ERROR";
		event.item = loader.getItem();
		// TOOD: Propagate actual error message.

		this._sendError(event);

		if (!this.stopOnError) {
			this._removeLoadItem(loader);
			this._loadNext();
		}
	};

	/**
	 * An item has finished loading. We can assume that it is totally loaded, has been parsed for immediate use, and
	 * is available as the "result" property on the load item. The raw text result for a parsed item (such as JSON, XML,
	 * CSS, JavaScript, etc) is available as the "rawResult" event, and can also be looked up using {{#crossLink "LoadQueue/getResult"}}{{/crossLink}}.
	 * @method _handleFileComplete
	 * @param {Object} event The event object from the loader.
	 * @private
	 */
	p._handleFileComplete = function(event) {
		var loader = event.target;
		var item = loader.getItem();

		this._loadedResults[item.id] = loader.getResult();
		if (loader instanceof createjs.XHRLoader) {
			this._loadedRawResults[item.id] = loader.getResult(true);
		}

		this._removeLoadItem(loader);

		// Ensure that script loading happens in the right order.
		if (this.maintainScriptOrder && item.type == createjs.LoadQueue.JAVASCRIPT) {
			if (loader instanceof createjs.TagLoader) {
				this._currentlyLoadingScript = false;
			} else {
				this._loadedScripts[createjs.indexOf(this._scriptOrder, item)] = item;
				this._checkScriptLoadOrder(loader);
				return;
			}
		}

		this._processFinishedLoad(item, loader);
	}

	p._processFinishedLoad = function(item, loader) {
		// Old handleFileTagComplete follows here.
		this._numItemsLoaded++;

		this._updateProgress();
		this._sendFileComplete(item, loader);

		this._loadNext();
	};

	/**
	 * Ensure the scripts load and dispatch in the correct order. When using XHR, scripts are stored in an array in the
	 * order they were added, but with a "null" value. When they are completed, the value is set to the load item,
	 * and then when they are processed and dispatched, the value is set to <code>true</code>. This method simply
	 * iterates the array, and ensures that any loaded items that are not preceded by a <code>null</code> value are
	 * dispatched.
	 * @method _checkScriptLoadOrder
	 * @private
	 */
	p._checkScriptLoadOrder = function () {
		var l = this._loadedScripts.length;

		for (var i=0;i<l;i++) {
			var item = this._loadedScripts[i];
			if (item === null) { break; } // This is still loading. Do not process further.
			if (item === true) { continue; } // This has completed, and been processed. Move on.

			// This item has finished, and is the next one to get dispatched.
			this._processFinishedLoad(item);
			this._loadedScripts[i] = true;
			i--; l--;
		}
	};

	/**
	 * A load item is completed or was canceled, and needs to be removed from the LoadQueue.
	 * @method _removeLoadItem
	 * @param {AbstractLoader} loader A loader instance to remove.
	 * @private
	 */
	p._removeLoadItem = function(loader) {
		var l = this._currentLoads.length;
		for (var i=0;i<l;i++) {
			if (this._currentLoads[i] == loader) {
				this._currentLoads.splice(i,1); break;
			}
		}
	};

	/**
	 * An item has dispatched progress. Propagate that progress, and update the LoadQueue overall progress.
	 * @method _handleProgress
	 * @param {Object} event The progress event from the item.
	 * @private
	 */
	p._handleProgress = function(event) {
		var loader = event.target;
		this._sendFileProgress(loader.getItem(), loader.progress);
		this._updateProgress();
	};

	/**
	 * Overall progress has changed, so determine the new progress amount and dispatch it. This changes any time an
	 * item dispatches progress or completes. Note that since we don't know the actual filesize of items before they are
	 * loaded, and even then we can only get the size of items loaded with XHR. In this case, we define a "slot" for
	 * each item (1 item in 10 would get 10%), and then append loaded progress on top of the already-loaded items.
	 *
	 * For example, if 5/10 items have loaded, and item 6 is 20% loaded, the total progress would be:<ul>
	 *      <li>5/10 of the items in the queue (50%)</li>
	 *      <li>plus 20% of item 6's slot (2%)</li>
	 *      <li>equals 52%</li></ul>
	 * @method _updateProgress
	 * @private
	 */
	p._updateProgress = function () {
		var loaded = this._numItemsLoaded / this._numItems; // Fully Loaded Progress
		var remaining = this._numItems-this._numItemsLoaded;
		if (remaining > 0) {
			var chunk = 0;
			for (var i=0, l=this._currentLoads.length; i<l; i++) {
				chunk += this._currentLoads[i].progress;
			}
			loaded += (chunk / remaining) * (remaining/this._numItems);
		}
		this._sendProgress(loaded);
	}

	/**
	 * Clean out item results, to free them from memory. Mainly, the loaded item and results are cleared from internal
	 * hashes.
	 * @method _disposeItem
	 * @param {Object} item The item that was passed in for preloading.
	 * @private
	 */
	p._disposeItem = function(item) {
		delete this._loadedResults[item.id];
		delete this._loadedRawResults[item.id];
		delete this._loadItemsById[item.id];
		delete this._loadItemsBySrc[item.src];
	};


	/**
	 * Create an HTML tag. This is in LoadQueue instead of {{#crossLink "TagLoader"}}{{/crossLink}} because no matter
	 * how we load the data, we may need to return it in a tag.
	 * @method _createTag
	 * @param {String} type The item type. Items are passed in by the developer, or deteremined by the extension.
	 * @return {HTMLImageElement|HTMLAudioElement|HTMLScriptElement|HTMLLinkElement|Object} The tag that is created.
	 * Note that tags are not appended to the HTML body.
	 * @private
	 */
	p._createTag = function(type) {
		var tag = null;
		switch (type) {
			case createjs.LoadQueue.IMAGE:
				return document.createElement("img");
			case createjs.LoadQueue.SOUND:
				tag = document.createElement("audio");
				tag.autoplay = false;
				// Note: The type property doesn't seem necessary.
				return tag;
			case createjs.LoadQueue.JSONP:
			case createjs.LoadQueue.JAVASCRIPT:
				tag = document.createElement("script");
				tag.type = "text/javascript";
				return tag;
			case createjs.LoadQueue.CSS:
				if (this.useXHR) {
					tag = document.createElement("style");
				} else {
					tag = document.createElement("link");
				}
				tag.rel  = "stylesheet";
				tag.type = "text/css";
				return tag;
			case createjs.LoadQueue.SVG:
				if (this.useXHR) {
					tag = document.createElement("svg");
				} else {
					tag = document.createElement("object");
					tag.type = "image/svg+xml";
				}
				return tag;
		}
		return null;
	};

	/**
	 * Determine the type of the object using common extensions. Note that the type can be passed in with the load item
	 * if it is an unusual extension.
	 * @param {String} extension The file extension to use to determine the load type.
	 * @return {String} The determined load type (for example, <code>LoadQueue.IMAGE</code> or null if it can not be
	 * determined by the extension.
	 * @private
	 */
	p._getTypeByExtension = function(extension) {
		if (extension == null) {
			return createjs.LoadQueue.TEXT;
		}
		switch (extension.toLowerCase()) {
			case "jpeg":
			case "jpg":
			case "gif":
			case "png":
			case "webp":
			case "bmp":
				return createjs.LoadQueue.IMAGE;
			case "ogg":
			case "mp3":
			case "wav":
				return createjs.LoadQueue.SOUND;
			case "json":
				return createjs.LoadQueue.JSON;
			case "xml":
				return createjs.LoadQueue.XML;
			case "css":
				return createjs.LoadQueue.CSS;
			case "js":
				return createjs.LoadQueue.JAVASCRIPT;
			case 'svg':
				return createjs.LoadQueue.SVG;
			default:
				return createjs.LoadQueue.TEXT;
		}
	};

	/**
	 * Dispatch a fileprogress event (and onFileProgress callback). Please see the <code>LoadQueue.fileprogress</code>
	 * event for details on the event payload.
	 * @method _sendFileProgress
	 * @param {Object} item The item that is being loaded.
	 * @param {Number} progress The amount the item has been loaded (between 0 and 1).
	 * @protected
	 */
	p._sendFileProgress = function(item, progress) {
		if (this._isCanceled()) {
			this._cleanUp();
			return;
		}
		if (!this.hasEventListener("fileprogress")) { return; }

		var event = new createjs.Event("fileprogress");
		event.progress = progress;
		event.loaded = progress;
		event.total = 1;
		event.item = item;

		this.dispatchEvent(event);
	};

	/**
	 * Dispatch a fileload event. Please see the {{#crossLink "LoadQueue/fileload:event"}}{{/crossLink}} event for
	 * details on the event payload.
	 * @method _sendFileComplete
	 * @param {Object} item The item that is being loaded.
	 * @param {TagLoader | XHRLoader} loader
	 * @protected
	 */
	p._sendFileComplete = function(item, loader) {
		if (this._isCanceled()) { return; }

		var event = new createjs.Event("fileload");
		event.loader = loader;
		event.item = item;
		event.result = this._loadedResults[item.id];
		event.rawResult = this._loadedRawResults[item.id];

        // This calls a handler specified on the actual load item. Currently, the SoundJS plugin uses this.
        if (item.completeHandler) {
            item.completeHandler(event);
        }

		this.hasEventListener("fileload") && this.dispatchEvent(event)
	};

	/**
	 * Dispatch a filestart event immediately before a file starts to load. Please see the {{#crossLink "LoadQueue/filestart:event"}}{{/crossLink}}
	 * event for details on the event payload.
	 * @method _sendFileStart
	 * @param {TagLoader | XHRLoader} loader
	 * @protected
	 */
	p._sendFileStart = function(item) {
		var event = new createjs.Event("filestart");
		event.item = item;
		this.hasEventListener("filestart") && this.dispatchEvent(event);
	};

	p.toString = function() {
		return "[PreloadJS LoadQueue]";
	};

	/**
	 * REMOVED.  Use createjs.proxy instead
	 * @method proxy
	 * @param {Function} method The function to call
	 * @param {Object} scope The scope to call the method name on
	 * @static
	 * @private
	 * @deprecated In favour of the createjs.proxy method (see LoadQueue source).
	 */

	createjs.LoadQueue = LoadQueue;


// Helper methods

	// An additional module to determine the current browser, version, operating system, and other environmental variables.
	var BrowserDetect = function() {}

	BrowserDetect.init = function() {
		var agent = navigator.userAgent;
		BrowserDetect.isFirefox = (agent.indexOf("Firefox") > -1);
		BrowserDetect.isOpera = (window.opera != null);
		BrowserDetect.isChrome = (agent.indexOf("Chrome") > -1);
		BrowserDetect.isIOS = agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1;
	}

	BrowserDetect.init();

	createjs.LoadQueue.BrowserDetect = BrowserDetect;

}());
/*
* TagLoader
* Visit http://createjs.com/ for documentation, updates and examples.
*
*
* Copyright (c) 2012 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module PreloadJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
	/**
	 * A preloader that loads items using a tag-based approach. HTML audio and images can use this loader to load
	 * content cross-domain without security errors, whereas anything loaded with XHR has potential issues with cross-
	 * domain requests.
	 *
	 * Note for audio tags, TagLoader relies on the <code>canPlayThrough</code> event, which fires when the buffer
	 * is full enough to play the audio all the way through at the current download speed. This completely preloads most
	 * sound effects, however longer tracks like background audio will only load a portion before the event is fired.
	 * Most browsers (all excluding Chrome) will continue to preload once this is fired, so this is considered good
	 * enough for most cases.
	 * @class TagLoader
	 * @constructor
	 * @extends AbstractLoader
	 * @param {Object} item The item to load. Please see {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} for
	 * information on load items.
	 */
	var TagLoader = function (item, basePath) {
		this.init(item, basePath);
	};

	var p = TagLoader.prototype = new createjs.AbstractLoader();

// Protected

	/**
	 * The timeout that is fired if nothing is loaded after a certain delay. See the <code>LoadQueue.LOAD_TIMEOUT</code>
	 * for the timeout duration.
	 * @property _loadTimeout
	 * @type {Number}
	 * @private
	 */
	p._loadTimeout = null;

	/**
	 * A reference to a bound function, which we need in order to properly remove the event handler when the load
	 * completes.
	 * @property _tagCompleteProxy
	 * @type {Function}
	 * @private
	 */
	p._tagCompleteProxy = null;

	/**
	 * Determines if the load item is an audio tag, since we take some specific approaches to properly load audio.
	 * @property _isAudio
	 * @type {Boolean}
	 * @default false
	 */
	p._isAudio = false;

	/**
	 * The HTML tag or JavaScript object this loader uses to preload content. Note that a tag may be a custom object
	 * that matches the API of an HTML tag (load method, onload callback). For example, flash audio from SoundJS passes
	 * in a custom object to handle preloading for Flash audio and WebAudio.
	 * @property _tag
	 * @type {HTMLAudioElement | Object}
	 * @private
	 */
	p._tag = null;

	/**
	 * When loading a JSONP request this will be the parsed JSON result.
	 *
	 * @type {Object}
	 * @private
	 */
	p._jsonResult = null;

	// Overrides abstract method in AbstractLoader
	p.init = function (item, basePath) {
		this._item = item;
		this._basePath = basePath;
		this._tag = item.tag;
		this._isAudio = (window.HTMLAudioElement && item.tag instanceof HTMLAudioElement);
		this._tagCompleteProxy = createjs.proxy(this._handleLoad, this);
	};

	/**
	 * Get the loaded content. This is usually an HTML tag or other tag-style object that has been fully loaded. If the
	 * loader is not complete, this will be null.
	 * @method getResult
	 * @return {HTMLImageElement | HTMLAudioElement | Object} The loaded and parsed content.
	 */
	p.getResult = function() {
		if (this._item.type == createjs.LoadQueue.JSONP) {
			return this._jsonResult;
		} else {
			return this._tag;
		}
	};

	// Overrides abstract method in AbstractLoader
	p.cancel = function() {
		this.canceled = true;
		this._clean();
		var item = this.getItem();
	};

	// Overrides abstract method in AbstractLoader
	p.load = function() {
		var item = this._item;
		var tag = this._tag;

		// In case we don't get any events.
		clearTimeout(this._loadTimeout); // Clear out any existing timeout
		this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);

		if (this._isAudio) {
			tag.src = null; // Unset the source so we can set the preload type to "auto" without kicking off a load. This is only necessary for audio tags passed in by the developer.
			tag.preload = "auto";
		}

		// Handlers for all tags
		tag.onerror = createjs.proxy(this._handleError,  this);
		// Note: We only get progress events in Chrome, but do not fully load tags in Chrome due to its behaviour, so we ignore progress.

		if (this._isAudio) {
			tag.onstalled = createjs.proxy(this._handleStalled,  this);
			// This will tell us when audio is buffered enough to play through, but not when its loaded.
			// The tag doesn't keep loading in Chrome once enough has buffered, and we have decided that behaviour is sufficient.
			tag.addEventListener("canplaythrough", this._tagCompleteProxy, false); // canplaythrough callback doesn't work in Chrome, so we use an event.
		} else {
			tag.onload = createjs.proxy(this._handleLoad,  this);
			tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange,  this);
		}

		var src = this.buildPath(item.src, this._basePath, item.values);

		// Set the src after the events are all added.
		switch(item.type) {
			case createjs.LoadQueue.CSS:
				tag.href = src;
				break;
			case createjs.LoadQueue.SVG:
				tag.data = src;
				break;
			default:
				tag.src = src;
		}

		// If we're loading JSONP, we need to add our callback now.
		if (item.type == createjs.LoadQueue.JSONP) {
			if (item.callback == null) {
				throw new Error('callback is required for loading JSONP requests.');
			}

			if (window[item.callback] != null) {
				throw new Error('JSONP callback "' + item.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
			}

			window[item.callback] = createjs.proxy(this._handleJSONPLoad, this);
		}

		// If its SVG, it needs to be on the DOM to load (we remove it before sending complete).
		// It is important that this happens AFTER setting the src/data.
		if (item.type == createjs.LoadQueue.SVG ||
			item.type == createjs.LoadQueue.JSONP ||
			item.type == createjs.LoadQueue.JSON ||
			item.type == createjs.LoadQueue.JAVASCRIPT ||
			item.type == createjs.LoadQueue.CSS) {
				this._startTagVisibility = tag.style.visibility;
				tag.style.visibility = "hidden";
				(document.body || document.getElementsByTagName("body")[0]).appendChild(tag);
		}

		// Note: Previous versions didn't seem to work when we called load() for OGG tags in Firefox. Seems fixed in 15.0.1
		if (tag.load != null) {
			tag.load();
		}
	};

	p._handleJSONPLoad = function(data) {
		this._jsonResult = data;
	};

	/**
	 * Handle an audio timeout. Newer browsers get a callback from the tags, but older ones may require a setTimeout
	 * to handle it. The setTimeout is always running until a response is handled by the browser.
	 * @method _handleTimeout
	 * @private
	 */
	p._handleTimeout = function() {
		this._clean();
		var event = new createjs.Event("error");
		event.text = "PRELOAD_TIMEOUT";
		this._sendError(event);
	};

	/**
	 * Handle a stalled audio event. The main place we seem to get these is with HTMLAudio in Chrome when we try and
	 * playback audio that is already in a load, but not complete.
	 * @method _handleStalled
	 * @private
	 */
	p._handleStalled = function() {
		//Ignore, let the timeout take care of it. Sometimes its not really stopped.
	};

	/**
	 * Handle an error event generated by the tag.
	 * @method _handleError
	 * @private
	 */
	p._handleError = function(event) {
		this._clean();

		var newEvent = new createjs.Event("error");
		//TODO: Propagate actual event error?
		this._sendError(newEvent);
	};

	/**
	 * Handle the readyStateChange event from a tag. We sometimes need this in place of the onload event (mainly SCRIPT
	 * and LINK tags), but other cases may exist.
	 * @method _handleReadyStateChange
	 * @private
	 */
	p._handleReadyStateChange = function() {
		clearTimeout(this._loadTimeout);
		// This is strictly for tags in browsers that do not support onload.
		var tag = this.getItem().tag;

		// Complete is for old IE support.
		if (tag.readyState == "loaded" || tag.readyState == "complete") {
			this._handleLoad();
		}
	};

	/**
	 * Handle a load (complete) event. This is called by tag callbacks, but also by readyStateChange and canPlayThrough
	 * events. Once loaded, the item is dispatched to the {{#crossLink "LoadQueue"}}{{/crossLink}}.
	 * @method _handleLoad
	 * @param {Object} [event] A load event from a tag. This is sometimes called from other handlers without an event.
	 * @private
	 */
	p._handleLoad = function(event) {
		if (this._isCanceled()) { return; }

		var item = this.getItem();
		var tag = item.tag;

		if (this.loaded || this.isAudio && tag.readyState !== 4) { return; } //LM: Not sure if we still need the audio check.
		this.loaded = true;

		// Remove from the DOM
		switch (item.type) {
			case createjs.LoadQueue.SVG:
			case createjs.LoadQueue.JSONP:
				// case createjs.LoadQueue.CSS:
				//LM: We may need to remove CSS tags loaded using a LINK
				tag.style.visibility = this._startTagVisibility;
				(document.body || document.getElementsByTagName("body")[0]).removeChild(tag);
			break;
			default:
		}

		this._clean();
		this._sendComplete();
	};

	/**
	 * Clean up the loader.
	 * This stops any timers and removes references to prevent errant callbacks and clean up memory.
	 * @method _clean
	 * @private
	 */
	p._clean = function() {
		clearTimeout(this._loadTimeout);

		// Delete handlers.
		var tag = this.getItem().tag;
		tag.onload = null;
		tag.removeEventListener && tag.removeEventListener("canplaythrough", this._tagCompleteProxy, false);
		tag.onstalled = null;
		tag.onprogress = null;
		tag.onerror = null;

		//TODO: Test this
		if (tag.parentNode) {
			tag.parentNode.removeChild(tag);
		}

		var item = this.getItem();
		if (item.type == createjs.LoadQueue.JSONP) {
			window[item.callback] = null;
		}
	};

	p.toString = function() {
		return "[PreloadJS TagLoader]";
	}

	createjs.TagLoader = TagLoader;

}());
/*
 * XHRLoader
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module PreloadJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
	"use strict";

	/**
	 * A preloader that loads items using XHR requests, usually XMLHttpRequest. However XDomainRequests will be used
	 * for cross-domain requests if possible, and older versions of IE fall back on to ActiveX objects when necessary.
	 * XHR requests load the content as text or binary data, provide progress and consistent completion events, and
	 * can be canceled during load. Note that XHR is not supported in IE 6 or earlier, and is not recommended for
	 * cross-domain loading.
	 * @class XHRLoader
	 * @constructor
	 * @param {Object} item The object that defines the file to load. Please see the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}}
	 * for an overview of supported file properties.
	 * @extends AbstractLoader
	 */
	var XHRLoader = function (item, basePath) {
		this.init(item, basePath);
	};

	var p = XHRLoader.prototype = new createjs.AbstractLoader();

	//Protected
	/**
	 * A reference to the XHR request used to load the content.
	 * @property _request
	 * @type {XMLHttpRequest | XDomainRequest | ActiveX.XMLHTTP}
	 * @private
	 */
	p._request = null;

	/**
	 * A manual load timeout that is used for browsers that do not support the onTimeout event on XHR (XHR level 1,
	 * typically IE9).
	 * @property _loadTimeout
	 * @type {Number}
	 * @private
	 */
	p._loadTimeout = null;

	/**
	 * The browser's XHR (XMLHTTPRequest) version. Supported versions are 1 and 2. There is no official way to detect
	 * the version, so we use capabilities to make a best guess.
	 * @property _xhrLevel
	 * @type {Number}
	 * @default 1
	 * @private
	 */
	p._xhrLevel = 1;

	/**
	 * The response of a loaded file. This is set because it is expensive to look up constantly. This property will be
	 * null until the file is loaded.
	 * @property _response
	 * @type {mixed}
	 * @private
	 */
	p._response = null;

	/**
	 * The response of the loaded file before it is modified. In most cases, content is converted from raw text to
	 * an HTML tag or a formatted object which is set to the <code>result</code> property, but the developer may still
	 * want to access the raw content as it was loaded.
	 * @property _rawResponse
	 * @type {String|Object}
	 * @private
	 */
	p._rawResponse = null;

	// Overrides abstract method in AbstractLoader
	p.init = function (item, basePath) {
		this._item = item;
		this._basePath = basePath;
		if (!this._createXHR(item)) {
			//TODO: Throw error?
		}
	};

	/**
	 * Look up the loaded result.
	 * @method getResult
	 * @param {Boolean} [rawResult=false] Return a raw result instead of a formatted result. This applies to content
	 * loaded via XHR such as scripts, XML, CSS, and Images. If there is no raw result, the formatted result will be
	 * returned instead.
	 * @return {Object} A result object containing the content that was loaded, such as:
	 * <ul>
	 *      <li>An image tag (&lt;image /&gt;) for images</li>
	 *      <li>A script tag for JavaScript (&lt;script /&gt;). Note that scripts loaded with tags may be added to the
	 *      HTML head.</li>
	 *      <li>A style tag for CSS (&lt;style /&gt;)</li>
	 *      <li>Raw text for TEXT</li>
	 *      <li>A formatted JavaScript object defined by JSON</li>
	 *      <li>An XML document</li>
	 *      <li>An binary arraybuffer loaded by XHR</li>
	 * </ul>
	 * Note that if a raw result is requested, but not found, the result will be returned instead.
	 */
	p.getResult = function (rawResult) {
		if (rawResult && this._rawResponse) {
			return this._rawResponse;
		}
		return this._response;
	};

	// Overrides abstract method in AbstractLoader
	p.cancel = function () {
		this.canceled = true;
		this._clean();
		this._request.abort();
	};

	// Overrides abstract method in AbstractLoader
	p.load = function () {
		if (this._request == null) {
			this._handleError();
			return;
		}

		//Events
		this._request.onloadstart = createjs.proxy(this._handleLoadStart, this);
		this._request.onprogress = createjs.proxy(this._handleProgress, this);
		this._request.onabort = createjs.proxy(this._handleAbort, this);
		this._request.onerror = createjs.proxy(this._handleError, this);
		this._request.ontimeout = createjs.proxy(this._handleTimeout, this);
		// Set up a timeout if we don't have XHR2
		if (this._xhrLevel == 1) {
			this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
		}

		// Note: We don't get onload in all browsers (earlier FF and IE). onReadyStateChange handles these.
		this._request.onload = createjs.proxy(this._handleLoad, this);

		this._request.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);

		// Sometimes we get back 404s immediately, particularly when there is a cross origin request.  // note this does not catch in Chrome
		try {
			if (!this._item.values || this._item.method == createjs.LoadQueue.GET) {
				this._request.send();
			} else if (this._item.method == createjs.LoadQueue.POST) {
				this._request.send(this._formatQueryString(this._item.values));
			}
		} catch (error) {
			var event = new createjs.Event("error");
			event.error = error;
			this._sendError(event);
		}
	};

	/**
	 * Get all the response headers from the XmlHttpRequest.
	 *
	 * <strong>From the docs:</strong> Return all the HTTP headers, excluding headers that are a case-insensitive match
	 * for Set-Cookie or Set-Cookie2, as a single string, with each header line separated by a U+000D CR U+000A LF pair,
	 * excluding the status line, and with each header name and header value separated by a U+003A COLON U+0020 SPACE
	 * pair.
	 * @method getAllResponseHeaders
	 * @return {String}
	 * @since 0.4.1
	 */
	p.getAllResponseHeaders = function () {
		if  (this._request.getAllResponseHeaders instanceof Function) {
			return this._request.getAllResponseHeaders();
		} else {
			return null;
		}
	};

	/**
	 * Get a specific response header from the XmlHttpRequest.
	 *
	 * <strong>From the docs:</strong> Returns the header field value from the response of which the field name matches
	 * header, unless the field name is Set-Cookie or Set-Cookie2.
	 * @method getResponseHeader
	 * @param {String} header The header name to retrieve.
	 * @return {String}
	 * @since 0.4.1
	 */
	p.getResponseHeader = function (header) {
		if (this._request.getResponseHeader instanceof Function) {
			return this._request.getResponseHeader(header);
		} else {
			return null;
		}
	};

	/**
	 * The XHR request has reported progress.
	 * @method _handleProgress
	 * @param {Object} event The XHR progress event.
	 * @private
	 */
	p._handleProgress = function (event) {
		if (!event || event.loaded > 0 && event.total == 0) {
			return; // Sometimes we get no "total", so just ignore the progress event.
		}

		var newEvent = new createjs.Event("progress");
		newEvent.loaded = event.loaded;
		newEvent.total = event.total;
		this._sendProgress(newEvent);
	};

	/**
	 * The XHR request has reported a load start.
	 * @method _handleLoadStart
	 * @param {Object} event The XHR loadStart event.
	 * @private
	 */
	p._handleLoadStart = function (event) {
		clearTimeout(this._loadTimeout);
		this._sendLoadStart();
	};

	/**
	 * The XHR request has reported an abort event.
	 * @method handleAbort
	 * @param {Object} event The XHR abort event.
	 * @private
	 */
	p._handleAbort = function (event) {
		this._clean();
		var event = new createjs.Event("error");
		event.text = "XHR_ABORTED";
		this._sendError(event);
	};

	/**
	 * The XHR request has reported an error event.
	 * @method _handleError
	 * @param {Object} event The XHR error event.
	 * @private
	 */
	p._handleError = function (event) {
		this._clean();
		var newEvent = new createjs.Event("error");
		//TODO: Propagate event error
		this._sendError(newEvent);
	};

	/**
	 * The XHR request has reported a readyState change. Note that older browsers (IE 7 & 8) do not provide an onload
	 * event, so we must monitor the readyStateChange to determine if the file is loaded.
	 * @method _handleReadyStateChange
	 * @param {Object} event The XHR readyStateChange event.
	 * @private
	 */
	p._handleReadyStateChange = function (event) {
		if (this._request.readyState == 4) {
			this._handleLoad();
		}
	};

	/**
	 * The XHR request has completed. This is called by the XHR request directly, or by a readyStateChange that has
	 * <code>request.readyState == 4</code>. Only the first call to this method will be processed.
	 * @method _handleLoad
	 * @param {Object} event The XHR load event.
	 * @private
	 */
	p._handleLoad = function (event) {
		if (this.loaded) {
			return;
		}
		this.loaded = true;

		if (!this._checkError()) {
			this._handleError();
			return;
		}

		this._response = this._getResponse();
		this._clean();
		var isComplete = this._generateTag();
		if (isComplete) {
			this._sendComplete();
		}
	};

	/**
	 * The XHR request has timed out. This is called by the XHR request directly, or via a <code>setTimeout</code>
	 * callback.
	 * @method _handleTimeout
	 * @param {Object} [event] The XHR timeout event. This is occasionally null when called by the backup setTimeout.
	 * @private
	 */
	p._handleTimeout = function (event) {
		this._clean();
		var newEvent = new createjs.Event("error");
		newEvent.text = "PRELOAD_TIMEOUT";
		//TODO: Propagate actual event error
		this._sendError(event);
	};


// Protected
	/**
	 * Determine if there is an error in the current load. This checks the status of the request for problem codes. Note
	 * that this does not check for an actual response. Currently, it only checks for 404 or 0 error code.
	 * @method _checkError
	 * @return {Boolean} If the request status returns an error code.
	 * @private
	 */
	p._checkError = function () {
		//LM: Probably need additional handlers here, maybe 501
		var status = parseInt(this._request.status);

		switch (status) {
			case 404:   // Not Found
			case 0:     // Not Loaded
				return false;
		}
		return true;
	};

	/**
	 * Validate the response. Different browsers have different approaches, some of which throw errors when accessed
	 * in other browsers. If there is no response, the <code>_response</code> property will remain null.
	 * @method _getResponse
	 * @private
	 */
	p._getResponse = function () {
		if (this._response != null) {
			return this._response;
		}

		if (this._request.response != null) {
			return this._request.response;
		}

		// Android 2.2 uses .responseText
		try {
			if (this._request.responseText != null) {
				return this._request.responseText;
			}
		} catch (e) {
		}

		// When loading XML, IE9 does not return .response, instead it returns responseXML.xml
		//TODO: TEST
		try {
			if (this._request.responseXML != null) {
				return this._request.responseXML;
			}
		} catch (e) {
		}
		return null;
	};

	/**
	 * Create an XHR request. Depending on a number of factors, we get totally different results.
	 * <ol><li>Some browsers get an <code>XDomainRequest</code> when loading cross-domain.</li>
	 *      <li>XMLHttpRequest are created when available.</li>
	 *      <li>ActiveX.XMLHTTP objects are used in older IE browsers.</li>
	 *      <li>Text requests override the mime type if possible</li>
	 *      <li>Origin headers are sent for crossdomain requests in some browsers.</li>
	 *      <li>Binary loads set the response type to "arraybuffer"</li></ol>
	 * @method _createXHR
	 * @param {Object} item The requested item that is being loaded.
	 * @return {Boolean} If an XHR request or equivalent was successfully created.
	 * @private
	 */
	p._createXHR = function (item) {
		// Check for cross-domain loads. We can't fully support them, but we can try.
		var target = document.createElement("a");
		target.href = this.buildPath(item.src, this._basePath);

		var host = document.createElement("a");
		host.href = location.href;

		var crossdomain = (target.hostname != "") &&
						 	(target.port != host.port ||
							 target.protocol != host.protocol ||
							 target.hostname != host.hostname);

		// Create the request. Fall back to whatever support we have.
		var req = null;
		if (crossdomain && window.XDomainRequest) {
			req = new XDomainRequest(); // Note: IE9 will fail if this is not actually cross-domain.
		} else if (window.XMLHttpRequest) { // Old IE versions use a different approach
			req = new XMLHttpRequest();
		} else {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch (e) {
				try {
					req = new ActiveXObject("Msxml2.XMLHTTP.3.0");
				} catch (e) {
					try {
						req = new ActiveXObject("Msxml2.XMLHTTP");
					} catch (e) {
						return false;
					}
				}
			}
		}

		// IE9 doesn't support overrideMimeType(), so we need to check for it.
		if (item.type == createjs.LoadQueue.TEXT && req.overrideMimeType) {
			req.overrideMimeType("text/plain; charset=x-user-defined");
		}

		// Determine the XHR level
		this._xhrLevel = (typeof req.responseType === "string") ? 2 : 1;

		var src = null;
		if (item.method == createjs.LoadQueue.GET) {
			src = this.buildPath(item.src, this._basePath, item.values);
		} else {
			src = this.buildPath(item.src, this._basePath);
		}

		// Open the request.  Set cross-domain flags if it is supported (XHR level 1 only)
		req.open(item.method || createjs.LoadQueue.GET, src, true);

		if (crossdomain && req instanceof XMLHttpRequest && this._xhrLevel == 1) {
			req.setRequestHeader("Origin", location.origin);
		}

		// To send data we need to set the Content-type header)
		 if (item.values && item.method == createjs.LoadQueue.POST) {
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		 }

		// Binary files are loaded differently.
		if (createjs.LoadQueue.isBinary(item.type)) {
			req.responseType = "arraybuffer";
		}

		this._request = req;
		return true;
	};

	/**
	 * A request has completed (or failed or canceled), and needs to be disposed.
	 * @method _clean
	 * @private
	 */
	p._clean = function () {
		clearTimeout(this._loadTimeout);

		var req = this._request;
		req.onloadstart = null;
		req.onprogress = null;
		req.onabort = null;
		req.onerror = null;
		req.onload = null;
		req.ontimeout = null;
		req.onloadend = null;
		req.onreadystatechange = null;
	};

	/**
	 * Generate a tag for items that can be represented as tags. For example, IMAGE, SCRIPT, and LINK. This also handles
	 * XML and SVG objects.
	 * @method _generateTag
	 * @return {Boolean} If a tag was generated and is ready for instantiation. If it still needs processing, this
	 * method returns false.
	 * @private
	 */
	p._generateTag = function () {
		var type = this._item.type;
		var tag = this._item.tag;

		switch (type) {
			// Note: Images need to wait for onload, but do use the cache.
			case createjs.LoadQueue.IMAGE:
				tag.onload = createjs.proxy(this._handleTagReady, this);
				tag.src = this.buildPath(this._item.src, this._basePath, this._item.values);

				this._rawResponse = this._response;
				this._response = tag;
				return false; // Images need to get an onload event first

			case createjs.LoadQueue.JAVASCRIPT:
				tag = document.createElement("script");
				tag.text = this._response;

				this._rawResponse = this._response;
				this._response = tag;
				return true;

			case createjs.LoadQueue.CSS:
				// Maybe do this conditionally?
				var head = document.getElementsByTagName("head")[0]; //Note: This is unavoidable in IE678
				head.appendChild(tag);

				if (tag.styleSheet) { // IE
					tag.styleSheet.cssText = this._response;
				} else {
					var textNode = document.createTextNode(this._response);
					tag.appendChild(textNode);
				}

				this._rawResponse = this._response;
				this._response = tag;
				return true;

			case createjs.LoadQueue.XML:
				var xml = this._parseXML(this._response, "text/xml");
				this._response = xml;
				return true;

			case createjs.LoadQueue.SVG:
				var xml = this._parseXML(this._response, "image/svg+xml");
				this._rawResponse = this._response;
				if (xml.documentElement != null) {
					tag.appendChild(xml.documentElement);
					this._response = tag;
				} else { // For browsers that don't support SVG, just give them the XML. (IE 9-8)
					this._response = xml;
				}
				return true;

			case createjs.LoadQueue.JSON:
				var json = {};
				try {
					json = JSON.parse(this._response);
				} catch (error) {
					json = error;
				}

				this._rawResponse = this._response;
				this._response = json;
				return true;

		}
		return true;
	};

	/**
	 * Parse XML using the DOM. This is required when preloading XML or SVG.
	 * @method _parseXML
	 * @param {String} text The raw text or XML that is loaded by XHR.
	 * @param {String} type The mime type of the XML.
	 * @return {XML} An XML document.
	 * @private
	 */
	p._parseXML = function (text, type) {
		var xml = null;
		if (window.DOMParser) {
			var parser = new DOMParser();
			xml = parser.parseFromString(text, type);  // OJR Opera throws DOMException: NOT_SUPPORTED_ERR  // potential solution https://gist.github.com/1129031
		} else { // IE
			xml = new ActiveXObject("Microsoft.XMLDOM");
			xml.async = false;
			xml.loadXML(text);
		}
		return xml;
	};

	/**
	 * A generated tag is now ready for use.
	 * @method _handleTagReady
	 * @private
	 */
	p._handleTagReady = function () {
		this._sendComplete();
	}

	p.toString = function () {
		return "[PreloadJS XHRLoader]";
	}

	createjs.XHRLoader = XHRLoader;

}());

/**
 * Include json2 here, to correctly parse json.
 * Used on browsers that don't have a native JSON object.
 *
 */
/*
 json2.js
 2012-10-08

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 See http://www.JSON.org/js.html


 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.
 */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
	JSON = {};
}

(function () {
	'use strict';

	function f(n) {
		// Format integers to have at least two digits.
		return n < 10 ? '0' + n : n;
	}

	if (typeof Date.prototype.toJSON !== 'function') {

		Date.prototype.toJSON = function (key) {

			return isFinite(this.valueOf())
					? this.getUTCFullYear() + '-' +
					f(this.getUTCMonth() + 1) + '-' +
					f(this.getUTCDate()) + 'T' +
					f(this.getUTCHours()) + ':' +
					f(this.getUTCMinutes()) + ':' +
					f(this.getUTCSeconds()) + 'Z'
					: null;
		};

		String.prototype.toJSON =
				Number.prototype.toJSON =
						Boolean.prototype.toJSON = function (key) {
							return this.valueOf();
						};
	}

	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap,
			indent,
			meta = {    // table of character substitutions
				'\b':'\\b',
				'\t':'\\t',
				'\n':'\\n',
				'\f':'\\f',
				'\r':'\\r',
				'"':'\\"',
				'\\':'\\\\'
			},
			rep;


	function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
			var c = meta[a];
			return typeof c === 'string'
					? c
					: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + string + '"';
	}


	function str(key, holder) {

// Produce a string from holder[key].

		var i, // The loop counter.
				k, // The member key.
				v, // The member value.
				length,
				mind = gap,
				partial,
				value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

		if (value && typeof value === 'object' &&
				typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}

// What happens next depends on the value's type.

		switch (typeof value) {
			case 'string':
				return quote(value);

			case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

				return isFinite(value) ? String(value) : 'null';

			case 'boolean':
			case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

				return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

			case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

				if (!value) {
					return 'null';
				}

// Make an array to hold the partial results of stringifying this object value.

				gap += indent;
				partial = [];

// Is the value an array?

				if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || 'null';
					}

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

					v = partial.length === 0
							? '[]'
							: gap
							? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
							: '[' + partial.join(',') + ']';
					gap = mind;
					return v;
				}

// If the replacer is an array, use it to select the members to be stringified.

				if (rep && typeof rep === 'object') {
					length = rep.length;
					for (i = 0; i < length; i += 1) {
						if (typeof rep[i] === 'string') {
							k = rep[i];
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				} else {

// Otherwise, iterate through all of the keys in the object.

					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

				v = partial.length === 0
						? '{}'
						: gap
						? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
						: '{' + partial.join(',') + '}';
				gap = mind;
				return v;
		}
	}

// If the JSON object does not yet have a stringify method, give it one.

	if (typeof JSON.stringify !== 'function') {
		JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

			var i;
			gap = '';
			indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}

// If the space parameter is a string, it will be used as the indent string.

			} else if (typeof space === 'string') {
				indent = space;
			}

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

			rep = replacer;
			if (replacer && typeof replacer !== 'function' &&
					(typeof replacer !== 'object' ||
							typeof replacer.length !== 'number')) {
				throw new Error('JSON.stringify');
			}

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

			return str('', {'':value});
		};
	}


// If the JSON object does not yet have a parse method, give it one.

	if (typeof JSON.parse !== 'function') {
		JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

			var j;

			function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function (a) {
					return '\\u' +
							('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

			if (/^[\],:{}\s]*$/
					.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
								  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
								  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

				j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

				return typeof reviver === 'function'
						? walk({'':j}, '')
						: j;
			}

// If the text is not JSON parseable, then a SyntaxError is thrown.

			throw new SyntaxError('JSON.parse');
		};
	}
}());
/**
 * @module SoundJS
 */
this.createjs = this.createjs || {};

(function () {

	/**
	 * Static class holding library specific information such as the version and buildDate of the library.
	 * The SoundJS class has been renamed {{#crossLink "Sound"}}{{/crossLink}}.  Please see {{#crossLink "Sound"}}{{/crossLink}}
	 * for information on using sound.
	 * @class SoundJS
	 **/
	var s = createjs.SoundJS = createjs.SoundJS || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*version*/"NEXT"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*date*/"Tue, 01 Oct 2013 16:03:38 GMT"; // injected by build process

})();
/*
 * Sound
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


// namespace:
this.createjs = this.createjs || {};

/**
 * The SoundJS library manages the playback of audio on the web. It works via plugins which abstract the actual audio
 * implementation, so playback is possible on any platform without specific knowledge of what mechanisms are necessary
 * to play sounds.
 *
 * To use SoundJS, use the public API on the {{#crossLink "Sound"}}{{/crossLink}} class. This API is for:
 * <ul><li>Installing audio playback Plugins</li>
 *      <li>Registering (and preloading) sounds</li>
 *      <li>Creating and playing sounds</li>
 *      <li>Master volume, mute, and stop controls for all sounds at once</li>
 * </ul>
 *
 * <b>Please note that as of version 0.4.0, the "SoundJS" object only provides version information. All APIs from
 * SoundJS are now available on the {{#crossLink "Sound"}}{{/crossLink}} class.</b>
 *
 * <b>Controlling Sounds</b><br />
 * Playing sounds creates {{#crossLink "SoundInstance"}}{{/crossLink}} instances, which can be controlled individually.
 * <ul><li>Pause, resume, seek, and stop sounds</li>
 *      <li>Control a sound's volume, mute, and pan</li>
 *      <li>Listen for events on sound instances to get notified when they finish, loop, or fail</li>
 * </ul>
 *
 * <h4>Feature Set Example</h4>
 *      createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, this));
 *      createjs.Sound.registerSound("path/to/mySound.mp3|path/to/mySound.ogg", "sound");
 *      function loadHandler(event) {
 *          // This is fired for each sound that is registered.
 *          var instance = createjs.Sound.play("sound");  // play using id.  Could also use full sourcepath or event.src.
 *          instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
 *          instance.volume = 0.5;
 *      }
 *
 * <h4>Browser Support</h4>
 * Audio will work in browsers which support HTMLAudioElement (<a href="http://caniuse.com/audio">http://caniuse.com/audio</a>)
 * or WebAudio (<a href="http://caniuse.com/audio-api">http://caniuse.com/audio-api</a>). A Flash fallback can be added
 * as well, which will work in any browser that supports the Flash player.
 * @module SoundJS
 * @main SoundJS
 */

(function () {

	"use strict";

	//TODO: Interface to validate plugins and throw warnings
	//TODO: Determine if methods exist on a plugin before calling  // OJR this is only an issue if something breaks or user changes something
	//TODO: Interface to validate instances and throw warnings
	//TODO: Surface errors on audio from all plugins
	//TODO: Timeouts  // OJR for?
	/**
	 * The Sound class is the public API for creating sounds, controlling the overall sound levels, and managing plugins.
	 * All Sound APIs on this class are static.
	 *
	 * <b>Registering and Preloading</b><br />
	 * Before you can play a sound, it <b>must</b> be registered. You can do this with {{#crossLink "Sound/registerSound"}}{{/crossLink}},
	 * or register multiple sounds using {{#crossLink "Sound/registerManifest"}}{{/crossLink}}. If you don't register a
	 * sound prior to attempting to play it using {{#crossLink "Sound/play"}}{{/crossLink}} or create it using {{#crossLink "Sound/createInstance"}}{{/crossLink}},
	 * the sound source will be automatically registered but playback will fail as the source will not be ready. If you use
	 * <a href="http://preloadjs.com" target="_blank">PreloadJS</a>, this is handled for you when the sound is
	 * preloaded. It is recommended to preload sounds either internally using the register functions or externally using
	 * PreloadJS so they are ready when you want to use them.
	 *
	 * <b>Playback</b><br />
	 * To play a sound once it's been registered and preloaded, use the {{#crossLink "Sound/play"}}{{/crossLink}} method.
	 * This method returns a {{#crossLink "SoundInstance"}}{{/crossLink}} which can be paused, resumed, muted, etc.
	 * Please see the {{#crossLink "SoundInstance"}}{{/crossLink}} documentation for more on the instance control APIs.
	 *
	 * <b>Plugins</b><br />
	 * By default, the {{#crossLink "WebAudioPlugin"}}{{/crossLink}} or the {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}
	 * are used (when available), although developers can change plugin priority or add new plugins (such as the
	 * provided {{#crossLink "FlashPlugin"}}{{/crossLink}}). Please see the {{#crossLink "Sound"}}{{/crossLink}} API
	 * methods for more on the playback and plugin APIs. To install plugins, or specify a different plugin order, see
	 * {{#crossLink "Sound/installPlugins"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
	 *      createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, (this));
	 *      createjs.Sound.registerSound("path/to/mySound.mp3|path/to/mySound.ogg", "sound");
	 *      function loadHandler(event) {
     *          // This is fired for each sound that is registered.
     *          var instance = createjs.Sound.play("sound");  // play using id.  Could also use full source path or event.src.
     *          instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
     *          instance.volume = 0.5;
	 *      }
	 *
	 * The maximum number of concurrently playing instances of the same sound can be specified in the "data" argument
	 * of {{#crossLink "Sound/registerSound"}}{{/crossLink}}.  Note that if not specified, the active plugin will apply
	 * a default limit.  Currently HTMLAudioPlugin sets a default limit of 2, while WebAudioPlugin and FlashPlugin set a
	 * default limit of 100.
	 *
	 *      createjs.Sound.registerSound("sound.mp3", "soundId", 4);
	 *
	 * Sound can be used as a plugin with PreloadJS to help preload audio properly. Audio preloaded with PreloadJS is
	 * automatically registered with the Sound class. When audio is not preloaded, Sound will do an automatic internal
	 * load. As a result, it may not play immediately the first time play is called. Use the
	 * {{#crossLink "Sound/fileload"}}{{/crossLink}} event to determine when a sound has finished internally preloading.
	 * It is recommended that all audio is preloaded before it is played.
	 *
	 *      createjs.PreloadJS.installPlugin(createjs.Sound);
	 *
	 * <b>Mobile Safe Approach</b><br />
	 * Mobile devices require sounds to be played inside of a user initiated event (touch/click) in varying degrees.
	 * As of SoundJS 0.4.1, you can launch a site inside of a user initiated event and have audio playback work. To
	 * enable as broadly as possible, the site needs to setup the Sound plugin in its initialization (for example via
	 * <code>createjs.Sound.initializeDefaultPlugins();</code>), and all sounds need to be played in the scope of the
	 * application.  See the MobileSafe demo for a working example.
	 *
	 * <h4>Example</h4>
	 *     document.getElementById("status").addEventListener("click", handleTouch, false);    // works on Android and iPad
	 *     function handleTouch(event) {
	 *       document.getElementById("status").removeEventListener("click", handleTouch, false);    // remove the listener
	 *       var thisApp = new myNameSpace.MyApp();    // launch the app
	 *     }
	 *
	 * <h4>Known Browser and OS issues</h4>
	 * <b>IE 9 HTML Audio limitations</b><br />
	 * <ul><li>There is a delay in applying volume changes to tags that occurs once playback is started. So if you have
	 * muted all sounds, they will all play during this delay until the mute applies internally. This happens regardless of
	 * when or how you apply the volume change, as the tag seems to need to play to apply it.</li>
     * <li>MP3 encoding will not always work for audio tags, particularly in Internet Explorer. We've found default
	 * encoding with 64kbps works.</li>
	 * <li>There is a limit to how many audio tags you can load and play at once, which appears to be determined by
	 * hardware and browser settings.  See {{#crossLink "HTMLAudioPlugin.MAX_INSTANCES"}}{{/crossLink}} for a safe estimate.</li></ul>
	 *
	 * <b>Safari limitations</b><br />
	 * <ul><li>Safari requires Quicktime to be installed for audio playback.</li></ul>
	 *
	 * <b>iOS 6 Web Audio limitations</b><br />
	 * <ul><li>Sound is initially muted and will only unmute through play being called inside a user initiated event
	 * (touch/click).</li>
	 * <li>Despite suggestions to the opposite, we have control over audio volume through our gain nodes.</li>
	 * <li>A bug exists that will distort un-cached web audio when a video element is present in the DOM.</li>
	 * <li>Note HTMLAudioPlugin is not supported on iOS by default.  See {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}
	 * for more details.<li>
	 * </ul>
	 *
	 * <b>Android HTML Audio limitations</b><br />
	 * <ul><li>We have no control over audio volume. Only the user can set volume on their device.</li>
	 * <li>We can only play audio inside a user event (touch/click).  This currently means you cannot loop sound or use
	 * a delay.</li></ul>
	 *
 	 * <b>Android HTML Audio Chrome 26.0.1410.58+ specific limitations</b><br />
	 * <ul><li>Chrome reports true when you run createjs.Sound.BrowserDetect.isChrome, but is a different browser
	 * with different abilities.</li>
	 * <li>Can only play 1 sound at a time.</li>
	 * <li>Sound is not cached.</li>
	 * <li>Sound can only be loaded in a user initiated touch/click event.</li>
	 * <li>There is a delay before a sound is played, presumably while the src is loaded.</li>
	 * </ul>
	 *
	 * @class Sound
	 * @static
	 * @uses EventDispatcher
	 */
	function Sound() {
		throw "Sound cannot be instantiated";
	}

	var s = Sound;

	/**
	 * The character (or characters) that are used to split multiple paths from an audio source.
	 * @property DELIMITER
	 * @type {String}
	 * @default |
	 * @static
	 */
	s.DELIMITER = "|";

	/**
	 * The duration in milliseconds to determine a timeout.
	 * @property AUDIO_TIMEOUT
	 * @static
	 * @type {Number}
	 * @default 8000
	 * @protected
	 */
	s.AUDIO_TIMEOUT = 8000; // TODO: This is not implemeneted  // OJR remove property? doc'd as protected to remove from docs for now

	/**
	 * The interrupt value to interrupt any currently playing instance with the same source, if the maximum number of
	 * instances of the sound are already playing.
	 * @property INTERRUPT_ANY
	 * @type {String}
	 * @default any
	 * @static
	 */
	s.INTERRUPT_ANY = "any";

	/**
	 * The interrupt value to interrupt the earliest currently playing instance with the same source that progressed the
	 * least distance in the audio track, if the maximum number of instances of the sound are already playing.
	 * @property INTERRUPT_EARLY
	 * @type {String}
	 * @default early
	 * @static
	 */
	s.INTERRUPT_EARLY = "early";

	/**
	 * The interrupt value to interrupt the currently playing instance with the same source that progressed the most
	 * distance in the audio track, if the maximum number of instances of the sound are already playing.
	 * @property INTERRUPT_LATE
	 * @type {String}
	 * @default late
	 * @static
	 */
	s.INTERRUPT_LATE = "late";

	/**
	 * The interrupt value to not interrupt any currently playing instances with the same source, if the maximum number of
	 * instances of the sound are already playing.
	 * @property INTERRUPT_NONE
	 * @type {String}
	 * @default none
	 * @static
	 */
	s.INTERRUPT_NONE = "none";

// The playState in plugins should be implemented with these values.
	/**
	 * Defines the playState of an instance that is still initializing.
	 * @property PLAY_INITED
	 * @type {String}
	 * @default playInited
	 * @static
	 */
	s.PLAY_INITED = "playInited";

	/**
	 * Defines the playState of an instance that is currently playing or paused.
	 * @property PLAY_SUCCEEDED
	 * @type {String}
	 * @default playSucceeded
	 * @static
	 */
	s.PLAY_SUCCEEDED = "playSucceeded";

	/**
	 * Defines the playState of an instance that was interrupted by another instance.
	 * @property PLAY_INTERRUPTED
	 * @type {String}
	 * @default playInterrupted
	 * @static
	 */
	s.PLAY_INTERRUPTED = "playInterrupted";

	/**
	 * Defines the playState of an instance that completed playback.
	 * @property PLAY_FINISHED
	 * @type {String}
	 * @default playFinished
	 * @static
	 */
	s.PLAY_FINISHED = "playFinished";

	/**
	 * Defines the playState of an instance that failed to play. This is usually caused by a lack of available channels
	 * when the interrupt mode was "INTERRUPT_NONE", the playback stalled, or the sound could not be found.
	 * @property PLAY_FAILED
	 * @type {String}
	 * @default playFailed
	 * @static
	 */
	s.PLAY_FAILED = "playFailed";

	/**
	 * A list of the default supported extensions that Sound will <i>try</i> to play. Plugins will check if the browser
	 * can play these types, so modifying this list before a plugin is initialized will allow the plugins to try to
	 * support additional media types.
	 *
	 * NOTE this does not currently work for {{#crossLink "FlashPlugin"}}{{/crossLink}}.
	 *
	 * More details on file formats can be found at http://en.wikipedia.org/wiki/Audio_file_format. A very detailed
	 * list of file formats can be found at http://www.fileinfo.com/filetypes/audio. A useful list of extensions for
	 * each format can be found at http://html5doctor.com/html5-audio-the-state-of-play/
	 * @property SUPPORTED_EXTENSIONS
	 * @type {Array[String]}
	 * @default ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"]
	 */
	s.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"];  // OJR does not currently support FlashPlugin

	/**
	 * Some extensions use another type of extension support to play (one of them is a codex).  This allows you to map
	 * that support so plugins can accurately determine if an extension is supported.  Adding to this list can help
	 * plugins determine more accurately if an extension is supported.
	 * @property EXTENSION_MAP
	 * @type {Object}
	 * @since 0.4.0
	 */
	s.EXTENSION_MAP = {
		m4a:"mp4"
	};

	/**
	 * The RegExp pattern used to parse file URIs. This supports simple file names, as well as full domain URIs with
	 * query strings. The resulting match is: protocol:$1 domain:$2 path:$3 file:$4 extension:$5 query:$6.
	 * @property FILE_PATTERN
	 * @type {RegExp}
	 * @static
	 * @protected
	 */
	s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;

	/**
	 * Determines the default behavior for interrupting other currently playing instances with the same source, if the
	 * maximum number of instances of the sound are already playing.  Currently the default is {{#crossLink "Sound/INTERRUPT_NONE:property"}}{{/crossLink}}
	 * but this can be set and will change playback behavior accordingly.  This is only used when {{#crossLink "Sound/play"}}{{/crossLink}}
	 * is called without passing a value for interrupt.
	 * @property defaultInterruptBehavior
	 * @type {String}
	 * @default none
	 * @static
	 * @since 0.4.0
	 */
	s.defaultInterruptBehavior = s.INTERRUPT_NONE;  // OJR does s.INTERRUPT_ANY make more sense as default?  Needs game dev testing to see which case makes more sense.

	/**
	 * Used internally to assign unique IDs to each SoundInstance.
	 * @property lastID
	 * @type {Number}
	 * @static
	 * @protected
	 */
	s.lastId = 0;

	/**
	 * The currently active plugin. If this is null, then no plugin could be initialized. If no plugin was specified,
	 * Sound attempts to apply the default plugins: {{#crossLink "WebAudioPlugin"}}{{/crossLink}}, followed by
	 * {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}.
	 * @property activePlugin
	 * @type {Object}
	 * @static
	 */
    s.activePlugin = null;

	/**
	 * Determines if the plugins have been registered. If false, the first call to play() will instantiate the default
	 * plugins ({{#crossLink "WebAudioPlugin"}}{{/crossLink}}, followed by {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}).
	 * If plugins have been registered, but none are applicable, then sound playback will fail.
	 * @property pluginsRegistered
	 * @type {Boolean}
	 * @default false
	 * @static
	 * @protected
	 */
	s.pluginsRegistered = false;

	/**
	 * The master volume value, which affects all sounds. Use {{#crossLink "Sound/getVolume"}}{{/crossLink}} and
	 * {{#crossLink "Sound/setVolume"}}{{/crossLink}} to modify the volume of all audio.
	 * @property masterVolume
	 * @type {Number}
	 * @default 1
	 * @protected
	 * @since 0.4.0
	 */
	s.masterVolume = 1;

	/**
	 * The master mute value, which affects all sounds.  This is applies to all sound instances.  This value can be set
	 * through {{#crossLink "Sound/setMute"}}{{/crossLink}} and accessed via {{#crossLink "Sound/getMute"}}{{/crossLink}}.
	 * @property masterMute
	 * @type {Boolean}
	 * @default false
	 * @protected
	 * @static
	 * @since 0.4.0
	 */
	s.masterMute = false;

	/**
	 * An array containing all currently playing instances. This allows Sound to control the volume, mute, and playback of
	 * all instances when using static APIs like {{#crossLink "Sound/stop"}}{{/crossLink}} and {{#crossLink "Sound/setVolume"}}{{/crossLink}}.
	 * When an instance has finished playback, it gets removed via the {{#crossLink "Sound/finishedPlaying"}}{{/crossLink}}
	 * method. If the user replays an instance, it gets added back in via the {{#crossLink "Sound/beginPlaying"}}{{/crossLink}}
	 * method.
	 * @property instances
	 * @type {Array}
	 * @protected
	 * @static
	 */
	s.instances = [];

	/**
	 * An object hash storing sound sources via there corresponding ID.
	 * @property idHash
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s.idHash = {};

	/**
	 * An object hash that stores preloading sound sources via the parsed source that is passed to the plugin.  Contains the
	 * source, id, and data that was passed in by the user.  Parsed sources can contain multiple instances of source, id,
	 * and data.
	 * @property preloadHash
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s.preloadHash = {};

	/**
	 * An object that stands in for audio that fails to play. This allows developers to continue to call methods
	 * on the failed instance without having to check if it is valid first. The instance is instantiated once, and
	 * shared to keep the memory footprint down.
	 * @property defaultSoundInstance
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s.defaultSoundInstance = null;

// mix-ins:
	// EventDispatcher methods:
	s.addEventListener = null;
	s.removeEventListener = null;
	s.removeAllEventListeners = null;
	s.dispatchEvent = null;
	s.hasEventListener = null;
	s._listeners = null;

	createjs.EventDispatcher.initialize(s); // inject EventDispatcher methods.


// Events
	/**
	 * This event is fired when a file finishes loading internally. This event is fired for each loaded sound,
	 * so any handler methods should look up the <code>event.src</code> to handle a particular sound.
	 * @event fileload
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {String} src The source of the sound that was loaded. Note this will only return the loaded part of a
	 * delimiter-separated source.
	 * @param {String} [id] The id passed in when the sound was registered. If one was not provided, it will be null.
	 * @param {Number|Object} [data] Any additional data associated with the item. If not provided, it will be undefined.
	 * @since 0.4.1
	 */

	//TODO: Deprecated
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Sound/fileload:event"}}{{/crossLink}}
	 * event.
	 * @property onLoadComplete
	 * @type {Function}
	 * @deprecated Use addEventListener and the fileload event.
	 * @since 0.4.0
	 */

	/**
	 * Used by external plugins to dispatch file load events.
	 * @method sendFileLoadEvent
	 * @param {String} src A sound file has completed loading, and should be dispatched.
	 * @protected
	 * @static
	 * @since 0.4.1
	 */
	s.sendFileLoadEvent = function (src) {
		if (!s.preloadHash[src]) {
			return;
		}
		for (var i = 0, l = s.preloadHash[src].length; i < l; i++) {
			var item = s.preloadHash[src][i];
			s.preloadHash[src][i] = true;

			if (!s.hasEventListener("fileload")) { continue; }

			var event = new createjs.Event("fileload");
			event.src = item.src,
			event.id = item.id,
			event.data = item.data

			s.dispatchEvent(event);
		}
	}

	/**
	 * Get the preload rules to allow Sound to be used as a plugin by <a href="http://preloadjs.com" target="_blank">PreloadJS</a>.
	 * Any load calls that have the matching type or extension will fire the callback method, and use the resulting
	 * object, which is potentially modified by Sound. This helps when determining the correct path, as well as
	 * registering the audio instance(s) with Sound. This method should not be called, except by PreloadJS.
	 * @method getPreloadHandlers
	 * @return {Object} An object containing:
	 * <ul><li>callback: A preload callback that is fired when a file is added to PreloadJS, which provides
	 *      Sound a mechanism to modify the load parameters, select the correct file format, register the sound, etc.</li>
	 *      <li>types: A list of file types that are supported by Sound (currently supports "sound").</li>
	 *      <li>extensions: A list of file extensions that are supported by Sound (see {{#crossLink "Sound.SUPPORTED_EXTENSIONS"}}{{/crossLink}}).</li></ul>
	 * @static
	 * @protected
	 */
	s.getPreloadHandlers = function () {
		return {
			callback:createjs.proxy(s.initLoad, s),
			types:["sound"],
			extensions:s.SUPPORTED_EXTENSIONS
		};
	}

	/**
	 * Register a Sound plugin. Plugins handle the actual playback of audio. The default plugins are
	 * ({{#crossLink "WebAudioPlugin"}}{{/crossLink}} followed by {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}),
	 * and are installed if no other plugins are present when the user attempts to start playback or register sound.
	 * <h4>Example</h4>
	 *      createjs.FlashPlugin.BASE_PATH = "../src/SoundJS/";
	 *      createjs.Sound.registerPlugin(createjs.FlashPlugin);
	 *
	 * To register multiple plugins, use {{#crossLink "Sound/registerPlugins"}}{{/crossLink}}.
	 *
	 * @method registerPlugin
	 * @param {Object} plugin The plugin class to install.
	 * @return {Boolean} Whether the plugin was successfully initialized.
	 * @static
	 */
	s.registerPlugin = function (plugin) {
		s.pluginsRegistered = true;
		if (plugin == null) {
			return false;
		}
		// Note: Each plugin is passed in as a class reference, but we store the activePlugin as an instance
		if (plugin.isSupported()) {
			s.activePlugin = new plugin();
			//TODO: Check error on initialization
			return true;
		}
		return false;
	}

	/**
	 * Register a list of Sound plugins, in order of precedence. To register a single plugin, use
	 * {{#crossLink "Sound/registerPlugin"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *      createjs.FlashPlugin.BASE_PATH = "../src/SoundJS/";
	 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	 *
	 * @method registerPlugins
	 * @param {Array} plugins An array of plugins classes to install.
	 * @return {Boolean} Whether a plugin was successfully initialized.
	 * @static
	 */
	s.registerPlugins = function (plugins) {
		for (var i = 0, l = plugins.length; i < l; i++) {
			var plugin = plugins[i];
			if (s.registerPlugin(plugin)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Initialize the default plugins. This method is automatically called when any audio is played or registered before
	 * the user has manually registered plugins, and enables Sound to work without manual plugin setup. Currently, the
	 * default plugins are {{#crossLink "WebAudioPlugin"}}{{/crossLink}} followed by {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}.
	 *
	 *  * <h4>Example</h4>
	 *      if (!createjs.initializeDefaultPlugins()) { return; }
	 *
	 * @method initializeDefaultPlugins
	 * @returns {Boolean} If a plugin is initialized (true) or not (false). If the browser does not have the
	 * capabilities to initialize any available plugins, this will return false.
	 * @since 0.4.0
	 */
	s.initializeDefaultPlugins = function () {
		if (s.activePlugin != null) {
			return true;
		}
		if (s.pluginsRegistered) {
			return false;
		}
		if (s.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin])) {
			return true;
		}
		return false;
	}

	/**
	 * Determines if Sound has been initialized, and a plugin has been activated.
	 *
	 * <h4>Example</h4>
	 * This example sets up a Flash fallback, but only if there is no plugin specified yet.
	 *
	 *      if (!createjs.Sound.isReady()) {
	 *			createjs.FlashPlugin.BASE_PATH = "../src/SoundJS/";
	 *      	createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	 *      }
	 *
	 * @method isReady
	 * @return {Boolean} If Sound has initialized a plugin.
	 * @static
	 */
	s.isReady = function () {
		return (s.activePlugin != null);
	}

	/**
	 * Get the active plugins capabilities, which help determine if a plugin can be used in the current environment,
	 * or if the plugin supports a specific feature. Capabilities include:
	 * <ul>
	 *     <li><b>panning:</b> If the plugin can pan audio from left to right</li>
	 *     <li><b>volume;</b> If the plugin can control audio volume.</li>
	 *     <li><b>mp3:</b> If MP3 audio is supported.</li>
	 *     <li><b>ogg:</b> If OGG audio is supported.</li>
	 *     <li><b>wav:</b> If WAV audio is supported.</li>
	 *     <li><b>mpeg:</b> If MPEG audio is supported.</li>
	 *     <li><b>m4a:</b> If M4A audio is supported.</li>
	 *     <li><b>mp4:</b> If MP4 audio is supported.</li>
	 *     <li><b>aiff:</b> If aiff audio is supported.</li>
	 *     <li><b>wma:</b> If wma audio is supported.</li>
	 *     <li><b>mid:</b> If mid audio is supported.</li>
	 *     <li><b>tracks:</b> The maximum number of audio tracks that can be played back at a time. This will be -1
	 *     if there is no known limit.</li>
	 * @method getCapabilities
	 * @return {Object} An object containing the capabilities of the active plugin.
	 * @static
	 */
	s.getCapabilities = function () {
		if (s.activePlugin == null) {
			return null;
		}
		return s.activePlugin.capabilities;
	}

	/**
	 * Get a specific capability of the active plugin. See {{#crossLink "Sound/getCapabilities"}}{{/crossLink}} for a
	 * full list of capabilities.
	 *
	 * <h4>Example</h4>
	 *      var maxAudioInstances = createjs.Sound.getCapability("tracks");
	 *
	 * @method getCapability
	 * @param {String} key The capability to retrieve
	 * @return {Number|Boolean} The value of the capability.
	 * @static
	 * @see getCapabilities
	 */
	s.getCapability = function (key) {
		if (s.activePlugin == null) {
			return null;
		}
		return s.activePlugin.capabilities[key];
	}

	/**
	 * Process manifest items from <a href="http://preloadjs.com" target="_blank">PreloadJS</a>. This method is intended
	 * for usage by a plugin, and not for direct interaction.
	 * @method initLoad
	 * @param {String | Object} src The src or object to load. This is usually a string path, but can also be an
	 * HTMLAudioElement or similar audio playback object.
	 * @param {String} [type] The type of object. Will likely be "sound" or null.
	 * @param {String} [id] An optional user-specified id that is used to play sounds.
	 * @param {Number|String|Boolean|Object} [data] Data associated with the item. Sound uses the data parameter as the
	 * number of channels for an audio instance, however a "channels" property can be appended to the data object if
	 * this property is used for other information. The audio channels will default to 1 if no value is found.
	 * @return {Boolean|Object} An object with the modified values of those that were passed in, or false if the active
	 * plugin can not play the audio type.
	 * @protected
	 * @static
	 */
	s.initLoad = function (src, type, id, data, basePath) {
		var details = s.registerSound(src, id, data, false, basePath);
		if (details == null) {
			return false;
		}
		return details;
	}

	/**
	 * Register an audio file for loading and future playback in Sound. This is automatically called when using
	 * <a href="http://preloadjs.com" target="_blank">PreloadJS</a>.  It is recommended to register all sounds that
	 * need to be played back in order to properly prepare and preload them. Sound does internal preloading when required.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.addEventListener("fileload", handleLoad); // add an event listener for when load is completed
	 *      createjs.Sound.registerSound("myAudioPath/mySound.mp3|myAudioPath/mySound.ogg", "myID", 3);
	 *
	 * @method registerSound
	 * @param {String | Object} src The source or an Objects with a "src" property
	 * @param {String} [id] An id specified by the user to play the sound later.
	 * @param {Number | Object} [data] Data associated with the item. Sound uses the data parameter as the number of
	 * channels for an audio instance, however a "channels" property can be appended to the data object if it is used
	 * for other information. The audio channels will set a default based on plugin if no value is found.
	 * @param {Boolean} [preload=true] If the sound should be internally preloaded so that it can be played back
	 * without an external preloader.
	 * @param {string} basePath Set a path that will be prepending to src for loading.
	 * @return {Object} An object with the modified values that were passed in, which defines the sound.
	 * Returns false if the source cannot be parsed or no plugins can be initialized.
	 * Returns true if the source is already loaded.
	 * @static
	 * @since 0.4.0
	 */
	s.registerSound = function (src, id, data, preload, basePath) {
		if (!s.initializeDefaultPlugins()) {
			return false;
		}

		if (src instanceof Object) {
			basePath = id;	//this assumes preload will not be passed in as a property // OJR check if arguments == 3
			//?? preload = src.preload;
			// OJR refactor how data is passed in to make the parameters work better
			id = src.id;
			data = src.data;
			src = src.src;
		}
		var details = s.parsePath(src, "sound", id, data);
		if (details == null) {
			return false;
		}

		if (id != null) {
			s.idHash[id] = details.src;
		}

		var numChannels = null; // null tells SoundChannel to set this to it's internal maxDefault
		if (data != null) {
			if (!isNaN(data.channels)) {
				numChannels = parseInt(data.channels);
			}
			else if (!isNaN(data)) {
				numChannels = parseInt(data);
			}
		}
		var loader = s.activePlugin.register(details.src, numChannels);  // Note only HTML audio uses numChannels

		if (loader != null) {	// all plugins currently return a loader
			if (loader.numChannels != null) {
				numChannels = loader.numChannels;
			} // currently only HTMLAudio returns this
			SoundChannel.create(details.src, numChannels);

			// return the number of instances to the user.  This will also be returned in the load event.
			if (data == null || !isNaN(data)) {
				data = details.data = numChannels || SoundChannel.maxPerChannel();
			} else {
				data.channels = details.data.channels = numChannels || SoundChannel.maxPerChannel();
			}

			// If the loader returns a tag, return it instead for preloading.
			if (loader.tag != null) {
				details.tag = loader.tag;
			} else if (loader.src) {
				details.src = loader.src;
			}
			// If the loader returns a complete handler, pass it on to the prelaoder.
			if (loader.completeHandler != null) {
				details.completeHandler = loader.completeHandler;
			}
			if (loader.type) {
				details.type = loader.type;
			}
		}

		if (preload != false) {
			if (!s.preloadHash[details.src]) {
				s.preloadHash[details.src] = [];
			}  // we do this so we can store multiple id's and data if needed
			s.preloadHash[details.src].push({src:src, id:id, data:data});  // keep this data so we can return it in fileload event
			if (s.preloadHash[details.src].length == 1) {
				// if already loaded once, don't load a second time  // OJR note this will disallow reloading a sound if loading fails or the source changes
				if (basePath == null) {basePath = "";}
				s.activePlugin.preload(details.src, loader, basePath);
			} else {
				// if src already loaded successfully, return true
				if (s.preloadHash[details.src][0] == true) {return true;}
			}
		}

		return details;
	}

	/**
	 * Register a manifest of audio files for loading and future playback in Sound. It is recommended to register all
	 * sounds that need to be played back in order to properly prepare and preload them. Sound does internal preloading
	 * when required.
	 *
	 * <h4>Example</h4>
	 *      var manifest = [
	 *          {src:"asset0.mp3|asset0.ogg", id:"example"}, // Note the Sound.DELIMITER '|'
	 *          {src:"asset1.mp3|asset1.ogg", id:"1", data:6},
	 *          {src:"asset2.mp3", id:"works"}
	 *      ];
	 *      createjs.Sound.addEventListener("fileload", handleLoad); // call handleLoad when each sound loads
	 *      createjs.Sound.registerManifest(manifest, assetPath);
	 *
	 * @method registerManifest
	 * @param {Array} manifest An array of objects to load. Objects are expected to be in the format needed for
	 * {{#crossLink "Sound/registerSound"}}{{/crossLink}}: <code>{src:srcURI, id:ID, data:Data, preload:UseInternalPreloader}</code>
	 * with "id", "data", and "preload" being optional.
	 * @param {string} basePath Set a path that will be prepending to each src when loading.
	 * @return {Object} An array of objects with the modified values that were passed in, which defines each sound.
	 * Like registerSound, it will return false for any values that the source cannot be parsed or if no plugins can be initialized.
	 * Also, it will returns true for any values that the source is already loaded.
	 * @static
	 * @since 0.4.0
	 */
	s.registerManifest = function (manifest, basePath) {
		var returnValues = [];
		for (var i = 0, l = manifest.length; i < l; i++) {
			returnValues[i] = createjs.Sound.registerSound(manifest[i].src, manifest[i].id, manifest[i].data, manifest[i].preload, basePath);
		}
		return returnValues;
	}

	/**
	 * Remove a sound that has been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
	 * {{#crossLink "Sound/registerManifest"}}{{/crossLink}}.
	 * Note this will stop playback on active instances playing this sound before deleting them.
	 * Note if you passed in a basePath, you do not need to pass it or add assetPath to the src here.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.removeSound("myAudioPath/mySound.mp3|myAudioPath/mySound.ogg");
	 *      createjs.Sound.removeSound("myID");
	 *
	 * @method removeSound
	 * @param {String | Object} src The src or ID of the audio, or an Object with a "src" property
	 * @return {Boolean} True if sound is successfully removed.
	 * @static
	 * @since 0.4.1
	 */
	s.removeSound = function(src) {
		if (s.activePlugin == null) {
			return false;
		}

		if (src instanceof Object) {
			src = src.src;
		}
		src = s.getSrcById(src);
		var details = s.parsePath(src);
		if (details == null) {
			return false;
		}
		src = details.src;

		// remove src from idHash	// Note "for in" can be a slow operation
		for(var prop in s.idHash){
			if(s.idHash[prop] == src) {
				delete(s.idHash[prop]);
			}
		}

		// clear from SoundChannel, which also stops and deletes all instances
		SoundChannel.removeSrc(src);

		// remove src from preloadHash	// Note "for in" can be a slow operation
		delete(s.preloadHash[src]);

		// activePlugin cleanup
		s.activePlugin.removeSound(src);

		return true;
	}

	/**
	 * Remove a manifest of audio files that have been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
	 * {{#crossLink "Sound/registerManifest"}}{{/crossLink}}.
	 * Note this will stop playback on active instances playing this audio before deleting them.
	 * Note if you passed in a basePath, you do not need to pass it or add it to the src here.
	 *
	 * <h4>Example</h4>
	 *      var manifest = [
	 *          {src:"asset0.mp3|asset0.ogg", id:"example"}, // Note the Sound.DELIMITER '|'
	 *          {src:"asset1.mp3|asset1.ogg", id:"1", data:6},
	 *          {src:"asset2.mp3", id:"works"}
	 *      ];
	 *      createjs.Sound.removeManifest(manifest);
	 *
	 * @method removeManifest
	 * @param {Array} manifest An array of objects to remove. Objects are expected to be in the format needed for
	 * {{#crossLink "Sound/removeSound"}}{{/crossLink}}: <code>{srcOrID:srcURIorID}</code>
	 * @return {Object} An array of Boolean values representing if the sounds with the same array index in manifest was
	 * successfully removed.
	 * @static
	 * @since 0.4.1
	 */
	s.removeManifest = function (manifest) {
		var returnValues = [];
		for (var i = 0, l = manifest.length; i < l; i++) {
			returnValues[i] = createjs.Sound.removeSound(manifest[i].src);
		}
		return returnValues;
	}

	/**
	 * Remove all sounds that have been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
	 * {{#crossLink "Sound/registerManifest"}}{{/crossLink}}.
	 * Note this will stop playback on all active sound instances before deleting them.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.removeAllSounds();
	 *
	 * @method removeAllSounds
	 * @static
	 * @since 0.4.1
	 */
	s.removeAllSounds = function() {
		s.idHash = {};
		s.preloadHash = {};
		SoundChannel.removeAll();
		s.activePlugin.removeAllSounds();
	}

	/**
	 * Check if a source has been loaded by internal preloaders. This is necessary to ensure that sounds that are
	 * not completed preloading will not kick off a new internal preload if they are played.
	 *
	 * <h4>Example</h4>
	 *     var mySound = "assetPath/asset0.mp3|assetPath/asset0.ogg";
	 *     if(createjs.Sound.loadComplete(mySound) {
	 *         createjs.Sound.play(mySound);
	 *     }
	 *
	 * @method loadComplete
	 * @param {String} src The src or id that is being loaded.
	 * @return {Boolean} If the src is already loaded.
	 * @since 0.4.0
	 */
	s.loadComplete = function (src) {
		var details = s.parsePath(src, "sound");
		if (details) {
			src = s.getSrcById(details.src);
		} else {
			src = s.getSrcById(src);
		}
		return (s.preloadHash[src][0] == true);  // src only loads once, so if it's true for the first it's true for all
	}

	/**
	 * Parse the path of a sound, usually from a manifest item. Manifest items support single file paths, as well as
	 * composite paths using {{#crossLink "Sound/DELIMITER:property"}}{{/crossLink}}, which defaults to "|". The first path supported by the
	 * current browser/plugin will be used.
	 * @method parsePath
	 * @param {String} value The path to an audio source.
	 * @param {String} [type] The type of path. This will typically be "sound" or null.
	 * @param {String} [id] The user-specified sound ID. This may be null, in which case the src will be used instead.
	 * @param {Number | String | Boolean | Object} [data] Arbitrary data appended to the sound, usually denoting the
	 * number of channels for the sound. This method doesn't currently do anything with the data property.
	 * @return {Object} A formatted object that can be registered with the {{#crossLink "Sound/activePlugin:property"}}{{/crossLink}}
	 * and returned to a preloader like <a href="http://preloadjs.com" target="_blank">PreloadJS</a>.
	 * @protected
	 */
	s.parsePath = function (value, type, id, data) {
        if (typeof(value) != "string") {value = value.toString();}
		var sounds = value.split(s.DELIMITER);
		var ret = {type:type || "sound", id:id, data:data};
		var c = s.getCapabilities();
		for (var i = 0, l = sounds.length; i < l; i++) {
			var sound = sounds[i];

			var match = sound.match(s.FILE_PATTERN);
			if (match == null) {
				return false;
			}
			var name = match[4];
			var ext = match[5];

			if (c[ext] && createjs.indexOf(s.SUPPORTED_EXTENSIONS, ext) > -1) {
				ret.name = name;
				ret.src = sound;
				ret.extension = ext;
				return ret;
			}
		}
		return null;
	}


	/* ---------------
	 Static API.
	 --------------- */
	/**
	 * Play a sound and get a {{#crossLink "SoundInstance"}}{{/crossLink}} to control. If the sound fails to play, a
	 * SoundInstance will still be returned, and have a playState of {{#crossLink "Sound/PLAY_FAILED:property"}}{{/crossLink}}.
	 * Note that even on sounds with failed playback, you may still be able to call SoundInstance {{#crossLink "SoundInstance/play"}}{{/crossLink}},
	 * since the failure could be due to lack of available channels. If the src does not have a supported extension or
	 * if there is no available plugin, {{#crossLink "Sound/defaultSoundInstance:property"}}{{/crossLink}} will be
	 * returned, which will not play any audio, but will not generate errors.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.addEventListener("fileload", handleLoad);
	 *      createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
	 *      function handleLoad(event) {
	 *      	createjs.Sound.play("myID");
	 *      	// alternately we could call the following
	 *      	var myInstance = createjs.Sound.play("myAudioPath/mySound.mp3", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 1, 0);
	 *      	// another alternative is to pass in just the options we want to set inside of an object
	 *      	var myInstance = createjs.Sound.play("myAudioPath/mySound.mp3", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
	 *      }
	 *
	 * @method play
	 * @param {String} src The src or ID of the audio.
	 * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
	 * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
	 * constants on the Sound class, with the default defined by {{#crossLink "Sound/defaultInterruptBehavior:property"}}{{/crossLink}}.
	 * <br /><strong>OR</strong><br />
	 * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
	 * delay, offset, loop, volume, and pan (see the above code sample).
	 * @param {Number} [delay=0] The amount of time to delay the start of audio playback, in milliseconds.
	 * @param {Number} [offset=0] The offset from the start of the audio to begin playback, in milliseconds.
	 * @param {Number} [loop=0] How many times the audio loops when it reaches the end of playback. The default is 0 (no
	 * loops), and -1 can be used for infinite playback.
	 * @param {Number} [volume=1] The volume of the sound, between 0 and 1. Note that the master volume is applied
	 * against the individual volume.
	 * @param {Number} [pan=0] The left-right pan of the sound (if supported), between -1 (left) and 1 (right).
	 * @return {SoundInstance} A {{#crossLink "SoundInstance"}}{{/crossLink}} that can be controlled after it is created.
	 * @static
	 */
	s.play = function (src, interrupt, delay, offset, loop, volume, pan) {
		var instance = s.createInstance(src);

		var ok = s.playInstance(instance, interrupt, delay, offset, loop, volume, pan);
		if (!ok) {
			instance.playFailed();
		}
		return instance;
	}

	/**
	 * Creates a {{#crossLink "SoundInstance"}}{{/crossLink}} using the passed in src. If the src does not have a
	 * supported extension or if there is no available plugin, a {{#crossLink "Sound/defaultSoundInstance:property"}}{{/crossLink}}
	 * will be returned that can be called safely but does nothing.
	 *
	 * <h4>Example</h4>
	 *      var myInstance = null;
	 *      createjs.Sound.addEventListener("fileload", handleLoad);
	 *      createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
	 *      function handleLoad(event) {
	 *      	myInstance = createjs.Sound.createInstance("myID");
	 *      	// alternately we could call the following
	 *      	myInstance = createjs.Sound.createInstance("myAudioPath/mySound.mp3");
	 *      }
	 *
	 * @method createInstance
	 * @param {String} src The src or ID of the audio.
	 * @return {SoundInstance} A {{#crossLink "SoundInstance"}}{{/crossLink}} that can be controlled after it is created.
	 * Unsupported extensions will return the default SoundInstance.
	 * @since 0.4.0
	 */
	s.createInstance = function (src) {
		if (!s.initializeDefaultPlugins()) {
			return s.defaultSoundInstance;
		}

		src = s.getSrcById(src);
		var details = s.parsePath(src, "sound");

		var instance = null;
		if (details != null && details.src != null) {
			// make sure that we have a sound channel (sound is registered or previously played)
			SoundChannel.create(details.src);
			instance = s.activePlugin.create(details.src);
		} else {
			// the src is not supported, so give back a dummy instance.
			// This can happen if PreloadJS fails because the plugin does not support the ext, and was passed an id which
			// will not get added to the idHash.
			instance = Sound.defaultSoundInstance;
		}

		instance.uniqueId = s.lastId++;  // OJR moved this here so we can have multiple plugins active in theory

		return instance;
	}

	/**
	 * Set the master volume of Sound. The master volume is multiplied against each sound's individual volume.  For
	 * example, if master volume is 0.5 and a sound's volume is 0.5, the resulting volume is 0.25. To set individual
	 * sound volume, use SoundInstance {{#crossLink "SoundInstance/setVolume"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.setVolume(0.5);
	 *
	 * @method setVolume
	 * @param {Number} value The master volume value. The acceptable range is 0-1.
	 * @static
	 */
	s.setVolume = function (value) {
		if (Number(value) == null) {
			return false;
		}
		value = Math.max(0, Math.min(1, value));
		s.masterVolume = value;
		if (!this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(value)) {
			var instances = this.instances;  // OJR does this impact garbage collection more than it helps performance?
			for (var i = 0, l = instances.length; i < l; i++) {
				instances[i].setMasterVolume(value);
			}
		}
	}

	/**
	 * Get the master volume of Sound. The master volume is multiplied against each sound's individual volume.
	 * To get individual sound volume, use SoundInstance {{#crossLink "SoundInstance/volume"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     var masterVolume = createjs.Sound.getVolume();
	 *
	 * @method getVolume
	 * @return {Number} The master volume, in a range of 0-1.
	 * @static
	 */
	s.getVolume = function () {
		return s.masterVolume;
	}

	/**
	 * REMOVED. Please see {{#crossLink "Sound/setMute"}}{{/crossLink}}.
	 * @method mute
	 * @param {Boolean} value Whether the audio should be muted or not.
	 * @static
	 * @deprecated This function has been deprecated. Please use setMute instead.
	 */

	/**
	 * Mute/Unmute all audio. Note that muted audio still plays at 0 volume. This global mute value is maintained
	 * separately and when set will override, but not change the mute property of individual instances. To mute an individual
	 * instance, use SoundInstance {{#crossLink "SoundInstance/setMute"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.setMute(true);
	 *
	 * @method setMute
	 * @param {Boolean} value Whether the audio should be muted or not.
	 * @return {Boolean} If the mute was set.
	 * @static
	 * @since 0.4.0
	 */
	s.setMute = function (value) {
		if (value == null || value == undefined) {
			return false;
		}

		this.masterMute = value;
		if (!this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(value)) {
			var instances = this.instances;
			for (var i = 0, l = instances.length; i < l; i++) {
				instances[i].setMasterMute(value);
			}
		}
		return true;
	}

	/**
	 * Returns the global mute value. To get the mute value of an individual instance, use SoundInstance
	 * {{#crossLink "SoundInstance/getMute"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     var masterMute = createjs.Sound.getMute();
	 *
	 * @method getMute
	 * @return {Boolean} The mute value of Sound.
	 * @static
	 * @since 0.4.0
	 */
	s.getMute = function () {
		return this.masterMute;
	}

	/**
	 * Stop all audio (global stop). Stopped audio is reset, and not paused. To play audio that has been stopped,
	 * call {{#crossLink "SoundInstance.play"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.stop();
	 *
	 * @method stop
	 * @static
	 */
	s.stop = function () {
		var instances = this.instances;
		for (var i = instances.length; i--; ) {
			instances[i].stop();  // NOTE stop removes instance from this.instances
		}
	}


	/* ---------------
	 Internal methods
	 --------------- */
	/**
	 * Play an instance. This is called by the static API, as well as from plugins. This allows the core class to
	 * control delays.
	 * @method playInstance
	 * @param {SoundInstance} instance The {{#crossLink "SoundInstance"}}{{/crossLink}} to start playing.
	 * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
	 * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
	 * constants on the Sound class, with the default defined by {{#crossLink "Sound/defaultInterruptBehavior"}}{{/crossLink}}.
	 * <br /><strong>OR</strong><br />
	 * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
	 * delay, offset, loop, volume, and pan (see the above code sample).
	 * @param {Number} [delay=0] Time in milliseconds before playback begins.
	 * @param {Number} [offset=instance.offset] Time into the sound to begin playback in milliseconds.  Defaults to the
	 * current value on the instance.
	 * @param {Number} [loop=0] The number of times to loop the audio. Use 0 for no loops, and -1 for an infinite loop.
	 * @param {Number} [volume] The volume of the sound between 0 and 1. Defaults to current instance value.
	 * @param {Number} [pan] The pan of the sound between -1 and 1. Defaults to current instance value.
	 * @return {Boolean} If the sound can start playing. Sounds that fail immediately will return false. Sounds that
	 * have a delay will return true, but may still fail to play.
	 * @protected
	 * @static
	 */
	s.playInstance = function (instance, interrupt, delay, offset, loop, volume, pan) {
		if (interrupt instanceof Object) {
			delay = interrupt.delay;
			offset = interrupt.offset;
			loop = interrupt.loop;
			volume = interrupt.volume;
			pan = interrupt.pan;
		}

		interrupt = interrupt || s.defaultInterruptBehavior;
		if (delay == null) {delay = 0;}
		if (offset == null) {offset = instance.getPosition();}
		if (loop == null) {loop = 0;}
		if (volume == null) {volume = instance.volume;}
		if (pan == null) {pan = instance.pan;}

		if (delay == 0) {
			var ok = s.beginPlaying(instance, interrupt, offset, loop, volume, pan);
			if (!ok) {
				return false;
			}
		} else {
			//Note that we can't pass arguments to proxy OR setTimeout (IE only), so just wrap the function call.
			// OJR WebAudio may want to handle this differently, so it might make sense to move this functionality into the plugins in the future
			var delayTimeoutId = setTimeout(function () {
				s.beginPlaying(instance, interrupt, offset, loop, volume, pan);
			}, delay);
			instance.delayTimeoutId = delayTimeoutId;
		}

		this.instances.push(instance);

		return true;
	}

	/**
	 * Begin playback. This is called immediately or after delay by {{#crossLink "Sound/playInstance"}}{{/crossLink}}.
	 * @method beginPlaying
	 * @param {SoundInstance} instance A {{#crossLink "SoundInstance"}}{{/crossLink}} to begin playback.
	 * @param {String} [interrupt=none] How this sound interrupts other instances with the same source. Defaults to
	 * {{#crossLink "Sound/INTERRUPT_NONE:property"}}{{/crossLink}}. Interrupts are defined as <code>INTERRUPT_TYPE</code>
	 * constants on Sound.
	 * @param {Number} [offset] Time in milliseconds into the sound to begin playback.  Defaults to the current value on
	 * the instance.
	 * @param {Number} [loop=0] The number of times to loop the audio. Use 0 for no loops, and -1 for an infinite loop.
	 * @param {Number} [volume] The volume of the sound between 0 and 1. Defaults to the current value on the instance.
	 * @param {Number} [pan=instance.pan] The pan of the sound between -1 and 1. Defaults to current instance value.
	 * @return {Boolean} If the sound can start playing. If there are no available channels, or the instance fails to
	 * start, this will return false.
	 * @protected
	 * @static
	 */
	s.beginPlaying = function (instance, interrupt, offset, loop, volume, pan) {
		if (!SoundChannel.add(instance, interrupt)) {
			return false;
		}
		var result = instance.beginPlaying(offset, loop, volume, pan);
		if (!result) {
			//LM: Should we remove this from the SoundChannel (see finishedPlaying)
			var index = createjs.indexOf(this.instances, instance);
			if (index > -1) {
				this.instances.splice(index, 1);
			}
			return false;
		}
		return true;
	}

	/**
	 * Get the source of a sound via the ID passed in with a register call. If no ID is found the value is returned
	 * instead.
	 * @method getSrcById
	 * @param {String} value The ID the sound was registered with.
	 * @return {String} The source of the sound.  Returns null if src has been registered with this id.
	 * @protected
	 * @static
	 */
	s.getSrcById = function (value) {
		if (s.idHash == null || s.idHash[value] == null) {
			return value;
		}
		return s.idHash[value];
	}

	/**
	 * A sound has completed playback, been interrupted, failed, or been stopped. This method removes the instance from
	 * Sound management. It will be added again, if the sound re-plays. Note that this method is called from the
	 * instances themselves.
	 * @method playFinished
	 * @param {SoundInstance} instance The instance that finished playback.
	 * @protected
	 * @static
	 */
	s.playFinished = function (instance) {
		SoundChannel.remove(instance);
		var index = createjs.indexOf(this.instances, instance);
		if (index > -1) {
			this.instances.splice(index, 1);
		}
	}

	/**
	 * REMOVED.  Please use createjs.proxy instead
	 * @method proxy
	 * @param {Function} method The function to call
	 * @param {Object} scope The scope to call the method name on
	 * @protected
	 * @static
	 * @deprecated Deprecated in favor of createjs.proxy.
	 */

	createjs.Sound = Sound;

	/**
	 * An internal class that manages the number of active {{#crossLink "SoundInstance"}}{{/crossLink}} instances for
	 * each sound type. This method is only used internally by the {{#crossLink "Sound"}}{{/crossLink}} class.
	 *
	 * The number of sounds is artificially limited by Sound in order to prevent over-saturation of a
	 * single sound, as well as to stay within hardware limitations, although the latter may disappear with better
	 * browser support.
	 *
	 * When a sound is played, this class ensures that there is an available instance, or interrupts an appropriate
	 * sound that is already playing.
	 * #class SoundChannel
	 * @param {String} src The source of the instances
	 * @param {Number} [max=1] The number of instances allowed
	 * @constructor
	 * @protected
	 */
	function SoundChannel(src, max) {
		this.init(src, max);
	}

	/* ------------
	 Static API
	 ------------ */
	/**
	 * A hash of channel instances indexed by source.
	 * #property channels
	 * @type {Object}
	 * @static
	 */
	SoundChannel.channels = {};

	/**
	 * Create a sound channel. Note that if the sound channel already exists, this will fail.
	 * #method create
	 * @param {String} src The source for the channel
	 * @param {Number} max The maximum amount this channel holds. The default is {{#crossLink "SoundChannel.maxDefault"}}{{/crossLink}}.
	 * @return {Boolean} If the channels were created.
	 * @static
	 */
	SoundChannel.create = function (src, max) {
		var channel = SoundChannel.get(src);
		if (channel == null) {
			SoundChannel.channels[src] = new SoundChannel(src, max);
			return true;
		}
		return false;
	}
	/**
	 * Delete a sound channel, stop and delete all related instances. Note that if the sound channel does not exist, this will fail.
	 * #method remove
	 * @param {String} src The source for the channel
	 * @return {Boolean} If the channels were deleted.
	 * @static
	 */
	SoundChannel.removeSrc = function (src) {
		var channel = SoundChannel.get(src);
		if (channel == null) {
			return false;
		}
		channel.removeAll();	// this stops and removes all active instances
		delete(SoundChannel.channels[src]);
		return true;
	}
	/**
	 * Delete all sound channels, stop and delete all related instances.
	 * #method removeAll
	 * @static
	 */
	SoundChannel.removeAll = function () {
		for(var channel in SoundChannel.channels) {
			SoundChannel.channels[channel].removeAll();	// this stops and removes all active instances
		}
		SoundChannel.channels = {};
	}
	/**
	 * Add an instance to a sound channel.
	 * #method add
	 * @param {SoundInstance} instance The instance to add to the channel
	 * @param {String} interrupt The interrupt value to use. Please see the {{#crossLink "Sound/play"}}{{/crossLink}}
	 * for details on interrupt modes.
	 * @return {Boolean} The success of the method call. If the channel is full, it will return false.
	 * @static
	 */
	SoundChannel.add = function (instance, interrupt) {
		var channel = SoundChannel.get(instance.src);
		if (channel == null) {
			return false;
		}
		return channel.add(instance, interrupt);
	}
	/**
	 * Remove an instance from the channel.
	 * #method remove
	 * @param {SoundInstance} instance The instance to remove from the channel
	 * @return The success of the method call. If there is no channel, it will return false.
	 * @static
	 */
	SoundChannel.remove = function (instance) {
		var channel = SoundChannel.get(instance.src);
		if (channel == null) {
			return false;
		}
		channel.remove(instance);
		return true;
	}
	/**
	 * Get the maximum number of sounds you can have in a channel.
	 * #method maxPerChannel
	 * @return {Number} The maximum number of sounds you can have in a channel.
	 */
	SoundChannel.maxPerChannel = function () {
		return p.maxDefault;
	}
	/**
	 * Get a channel instance by its src.
	 * #method get
	 * @param {String} src The src to use to look up the channel
	 * @static
	 */
	SoundChannel.get = function (src) {
		return SoundChannel.channels[src];
	}

	var p = SoundChannel.prototype;

	/**
	 * The source of the channel.
	 * #property src
	 * @type {String}
	 */
	p.src = null;

	/**
	 * The maximum number of instances in this channel.  -1 indicates no limit
	 * #property max
	 * @type {Number}
	 */
	p.max = null;

	/**
	 * The default value to set for max, if it isn't passed in.  Also used if -1 is passed.
	 * #property maxDefault
	 * @type {Number}
	 * @default 100
	 * @since 0.4.0
	 */
	p.maxDefault = 100;

	/**
	 * The current number of active instances.
	 * #property length
	 * @type {Number}
	 */
	p.length = 0;

	/**
	 * Initialize the channel.
	 * #method init
	 * @param {String} src The source of the channel
	 * @param {Number} max The maximum number of instances in the channel
	 * @protected
	 */
	p.init = function (src, max) {
		this.src = src;
		this.max = max || this.maxDefault;
		if (this.max == -1) {
			this.max == this.maxDefault;
		}
		this.instances = [];
	};

	/**
	 * Get an instance by index.
	 * #method get
	 * @param {Number} index The index to return.
	 * @return {SoundInstance} The SoundInstance at a specific instance.
	 */
	p.get = function (index) {
		return this.instances[index];
	};

	/**
	 * Add a new instance to the channel.
	 * #method add
	 * @param {SoundInstance} instance The instance to add.
	 * @return {Boolean} The success of the method call. If the channel is full, it will return false.
	 */
	p.add = function (instance, interrupt) {
		if (!this.getSlot(interrupt, instance)) {
			return false;
		}
		this.instances.push(instance);
		this.length++;
		return true;
	};

	/**
	 * Remove an instance from the channel, either when it has finished playing, or it has been interrupted.
	 * #method remove
	 * @param {SoundInstance} instance The instance to remove
	 * @return {Boolean} The success of the remove call. If the instance is not found in this channel, it will
	 * return false.
	 */
	p.remove = function (instance) {
		var index = createjs.indexOf(this.instances, instance);
		if (index == -1) {
			return false;
		}
		this.instances.splice(index, 1);
		this.length--;
		return true;
	};

	/**
	 * Stop playback and remove all instances from the channel.  Usually in response to a delete call.
	 * #method removeAll
	 */
	p.removeAll = function () {
		// Note that stop() removes the item from the list, but we don't want to assume that.
		for (var i=this.length-1; i>=0; i--) {
			this.instances[i].stop();
		}
	};

	/**
	 * Get an available slot depending on interrupt value and if slots are available.
	 * #method getSlot
	 * @param {String} interrupt The interrupt value to use.
	 * @param {SoundInstance} instance The sound instance that will go in the channel if successful.
	 * @return {Boolean} Determines if there is an available slot. Depending on the interrupt mode, if there are no slots,
	 * an existing SoundInstance may be interrupted. If there are no slots, this method returns false.
	 */
	p.getSlot = function (interrupt, instance) {
		var target, replacement;

		for (var i = 0, l = this.max; i < l; i++) {
			target = this.get(i);

			// Available Space
			if (target == null) {
				return true;
			} else if (interrupt == Sound.INTERRUPT_NONE && target.playState != Sound.PLAY_FINISHED) {
				continue;
			}

			// First replacement candidate
			if (i == 0) {
				replacement = target;
				continue;
			}

			// Audio is complete or not playing
			if (target.playState == Sound.PLAY_FINISHED ||
					target.playState == Sound.PLAY_INTERRUPTED ||
					target.playState == Sound.PLAY_FAILED) {
				replacement = target;

				// Audio is a better candidate than the current target, according to playhead
			} else if (
					(interrupt == Sound.INTERRUPT_EARLY && target.getPosition() < replacement.getPosition()) ||
							(interrupt == Sound.INTERRUPT_LATE && target.getPosition() > replacement.getPosition())) {
				replacement = target;
			}
		}

		if (replacement != null) {
			replacement.interrupt();
			this.remove(replacement);
			return true;
		}
		return false;
	};

	p.toString = function () {
		return "[Sound SoundChannel]";
	};

	// do not add SoundChannel to namespace


	// This is a dummy sound instance, which allows Sound to return something so developers don't need to check nulls.
	function SoundInstance() {
		this.isDefault = true;
		this.addEventListener = this.removeEventListener = this.removeAllEventListener = this.dispatchEvent = this.hasEventListener = this._listeners = this.interrupt = this.playFailed = this.pause = this.resume = this.play = this.beginPlaying = this.cleanUp = this.stop = this.setMasterVolume = this.setVolume = this.mute = this.setMute = this.getMute = this.setPan = this.getPosition = this.setPosition = function () {
			return false;
		};
		this.getVolume = this.getPan = this.getDuration = function () {
			return 0;
		}
		this.playState = Sound.PLAY_FAILED;
		this.toString = function () {
			return "[Sound Default Sound Instance]";
		}
	}

	Sound.defaultSoundInstance = new SoundInstance();

	//TODO: Moved to createjs/utils/Proxy.js. Deprecate on next version.
	if (createjs.proxy == null) {
		createjs.proxy = function() {
			throw("Proxy has been moved to an external file, and must be included separately.");
		}
	}


	/**
	 * An additional module to determine the current browser, version, operating system, and other environment
	 * variables. It is not publically documented.
	 * #class BrowserDetect
	 * @param {Boolean} isFirefox True if our browser is Firefox.
	 * @param {Boolean} isOpera True if our browser is opera.
	 * @param {Boolean} isChrome True if our browser is Chrome.  Note that Chrome for Android returns true, but is a
	 * completely different browser with different abilities.
	 * @param {Boolean} isIOS True if our browser is safari for iOS devices (iPad, iPhone, and iPad).
	 * @param {Boolean} isAndroid True if our browser is Android.
	 * @param {Boolean} isBlackberry True if our browser is Blackberry.
	 * @constructor
	 * @static
	 */
	function BrowserDetect() {
	}

	BrowserDetect.init = function () {
		var agent = window.navigator.userAgent;
		BrowserDetect.isFirefox = (agent.indexOf("Firefox") > -1);
		BrowserDetect.isOpera = (window.opera != null);
		BrowserDetect.isChrome = (agent.indexOf("Chrome") > -1);  // NOTE that Chrome on Android returns true but is a completely different browser with different abilities
		BrowserDetect.isIOS = agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1;
		BrowserDetect.isAndroid = (agent.indexOf("Android") > -1);
		BrowserDetect.isBlackberry = (agent.indexOf("Blackberry") > -1);
	}

	BrowserDetect.init();

	createjs.Sound.BrowserDetect = BrowserDetect;

}());
/*
 * WebAudioPlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module SoundJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {

	"use strict";

	/**
	 * Play sounds using Web Audio in the browser. The WebAudio plugin has been successfully tested with:
	 * <ul><li>Google Chrome, version 23+ on OS X and Windows</li>
	 *      <li>Safari 6+ on OS X</li>
	 *      <li>Mobile Safari on iOS 6+</li>
	 * </ul>
	 *
	 * The WebAudioPlugin is currently the default plugin, and will be used anywhere that it is supported. Currently
	 * Chrome and Safari offer support.  Firefox and Android Chrome both offer support for web audio in upcoming
	 * releases.  To change plugin priority, check out the Sound API {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} method.

	 * <h4>Known Browser and OS issues for Web Audio Plugin</h4>
	 * <b>Webkit (Chrome and Safari)</b>
	 * <ul><li>AudioNode.disconnect does not always seem to work.  This can cause the file size to grow over time if you
	 * are playing a lot of audio files.</li></ul>
	 * <br />
	 * <b>iOS 6 limitations</b>
	 * 	<ul><li>Sound is initially muted and will only unmute through play being called inside a user initiated event (touch/click).</li>
	 *  <li>Despite suggestions to the opposite, we have relative control over audio volume through the gain nodes.</li>
	 *	<li>A bug exists that will distort uncached audio when a video element is present in the DOM.</li>
	 * </ul>
	 * @class WebAudioPlugin
	 * @constructor
	 * @since 0.4.0
	 */
	function WebAudioPlugin() {
		this.init();
	}

	var s = WebAudioPlugin;

	/**
	 * The capabilities of the plugin. This is generated via the {{#crossLink "WebAudioPlugin/generateCapabilities:method"}}{{/crossLink}}
	 * method and is used internally.
	 * @property capabilities
	 * @type {Object}
	 * @default null
	 * @protected
	 * @static
	 */
	s.capabilities = null;

	/**
	 * Determine if the plugin can be used in the current browser/OS.
	 * @method isSupported
	 * @return {Boolean} If the plugin can be initialized.
	 * @static
	 */
	s.isSupported = function () {
		// check if this is some kind of mobile device, Web Audio works with local protocol under PhoneGap and it is unlikely someone is trying to run a local file
		var isMobilePhoneGap = createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid || createjs.Sound.BrowserDetect.isBlackberry;
		// OJR isMobile may be redundant with isFileXHRSupported available.  Consider removing.
		if (location.protocol == "file:" && !isMobilePhoneGap && !this.isFileXHRSupported()) { return false; }  // Web Audio requires XHR, which is not usually available locally
		s.generateCapabilities();
		if (s.context == null) {
			return false;
		}
		return true;
	};

	/**
	 * Determine if XHR is supported, which is necessary for web audio.
	 * @method isFileXHRSupported
	 * @return {Boolean} If XHR is supported.
	 * @since 0.4.2
	 * @protected
	 * @static
	 */
	s.isFileXHRSupported = function() {
		// it's much easier to detect when something goes wrong, so let's start optimisticaly
		var supported = true;

		var xhr = new XMLHttpRequest();
		try {
			xhr.open("GET", "fail.fail", false); // loading non-existant file triggers 404 only if it could load (synchronous call)
		} catch (error) {
			// catch errors in cases where the onerror is passed by
			supported = false;
			return supported;
		}
		xhr.onerror = function() { supported = false; }; // cause irrelevant
		// with security turned off, we can get empty success results, which is actually a failed read (status code 0?)
		xhr.onload = function() { supported = this.status == 404 || (this.status == 200 || (this.status == 0 && this.response != "")); };
		try {
			xhr.send();
		} catch (error) {
			// catch errors in cases where the onerror is passed by
			supported = false;
		}

		return supported;
	}

	/**
	 * Determine the capabilities of the plugin. Used internally. Please see the Sound API {{#crossLink "Sound/getCapabilities"}}{{/crossLink}}
	 * method for an overview of plugin capabilities.
	 * @method generateCapabiities
	 * @static
	 * @protected
	 */
	s.generateCapabilities = function () {
		if (s.capabilities != null) {
			return;
		}
		// Web Audio can be in any formats supported by the audio element, from http://www.w3.org/TR/webaudio/#AudioContext-section,
		// therefore tag is still required for the capabilities check
		var t = document.createElement("audio");

		if (t.canPlayType == null) {
			return null;
		}

		// This check is first because it's what is currently used, but the spec calls for it to be AudioContext so this
		//  will probably change in time
		if (window.webkitAudioContext) {
			s.context = new webkitAudioContext();
		} else if (window.AudioContext) {
			s.context = new AudioContext();
		} else {
			return null;
		}

		// this handles if only deprecated calls are supported
		s.compatibilitySetUp();

		// playing this inside of a touch event will enable audio on iOS, which starts muted
		s.playEmptySound();

		s.capabilities = {
			panning:true,
			volume:true,
			tracks:-1
		};

		// determine which extensions our browser supports for this plugin by iterating through Sound.SUPPORTED_EXTENSIONS
		var supportedExtensions = createjs.Sound.SUPPORTED_EXTENSIONS;
		var extensionMap = createjs.Sound.EXTENSION_MAP;
		for (var i = 0, l = supportedExtensions.length; i < l; i++) {
			var ext = supportedExtensions[i];
			var playType = extensionMap[ext] || ext;
			s.capabilities[ext] = (t.canPlayType("audio/" + ext) != "no" && t.canPlayType("audio/" + ext) != "") || (t.canPlayType("audio/" + playType) != "no" && t.canPlayType("audio/" + playType) != "");
		}  // OJR another way to do this might be canPlayType:"m4a", codex: mp4

		// 0=no output, 1=mono, 2=stereo, 4=surround, 6=5.1 surround.
		// See http://www.w3.org/TR/webaudio/#AudioChannelSplitter for more details on channels.
		if (s.context.destination.numberOfChannels < 2) {
			s.capabilities.panning = false;
		}

		// set up AudioNodes that all of our source audio will connect to
		s.dynamicsCompressorNode = s.context.createDynamicsCompressor();
		s.dynamicsCompressorNode.connect(s.context.destination);
		s.gainNode = s.context.createGain();
		s.gainNode.connect(s.dynamicsCompressorNode);
	};

	/**
	 * Set up compatibility if only deprecated web audio calls are supported.
	 * See http://www.w3.org/TR/webaudio/#DeprecationNotes
	 * Needed so we can support new browsers that don't support deprecated calls (Firefox) as well as old browsers that
	 * don't support new calls.
	 *
	 * @method compatibilitySetUp
	 * @protected
	 * @since 0.4.2
	 */
	s.compatibilitySetUp = function() {
		//assume that if one new call is supported, they all are
		if (s.context.createGain) { return; }

		// simple name change, functionality the same
		s.context.createGain = s.context.createGainNode;

		// source node, add to prototype
		var audioNode = s.context.createBufferSource();
		audioNode.__proto__.start = audioNode.__proto__.noteGrainOn;	// note that noteGrainOn requires all 3 parameters
		audioNode.__proto__.stop = audioNode.__proto__.noteOff;

		// panningModel
		this.panningModel = 0;
	}

	/**
	 * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
	 * require the first sound to be played inside of a user initiated event (touch/click).  This is called when
	 * {{#crossLink "WebAudioPlugin"}}{{/crossLink}} is initialized (by Sound {{#crossLink "Sound/initializeDefaultPlugins"}}{{/crossLink}}
	 * for example).
	 *
	 * <h4>Example</h4>
	 *
	 *     function handleTouch(event) {
	 *         createjs.WebAudioPlugin.playEmptySound();
	 *     }
	 *
	 * @method playEmptySound
	 * @since 0.4.1
	 */
	s.playEmptySound = function() {
		// create empty buffer
		var buffer = this.context.createBuffer(1, 1, 22050);
		var source = this.context.createBufferSource();
		source.buffer = buffer;

		// connect to output (your speakers)
		source.connect(this.context.destination);

		// play the file
		source.start(0, 0, 0);
	};


	var p = WebAudioPlugin.prototype;

	p.capabilities = null; // doc'd above

	/**
	 * The internal volume value of the plugin.
	 * @property volume
	 * @type {Number}
	 * @default 1
	 * @protected
	 */
	// TODO refactor Sound.js so we can use getter setter for volume
	p.volume = 1;

	/**
	 * The web audio context, which WebAudio uses to play audio. All nodes that interact with the WebAudioPlugin
	 * need to be created within this context.
	 * @property context
	 * @type {AudioContext}
	 */
	p.context = null;

	/**
	 * Value to set panning model to equal power for SoundInstance.  Can be "equalpower" or 0 depending on browser implementation.
	 * @property panningModel
	 * @type {Number / String}
	 * @protected
	 */
	p.panningModel = "equalpower";

	/**
	 * A DynamicsCompressorNode, which is used to improve sound quality and prevent audio distortion according to
	 * http://www.w3.org/TR/webaudio/#DynamicsCompressorNode. It is connected to <code>context.destination</code>.
	 * @property dynamicsCompressorNode
	 * @type {AudioNode}
	 */
	p.dynamicsCompressorNode = null;

	/**
	 * A GainNode for controlling master volume. It is connected to {{#crossLink "WebAudioPlugin/dynamicsCompressorNode:property"}}{{/crossLink}}.
	 * @property gainNode
	 * @type {AudioGainNode}
	 */
	p.gainNode = null;

	/**
	 * An object hash used internally to store ArrayBuffers, indexed by the source URI used  to load it. This
	 * prevents having to load and decode audio files more than once. If a load has been started on a file,
	 * <code>arrayBuffers[src]</code> will be set to true. Once load is complete, it is set the the loaded
	 * ArrayBuffer instance.
	 * @property arrayBuffers
	 * @type {Object}
	 * @protected
	 */
	p.arrayBuffers = null;

	/**
	 * An initialization function run by the constructor
	 * @method init
	 * @protected
	 */
	p.init = function () {
		this.capabilities = s.capabilities;
		this.arrayBuffers = {};

		this.context = s.context;
		this.gainNode = s.gainNode;
		this.dynamicsCompressorNode = s.dynamicsCompressorNode;
	};

	/**
	 * Pre-register a sound for preloading and setup. This is called by {{#crossLink "Sound"}}{{/crossLink}}.
	 * Note that WebAudio provides a <code>Loader</code> instance, which <a href="http://preloadjs.com">PreloadJS</a>
	 * can use to assist with preloading.
	 * @method register
	 * @param {String} src The source of the audio
	 * @param {Number} instances The number of concurrently playing instances to allow for the channel at any time.
	 * Note that the WebAudioPlugin does not manage this property.
	 * @return {Object} A result object, containing a "tag" for preloading purposes.
	 */
	p.register = function (src, instances) {
		this.arrayBuffers[src] = true;  // This is needed for PreloadJS
		var tag = new createjs.WebAudioPlugin.Loader(src, this);
		return {
			tag:tag
		};
	};

	/**
	 * Checks if preloading has started for a specific source. If the source is found, we can assume it is loading,
	 * or has already finished loading.
	 * @method isPreloadStarted
	 * @param {String} src The sound URI to check.
	 * @return {Boolean}
	 */
	p.isPreloadStarted = function (src) {
		return (this.arrayBuffers[src] != null);
	};

	/**
	 * Checks if preloading has finished for a specific source.
	 * @method isPreloadComplete
	 * @param {String} src The sound URI to load.
	 * @return {Boolean}
	 */
	p.isPreloadComplete = function (src) {
		return (!(this.arrayBuffers[src] == null || this.arrayBuffers[src] == true));
	};

	/**
	 * Remove a source from our preload list. Note this does not cancel a preload.
	 * @method removeFromPreload
	 * @param {String} src The sound URI to unload.
	 * @deprecated
	 */
	p.removeFromPreload = function (src) {
		delete(this.arrayBuffers[src]);
	};

	/**
	 * Remove a sound added using {{#crossLink "WebAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
	 * @method removeSound
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeSound = function (src) {
		delete(this.arrayBuffers[src]);
	};

	/**
	 * Remove all sounds added using {{#crossLink "WebAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
	 * @method removeAllSounds
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeAllSounds = function () {
		this.arrayBuffers = {};
	};

	/**
	 * Add loaded results to the preload object hash.
	 * @method addPreloadResults
	 * @param {String} src The sound URI to unload.
	 * @return {Boolean}
	 */
	p.addPreloadResults = function (src, result) {
		this.arrayBuffers[src] = result;
	};

	/**
	 * Handles internal preload completion.
	 * @method handlePreloadComplete
	 * @protected
	 */
	p.handlePreloadComplete = function () {
		//LM: I would recommend having the Loader include an "event" in the onload, and properly binding this callback.
		createjs.Sound.sendFileLoadEvent(this.src);  // fire event or callback on Sound
		// note "this" will reference Loader object
	};

	/**
	 * Internally preload a sound. Loading uses XHR2 to load an array buffer for use with WebAudio.
	 * @method preload
	 * @param {String} src The sound URI to load.
	 * @param {Object} instance Not used in this plugin.
	 * @param {String} basePath A file path to prepend to the src.
	 * @protected
	 */
	p.preload = function (src, instance, basePath) {
		this.arrayBuffers[src] = true;
		var loader = new createjs.WebAudioPlugin.Loader(src, this);
		loader.onload = this.handlePreloadComplete;
		if (basePath != null) {loader.src = basePath+loader.src;}
		loader.load();
	};

	/**
	 * Create a sound instance. If the sound has not been preloaded, it is internally preloaded here.
	 * @method create
	 * @param {String} src The sound source to use.
	 * @return {SoundInstance} A sound instance for playback and control.
	 */
	p.create = function (src) {
		if (!this.isPreloadStarted(src)) {
			this.preload(src);
		}
		return new createjs.WebAudioPlugin.SoundInstance(src, this);
	};

	/**
	 * Set the master volume of the plugin, which affects all SoundInstances.
	 * @method setVolume
	 * @param {Number} value The volume to set, between 0 and 1.
	 * @return {Boolean} If the plugin processes the setVolume call (true). The Sound class will affect all the
	 * instances manually otherwise.
	 */
	p.setVolume = function (value) {
		this.volume = value;
		this.updateVolume();
		return true;
	};

	/**
	 * Set the gain value for master audio. Should not be called externally.
	 * @method updateVolume
	 * @protected
	 */
	p.updateVolume = function () {
		var newVolume = createjs.Sound.masterMute ? 0 : this.volume;
		if (newVolume != this.gainNode.gain.value) {
			this.gainNode.gain.value = newVolume;
		}
	};

	/**
	 * Get the master volume of the plugin, which affects all SoundInstances.
	 * @method getVolume
	 * @return The volume level, between 0 and 1.
	 */
	p.getVolume = function () {
		return this.volume;
	};

	/**
	 * Mute all sounds via the plugin.
	 * @method setMute
	 * @param {Boolean} value If all sound should be muted or not. Note that plugin-level muting just looks up
	 * the mute value of Sound {{#crossLink "Sound/getMute"}}{{/crossLink}}, so this property is not used here.
	 * @return {Boolean} If the mute call succeeds.
	 */
	p.setMute = function (value) {
		this.updateVolume();
		return true;
	};

	p.toString = function () {
		return "[WebAudioPlugin]";
	};

	createjs.WebAudioPlugin = WebAudioPlugin;
}());

(function () {

	"use strict";

	/**
	 * A SoundInstance is created when any calls to the Sound API method {{#crossLink "Sound/play"}}{{/crossLink}} or
	 * {{#crossLink "Sound/createInstance"}}{{/crossLink}} are made. The SoundInstance is returned by the active plugin
	 * for control by the user.
	 *
	 * <h4>Example</h4>
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
	 *
	 * A number of additional parameters provide a quick way to determine how a sound is played. Please see the Sound
	 * API method {{#crossLink "Sound/play"}}{{/crossLink}} for a list of arguments.
	 *
	 * Once a SoundInstance is created, a reference can be stored that can be used to control the audio directly through
	 * the SoundInstance. If the reference is not stored, the SoundInstance will play out its audio (and any loops), and
	 * is then de-referenced from the {{#crossLink "Sound"}}{{/crossLink}} class so that it can be cleaned up. If audio
	 * playback has completed, a simple call to the {{#crossLink "SoundInstance/play"}}{{/crossLink}} instance method
	 * will rebuild the references the Sound class need to control it.
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
	 *      myInstance.addEventListener("complete", playAgain);
	 *      function playAgain(event) {
	 *          myInstance.play();
	 *      }
	 *
	 * Events are dispatched from the instance to notify when the sound has completed, looped, or when playback fails
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
	 *      myInstance.addEventListener("complete", handleComplete);
	 *      myInstance.addEventListener("loop", handleLoop);
	 *      myInstance.addEventListener("failed", handleFailed);
	 *
	 *
	 * @class SoundInstance
	 * @param {String} src The path to and file name of the sound.
	 * @param {Object} owner The plugin instance that created this SoundInstance.
	 * @uses EventDispatcher
	 * @constructor
	 */
	function SoundInstance(src, owner) {
		this.init(src, owner);
	}

	var p = SoundInstance.prototype;

	/**
	 * The source of the sound.
	 * @property src
	 * @type {String}
	 * @default null
	 * @protected
	 */
	p.src = null;

	/**
	 * The unique ID of the instance. This is set by {{#crossLink "Sound"}}{{/crossLink}}.
	 * @property uniqueId
	 * @type {String} | Number
	 * @default -1
	 */
	p.uniqueId = -1;

	/**
	 * The play state of the sound. Play states are defined as constants on {{#crossLink "Sound"}}{{/crossLink}}.
	 * @property playState
	 * @type {String}
	 * @default null
	 */
	p.playState = null;

	/**
	 * The plugin that created the instance
	 * @property owner
	 * @type {WebAudioPlugin}
	 * @default null
	 * @protected
	 */
	p.owner = null;

	/**
	 * How far into the sound to begin playback in milliseconds. This is passed in when play is called and used by
	 * pause and setPosition to track where the sound should be at.
	 * Note this is converted from milliseconds to seconds for consistency with the WebAudio API.
	 * @property offset
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.offset = 0;

	/**
	 * The time in milliseconds before the sound starts.
	 * Note this is handled by {{#crossLink "Sound"}}{{/crossLink}}.
	 * @property delay
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.delay = 0;


	/**
	 * The volume of the sound, between 0 and 1.
	 * Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower and Opera versions 11.50 or lower,
	 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "SoundInstance/setVolume"}}{{/crossLink}} and {{#crossLink "SoundInstance/getVolume"}}{{/crossLink}}.
	 *
	 * The actual output volume of a sound can be calculated using:
	 * <code>myInstance.volume * createjs.Sound.getVolume();</code>
	 *
	 * @property volume
	 * @type {Number}
	 * @default 1
	 */
	p._volume =  1;
	Object.defineProperty(p, "volume", {
		get: function() {
			return this._volume;
		},
		set: function(value) {
			if (Number(value) == null) {return false}
			value = Math.max(0, Math.min(1, value));
			this._volume = value;
			this.updateVolume();
		}
	});

	/**
	 * The pan of the sound, between -1 (left) and 1 (right). Note that pan does not work for HTML Audio.
	 * Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
	 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "SoundInstance/setPan"}}{{/crossLink}} and {{#crossLink "SoundInstance/getPan"}}{{/crossLink}}.
	 * Note in WebAudioPlugin this only gives us the "x" value of what is actually 3D audio.
	 *
	 * @property pan
	 * @type {Number}
	 * @default 0
	 */
	p._pan =  0;
	Object.defineProperty(p, "pan", {
		get: function() {
			return this._pan;
		},
		set: function(value) {
			if (!this.owner.capabilities.panning || Number(value) == null) {return false;}

			value = Math.max(-1, Math.min(1, value));	// force pan to stay in the -1 to 1 range
			// Note that panning in WebAudioPlugin can support 3D audio, but our implementation does not.
			this._pan = value;  // Unfortunately panner does not give us a way to access this after it is set http://www.w3.org/TR/webaudio/#AudioPannerNode
			this.panNode.setPosition(value, 0, -0.5);  // z need to be -0.5 otherwise the sound only plays in left, right, or center
		}
	});

	/**
	 * The length of the audio clip, in milliseconds.
	 * Use {{#crossLink "SoundInstance/getDuration:method"}}{{/crossLink}} to access.
	 * @property pan
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.duration = 0;

	/**
	 * The number of play loops remaining. Negative values will loop infinitely.
	 * @property remainingLoops
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.remainingLoops = 0;

	/**
	 * A Timeout created by {{#crossLink "Sound"}}{{/crossLink}} when this SoundInstance is played with a delay.
	 * This allows SoundInstance to remove the delay if stop or pause or cleanup are called before playback begins.
	 * @property delayTimeoutId
	 * @type {timeoutVariable}
	 * @default null
	 * @protected
	 * @since 0.4.0
	 */
	p.delayTimeoutId = null;

	/**
	 * Timeout that is created internally to handle sound playing to completion. Stored so we can remove it when
	 * stop, pause, or cleanup are called
	 * @property soundCompleteTimeout
	 * @type {timeoutVariable}
	 * @default null
	 * @protected
	 * @since 0.4.0
	 */
	p.soundCompleteTimeout = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * A panNode allowing left and right audio channel panning only. Connected to our WebAudioPlugin {{#crossLink "WebAudioPlugin/gainNode:property"}}{{/crossLink}}
	 * that sequences to <code>context.destination</code>.
	 * @property panNode
	 * @type {AudioPannerNode}
	 * @default null
	 * @since 0.4.0
	 */
	p.panNode = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * GainNode for controlling <code>SoundInstance</code> volume. Connected to {{#crossLink "SoundInstance/panNode:property"}}{{/crossLink}}.
	 * @property gainNode
	 * @type {AudioGainNode}
	 * @default null
	 * @since 0.4.0
	 *
	 */
	p.gainNode = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * sourceNode is the audio source. Connected to {{#crossLink "SoundInstance/gainNode:property"}}{{/crossLink}}.
	 * @property sourceNode
	 * @type {AudioSourceNode}
	 * @default null
	 * @since 0.4.0
	 *
	 */
	p.sourceNode = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * sourceNodeNext is the audio source for the next loop, inserted in a look ahead approach to allow for smooth
	 * looping. Connected to {{#crossLink "SoundInstance/gainNode:property"}}{{/crossLink}}.
	 * @property sourceNodeNext
	 * @type {AudioSourceNode}
	 * @default null
	 * @protected
	 * @since 0.4.1
	 *
	 */
	p.sourceNodeNext = null;

	/**
	 * Determines if the audio is currently muted.
	 * Use {{#crossLink "SoundInstance/getMute:method"}}{{/crossLink}} and {{#crossLink "SoundInstance/setMute:method"}}{{/crossLink}} to access.
	 * @property muted
	 * @type {Boolean}
	 * @default false
	 * @protected
	 */
	p.muted = false;

	/**
	 * Determines if the audio is currently paused.
	 * Use {{#crossLink "SoundInstance/pause:method"}}{{/crossLink}} and {{#crossLink "SoundInstance/resume:method"}}{{/crossLink}} to set.
	 * @property paused
	 * @type {Boolean}
	 * @default false
	 * @protected
	 */
	p.paused = false;

	/**
	 * WebAudioPlugin only.
	 * Time audio started playback, in seconds. Used to handle set position, get position, and resuming from paused.
	 * @property startTime
	 * @type {Number}
	 * @default 0
	 * @protected
	 * @since 0.4.0
	 */
	p.startTime = 0;

// mix-ins:
	// EventDispatcher methods:
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;

	// Proxies, make removing listeners easier.
	p.endedHandler = null;
	p.readyHandler = null;
	p.stalledHandler = null;

// Events
	/**
	 * The event that is fired when a sound is ready to play.
	 * @event ready
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when playback has started successfully.
	 * @event succeeded
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when playback is interrupted. This happens when another sound with the same
	 * src property is played using an interrupt value that causes this instance to stop playing.
	 * @event interrupted
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when playback has failed. This happens when there are too many channels with the same
	 * src property already playing (and the interrupt value doesn't cause an interrupt of another instance), or
	 * the sound could not be played, perhaps due to a 404 error.
	 * @event failed
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when a sound has completed playing but has loops remaining.
	 * @event loop
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when playback completes. This means that the sound has finished playing in its
	 * entirety, including its loop iterations.
	 * @event complete
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	//TODO: Deprecated
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SoundInstance/ready:event"}}{{/crossLink}}
	 * event.
	 * @property onReady
	 * @type {Function}
	 * @deprecated Use addEventListener and the "ready" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SoundInstance/succeeded:event"}}{{/crossLink}}
	 * event.
	 * @property onPlaySucceeded
	 * @type {Function}
	 * @deprecated Use addEventListener and the "succeeded" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SoundInstance/interrupted:event"}}{{/crossLink}}
	 * event.
	 * @property onPlayInterrupted
	 * @type {Function}
	 * @deprecated Use addEventListener and the "interrupted" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SoundInstance/failed:event"}}{{/crossLink}}
	 * event.
	 * @property onPlayFailed
	 * @type {Function}
	 * @deprecated Use addEventListener and the "failed" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SoundInstance/complete:event"}}{{/crossLink}}
	 * event.
	 * @property onComplete
	 * @type {Function}
	 * @deprecated Use addEventListener and the "complete" event.
	 */
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SoundInstance/loop:event"}}{{/crossLink}}
	 * event.
	 * @property onLoop
	 * @type {Function}
	 * @deprecated Use addEventListener and the "loop" event.
	 */

	/**
	 * A helper method that dispatches all events for SoundInstance.
	 * @method sendEvent
	 * @param {String} type The event type
	 * @protected
	 */
	p.sendEvent = function (type) {
		var event = new createjs.Event(type);
		this.dispatchEvent(event);
	};

// Constructor
	/**
	 * Initialize the SoundInstance. This is called from the constructor.
	 * @method init
	 * @param {string} src The source of the audio.
	 * @param {Class} owner The plugin that created this instance.
	 * @protected
	 */
	p.init = function (src, owner) {
		this.owner = owner;
		this.src = src;

		this.panNode = this.owner.context.createPanner();  // TODO test how this affects when we have mono audio
		this.panNode.panningModel = this.owner.panningModel;

		this.gainNode = this.owner.context.createGain();
		this.gainNode.connect(this.panNode);

		if (this.owner.isPreloadComplete(this.src)) {
			this.duration = this.owner.arrayBuffers[this.src].duration * 1000;
		}

		this.endedHandler = createjs.proxy(this.handleSoundComplete, this);
		this.readyHandler = createjs.proxy(this.handleSoundReady, this);
		this.stalledHandler = createjs.proxy(this.handleSoundStalled, this);
	};

	/**
	 * Clean up the instance. Remove references and clean up any additional properties such as timers.
	 * @method cleanup
	 * @protected
	 */
	p.cleanUp = function () {
		// if playbackState is UNSCHEDULED_STATE, then play has not been called so calling stop would throw an error
		if (this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE) {
			this.sourceNode = this.cleanUpAudioNode(this.sourceNode);
			this.sourceNodeNext = this.cleanUpAudioNode(this.sourceNodeNext);
		}

		if (this.panNode.numberOfOutputs != 0) {
			this.panNode.disconnect(0);
		}  // this works because we only have one connection, and it returns 0 if we've already disconnected it.
		// OJR there appears to be a bug that this doesn't always work in webkit (Chrome and Safari). According to the documentation, this should work.

		clearTimeout(this.delayTimeoutId); // clear timeout that plays delayed sound
		clearTimeout(this.soundCompleteTimeout);  // clear timeout that triggers sound complete

		this.startTime = 0;	// This is used by getPosition

		if (window.createjs == null) {
			return;
		}
		createjs.Sound.playFinished(this);
	};

	/**
	 * Turn off and disconnect an audioNode, then set reference to null to release it for garbage collection
	 * @param audioNode
	 * @return {audioNode}
	 * @protected
	 * @since 0.4.1
	 */
	p.cleanUpAudioNode = function(audioNode) {
		if(audioNode) {
			audioNode.stop(0);
			audioNode.disconnect(this.gainNode);
			audioNode = null;	// release reference so Web Audio can handle removing references and garbage collection
		}
		return audioNode;
	};

	/**
	 * The sound has been interrupted.
	 * @method interrupt
	 * @protected
	 */
	p.interrupt = function () {
		this.playState = createjs.Sound.PLAY_INTERRUPTED;
		this.cleanUp();
		this.paused = false;
		this.sendEvent("interrupted");
	};

	// Playback has stalled, and therefore failed.
	p.handleSoundStalled = function (event) {
		this.sendEvent("failed");
	};

	// The sound is ready for playing
	p.handleSoundReady = function (event) {
		if (window.createjs == null) {
			return;
		}

		if ((this.offset*1000) > this.getDuration()) {	// converting offset to ms
			this.playFailed();
			return;
		} else if (this.offset < 0) {  // may not need this check if play ignores negative values, this is not specified in the API http://www.w3.org/TR/webaudio/#AudioBufferSourceNode
			this.offset = 0;
		}

		this.playState = createjs.Sound.PLAY_SUCCEEDED;
		this.paused = false;

		this.panNode.connect(this.owner.gainNode);  // this line can cause a memory leak.  Nodes need to be disconnected from the audioDestination or any sequence that leads to it.

		var dur = this.owner.arrayBuffers[this.src].duration;
		this.sourceNode = this.createAndPlayAudioNode((this.owner.context.currentTime - dur), this.offset);
		this.duration = dur * 1000;	// NOTE *1000 because WebAudio reports everything in seconds but js uses milliseconds
		this.startTime = this.sourceNode.startTime - this.offset;

		this.soundCompleteTimeout = setTimeout(this.endedHandler, (dur - this.offset) * 1000);

		if(this.remainingLoops != 0) {
			this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0);
		}
	};

	/**
	 * Creates an audio node using the current src and context, connects it to the gain node, and starts playback.
	 * @method createAudioNode
	 * @param {Number} startTime The time to add this to the web audio context, in seconds.
	 * @param {Number} offset The amount of time into the src audio to start playback, in seconds.
	 * @return {audioNode}
	 * @protected
	 * @since 0.4.1
	 */
	p.createAndPlayAudioNode = function(startTime, offset) {
		// WebAudio supports BufferSource, MediaElementSource, and MediaStreamSource.
		// NOTE MediaElementSource requires different commands to play, pause, and stop because it uses audio tags.
		// The same is assumed for MediaStreamSource, although it may share the same commands as MediaElementSource.
		var audioNode = this.owner.context.createBufferSource();
		audioNode.buffer = this.owner.arrayBuffers[this.src];
		audioNode.connect(this.gainNode);
		var currentTime = this.owner.context.currentTime;
		audioNode.startTime = startTime + audioNode.buffer.duration;	//currentTime + audioNode.buffer.duration - (currentTime - startTime);
		audioNode.start(audioNode.startTime, offset, audioNode.buffer.duration - offset);  // OJR deprecated in favor of start()
		return audioNode;
	};

	// Public API
	/**
	 * Play an instance. This method is intended to be called on SoundInstances that already exist (created
	 * with the Sound API {{#crossLink "Sound/createInstance"}}{{/crossLink}} or {{#crossLink "Sound/play"}}{{/crossLink}}).
	 *
	 * <h4>Example</h4>
	 *      var myInstance = createjs.Sound.createInstance(mySrc);
	 *      myInstance.play(createjs.Sound.INTERRUPT_ANY);
	 *      // alternatively, we can pass in options we want to set in an object
	 *      myInstance.play({offset:1, loop:2, pan:0.5});
	 *
	 * @method play
	 * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
	 * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
	 * constants on the Sound class, with the default defined by {{#crossLink "Sound/defaultInterruptBehavior"}}{{/crossLink}}.
	 * <br /><strong>OR</strong><br />
	 * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
	 * delay, offset, loop, volume, and pan (see the above code sample).
	 * @param {Number} [delay=0] The delay in milliseconds before the sound starts
	 * @param {Number} [offset=0] How far into the sound to begin playback, in milliseconds.
	 * @param {Number} [loop=0] The number of times to loop the audio. Use -1 for infinite loops.
	 * @param {Number} [volume=1] The volume of the sound, between 0 and 1.
	 * @param {Number} [pan=0] The pan of the sound between -1 (left) and 1 (right). Note that pan is not supported
	 * for HTML Audio.
	 */
	p.play = function (interrupt, delay, offset, loop, volume, pan) {
		this.cleanUp();
		createjs.Sound.playInstance(this, interrupt, delay, offset, loop, volume, pan);
	};

	/**
	 * Called by the Sound class when the audio is ready to play (delay has completed). Starts sound playing if the
	 * src is loaded, otherwise playback will fail.
	 * @method beginPlaying
	 * @param {Number} offset How far into the sound to begin playback, in milliseconds.
	 * @param {Number} loop The number of times to loop the audio. Use -1 for infinite loops.
	 * @param {Number} volume The volume of the sound, between 0 and 1.
	 * @param {Number} pan The pan of the sound between -1 (left) and 1 (right). Note that pan does not work for HTML Audio.
	 * @protected
	 */
	p.beginPlaying = function (offset, loop, volume, pan) {
		if (window.createjs == null) {
			return;
		}

		if (!this.src) {
			return;
		}

		this.offset = offset / 1000;  //convert ms to sec
		this.remainingLoops = loop;
		this.volume = volume;
		this.pan = pan;

		if (this.owner.isPreloadComplete(this.src)) {
			this.handleSoundReady(null);
			this.sendEvent("succeeded");
			return 1;
		} else {
			this.playFailed();
			return;
		}
	};

	/**
	 * Pause the instance. Paused audio will stop at the current time, and can be resumed using
	 * {{#crossLink "SoundInstance/resume"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      myInstance.pause();
	 *
	 * @method pause
	 * @return {Boolean} If the pause call succeeds. This will return false if the sound isn't currently playing.
	 */
	p.pause = function () {
		if (!this.paused && this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this.paused = true;

			this.offset = this.owner.context.currentTime - this.startTime;  // this allows us to restart the sound at the same point in playback
			this.cleanUpAudioNode(this.sourceNode);
			this.cleanUpAudioNode(this.sourceNodeNext);

			if (this.panNode.numberOfOutputs != 0) {
				this.panNode.disconnect();
			}  // this works because we only have one connection, and it returns 0 if we've already disconnected it.

			clearTimeout(this.delayTimeoutId); // clear timeout that plays delayed sound
			clearTimeout(this.soundCompleteTimeout);  // clear timeout that triggers sound complete
			return true;
		}
		return false;
	};

	/**
	 * Resume an instance that has been paused using {{#crossLink "SoundInstance/pause"}}{{/crossLink}}. Audio that
	 * has not been paused will not playback when this method is called.
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.pause();
	 *     // do some stuff
	 *     myInstance.resume();
	 *
	 * @method resume
	 * @return {Boolean} If the resume call succeeds. This will return false if called on a sound that is not paused.
	 */
	p.resume = function () {
		if (!this.paused) {
			return false;
		}
		this.handleSoundReady(null);
		return true;
	};

	/**
	 * Stop playback of the instance. Stopped sounds will reset their position to 0, and calls to {{#crossLink "SoundInstance/resume"}}{{/crossLink}}
	 * will fail.  To start playback again, call {{#crossLink "SoundInstance/play"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.stop();
	 *
	 * @method stop
	 * @return {Boolean} If the stop call succeeds.
	 */
	p.stop = function () {
		this.playState = createjs.Sound.PLAY_FINISHED;
		this.cleanUp();
		this.offset = 0;  // set audio to start at the beginning
		return true;
	};

	/**
	 * NOTE that you can set volume directly, and setVolume remains to allow support for IE8 with FlashPlugin.
	 * Set the volume of the instance. You can retrieve the volume using {{#crossLink "SoundInstance/getVolume"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      myInstance.setVolume(0.5);
	 *
	 * Note that the master volume set using the Sound API method {{#crossLink "Sound/setVolume"}}{{/crossLink}}
	 * will be applied to the instance volume.
	 *
	 * @method setVolume
	 * @param value The volume to set, between 0 and 1.
	 * @return {Boolean} If the setVolume call succeeds.
	 */
	p.setVolume = function (value) {
		this.volume = value;
		return true;  // This is always true because even if the volume is not updated, the value is set
	};

	/**
	 * Internal function used to update the volume based on the instance volume, master volume, instance mute value,
	 * and master mute value.
	 * @method updateVolume
	 * @return {Boolean} if the volume was updated.
	 * @protected
	 */
	p.updateVolume = function () {
		var newVolume = this.muted ? 0 : this._volume;
		if (newVolume != this.gainNode.gain.value) {
			this.gainNode.gain.value = newVolume;
			return true;
		}
		return false;
	};

	/**
	 * NOTE that you can get volume directly, and getVolume remains to allow support for IE8 with FlashPlugin.
	 *
	 * Get the volume of the instance. The actual output volume of a sound can be calculated using:
	 * <code>myInstance.getVolume() * createjs.Sound.getVolume();</code>
	 *
	 * @method getVolume
	 * @return The current volume of the sound instance.
	 */
	p.getVolume = function () {
		return this.volume;
	};

	/**
	 * REMOVED. <strong>Please use {{#crossLink "SoundInstance/setMute"}}{{/crossLink}} instead</strong>.
	 * @method mute
	 * @param {Boolean} value If the sound should be muted or not.
	 * @return {Boolean} If the mute call succeeds.
	 * @deprecated This method has been replaced by setMute.
	 */

	/**
	 * Mute and unmute the sound. Muted sounds will still play at 0 volume. Note that an unmuted sound may still be
	 * silent depending on {{#crossLink "Sound"}}{{/crossLink}} volume, instance volume, and Sound mute.
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.setMute(true);
	 *
	 * @method setMute
	 * @param {Boolean} value If the sound should be muted.
	 * @return {Boolean} If the mute call succeeds.
	 * @since 0.4.0
	 */
	p.setMute = function (value) {
		if (value == null || value == undefined) {
			return false;
		}

		this.muted = value;
		this.updateVolume();
		return true;
	};

	/**
	 * Get the mute value of the instance.
	 *
	 * <h4>Example</h4>
	 *
	 *      var isMuted = myInstance.getMute();
	 *
	 * @method getMute
	 * @return {Boolean} If the sound is muted.
	 * @since 0.4.0
	 */
	p.getMute = function () {
		return this.muted;
	};

	/**
	 * NOTE that you can set pan directly, and getPan remains to allow support for IE8 with FlashPlugin.
	 *
	 * Set the left(-1)/right(+1) pan of the instance. Note that {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}} does not
	 * support panning, and only simple left/right panning has been implemented for {{#crossLink "WebAudioPlugin"}}{{/crossLink}}.
	 * The default pan value is 0 (center).
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.setPan(-1);  // to the left!
	 *
	 * @method setPan
	 * @param {Number} value The pan value, between -1 (left) and 1 (right).
	 * @return {Number} If the setPan call succeeds.
	 */
	p.setPan = function (value) {
		this.pan = value;  // Unfortunately panner does not give us a way to access this after it is set http://www.w3.org/TR/webaudio/#AudioPannerNode
		if(this.pan != value) {return false;}
	};

	/**
	 * NOTE that you can get volume directly, and getPan remains to allow support for IE8 with FlashPlugin.
	 *
	 * Get the left/right pan of the instance. Note in WebAudioPlugin this only gives us the "x" value of what is
	 * actually 3D audio.
	 *
	 * <h4>Example</h4>
	 *
	 *     var myPan = myInstance.getPan();
	 *
	 * @method getPan
	 * @return {Number} The value of the pan, between -1 (left) and 1 (right).
	 */
	p.getPan = function () {
		return this.pan;
	};

	/**
	 * Get the position of the playhead in the instance in milliseconds.
	 *
	 * <h4>Example</h4>
	 *
	 *     var currentOffset = myInstance.getPosition();
	 *
	 * @method getPosition
	 * @return {Number} The position of the playhead in the sound, in milliseconds.
	 */
	p.getPosition = function () {
		if (this.paused || this.sourceNode == null) {
			var pos = this.offset;
		} else {
			var pos = this.owner.context.currentTime - this.startTime;
		}

		return pos * 1000; // pos in seconds * 1000 to give milliseconds
	};

	/**
	 * Set the position of the playhead in the instance. This can be set while a sound is playing, paused, or even
	 * stopped.
	 *
	 * <h4>Example</h4>
	 *
	 *      myInstance.setPosition(myInstance.getDuration()/2); // set audio to its halfway point.
	 *
	 * @method setPosition
	 * @param {Number} value The position to place the playhead, in milliseconds.
	 */
	p.setPosition = function (value) {
		this.offset = value / 1000; // convert milliseconds to seconds

		if (this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE) {  // if playbackState is UNSCHEDULED_STATE, then play has not been called so calling stop would throw an error
			// we need to stop this sound from continuing to play, as we need to recreate the sourceNode to change position
			this.cleanUpAudioNode(this.sourceNode);
			this.cleanUpAudioNode(this.sourceNodeNext);
			clearTimeout(this.soundCompleteTimeout);  // clear timeout that triggers sound complete
		}  // NOTE we cannot just call cleanup because it also calls the Sound function playFinished which releases this instance in SoundChannel

		if (!this.paused && this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this.handleSoundReady(null);
		}

		return true;
	};

	/**
	 * Get the duration of the instance, in milliseconds. Note in most cases, you need to play a sound using
	 * {{#crossLink "SoundInstance/play"}}{{/crossLink}} or the Sound API {{#crossLink "Sound.play"}}{{/crossLink}}
	 * method before its duration can be reported accurately.
	 *
	 * <h4>Example</h4>
	 *
	 *     var soundDur = myInstance.getDuration();
	 *
	 * @method getDuration
	 * @return {Number} The duration of the sound instance in milliseconds.
	 */
	p.getDuration = function () {
		return this.duration;
	};

	// Audio has finished playing. Manually loop it if required.
	// called internally by soundCompleteTimeout in WebAudioPlugin
	p.handleSoundComplete = function (event) {
		this.offset = 0;  // have to set this as it can be set by pause during playback


		if (this.remainingLoops != 0) {
			this.remainingLoops--;  // NOTE this introduces a theoretical limit on loops = float max size x 2 - 1

			// OJR we are using a look ahead approach to ensure smooth looping.  We add sourceNodeNext to the audio
			// context so that it starts playing even if this callback is delayed.  This technique and the reasons for
			// using it are described in greater detail here:  http://www.html5rocks.com/en/tutorials/audio/scheduling/
			// NOTE the cost of this is that our audio loop may not always match the loop event timing precisely.
			if(this.sourceNodeNext) { // this can be set to null, but this should not happen when looping
				this.cleanUpAudioNode(this.sourceNode);
				this.sourceNode = this.sourceNodeNext;
				this.startTime = this.sourceNode.startTime;
				this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0);
				this.soundCompleteTimeout = setTimeout(this.endedHandler, this.duration);
			}
			else {
				this.handleSoundReady(null);
			}

			this.sendEvent("loop");
			return;
		}

		if (window.createjs == null) {
			return;
		}
		this.playState = createjs.Sound.PLAY_FINISHED;
		this.cleanUp();
		this.sendEvent("complete");
	};

	// Play has failed, which can happen for a variety of reasons.
	p.playFailed = function () {
		if (window.createjs == null) {
			return;
		}
		this.playState = createjs.Sound.PLAY_FAILED;
		this.cleanUp();
		this.sendEvent("failed");
	};

	p.toString = function () {
		return "[WebAudioPlugin SoundInstance]";
	};

	// This is for the above SoundInstance.
	createjs.EventDispatcher.initialize(SoundInstance.prototype); // inject EventDispatcher methods.

	createjs.WebAudioPlugin.SoundInstance = SoundInstance;
}());

(function () {

	"use strict";

	/**
	 * An internal helper class that preloads web audio via XHR. Note that this class and its methods are not documented
	 * properly to avoid generating HTML documentation.
	 * #class Loader
	 * @param {String} src The source of the sound to load.
	 * @param {Object} owner A reference to the class that created this instance.
	 * @constructor
	 */
	function Loader(src, owner) {
		this.init(src, owner);
	}

	var p = Loader.prototype;

	// the request object for or XHR2 request
	p.request = null;

	p.owner = null;
	p.progress = -1;

	/**
	 * The source of the sound to load. Used by callback functions when we return this class.
	 * #property src
	 * @type {String}
	 */
	p.src = null;

	/**
	 * The original source of the sound, before it is altered with a basePath.
	 * #property src
	 * @type {String}
	 */
	p.originalSrc = null;

	/**
	 * The decoded AudioBuffer array that is returned when loading is complete.
	 * #property result
	 * @type {AudioBuffer}
	 * @protected
	 */
	p.result = null;

	// Calbacks
	/**
	 * The callback that fires when the load completes. This follows HTML tag naming.
	 * #property onload
	 * @type {Method}
	 */
	p.onload = null;

	/**
	 * The callback that fires as the load progresses. This follows HTML tag naming.
	 * #property onprogress
	 * @type {Method}
	 */
	p.onprogress = null;

	/**
	 * The callback that fires if the load hits an error.
	 * #property onError
	 * @type {Method}
	 * @protected
	 */
	p.onError = null;

	// constructor
	p.init = function (src, owner) {
		this.src = src;
		this.originalSrc = src;
		this.owner = owner;
	};

	/**
	 * Begin loading the content.
	 * #method load
	 * @param {String} src The path to the sound.
	 */
	p.load = function (src) {
		if (src != null) {
			// TODO does this need to set this.originalSrc
			this.src = src;
		}

		this.request = new XMLHttpRequest();
		this.request.open("GET", this.src, true);
		this.request.responseType = "arraybuffer";
		this.request.onload = createjs.proxy(this.handleLoad, this);
		this.request.onError = createjs.proxy(this.handleError, this);
		this.request.onprogress = createjs.proxy(this.handleProgress, this);

		this.request.send();
	};

	/**
	 * The loader has reported progress.
	 *
	 * <strong>Note</strong>: this is not a public API, but is used to allow preloaders to subscribe to load
	 * progress as if this is an HTML audio tag. This reason is why this still uses a callback instead of an event.
	 * #method handleProgress
	 * @param {Number} loaded The loaded amount.
	 * @param {Number} total The total amount.
	 * @protected
	 */
	p.handleProgress = function (loaded, total) {
		this.progress = loaded / total;
		this.onprogress != null && this.onprogress({loaded:loaded, total:total, progress:this.progress});
	};

	/**
	 * The sound has completed loading.
	 * #method handleLoad
	 * @protected
	 */
	p.handleLoad = function () {
		this.owner.context.decodeAudioData(this.request.response,
				createjs.proxy(this.handleAudioDecoded, this),
				createjs.proxy(this.handleError, this));
	};

	/**
	 * The audio has been decoded.
	 * #method handleAudioDecoded
	 * @protected
	 */
	p.handleAudioDecoded = function (decodedAudio) {
		this.progress = 1;
		this.result = decodedAudio;
		this.src = this.originalSrc;
		this.owner.addPreloadResults(this.src, this.result);
		this.onload && this.onload();
	};

	/**
	 * Errors have been caused by the loader.
	 * #method handleError
	 * @protected
	 */
	p.handleError = function (evt) {
		this.owner.removeSound(this.src);
		this.onerror && this.onerror(evt);
	};

	p.toString = function () {
		return "[WebAudioPlugin Loader]";
	};

	createjs.WebAudioPlugin.Loader = Loader;

}());
/*
 * HTMLAudioPlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module SoundJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {

	"use strict";

	/**
	 * Play sounds using HTML &lt;audio&gt; tags in the browser. This plugin is the second priority plugin installed
	 * by default, after the {{#crossLink "WebAudioPlugin"}}{{/crossLink}}, which is supported on Chrome, Safari, and
	 * iOS. This handles audio in all other modern browsers. For older browsers that do not support html audio, include
	 * and install the {{#crossLink "FlashPlugin"}}{{/crossLink}}.
	 *
	 * <h4>Known Browser and OS issues for HTML Audio</h4>
	 * <b>All browsers</b><br />
	 * Testing has shown in all browsers there is a limit to how many audio tag instances you are allowed.  If you exceed
	 * this limit, you can expect to see unpredictable results.  This will be seen as soon as you register sounds, as
	 * tags are precreated to all Chrome to load them.  Please use {{#crossLink "Sound.MAX_INSTANCES"}}{{/crossLink}} as
	 * a guide to how many total audio tags you can safely use in all browsers.
	 *
     * <b>IE 9 html limitations</b><br />
     * <ul><li>There is a delay in applying volume changes to tags that occurs once playback is started. So if you have
     * muted all sounds, they will all play during this delay until the mute applies internally. This happens regardless of
     * when or how you apply the volume change, as the tag seems to need to play to apply it.</li>
     * <li>MP3 encoding will not always work for audio tags if it's not default.  We've found default encoding with
     * 64kbps works.</li>
	 * <li>There is a limit to how many audio tags you can load and play at once, which appears to be determined by
	 * hardware and browser settings.  See {{#crossLink "HTMLAudioPlugin.MAX_INSTANCES"}}{{/crossLink}} for a safe estimate.</li></ul>
	 *
	 * <b>Safari limitations</b><br />
	 * <ul><li>Safari requires Quicktime to be installed for audio playback.</li></ul>
	 *
	 * <b>iOS 6 limitations</b><br />
	 * Note it is recommended to use {{#crossLink "WebAudioPlugin"}}{{/crossLink}} for iOS (6+). HTML Audio is disabled by
	 * default as it can only have one &lt;audio&gt; tag, can not preload or autoplay the audio, can not cache the audio,
	 * and can not play the audio except inside a user initiated event.
	 *<br /><br />
	 * <b>Android HTML Audio limitations</b><br />
	 * <ul><li>We have no control over audio volume. Only the user can set volume on their device.</li>
	 *      <li>We can only play audio inside a user event (touch/click).  This currently means you cannot loop sound or use a delay.</li>
	 * <b> Android Chrome 26.0.1410.58 specific limitations</b><br />
	 * 		<li>Chrome reports true when you run createjs.Sound.BrowserDetect.isChrome, but is a different browser
	 *      with different abilities.</li>
	 *      <li>Can only play 1 sound at a time.</li>
	 *      <li>Sound is not cached.</li>
	 *      <li>Sound can only be loaded in a user initiated touch/click event.</li>
	 *      <li>There is a delay before a sound is played, presumably while the src is loaded.</li>
	 * </ul>
	 *
	 * See {{#crossLink "Sound"}}{{/crossLink}} for general notes on known issues.
	 *
	 * @class HTMLAudioPlugin
	 * @constructor
	 */
	function HTMLAudioPlugin() {
		this.init();
	}

	var s = HTMLAudioPlugin;

	/**
	 * The maximum number of instances that can be loaded and played. This is a browser limitation, primarily limited to IE9.
	 * The actual number varies from browser to browser (and is largely hardware dependant), but this is a safe estimate.
	 * @property MAX_INSTANCES
	 * @type {Number}
	 * @default 30
	 * @static
	 */
	s.MAX_INSTANCES = 30;

	/**
	 * The capabilities of the plugin. This is generated via the the SoundInstance {{#crossLink "HTMLAudioPlugin/generateCapabilities"}}{{/crossLink}}
	 * method. Please see the Sound {{#crossLink "Sound/getCapabilities"}}{{/crossLink}} method for an overview of all
	 * of the available properties.
	 * @property capabilities
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s.capabilities = null;

	/**
	 * Event constant for the "canPlayThrough" event for cleaner code.
	 * @property AUDIO_READY
	 * @type {String}
	 * @default canplaythrough
	 * @static
	 */
	s.AUDIO_READY = "canplaythrough";

	/**
	 * Event constant for the "ended" event for cleaner code.
	 * @property AUDIO_ENDED
	 * @type {String}
	 * @default ended
	 * @static
	 */
	s.AUDIO_ENDED = "ended";

	/**
	 * Event constant for the "seeked" event for cleaner code.  We utilize this event for maintaining loop events.
	 * @property AUDIO_SEEKED
	 * @type {String}
	 * @default seeked
	 * @static
	 */
	s.AUDIO_SEEKED = "seeked";

	/**
	 * Event constant for the "error" event for cleaner code.
	 * @property AUDIO_ERROR
	 * @type {String}
	 * @default error
	 * @static
	 */
	s.AUDIO_ERROR = "error"; //TODO: Handle error cases

	/**
	 * Event constant for the "stalled" event for cleaner code.
	 * @property AUDIO_STALLED
	 * @type {String}
	 * @default stalled
	 * @static
	 */
	s.AUDIO_STALLED = "stalled";


	/**
	 * Allows users to enable HTML audio on IOS, which is disabled by default.
	 * Note this needs to be set before HTMLAudioPlugin is registered with SoundJS.
	 * This is not recommend because of severe limitations on IOS devices including:
	 * <li>it can only have one &lt;audio&gt; tag</li>
	 * <li>can not preload or autoplay the audio</li>
	 * <li>can not cache the audio</li>
	 * <li>can not play the audio except inside a user initiated event</li>
	 *
	 * @property enableIOS
	 * @type {Boolean}
	 * @default false
	 */
	s.enableIOS = false;

	/**
	 * Determine if the plugin can be used in the current browser/OS. Note that HTML audio is available in most modern
	 * browsers, but is disabled in iOS because of its limitations.
	 * @method isSupported
	 * @return {Boolean} If the plugin can be initialized.
	 * @static
	 */
	s.isSupported = function () {
		// HTML audio can be enable on iOS by removing this if statement, but it is not recommended due to the limitations:
		// iOS can only have a single <audio> instance, cannot preload or autoplay, cannot cache sound, and can only be
		// played in response to a user event (click)
		if (createjs.Sound.BrowserDetect.isIOS && !s.enableIOS) {
			return false;
		}
		s.generateCapabilities();
		var t = s.tag;  // OJR do we still need this check, when cap will already be null if this is the case
		if (t == null || s.capabilities == null) {
			return false;
		}
		return true;
	};

	/**
	 * Determine the capabilities of the plugin. Used internally. Please see the Sound API {{#crossLink "Sound/getCapabilities"}}{{/crossLink}}
	 * method for an overview of plugin capabilities.
	 * @method generateCapabiities
	 * @static
	 * @protected
	 */
	s.generateCapabilities = function () {
		if (s.capabilities != null) {
			return;
		}
		var t = s.tag = document.createElement("audio");
		if (t.canPlayType == null) {
			return null;
		}

		s.capabilities = {
			panning:true,
			volume:true,
			tracks:-1
		};

		// determine which extensions our browser supports for this plugin by iterating through Sound.SUPPORTED_EXTENSIONS
		var supportedExtensions = createjs.Sound.SUPPORTED_EXTENSIONS;
		var extensionMap = createjs.Sound.EXTENSION_MAP;
		for (var i = 0, l = supportedExtensions.length; i < l; i++) {
			var ext = supportedExtensions[i];
			var playType = extensionMap[ext] || ext;
			s.capabilities[ext] = (t.canPlayType("audio/" + ext) != "no" && t.canPlayType("audio/" + ext) != "") || (t.canPlayType("audio/" + playType) != "no" && t.canPlayType("audio/" + playType) != "");
		}  // OJR another way to do this might be canPlayType:"m4a", codex: mp4
	}

	var p = HTMLAudioPlugin.prototype;

	// doc'd above
	p.capabilities = null;

	/**
	 * Object hash indexed by the source of each file to indicate if an audio source is loaded, or loading.
	 * @property audioSources
	 * @type {Object}
	 * @protected
	 * @since 0.4.0
	 */
	p.audioSources = null;

	/**
	 * The default number of instances to allow.  Passed back to {{#crossLink "Sound"}}{{/crossLink}} when a source
	 * is registered using the {{#crossLink "Sound/register"}}{{/crossLink}} method.  This is only used if
	 * a value is not provided.
	 *
	 * <b>NOTE this property only exists as a limitation of HTML audio.</b>
	 * @property defaultNumChannels
	 * @type {Number}
	 * @default 2
	 * @since 0.4.0
	 */
	p.defaultNumChannels = 2;

	// Proxies, make removing listeners easier.
	p.loadedHandler = null;

	/**
	 * An initialization function run by the constructor
	 * @method init
	 * @protected
	 */
	p.init = function () {
		this.capabilities = s.capabilities;
		this.audioSources = {};
	};

	/**
	 * Pre-register a sound instance when preloading/setup. This is called by {{#crossLink "Sound"}}{{/crossLink}}.
	 * Note that this provides an object containing a tag used for preloading purposes, which
	 * <a href="http://preloadjs.com">PreloadJS</a> can use to assist with preloading.
	 * @method register
	 * @param {String} src The source of the audio
	 * @param {Number} instances The number of concurrently playing instances to allow for the channel at any time.
	 * @return {Object} A result object, containing a tag for preloading purposes and a numChannels value for internally
	 * controlling how many instances of a source can be played by default.
	 */
	p.register = function (src, instances) {
		this.audioSources[src] = true;  // Note this does not mean preloading has started
		var channel = createjs.HTMLAudioPlugin.TagPool.get(src);
		var tag = null;
		var l = instances || this.defaultNumChannels;
		for (var i = 0; i < l; i++) {  // OJR should we be enforcing s.MAX_INSTANCES here?  Does the chrome bug still exist, or can we change this code?
			tag = this.createTag(src);
			channel.add(tag);
		}

		tag.id = src;	// co-opting id as we need a way to store original src in case it is changed before loading
		this.loadedHandler = createjs.proxy(this.handleTagLoad, this);  // we need this bind to be able to remove event listeners
		tag.addEventListener && tag.addEventListener("canplaythrough", this.loadedHandler);
		if(tag.onreadystatechange == null) {
			tag.onreadystatechange = this.loadedHandler;
		} else {
			var f = tag.onreadystatechange;
			// OJR will this lose scope?
			tag.onreadystatechange = function() {
				f();
				this.loadedHandler();
			}
		}

		return {
			tag:tag, // Return one instance for preloading purposes
			numChannels:l  // The default number of channels to make for this Sound or the passed in value
		};
	};

	/**
	 * Checks if src was changed on tag used to create instances in TagPool before loading
	 * Currently PreloadJS does this when a basePath is set, so we are replicating that behavior for internal preloading.
	 * @method handleTagLoad
	 * @param event
	 * @protected
	 */
	p.handleTagLoad = function(event) {
		// cleanup and so we don't send the event more than once
		event.target.removeEventListener && event.target.removeEventListener("canplaythrough", this.loadedHandler);
		event.target.onreadystatechange = null;

		if (event.target.src == event.target.id) { return; }
		// else src has changed before loading, and we need to make the change to TagPool because we pre create tags
		createjs.HTMLAudioPlugin.TagPool.checkSrc(event.target.id);
	};

	/**
	 * Create an HTML audio tag.
	 * @method createTag
	 * @param {String} src The source file to set for the audio tag.
	 * @return {HTMLElement} Returns an HTML audio tag.
	 * @protected
	 */
	p.createTag = function (src) {
		var tag = document.createElement("audio");
		tag.autoplay = false;
		tag.preload = "none";
		//LM: Firefox fails when this the preload="none" for other tags, but it needs to be "none" to ensure PreloadJS works.
		tag.src = src;
		return tag;
	};

	/**
	 * Remove a sound added using {{#crossLink "HTMLAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel
	 * a preload.
	 * @method removeSound
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeSound = function (src) {
		delete(this.audioSources[src]);
		createjs.HTMLAudioPlugin.TagPool.remove(src);
	};

	/**
	 * Remove all sounds added using {{#crossLink "HTMLAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
	 * @method removeAllSounds
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeAllSounds = function () {
		this.audioSources = {};	// this drops all references, in theory freeing them for garbage collection
		createjs.HTMLAudioPlugin.TagPool.removeAll();
	};

	/**
	 * Create a sound instance. If the sound has not been preloaded, it is internally preloaded here.
	 * @method create
	 * @param {String} src The sound source to use.
	 * @return {SoundInstance} A sound instance for playback and control.
	 */
	p.create = function (src) {
		// if this sound has not be registered, create a tag and preload it
		if (!this.isPreloadStarted(src)) {
			var channel = createjs.HTMLAudioPlugin.TagPool.get(src);
			var tag = this.createTag(src);
			tag.id = src;
			channel.add(tag);
			this.preload(src, {tag:tag});
		}

		return new createjs.HTMLAudioPlugin.SoundInstance(src, this);
	};

	/**
	 * Checks if preloading has started for a specific source.
	 * @method isPreloadStarted
	 * @param {String} src The sound URI to check.
	 * @return {Boolean} If the preload has started.
	 * @since 0.4.0
	 */
	p.isPreloadStarted = function (src) {
		return (this.audioSources[src] != null);
	};

	/**
	 * Internally preload a sound.
	 * @method preload
	 * @param {String} src The sound URI to load.
	 * @param {Object} instance An object containing a tag property that is an HTML audio tag used to load src.
	 * @param {String} basePath A file path to prepend to the src.
	 * @since 0.4.0
	 */
	p.preload = function (src, instance, basePath) {
		this.audioSources[src] = true;
		if(basePath != null) {instance.tag.src = basePath + src;}
		new createjs.HTMLAudioPlugin.Loader(src, instance.tag);
	};

	p.toString = function () {
		return "[HTMLAudioPlugin]";
	};

	createjs.HTMLAudioPlugin = HTMLAudioPlugin;
}());


(function () {

	"use strict";

	// NOTE Documentation for the SoundInstance class in WebAudioPlugin file. Each plugin generates a SoundInstance that
	// follows the same interface.
	function SoundInstance(src, owner) {
		this.init(src, owner);
	}

	var p = SoundInstance.prototype;

	p.src = null,
	p.uniqueId = -1;
	p.playState = null;
	p.owner = null;
	p.loaded = false;
	p.offset = 0;
	p.delay = 0;
	p._volume =  1;
	Object.defineProperty(p, "volume", {
		get: function() {
			return this._volume;
		},
		set: function(value) {
			if (Number(value) == null) {return;}
			value = Math.max(0, Math.min(1, value));
			this._volume = value;
			this.updateVolume();
		}
	});
	p.pan = 0;
	p.duration = 0;
	p.remainingLoops = 0;
	p.delayTimeoutId = null;
	p.tag = null;
	p.muted = false;
	p.paused = false;

// mix-ins:
	// EventDispatcher methods:
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;

	// Proxies, make removing listeners easier.
	p.endedHandler = null;
	p.readyHandler = null;
	p.stalledHandler = null;
	p.loopHandler = null;

// Constructor
	p.init = function (src, owner) {
		this.src = src;
		this.owner = owner;

		this.endedHandler = createjs.proxy(this.handleSoundComplete, this);
		this.readyHandler = createjs.proxy(this.handleSoundReady, this);
		this.stalledHandler = createjs.proxy(this.handleSoundStalled, this);
		this.loopHandler = createjs.proxy(this.handleSoundLoop, this);
	};

	p.sendEvent = function (type) {
		var event = new createjs.Event(type);
		this.dispatchEvent(event);
	};

	p.cleanUp = function () {
		var tag = this.tag;
		if (tag != null) {
			tag.pause();
			tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, false);
			tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, false);
			tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, false);
			try {
				tag.currentTime = 0;
			} catch (e) {
			} // Reset Position
			createjs.HTMLAudioPlugin.TagPool.setInstance(this.src, tag);
			this.tag = null;
		}

		clearTimeout(this.delayTimeoutId);
		if (window.createjs == null) {
			return;
		}
		createjs.Sound.playFinished(this);
	};

	p.interrupt = function () {
		if (this.tag == null) {
			return;
		}
		this.playState = createjs.Sound.PLAY_INTERRUPTED;
		this.cleanUp();
		this.paused = false;
		this.sendEvent("interrupted");
	};

// Public API
	p.play = function (interrupt, delay, offset, loop, volume, pan) {
		this.cleanUp(); //LM: Is this redundant?
		createjs.Sound.playInstance(this, interrupt, delay, offset, loop, volume, pan);
	};

	p.beginPlaying = function (offset, loop, volume, pan) {
		if (window.createjs == null) {
			return -1;
		}
		var tag = this.tag = createjs.HTMLAudioPlugin.TagPool.getInstance(this.src);
		if (tag == null) {
			this.playFailed();
			return -1;
		}

		tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, false);

		// Reset this instance.
		this.offset = offset;
		this.volume = volume;
		this.pan = pan;	// not pan has no effect
		this.updateVolume();  // note this will set for mute and masterMute
		this.remainingLoops = loop;

		if (tag.readyState !== 4) {
			tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, false);
			tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_STALLED, this.stalledHandler, false);
			tag.preload = "auto"; // This is necessary for Firefox, as it won't ever "load" until this is set.
			tag.load();
		} else {
			this.handleSoundReady(null);
		}

		this.sendEvent("succeeded");
		return 1;
	};

	// Note: Sounds stall when trying to begin playback of a new audio instance when the existing instances
	//  has not loaded yet. This doesn't mean the sound will not play.
	p.handleSoundStalled = function (event) {
		this.cleanUp();  // OJR NOTE this will stop playback, and I think we should remove this and let the developer decide how to handle stalled instances
		this.sendEvent("failed");
	};

	p.handleSoundReady = function (event) {
		if (window.createjs == null) {
			return;
		}

		// OJR would like a cleaner way to do this in init, discuss with LM
		this.duration = this.tag.duration * 1000;  // need this for setPosition on stopped sounds

		this.playState = createjs.Sound.PLAY_SUCCEEDED;
		this.paused = false;
		this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, false);

		if (this.offset >= this.getDuration()) {
			this.playFailed();  // OJR: throw error?
			return;
		} else if (this.offset > 0) {
			this.tag.currentTime = this.offset * 0.001;
		}
		if (this.remainingLoops == -1) {
			this.tag.loop = true;
		}
		if(this.remainingLoops != 0) {
			this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, false);
			this.tag.loop = true;
		}
		this.tag.play();
	};

	p.pause = function () {
		if (!this.paused && this.playState == createjs.Sound.PLAY_SUCCEEDED && this.tag != null) {
			this.paused = true;
			// Note: when paused by user, we hold a reference to our tag. We do not release it until stopped.
			this.tag.pause();

			clearTimeout(this.delayTimeoutId);

			return true;
		}
		return false;
	};

	p.resume = function () {
		if (!this.paused || this.tag == null) {
			return false;
		}
		this.paused = false;
		this.tag.play();
		return true;
	};

	p.stop = function () {
		this.offset = 0;
		this.pause();
		this.playState = createjs.Sound.PLAY_FINISHED;
		this.cleanUp();
		return true;
	};

	p.setMasterVolume = function (value) {
		this.updateVolume();
		return true;
	};

	p.setVolume = function (value) {
		this.volume = value;
		return true;
	};

	p.updateVolume = function () {
		if (this.tag != null) {
			var newVolume = (this.muted || createjs.Sound.masterMute) ? 0 : this._volume * createjs.Sound.masterVolume;
			if (newVolume != this.tag.volume) {
				this.tag.volume = newVolume;
			}
			return true;
		} else {
			return false;
		}
	};

	p.getVolume = function (value) {
		return this.volume;
	};

	p.setMasterMute = function (isMuted) {
		this.updateVolume();
		return true;
	};

	p.setMute = function (isMuted) {
		if (isMuted == null || isMuted == undefined) {
			return false;
		}

		this.muted = isMuted;
		this.updateVolume();
		return true;
	};

	p.getMute = function () {
		return this.muted;
	};

	// Can not set pan in HTML
	p.setPan = function (value) {
		return false;
	};

	p.getPan = function () {
		return 0;
	};

	p.getPosition = function () {
		if (this.tag == null) {
			return this.offset;
		}
		return this.tag.currentTime * 1000;
	};

	p.setPosition = function (value) {
		if (this.tag == null) {
			this.offset = value
		} else {
			this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, false);
			try {
				this.tag.currentTime = value * 0.001;
			} catch (error) { // Out of range
				return false;
			}
			this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, false);
		}
		return true;
	};

	p.getDuration = function () {  // NOTE this will always return 0 until sound has been played.
		return this.duration;
	};

	p.handleSoundComplete = function (event) {
		this.offset = 0;

		if (window.createjs == null) {
			return;
		}
		this.playState = createjs.Sound.PLAY_FINISHED;
		this.cleanUp();
		this.sendEvent("complete");
	};

	// handles looping functionality
	// NOTE with this approach audio will loop as reliably as the browser allows
	// but we could end up sending the loop event after next loop playback begins
	p.handleSoundLoop = function (event) {
		this.offset = 0;

		this.remainingLoops--;
		if(this.remainingLoops == 0) {
			this.tag.loop = false;
			this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, false);
		}
		this.sendEvent("loop");
	};

	p.playFailed = function () {
		if (window.createjs == null) {
			return;
		}
		this.playState = createjs.Sound.PLAY_FAILED;
		this.cleanUp();
		this.sendEvent("failed");
	};

	p.toString = function () {
		return "[HTMLAudioPlugin SoundInstance]";
	};

	createjs.EventDispatcher.initialize(SoundInstance.prototype);

	createjs.HTMLAudioPlugin.SoundInstance = SoundInstance;

}());


(function () {

	"use strict";

	/**
	 * An internal helper class that preloads html audio via HTMLAudioElement tags. Note that PreloadJS will NOT use
	 * this load class like it does Flash and WebAudio plugins.
	 * Note that this class and its methods are not documented properly to avoid generating HTML documentation.
	 * #class Loader
	 * @param {String} src The source of the sound to load.
	 * @param {HTMLAudioElement} tag The audio tag of the sound to load.
	 * @constructor
	 * @protected
	 * @since 0.4.0
	 */
	function Loader(src, tag) {
		this.init(src, tag);
	}

	var p = Loader.prototype;

	/**
	 * The source to be loaded.
	 * #property src
	 * @type {String}
	 * @default null
	 * @protected
	 */
	p.src = null;

	/**
	 * The tag to load the source with / into.
	 * #property tag
	 * @type {AudioTag}
	 * @default null
	 * @protected
	 */
	p.tag = null;

	/**
	 * An interval used to give us progress.
	 * #property preloadTimer
	 * @type {String}
	 * @default null
	 * @protected
	 */
	p.preloadTimer = null;

	// Proxies, make removing listeners easier.
	p.loadedHandler = null;

	// constructor
	p.init = function (src, tag) {
		this.src = src;
		this.tag = tag;

		this.preloadTimer = setInterval(createjs.proxy(this.preloadTick, this), 200);

		// This will tell us when audio is buffered enough to play through, but not when its loaded.
		// The tag doesn't keep loading in Chrome once enough has buffered, and we have decided that behaviour is sufficient.
		// Note that canplaythrough callback doesn't work in Chrome, we have to use the event.
		this.loadedHandler = createjs.proxy(this.sendLoadedEvent, this);  // we need this bind to be able to remove event listeners
		this.tag.addEventListener && this.tag.addEventListener("canplaythrough", this.loadedHandler);
		if(this.tag.onreadystatechange == null) {
			this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this);  // OJR not 100% sure we need this, just copied from PreloadJS
		} else {
			var f = this.tag.onreadystatechange;
			this.tag.onreadystatechange = function() {
				f();
				this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this);  // OJR not 100% sure we need this, just copied from PreloadJS
			}
		}

		this.tag.preload = "auto";
		//this.tag.src = src;
		this.tag.load();
	};

	/**
	 * Allows us to have preloading progress and tell when its done.
	 * #method preloadTick
	 * @protected
	 */
	p.preloadTick = function () {
		var buffered = this.tag.buffered;
		var duration = this.tag.duration;

		if (buffered.length > 0) {
			if (buffered.end(0) >= duration - 1) {
				this.handleTagLoaded();
			}
		}
	};

	/**
	 * Internal handler for when a tag is loaded.
	 * #method handleTagLoaded
	 * @protected
	 */
	p.handleTagLoaded = function () {
		clearInterval(this.preloadTimer);
	};

	/**
	 * Communicates back to Sound that a load is complete.
	 * #method sendLoadedEvent
	 * @param {Object} evt The load Event
	 */
	p.sendLoadedEvent = function (evt) {
		this.tag.removeEventListener && this.tag.removeEventListener("canplaythrough", this.loadedHandler);  // cleanup and so we don't send the event more than once
		this.tag.onreadystatechange = null;  // cleanup and so we don't send the event more than once
		createjs.Sound.sendFileLoadEvent(this.src);  // fire event or callback on Sound
	};

	// used for debugging
	p.toString = function () {
		return "[HTMLAudioPlugin Loader]";
	}

	createjs.HTMLAudioPlugin.Loader = Loader;

}());


(function () {

	"use strict";

	/**
	 * The TagPool is an object pool for HTMLAudio tag instances. In Chrome, we have to pre-create the number of HTML
	 * audio tag instances that we are going to play before we load the data, otherwise the audio stalls.
	 * (Note: This seems to be a bug in Chrome)
	 * #class TagPool
	 * @param {String} src The source of the channel.
	 * @protected
	 */
	function TagPool(src) {
		this.init(src);
	}

	var s = TagPool;

	/**
	 * A hash lookup of each sound channel, indexed by the audio source.
	 * #property tags
	 * @static
	 * @protected
	 */
	s.tags = {};

	/**
	 * Get a tag pool. If the pool doesn't exist, create it.
	 * #method get
	 * @param {String} src The source file used by the audio tag.
	 * @static
	 * @protected
	 */
	s.get = function (src) {
		var channel = s.tags[src];
		if (channel == null) {
			channel = s.tags[src] = new TagPool(src);
		}
		return channel;
	}

	/**
	 * Delete a TagPool and all related tags. Note that if the TagPool does not exist, this will fail.
	 * #method remove
	 * @param {String} src The source for the tag
	 * @return {Boolean} If the TagPool was deleted.
	 * @static
	 */
	s.remove = function (src) {
		var channel = s.tags[src];
		if (channel == null) {
			return false;
		}
		channel.removeAll();
		delete(s.tags[src]);
		return true;
	}

	/**
	 * Delete all TagPools and all related tags.
	 * #method removeAll
	 * @static
	 */
	s.removeAll = function () {
		for(var channel in s.tags) {
			s.tags[channel].removeAll();	// this stops and removes all active instances
		}
		s.tags = {};
	}

	/**
	 * Get a tag instance. This is a shortcut method.
	 * #method getInstance
	 * @param {String} src The source file used by the audio tag.
	 * @static
	 * @protected
	 */
	s.getInstance = function (src) {
		var channel = s.tags[src];
		if (channel == null) {
			return null;
		}
		return channel.get();
	}

	/**
	 * Return a tag instance. This is a shortcut method.
	 * #method setInstance
	 * @param {String} src The source file used by the audio tag.
	 * @param {HTMLElement} tag Audio tag to set.
	 * @static
	 * @protected
	 */
	s.setInstance = function (src, tag) {
		var channel = s.tags[src];
		if (channel == null) {
			return null;
		}
		return channel.set(tag);
	}

	/**
	 * A function to check if src has changed in the loaded audio tag.
	 * This is required because PreloadJS appends a basePath to the src before loading.
	 * Note this is currently only called when a change is detected
	 * #method checkSrc
	 * @param src the unaltered src that is used to store the channel.
	 * @static
	 * @protected
	 */
	s.checkSrc = function (src) {
		var channel = s.tags[src];
		if (channel == null) {
			return null;
		}
		channel.checkSrcChange();
	}

	var p = TagPool.prototype;

	/**
	 * The source of the tag pool.
	 * #property src
	 * @type {String}
	 * @protected
	 */
	p.src = null;

	/**
	 * The total number of HTMLAudio tags in this pool. This is the maximum number of instance of a certain sound
	 * that can play at one time.
	 * #property length
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.length = 0;

	/**
	 * The number of unused HTMLAudio tags.
	 * #property available
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.available = 0;

	/**
	 * A list of all available tags in the pool.
	 * #property tags
	 * @type {Array}
	 * @protected
	 */
	p.tags = null;

	// constructor
	p.init = function (src) {
		this.src = src;
		this.tags = [];
	};

	/**
	 * Add an HTMLAudio tag into the pool.
	 * #method add
	 * @param {HTMLAudioElement} tag A tag to be used for playback.
	 */
	p.add = function (tag) {
		this.tags.push(tag);
		this.length++;
		this.available++;
	};

	/**
	 * Remove all tags from the channel.  Usually in response to a delete call.
	 * #method removeAll
	 */
	p.removeAll = function () {
		// This may not be neccessary
		while(this.length--) {
			delete(this.tags[this.length]);	// NOTE that the audio playback is already stopped by this point
		}
		this.src = null;
		this.tags.length = 0;
	};

	/**
	 * Get an HTMLAudioElement for immediate playback. This takes it out of the pool.
	 * #method get
	 * @return {HTMLAudioElement} An HTML audio tag.
	 */
	p.get = function () {
		if (this.tags.length == 0) {
			return null;
		}
		this.available = this.tags.length;
		var tag = this.tags.pop();
		if (tag.parentNode == null) {
			document.body.appendChild(tag);
		}
		return tag;
	};

	/**
	 * Put an HTMLAudioElement back in the pool for use.
	 * #method set
	 * @param {HTMLAudioElement} tag HTML audio tag
	 */
	p.set = function (tag) {
		var index = createjs.indexOf(this.tags, tag);
		if (index == -1) {
			this.tags.push(tag);
		}
		this.available = this.tags.length;
	};

	/**
	 * Make sure the src of all other tags is correct after load.
	 * This is needed because PreloadJS appends a basePath to src before loading.
	 * #method checkSrcChange
	 */
	p.checkSrcChange = function () {
		// the last tag always has the latest src after loading
		//var i = this.length-1;	// this breaks in Firefox because it is not correctly removing an event listener
		var i = this.tags.length - 1;
		var newSrc = this.tags[i].src;
		while(i--) {
			this.tags[i].src = newSrc;
		}
	};

	p.toString = function () {
		return "[HTMLAudioPlugin TagPool]";
	}

	createjs.HTMLAudioPlugin.TagPool = TagPool;

}());/*
* Tween
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * The TweenJS Javascript library provides a simple but powerful tweening interface. It supports tweening of both
 * numeric object properties & CSS style properties, and allows you to chain tweens and actions together to create
 * complex sequences.
 *
 * <h4>Simple Tween</h4>
 * This tween will tween the target's alpha property from 0 to 1 for 1s then call the <code>handleComplete</code> function.
 *
 *	    target.alpha = 0;
 *	    Tween.get(target).to({alpha:1}, 1000).call(handleComplete);
 *	    function handleComplete() {
 *	    	//Tween complete
 *	    }
 *
 * <strong>Arguments and Scope</strong>
 * Tween also supports a `call()` with arguments and/or a scope. If no scope is passed, then the function is called
 * anonymously (normal JavaScript behaviour). The scope is useful for maintaining scope when doing object-oriented
 * style development.
 *
 *      Tween.get(target).to({alpha:0})
 *          .call(handleComplete, [argument1, argument2], this);
 *
 * <h4>Chainable Tween</h4>
 * This tween will wait 0.5s, tween the target's alpha property to 0 over 1s, set it's visible to false, then call the
 * <code>handleComplete</code> function.
 *
 *	    target.alpha = 1;
 *	    Tween.get(target).wait(500).to({alpha:0, visible:false}, 1000).call(handleComplete);
 *	    function handleComplete() {
 *	    	//Tween complete
 *	    }
 *
 * <h4>Required Support<h4>
 * Tweenjs requires a ticker function, which is included in <a href="http://www.easeljs.com">EaselJS</a>.
 * If you are not using EaselJS, you must build your own ticker function that calls {{#crossLink "Tween/tick"}}{{/crossLink}}
 * on the tweens.
 *
 * <h4>Browser Support</h4>
 * TweenJS will work in all browsers.
 *
 * @module TweenJS
 * @main TweenJS
 */

// TODO: possibly add a END actionsMode (only runs actions that == position)?
// TODO: evaluate a way to decouple paused from tick registration.

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
/**
 * A Tween instance tweens properties for a single target. Instance methods can be chained for easy construction and sequencing:
 *
 * <h4>Example</h4>
 *
 *      target.alpha = 1;
 *	    Tween.get(target)
 *	         .wait(500)
 *	         .to({alpha:0, visible:false}, 1000)
 *	         .call(handleComplete);
 *	    function handleComplete() {
 *	    	//Tween complete
 *	    }
 *
 * Multiple tweens can point to the same instance, however if they affect the same properties there could be unexpected
 * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass <code>override:true</code>
 * in the props argument.
 *
 *      Tween.get(target, {override:true}).to({x:100});
 *
 * Subscribe to the "change" event to get notified when a property of the target is changed.
 *
 *      Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
 *      function handleChange(event) {
 *          // The tween changed.
 *      }
 *
 * See the Tween {{#crossLink "Tween/get"}}{{/crossLink}} method for additional param documentation.
 * @class Tween
 * @param {Object} target The target object that will have its properties tweened.
 * @param {Object} [props] The configuration properties to apply to this tween instance (ex. `{loop:true, paused:true}`.
 * All properties default to false. Supported props are:<UL>
 *    <LI> loop: sets the loop property on this tween.</LI>
 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
 *    <LI> ignoreGlobalPause: sets the ignoreGlobalPause property on this tween.</LI>
 *    <LI> override: if true, `Tween.removeTweens(target)` will be called to remove any other tweens with the same target.
 *    <LI> paused: indicates whether to start the tween paused.</LI>
 *    <LI> position: indicates the initial position for this tween.</LI>
 *    <LI> onChange: specifies a listener for the "change" event.</LI>
 * </UL>
 * @param {Object} [pluginData] An object containing data for use by installed plugins. See individual
 * plugins' documentation for details.
 * @extends EventDispatcher
 * @constructor
 */
var Tween = function(target, props, pluginData) {
  this.initialize(target, props, pluginData);
};
var p = Tween.prototype = new createjs.EventDispatcher();

// static interface:
	/**
	 * Constant defining the none actionsMode for use with setPosition.
	 * @property NONE
	 * @type Number
	 * @default 0
	 * @static
	 */
	Tween.NONE = 0;

	/**
	 * Constant defining the loop actionsMode for use with setPosition.
	 * @property LOOP
	 * @type Number
	 * @default 1
	 * @static
	 */
	Tween.LOOP = 1;

	/**
	 * Constant defining the reverse actionsMode for use with setPosition.
	 * @property REVERSE
	 * @type Number
	 * @default 2
	 * @static
	 */
	Tween.REVERSE = 2;

	/**
	 * Constant returned by plugins to tell the tween not to use default assignment.
	 * @property IGNORE
	 * @type Object
	 * @static
	 */
	Tween.IGNORE = {};

	/**
	 * @property _listeners
	 * @type Array[Tween]
	 * @static
	 * @protected
	 */
	Tween._tweens = [];

	/**
	 * @property _plugins
	 * @type Object
	 * @static
	 * @protected
	 */
	Tween._plugins = {};

	/**
	 * Returns a new tween instance. This is functionally identical to using "new Tween(...)", but looks cleaner
	 * with the chained syntax of TweenJS.
	 * @example
	 *	var tween = createjs.Tween.get(target);
	 * @method get
	 * @param {Object} target The target object that will have its properties tweened.
	 * @param {Object} [props] The configuration properties to apply to this tween instance (ex. <code>{loop:true, paused:true}</code>).
	 * All properties default to false. Supported props are:<UL>
	 *    <LI> loop: sets the loop property on this tween.</LI>
	 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
	 *    <LI> ignoreGlobalPause: sets the ignoreGlobalPause property on this tween.</LI>
	 *    <LI> override: if true, Tween.removeTweens(target) will be called to remove any other tweens with the same target.
	 *    <LI> paused: indicates whether to start the tween paused.</LI>
	 *    <LI> position: indicates the initial position for this tween.</LI>
	 *    <LI> onChange: specifies a listener for the "change" event.</LI>
	 * </UL>
	 * @param {Object} [pluginData] An object containing data for use by installed plugins. See individual
	 * plugins' documentation for details.
	 * @param {Boolean} [override=false] If true, any previous tweens on the same target will be removed. This is the same as
	 * calling <code>Tween.removeTweens(target)</code>.
	 * @return {Tween} A reference to the created tween. Additional chained tweens, method calls, or callbacks can be
	 * applied to the returned tween instance.
	 * @static
	 */
	Tween.get = function(target, props, pluginData, override) {
		if (override) { Tween.removeTweens(target); }
		return new Tween(target, props, pluginData);
	};

	/**
	 * Advances all tweens. This typically uses the Ticker class (available in the EaselJS library), but you can call it
	 * manually if you prefer to use your own "heartbeat" implementation.
	 *
	 * Note: Currently, EaselJS must be included <em>before</em> TweenJS to ensure Ticker exists during initialization.
	 * @method tick
	 * @param {Number} delta The change in time in milliseconds since the last tick. Required unless all tweens have
	 * <code>useTicks</code> set to true.
	 * @param {Boolean} paused Indicates whether a global pause is in effect. Tweens with <code>ignoreGlobalPause</code>
	 * will ignore this, but all others will pause if this is true.
	 * @static
	 */
	Tween.tick = function(delta, paused) {
		var tweens = Tween._tweens.slice(); // to avoid race conditions.
		for (var i=tweens.length-1; i>=0; i--) {
			var tween = tweens[i];
			if ((paused && !tween.ignoreGlobalPause) || tween._paused) { continue; }
			tween.tick(tween._useTicks?1:delta);
		}
	};

	/**
	 * Handle events that result from Tween being used as an event handler. This is included to allow Tween to handle
	 * tick events from <code>createjs.Ticker</code>. No other events are handled in Tween.
	 * @method handleEvent
	 * @param {Object} event An event object passed in by the EventDispatcher. Will usually be of type "tick".
	 * @private
	 * @static
	 * @since 0.4.2
	 */
	Tween.handleEvent = function(event) {
		if (event.type == "tick") {
			this.tick(event.delta, event.paused);
		}
	};

	/**
	 * Removes all existing tweens for a target. This is called automatically by new tweens if the <code>override</code>
	 * property is <code>true</code>.
	 * @method removeTweens
	 * @param {Object} target The target object to remove existing tweens from.
	 * @static
	 */
	Tween.removeTweens = function(target) {
		if (!target.tweenjs_count) { return; }
		var tweens = Tween._tweens;
		for (var i=tweens.length-1; i>=0; i--) {
			if (tweens[i]._target == target) {
				tweens[i]._paused = true;
				tweens.splice(i,1);
			}
		}
		target.tweenjs_count = 0;
	};

	/**
	 * Stop and remove all existing tweens.
	 * @method removeAllTweens
	 * @static
	 * @since 0.4.1
	 */
	Tween.removeAllTweens = function() {
		var tweens = Tween._tweens;
		for (var i= 0, l=tweens.length; i<l; i++) {
			var tween = tweens[i];
			tween.paused = true;
			tween.target.tweenjs_count = 0;
		}
		tweens.length = 0;
	};

	/**
	 * Indicates whether there are any active tweens (and how many) on the target object (if specified) or in general.
	 * @method hasActiveTweens
	 * @param {Object} [target] The target to check for active tweens. If not specified, the return value will indicate
	 * if there are any active tweens on any target.
	 * @return {Boolean} If there are active tweens.
	 * @static
	 */
	Tween.hasActiveTweens = function(target) {
		if (target) { return target.tweenjs_count; }
		return Tween._tweens && !!Tween._tweens.length;
	};

	/**
	 * Installs a plugin, which can modify how certain properties are handled when tweened. See the CSSPlugin for an
	 * example of how to write TweenJS plugins.
	 * @method installPlugin
	 * @static
	 * @param {Object} plugin The plugin class to install
	 * @param {Array} properties An array of properties that the plugin will handle.
	 */
	Tween.installPlugin = function(plugin, properties) {
		var priority = plugin.priority;
		if (priority == null) { plugin.priority = priority = 0; }
		for (var i=0,l=properties.length,p=Tween._plugins;i<l;i++) {
			var n = properties[i];
			if (!p[n]) { p[n] = [plugin]; }
			else {
				var arr = p[n];
				for (var j=0,jl=arr.length;j<jl;j++) {
					if (priority < arr[j].priority) { break; }
				}
				p[n].splice(j,0,plugin);
			}
		}
	};

	/**
	 * Registers or unregisters a tween with the ticking system.
	 * @method _register
	 * @param {Tween} tween The tween instance to register or unregister.
	 * @param {Boolean} value If true, the tween is registered. If false the tween is unregistered. 
	 * @static
	 * @protected
	 */
	Tween._register = function(tween, value) {
		var target = tween._target;
		var tweens = Tween._tweens;
		if (value) {
			// TODO: this approach might fail if a dev is using sealed objects in ES5
			if (target) { target.tweenjs_count = target.tweenjs_count ? target.tweenjs_count+1 : 1; }
			tweens.push(tween);
			if (!Tween._inited && createjs.Ticker) { createjs.Ticker.addEventListener("tick", Tween); Tween._inited = true; }
		} else {
			if (target) { target.tweenjs_count--; }
			var i = tweens.length;
			while (i--) {
				if (tweens[i] == tween) {
					tweens.splice(i, 1);
					return;
				}
			}
		}
	};

// public properties:
	/**
	 * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using Ticker,
	 * then setting this to true (the default) will cause this tween to be paused when <code>Ticker.setPaused(true)</code> is called.
	 * See Tween.tick() for more info. Can be set via the props param.
	 * @property ignoreGlobalPause
	 * @type Boolean
	 * @default false
	 */
	p.ignoreGlobalPause = false;

	/**
	 * If true, the tween will loop when it reaches the end. Can be set via the props param.
	 * @property loop
	 * @type {Boolean}
	 * @default false
	 */
	p.loop = false;

	/**
	 * Read-only. Specifies the total duration of this tween in milliseconds (or ticks if useTicks is true).
	 * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
	 * behaviour.
	 * @property duration
	 * @type {Number}
	 * @default 0
	 */
	p.duration = 0;

	/**
	 * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
	 * you specify data by setting it to a property of pluginData with the same name as the plugin class.
	 * @example
	 *	myTween.pluginData.PluginClassName = data;
	 * <br/>
	 * Also, most plugins support a property to enable or disable them. This is typically the plugin class name followed by "_enabled".<br/>
	 * @example
	 *	myTween.pluginData.PluginClassName_enabled = false;<br/>
	 * <br/>
	 * Some plugins also store instance data in this object, usually in a property named _PluginClassName.
	 * See the documentation for individual plugins for more details.
	 * @property pluginData
	 * @type {Object}
	 */
	p.pluginData = null;

	// TODO: deprecated.
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Tween/change:event"}}{{/crossLink}}
	 * event.
	 * @property onChange
	 * @type {Function}
	 * @deprecated Use addEventListener and the "change" event.
	 */

	/**
	 * Read-only. The target of this tween. This is the object on which the tweened properties will be changed. Changing
	 * this property after the tween is created will not have any effect.
	 * @property target
	 * @type {Object}
	 */
	p.target = null;

	/**
	 * Read-only. The current normalized position of the tween. This will always be a value between 0 and duration.
	 * Changing this property directly will have no effect.
	 * @property position
	 * @type {Object}
	 */
	p.position = null;

	/**
	 * Read-only. Indicates the tween's current position is within a passive wait.
	 * @property passive
	 * @type {Boolean}
	 **/
	p.passive = false;

// events:
	/**
	 * Called whenever the tween's position changes.
	 * @event change
	 * @since 0.4.0
	 **/

// private properties:

	/**
	 * @property _paused
	 * @type {Boolean}
	 * @default false
	 * @protected
	 */
	p._paused = false;

	/**
	 * @property _curQueueProps
	 * @type {Object}
	 * @protected
	 */
	p._curQueueProps = null;

	/**
	 * @property _initQueueProps
	 * @type {Object}
	 * @protected
	 */
	p._initQueueProps = null;

	/**
	 * @property _steps
	 * @type {Array}
	 * @protected
	 */
	p._steps = null;

	/**
	 * @property _actions
	 * @type {Array}
	 * @protected
	 */
	p._actions = null;

	/**
	 * Raw position.
	 * @property _prevPosition
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p._prevPosition = 0;

	/**
	 * The position within the current step.
	 * @property _stepPosition
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p._stepPosition = 0; // this is needed by MovieClip.

	/**
	 * Normalized position.
	 * @property _prevPos
	 * @type {Number}
	 * @default -1
	 * @protected
	 */
	p._prevPos = -1;

	/**
	 * @property _target
	 * @type {Object}
	 * @protected
	 */
	p._target = null;

	/**
	 * @property _useTicks
	 * @type {Boolean}
	 * @default false
	 * @protected
	 */
	p._useTicks = false;

	/**
	 * @property _inited
	 * @type {boolean}
	 * @default false
	 * @protected
	 */
	p._inited = false;

// constructor:
	/**
	 * @method initialize
	 * @param {Object} target
	 * @param {Object} props
	 * @param {Object} pluginData
	 * @protected
	 */
	p.initialize = function(target, props, pluginData) {
		this.target = this._target = target;
		if (props) {
			this._useTicks = props.useTicks;
			this.ignoreGlobalPause = props.ignoreGlobalPause;
			this.loop = props.loop;
			props.onChange&&this.addEventListener("change", props.onChange);
			if (props.override) { Tween.removeTweens(target); }
		}

		this.pluginData = pluginData || {};
		this._curQueueProps = {};
		this._initQueueProps = {};
		this._steps = [];
		this._actions = [];
		if (props&&props.paused) { this._paused=true; }
		else { Tween._register(this,true); }
		if (props&&props.position!=null) { this.setPosition(props.position, Tween.NONE); }
	};

// public methods:
	/**
	 * Queues a wait (essentially an empty tween).
	 * @example
	 *	//This tween will wait 1s before alpha is faded to 0.
	 *	createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
	 * @method wait
	 * @param {Number} duration The duration of the wait in milliseconds (or in ticks if <code>useTicks</code> is true).
	 * @param {Boolean} passive Tween properties will not be updated during a passive wait. This
	 * is mostly useful for use with Timeline's that contain multiple tweens affecting the same target
	 * at different times.
	 * @return {Tween} This tween instance (for chaining calls).
	 **/
	p.wait = function(duration, passive) {
		if (duration == null || duration <= 0) { return this; }
		var o = this._cloneProps(this._curQueueProps);
		return this._addStep({d:duration, p0:o, e:this._linearEase, p1:o, v:passive});
	};

	/**
	 * Queues a tween from the current values to the target properties. Set duration to 0 to jump to these value.
	 * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
	 * properties will be set at the end of the specified duration.
	 * @example
	 *	createjs.Tween.get(target).to({alpha:0}, 1000);
	 * @method to
	 * @param {Object} props An object specifying property target values for this tween (Ex. <code>{x:300}</code> would tween the x
	 *      property of the target to 300).
	 * @param {Number} duration Optional. The duration of the wait in milliseconds (or in ticks if <code>useTicks</code> is true).
	 *      Defaults to 0.
	 * @param {Function} ease Optional. The easing function to use for this tween. Defaults to a linear ease.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	p.to = function(props, duration, ease) {
		if (isNaN(duration) || duration < 0) { duration = 0; }
		return this._addStep({d:duration||0, p0:this._cloneProps(this._curQueueProps), e:ease, p1:this._cloneProps(this._appendQueueProps(props))});
	};

	/**
	 * Queues an action to call the specified function.
	 *	@example
	 *   	//would call myFunction() after 1s.
	 *   	myTween.wait(1000).call(myFunction);
	 * @method call
	 * @param {Function} callback The function to call.
	 * @param {Array} params Optional. The parameters to call the function with. If this is omitted, then the function
	 *      will be called with a single param pointing to this tween.
	 * @param {Object} scope Optional. The scope to call the function in. If omitted, it will be called in the target's
	 *      scope.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	p.call = function(callback, params, scope) {
		return this._addAction({f:callback, p:params ? params : [this], o:scope ? scope : this._target});
	};

	// TODO: add clarification between this and a 0 duration .to:
	/**
	 * Queues an action to set the specified props on the specified target. If target is null, it will use this tween's
	 * target.
	 * @example
	 *	myTween.wait(1000).set({visible:false},foo);
	 * @method set
	 * @param {Object} props The properties to set (ex. <code>{visible:false}</code>).
	 * @param {Object} target Optional. The target to set the properties on. If omitted, they will be set on the tween's target.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	p.set = function(props, target) {
		return this._addAction({f:this._set, o:this, p:[props, target ? target : this._target]});
	};

	/**
	 * Queues an action to to play (unpause) the specified tween. This enables you to sequence multiple tweens.
	 * @example
	 *	myTween.to({x:100},500).play(otherTween);
	 * @method play
	 * @param {Tween} tween The tween to play.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	p.play = function(tween) {
		if (!tween) { tween = this; }
		return this.call(tween.setPaused, [false], tween);
	};

	/**
	 * Queues an action to to pause the specified tween.
	 * @method pause
	 * @param {Tween} tween The tween to play. If null, it pauses this tween.
	 * @return {Tween} This tween instance (for chaining calls)
	 */
	p.pause = function(tween) {
		if (!tween) { tween = this; }
		return this.call(tween.setPaused, [true], tween);
	};

	/**
	 * Advances the tween to a specified position.
	 * @method setPosition
	 * @param {Number} value The position to seek to in milliseconds (or ticks if useTicks is true).
	 * @param {Number} actionsMode Optional parameter specifying how actions are handled (ie. call, set, play, pause):
	 *      <code>Tween.NONE</code> (0) - run no actions. <code>Tween.LOOP</code> (1) - if new position is less than old, then run all actions
	 *      between old and duration, then all actions between 0 and new. Defaults to <code>LOOP</code>. <code>Tween.REVERSE</code> (2) - if new
	 *      position is less than old, run all actions between them in reverse.
	 * @return {Boolean} Returns true if the tween is complete (ie. the full tween has run & loop is false).
	 */
	p.setPosition = function(value, actionsMode) {
		if (value < 0) { value = 0; }
		if (actionsMode == null) { actionsMode = 1; }

		// normalize position:
		var t = value;
		var end = false;
		if (t >= this.duration) {
			if (this.loop) { t = t%this.duration; }
			else {
				t = this.duration;
				end = true;
			}
		}
		if (t == this._prevPos) { return end; }


		var prevPos = this._prevPos;
		this.position = this._prevPos = t; // set this in advance in case an action modifies position.
		this._prevPosition = value;

		// handle tweens:
		if (this._target) {
			if (end) {
				// addresses problems with an ending zero length step.
				this._updateTargetProps(null,1);
			} else if (this._steps.length > 0) {
				// find our new tween index:
				for (var i=0, l=this._steps.length; i<l; i++) {
					if (this._steps[i].t > t) { break; }
				}
				var step = this._steps[i-1];
				this._updateTargetProps(step,(this._stepPosition = t-step.t)/step.d);
			}
		}

		// run actions:
		if (actionsMode != 0 && this._actions.length > 0) {
			if (this._useTicks) {
				// only run the actions we landed on.
				this._runActions(t,t);
			} else if (actionsMode == 1 && t<prevPos) {
				if (prevPos != this.duration) { this._runActions(prevPos, this.duration); }
				this._runActions(0, t, true);
			} else {
				this._runActions(prevPos, t);
			}
		}

		if (end) { this.setPaused(true); }

        this.dispatchEvent("change");
		return end;
	};

	/**
	 * Advances this tween by the specified amount of time in milliseconds (or ticks if <code>useTicks</code> is true).
	 * This is normally called automatically by the Tween engine (via <code>Tween.tick</code>), but is exposed for advanced uses.
	 * @method tick
	 * @param {Number} delta The time to advance in milliseconds (or ticks if <code>useTicks</code> is true).
	 */
	p.tick = function(delta) {
		if (this._paused) { return; }
		this.setPosition(this._prevPosition+delta);
	};

	/**
	 * Pauses or plays this tween.
	 * @method setPaused
	 * @param {Boolean} value Indicates whether the tween should be paused (true) or played (false).
	 * @return {Tween} This tween instance (for chaining calls)
	 */
	p.setPaused = function(value) {
		this._paused = !!value;
		Tween._register(this, !value);
		return this;
	};

	// tiny api (primarily for tool output):
	p.w = p.wait;
	p.t = p.to;
	p.c = p.call;
	p.s = p.set;

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[Tween]";
	};

	/**
	 * @method clone
	 * @protected
	 */
	p.clone = function() {
		throw("Tween can not be cloned.")
	};

// private methods:
	/**
	 * @method _updateTargetProps
	 * @param {Object} step
	 * @param {Number} ratio
	 * @protected
	 */
	p._updateTargetProps = function(step, ratio) {
		var p0,p1,v,v0,v1,arr;
		if (!step && ratio == 1) {
			// GDS: when does this run? Just at the very end? Shouldn't.
			this.passive = false;
			p0 = p1 = this._curQueueProps;
		} else {
			this.passive = !!step.v;
			if (this.passive) { return; } // don't update props.
			// apply ease to ratio.
			if (step.e) { ratio = step.e(ratio,0,1,1); }
			p0 = step.p0;
			p1 = step.p1;
		}

		for (var n in this._initQueueProps) {
			if ((v0 = p0[n]) == null) { p0[n] = v0 = this._initQueueProps[n]; }
			if ((v1 = p1[n]) == null) { p1[n] = v1 = v0; }
			if (v0 == v1 || ratio == 0 || ratio == 1 || (typeof(v0) != "number")) {
				// no interpolation - either at start, end, values don't change, or the value is non-numeric.
				v = ratio == 1 ? v1 : v0;
			} else {
				v = v0+(v1-v0)*ratio;
			}

			var ignore = false;
			if (arr = Tween._plugins[n]) {
				for (var i=0,l=arr.length;i<l;i++) {
					var v2 = arr[i].tween(this, n, v, p0, p1, ratio, !!step&&p0==p1, !step);
					if (v2 == Tween.IGNORE) { ignore = true; }
					else { v = v2; }
				}
			}
			if (!ignore) { this._target[n] = v; }
		}

	};

	/**
	 * @method _runActions
	 * @param {Number} startPos
	 * @param {Number} endPos
	 * @param {Boolean} includeStart
	 * @protected
	 */
	p._runActions = function(startPos, endPos, includeStart) {
		var sPos = startPos;
		var ePos = endPos;
		var i = -1;
		var j = this._actions.length;
		var k = 1;
		if (startPos > endPos) {
			// running backwards, flip everything:
			sPos = endPos;
			ePos = startPos;
			i = j;
			j = k = -1;
		}
		while ((i+=k) != j) {
			var action = this._actions[i];
			var pos = action.t;
			if (pos == ePos || (pos > sPos && pos < ePos) || (includeStart && pos == startPos) ) {
				action.f.apply(action.o, action.p);
			}
		}
	};

	/**
	 * @method _appendQueueProps
	 * @param {Object} o
	 * @protected
	 */
	p._appendQueueProps = function(o) {
		var arr,oldValue,i, l, injectProps;
		for (var n in o) {
			if (this._initQueueProps[n] === undefined) {
				oldValue = this._target[n];

				// init plugins:
				if (arr = Tween._plugins[n]) {
					for (i=0,l=arr.length;i<l;i++) {
						oldValue = arr[i].init(this, n, oldValue);
					}
				}
				this._initQueueProps[n] = this._curQueueProps[n] = (oldValue===undefined) ? null : oldValue;
			} else {
				oldValue = this._curQueueProps[n];
			}
		}

		for (var n in o) {
			oldValue = this._curQueueProps[n];
			if (arr = Tween._plugins[n]) {
				injectProps = injectProps||{};
				for (i=0, l=arr.length;i<l;i++) {
					// TODO: remove the check for .step in the next version. It's here for backwards compatibility.
					if (arr[i].step) { arr[i].step(this, n, oldValue, o[n], injectProps); }
				}
			}
			this._curQueueProps[n] = o[n];
		}
		if (injectProps) { this._appendQueueProps(injectProps); }
		return this._curQueueProps;
	};

	/**
	 * @method _cloneProps
	 * @param {Object} props
	 * @protected
	 */
	p._cloneProps = function(props) {
		var o = {};
		for (var n in props) {
			o[n] = props[n];
		}
		return o;
	};

	/**
	 * @method _addStep
	 * @param {Object} o
	 * @protected
	 */
	p._addStep = function(o) {
		if (o.d > 0) {
			this._steps.push(o);
			o.t = this.duration;
			this.duration += o.d;
		}
		return this;
	};

	/**
	 * @method _addAction
	 * @param {Object} o
	 * @protected
	 */
	p._addAction = function(o) {
		o.t = this.duration;
		this._actions.push(o);
		return this;
	};

	/**
	 * @method _set
	 * @param {Object} props
	 * @param {Object} o
	 * @protected
	 */
	p._set = function(props, o) {
		for (var n in props) {
			o[n] = props[n];
		}
	};

createjs.Tween = Tween;
}());
/*
* Timeline
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * The Timeline class synchronizes multiple tweens and allows them to be controlled as a group. Please note that if a
 * timeline is looping, the tweens on it may appear to loop even if the "loop" property of the tween is false.
 * @class Timeline
 * @param {Array} tweens An array of Tweens to add to this timeline. See addTween for more info.
 * @param {Object} labels An object defining labels for using {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
 * See {{#crossLink "Timeline/setLabels"}}{{/crossLink}}
 * for details.
 * @param {Object} props The configuration properties to apply to this tween instance (ex. `{loop:true}`). All properties
 * default to false. Supported props are:<UL>
 *    <LI> loop: sets the loop property on this tween.</LI>
 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
 *    <LI> ignoreGlobalPause: sets the ignoreGlobalPause property on this tween.</LI>
 *    <LI> paused: indicates whether to start the tween paused.</LI>
 *    <LI> position: indicates the initial position for this timeline.</LI>
 *    <LI> onChange: specifies a listener to add for the {{#crossLink "Timeline/change:event"}}{{/crossLink}} event.</LI>
 * </UL>
 * @extends EventDispatcher
 * @constructor
 **/
var Timeline = function(tweens, labels, props) {
  this.initialize(tweens, labels, props);
};
var p = Timeline.prototype = new createjs.EventDispatcher();

// public properties:

	/**
	 * Causes this timeline to continue playing when a global pause is active.
	 * @property ignoreGlobalPause
	 * @type Boolean
	 **/
	p.ignoreGlobalPause = false;

	/**
	 * Read-only property specifying the total duration of this timeline in milliseconds (or ticks if useTicks is true).
	 * This value is usually automatically updated as you modify the timeline. See updateDuration for more information.
	 * @property duration
	 * @type Number
	 **/
	p.duration = 0;

	/**
	 * If true, the timeline will loop when it reaches the end. Can be set via the props param.
	 * @property loop
	 * @type Boolean
	 **/
	p.loop = false;

	// TODO: deprecated.
	/**
	 * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "Timeline/change:event"}}{{/crossLink}}
	 * event.
	 * @property onChange
	 * @type Function
	 * @deprecated Use addEventListener and the "change" event.
	 **/

	/**
	 * Read-only. The current normalized position of the timeline. This will always be a value between 0 and duration.
	 * Changing this property directly will have no effect.
	 * @property position
	 * @type Object
	 **/
	p.position = null;

// events:
	/**
	 * Called whenever the timeline's position changes.
	 * @event change
	 * @since 0.5.0
	 **/

// private properties:

	/**
	 * @property _paused
	 * @type Boolean
	 * @protected
	 **/
	p._paused = false;

	/**
	 * @property _tweens
	 * @type Array[Tween]
	 * @protected
	 **/
	p._tweens = null;

	/**
	 * @property _labels
	 * @type Object
	 * @protected
	 **/
	p._labels = null;
	
	/**
	 * @property _labelList
	 * @type Array[Object]
	 * @protected
	 **/
	p._labelList = null;

	/**
	 * @property _prevPosition
	 * @type Number
	 * @default 0
	 * @protected
	 **/
	p._prevPosition = 0;

	/**
	 * @property _prevPos
	 * @type Number
	 * @default -1
	 * @protected
	 **/
	p._prevPos = -1;

	/**
	 * @property _useTicks
	 * @type Boolean
	 * @default false
	 * @protected
	 **/
	p._useTicks = false;

// constructor:
	/**
	* Initialization method.
	* @method initialize
	* @protected
	**/
	p.initialize = function(tweens, labels, props) {
		this._tweens = [];
		if (props) {
			this._useTicks = props.useTicks;
			this.loop = props.loop;
			this.ignoreGlobalPause = props.ignoreGlobalPause;
			props.onChange&&this.addEventListener("change", props.onChange);
		}
		if (tweens) { this.addTween.apply(this, tweens); }
		this.setLabels(labels);
		if (props&&props.paused) { this._paused=true; }
		else { createjs.Tween._register(this,true); }
		if (props&&props.position!=null) { this.setPosition(props.position, createjs.Tween.NONE); }
	};

// public methods:
	/**
	 * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the normal ticking system)
	 * and managed by this timeline. Adding a tween to multiple timelines will result in unexpected behaviour.
	 * @method addTween
	 * @param tween The tween(s) to add. Accepts multiple arguments.
	 * @return Tween The first tween that was passed in.
	 **/
	p.addTween = function(tween) {
		var l = arguments.length;
		if (l > 1) {
			for (var i=0; i<l; i++) { this.addTween(arguments[i]); }
			return arguments[0];
		} else if (l == 0) { return null; }
		this.removeTween(tween);
		this._tweens.push(tween);
		tween.setPaused(true);
		tween._paused = false;
		tween._useTicks = this._useTicks;
		if (tween.duration > this.duration) { this.duration = tween.duration; }
		if (this._prevPos >= 0) { tween.setPosition(this._prevPos, createjs.Tween.NONE); }
		return tween;
	};

	/**
	 * Removes one or more tweens from this timeline.
	 * @method removeTween
	 * @param tween The tween(s) to remove. Accepts multiple arguments.
	 * @return Boolean Returns true if all of the tweens were successfully removed.
	 **/
	p.removeTween = function(tween) {
		var l = arguments.length;
		if (l > 1) {
			var good = true;
			for (var i=0; i<l; i++) { good = good && this.removeTween(arguments[i]); }
			return good;
		} else if (l == 0) { return false; }

		var tweens = this._tweens;
		var i = tweens.length;
		while (i--) {
			if (tweens[i] == tween) {
				tweens.splice(i, 1);
				if (tween.duration >= this.duration) { this.updateDuration(); }
				return true;
			}
		}
		return false;
	};

	/**
	 * Adds a label that can be used with {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
	 * @method addLabel
	 * @param {String} label The label name.
	 * @param {Number} position The position this label represents.
	 **/
	p.addLabel = function(label, position) {
		this._labels[label] = position;
		var list = this._labelList;
		if (list) {
			for (var i= 0,l=list.length; i<l; i++) { if (position < list[i].position) { break; } }
			list.splice(i, 0, {label:label, position:position});
		}
	};

	/**
	 * Defines labels for use with gotoAndPlay/Stop. Overwrites any previously set labels.
	 * @method setLabels
	 * @param {Object} o An object defining labels for using gotoAndPlay/Stop in the form `{labelName:time}` where time is in
	 * milliseconds (or ticks if `useTicks` is true).
	 **/
	p.setLabels = function(o) {
		this._labels = o ?  o : {};
	};
	
	/**
	 * Returns a sorted list of the labels defined on this timeline.
	 * @method getLabels
	 * @return {Array[Object]} A sorted array of objects with label and position properties.
	 **/
	p.getLabels = function() {
		var list = this._labelList;
		if (!list) {
			list = this._labelList = [];
			var labels = this._labels;
			for (var n in labels) {
				list.push({label:n, position:labels[n]});
			}
			list.sort(function (a,b) { return a.position- b.position; });
		}
		return list;
	};
	
	/**
	 * Returns the name of the label on or immediately before the current position. For example, given a timeline with
	 * two labels, "first" on frame index 4, and "second" on frame 8, getCurrentLabel would return:<UL>
	 * <LI>null if the current position is 2.</LI>
	 * <LI>"first" if the current position is 4.</LI>
	 * <LI>"first" if the current position is 7.</LI>
	 * <LI>"second" if the current position is 15.</LI></UL>
	 * @method getCurrentLabel
	 * @return {String} The name of the current label or null if there is no label
	 **/
	p.getCurrentLabel = function() {
		var labels = this.getLabels();
		var pos = this.position;
		var l = labels.length;
		if (l) {
			for (var i = 0; i<l; i++) { if (pos < labels[i].position) { break; } }
			return (i==0) ? null : labels[i-1].label;
		}
		return null;
	};
	
	/**
	 * Unpauses this timeline and jumps to the specified position or label.
	 * @method gotoAndPlay
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is true) or label to jump to.
	 **/
	p.gotoAndPlay = function(positionOrLabel) {
		this.setPaused(false);
		this._goto(positionOrLabel);
	};

	/**
	 * Pauses this timeline and jumps to the specified position or label.
	 * @method gotoAndStop
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is true) or label to jump to.
	 **/
	p.gotoAndStop = function(positionOrLabel) {
		this.setPaused(true);
		this._goto(positionOrLabel);
	};

	/**
	 * Advances the timeline to the specified position.
	 * @method setPosition
	 * @param {Number} value The position to seek to in milliseconds (or ticks if `useTicks` is true).
	 * @param {Number} [actionsMode] parameter specifying how actions are handled. See the Tween {{#crossLink "Tween/setPosition"}}{{/crossLink}}
	 * method for more details.
	 * @return {Boolean} Returns true if the timeline is complete (ie. the full timeline has run & loop is false).
	 **/
	p.setPosition = function(value, actionsMode) {
		if (value < 0) { value = 0; }
		var t = this.loop ? value%this.duration : value;
		var end = !this.loop && value >= this.duration;
		if (t == this._prevPos) { return end; }
		this._prevPosition = value;
		this.position = this._prevPos = t; // in case an action changes the current frame.
		for (var i=0, l=this._tweens.length; i<l; i++) {
			this._tweens[i].setPosition(t, actionsMode);
			if (t != this._prevPos) { return false; } // an action changed this timeline's position.
		}
		if (end) { this.setPaused(true); }
		this.dispatchEvent("change");
		return end;
	};

	/**
	 * Pauses or plays this timeline.
	 * @method setPaused
	 * @param {Boolean} value Indicates whether the tween should be paused (true) or played (false).
	 **/
	p.setPaused = function(value) {
		this._paused = !!value;
		createjs.Tween._register(this, !value);
	};

	/**
	 * Recalculates the duration of the timeline.
	 * The duration is automatically updated when tweens are added or removed, but this method is useful
	 * if you modify a tween after it was added to the timeline.
	 * @method updateDuration
	 **/
	p.updateDuration = function() {
		this.duration = 0;
		for (var i=0,l=this._tweens.length; i<l; i++) {
			var tween = this._tweens[i];
			if (tween.duration > this.duration) { this.duration = tween.duration; }
		}
	};

	/**
	 * Advances this timeline by the specified amount of time in milliseconds (or ticks if useTicks is true).
	 * This is normally called automatically by the Tween engine (via Tween.tick), but is exposed for advanced uses.
	 * @method tick
	 * @param {Number} delta The time to advance in milliseconds (or ticks if useTicks is true).
	 **/
	p.tick = function(delta) {
		this.setPosition(this._prevPosition+delta);
	};

	/**
	 * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
	 * corresponding frame label will be returned, or null if a matching label is not defined.
	 * @method resolve
	 * @param {String|Number} positionOrLabel A numeric position value or label string.
	 **/
	p.resolve = function(positionOrLabel) {
		var pos = parseFloat(positionOrLabel);
		if (isNaN(pos)) { pos = this._labels[positionOrLabel]; }
		return pos;
	};

	/**
	* Returns a string representation of this object.
	* @method toString
	* @return {String} a string representation of the instance.
	**/
	p.toString = function() {
		return "[Timeline]";
	};

	/**
	 * @method clone
	 * @protected
	 **/
	p.clone = function() {
		throw("Timeline can not be cloned.")
	};

// private methods:
	/**
	 * @method _goto
	 * @protected
	 **/
	p._goto = function(positionOrLabel) {
		var pos = this.resolve(positionOrLabel);
		if (pos != null) { this.setPosition(pos); }
	};

createjs.Timeline = Timeline;
}());
/*
* Ease
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

// constructor:
/**
 * The Ease class provides a collection of easing functions for use with TweenJS. It does not use the standard 4 param
 * easing signature. Instead it uses a single param which indicates the current linear ratio (0 to 1) of the tween.
 *
 * Most methods on Ease can be passed directly as easing functions:
 *
 *      Tween.get(target).to({x:100}, 500, Ease.linear);
 *
 * However, methods beginning with "get" will return an easing function based on parameter values:
 *
 *      Tween.get(target).to({y:200}, 500, Ease.getPowIn(2.2));
 *
 * Please see the <a href="http://www.createjs.com/#!/TweenJS/demos/sparkTable">spark table demo</a> for an overview
 * of the different ease types on <a href="http://tweenjs.com">TweenJS.com</a>.
 *
 * <i>Equations derived from work by Robert Penner.</i>
 * @class Ease
 * @static
 **/
var Ease = function() {
	throw "Ease cannot be instantiated.";
}

// public static methods:
	/**
	 * @method linear
	 * @static
	 **/
	Ease.linear = function(t) { return t; }

	/**
	 * Identical to linear.
	 * @method none
	 * @static
	 **/
	Ease.none = Ease.linear;

	/**
	 * Mimics the simple -100 to 100 easing in Flash Pro.
	 * @method get
	 * @param amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
	 * @static
	 **/
	Ease.get = function(amount) {
		if (amount < -1) { amount = -1; }
		if (amount > 1) { amount = 1; }
		return function(t) {
			if (amount==0) { return t; }
			if (amount<0) { return t*(t*-amount+1+amount); }
			return t*((2-t)*amount+(1-amount));
		}
	}

	/**
	 * Configurable exponential ease.
	 * @method getPowIn
	 * @param pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 **/
	Ease.getPowIn = function(pow) {
		return function(t) {
			return Math.pow(t,pow);
		}
	}


	/**
	 * Configurable exponential ease.
	 * @method getPowOut
	 * @param pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 **/
	Ease.getPowOut = function(pow) {
		return function(t) {
			return 1-Math.pow(1-t,pow);
		}
	}


	/**
	 * Configurable exponential ease.
	 * @method getPowInOut
	 * @param pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 **/
	Ease.getPowInOut = function(pow) {
		return function(t) {
			if ((t*=2)<1) return 0.5*Math.pow(t,pow);
			return 1-0.5*Math.abs(Math.pow(2-t,pow));
		}
	}


	/**
	 * @method quadIn
	 * @static
	 **/
	Ease.quadIn = Ease.getPowIn(2);
	/**
	 * @method quadOut
	 * @static
	 **/
	Ease.quadOut = Ease.getPowOut(2);
	/**
	 * @method quadInOut
	 * @static
	 **/
	Ease.quadInOut = Ease.getPowInOut(2);


	/**
	 * @method cubicIn
	 * @static
	 **/
	Ease.cubicIn = Ease.getPowIn(3);
	/**
	 * @method cubicOut
	 * @static
	 **/
	Ease.cubicOut = Ease.getPowOut(3);
	/**
	 * @method cubicInOut
	 * @static
	 **/
	Ease.cubicInOut = Ease.getPowInOut(3);


	/**
	 * @method quartIn
	 * @static
	 **/
	Ease.quartIn = Ease.getPowIn(4);
	/**
	 * @method quartOut
	 * @static
	 **/
	Ease.quartOut = Ease.getPowOut(4);
	/**
	 * @method quartInOut
	 * @static
	 **/
	Ease.quartInOut = Ease.getPowInOut(4);


	/**
	 * @method quintIn
	 * @static
	 **/
	Ease.quintIn = Ease.getPowIn(5);
	/**
	 * @method quintOut
	 * @static
	 **/
	Ease.quintOut = Ease.getPowOut(5);
	/**
	 * @method quintInOut
	 * @static
	 **/
	Ease.quintInOut = Ease.getPowInOut(5);


	/**
	 * @method sineIn
	 * @static
	 **/
	Ease.sineIn = function(t) {
		return 1-Math.cos(t*Math.PI/2);
	}

	/**
	 * @method sineOut
	 * @static
	 **/
	Ease.sineOut = function(t) {
		return Math.sin(t*Math.PI/2);
	}

	/**
	 * @method sineInOut
	 * @static
	 **/
	Ease.sineInOut = function(t) {
		return -0.5*(Math.cos(Math.PI*t) - 1)
	}


	/**
	 * Configurable "back in" ease.
	 * @method getBackIn
	 * @param amount The strength of the ease.
	 * @static
	 **/
	Ease.getBackIn = function(amount) {
		return function(t) {
			return t*t*((amount+1)*t-amount);
		}
	}
	/**
	 * @method backIn
	 * @static
	 **/
	Ease.backIn = Ease.getBackIn(1.7);

	/**
	 * Configurable "back out" ease.
	 * @method getBackOut
	 * @param amount The strength of the ease.
	 * @static
	 **/
	Ease.getBackOut = function(amount) {
		return function(t) {
			return (--t*t*((amount+1)*t + amount) + 1);
		}
	}
	/**
	 * @method backOut
	 * @static
	 **/
	Ease.backOut = Ease.getBackOut(1.7);

	/**
	 * Configurable "back in out" ease.
	 * @method getBackInOut
	 * @param amount The strength of the ease.
	 * @static
	 **/
	Ease.getBackInOut = function(amount) {
		amount*=1.525;
		return function(t) {
			if ((t*=2)<1) return 0.5*(t*t*((amount+1)*t-amount));
			return 0.5*((t-=2)*t*((amount+1)*t+amount)+2);
		}
	}
	/**
	 * @method backInOut
	 * @static
	 **/
	Ease.backInOut = Ease.getBackInOut(1.7);


	/**
	 * @method circIn
	 * @static
	 **/
	Ease.circIn = function(t) {
		return -(Math.sqrt(1-t*t)- 1);
	}

	/**
	 * @method circOut
	 * @static
	 **/
	Ease.circOut = function(t) {
		return Math.sqrt(1-(--t)*t);
	}

	/**
	 * @method circInOut
	 * @static
	 **/
	Ease.circInOut = function(t) {
		if ((t*=2) < 1) return -0.5*(Math.sqrt(1-t*t)-1);
		return 0.5*(Math.sqrt(1-(t-=2)*t)+1);
	}

	/**
	 * @method bounceIn
	 * @static
	 **/
	Ease.bounceIn = function(t) {
		return 1-Ease.bounceOut(1-t);
	}

	/**
	 * @method bounceOut
	 * @static
	 **/
	Ease.bounceOut = function(t) {
		if (t < 1/2.75) {
			return (7.5625*t*t);
		} else if (t < 2/2.75) {
			return (7.5625*(t-=1.5/2.75)*t+0.75);
		} else if (t < 2.5/2.75) {
			return (7.5625*(t-=2.25/2.75)*t+0.9375);
		} else {
			return (7.5625*(t-=2.625/2.75)*t +0.984375);
		}
	}

	/**
	 * @method bounceInOut
	 * @static
	 **/
	Ease.bounceInOut = function(t) {
		if (t<0.5) return Ease.bounceIn (t*2) * .5;
		return Ease.bounceOut(t*2-1)*0.5+0.5;
	}


	/**
	 * Configurable elastic ease.
	 * @method getElasticIn
	 * @param amplitude
	 * @param period
	 * @static
	 **/
	Ease.getElasticIn = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2*Math.asin(1/amplitude);
			return -(amplitude*Math.pow(2,10*(t-=1))*Math.sin((t-s)*pi2/period));
		}
	}
	/**
	 * @method elasticIn
	 * @static
	 **/
	Ease.elasticIn = Ease.getElasticIn(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticOut
	 * @param amplitude
	 * @param period
	 * @static
	 **/
	Ease.getElasticOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2 * Math.asin(1/amplitude);
			return (amplitude*Math.pow(2,-10*t)*Math.sin((t-s)*pi2/period )+1);
		}
	}
	/**
	 * @method elasticOut
	 * @static
	 **/
	Ease.elasticOut = Ease.getElasticOut(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticInOut
	 * @param amplitude
	 * @param period
	 * @static
	 **/
	Ease.getElasticInOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			var s = period/pi2 * Math.asin(1/amplitude);
			if ((t*=2)<1) return -0.5*(amplitude*Math.pow(2,10*(t-=1))*Math.sin( (t-s)*pi2/period ));
			return amplitude*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*pi2/period)*0.5+1;
		}
	}
	/**
	 * @method elasticInOut
	 * @static
	 **/
	Ease.elasticInOut = Ease.getElasticInOut(1,0.3*1.5);

createjs.Ease = Ease;
}());
/*
 * MotionGuidePlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";
	/**
	 * A TweenJS plugin for working with motion guides.
	 *
	 * To use, install the plugin after TweenJS has loaded. Next tween the 'guide' property with an object as detailed below.
	 *
	 *       createjs.MotionGuidePlugin.install();
	 *
	 * <h4>Example</h4>
	 *
	 *      // Using a Motion Guide
	 *	    createjs.Tween.get(target).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);
	 *	    // Visualizing the line
	 *	    graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
	 *
	 * Each path needs pre-computation to ensure there's fast performance. Because of the pre-computation there's no
	 * built in support for path changes mid tween. These are the Guide Object's properties:<UL>
	 *      <LI> path: Required, Array : The x/y points used to draw the path with a moveTo and 1 to n curveTo calls.</LI>
	 *      <LI> start: Optional, 0-1 : Initial position, default 0 except for when continuing along the same path.</LI>
	 *      <LI> end: Optional, 0-1 : Final position, default 1 if not specified.</LI>
	 *      <LI> orient: Optional, string : "fixed"/"auto"/"cw"/"ccw"<UL>
	 *				<LI>"fixed" forces the object to face down the path all movement (relative to start rotation),</LI>
	 *      		<LI>"auto" rotates the object along the path relative to the line.</LI>
	 *      		<LI>"cw"/"ccw" force clockwise or counter clockwise rotations including flash like behaviour</LI>
	 * 		</UL></LI>
	 * </UL>
	 * Guide objects should not be shared between tweens even if all properties are identical, the library stores
	 * information on these objects in the background and sharing them can cause unexpected behaviour. Values
	 * outside 0-1 range of tweens will be a "best guess" from the appropriate part of the defined curve.
	 *
	 * @class MotionGuidePlugin
	 * @constructor
	 **/
	var MotionGuidePlugin = function() {
		throw("MotionGuidePlugin cannot be instantiated.")
	};

	// static interface:
	/**
	 * @property priority
	 * @protected
	 * @static
	 **/
	MotionGuidePlugin.priority = 0; // high priority, should run sooner

	/**
	 * @property temporary variable storage
	 * @private
	 * @static
	 */
	MotionGuidePlugin._rotOffS;
	/**
	 * @property temporary variable storage
	 * @private
	 * @static
	 */
	MotionGuidePlugin._rotOffE;
	/**
	 * @property temporary variable storage
	 * @private
	 * @static
	 */
	MotionGuidePlugin._rotNormS;
	/**
	 * @property temporary variable storage
	 * @private
	 * @static
	 */
	MotionGuidePlugin._rotNormE;

	/**
	 * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
	 * @method install
	 * @static
	 **/
	MotionGuidePlugin.install = function() {
		createjs.Tween.installPlugin(MotionGuidePlugin, ["guide", "x", "y", "rotation"]);
		return createjs.Tween.IGNORE;
	};

	/**
	 * @method init
	 * @protected
	 * @static
	 **/
	MotionGuidePlugin.init = function(tween, prop, value) {
		var target = tween.target;
		if(!target.hasOwnProperty("x")){ target.x = 0; }
		if(!target.hasOwnProperty("y")){ target.y = 0; }
		if(!target.hasOwnProperty("rotation")){ target.rotation = 0; }

		if(prop=="rotation"){ tween.__needsRot = true; }
		return prop=="guide"?null:value;
	};

	/**
	 * @method step
	 * @protected
	 * @static
	 **/
	MotionGuidePlugin.step = function(tween, prop, startValue, endValue, injectProps) {
		// other props
		if(prop == "rotation"){
			tween.__rotGlobalS = startValue;
			tween.__rotGlobalE = endValue;
			MotionGuidePlugin.testRotData(tween, injectProps);
		}
		if(prop != "guide"){ return endValue; }

		// guide only information - Start -
		var temp, data = endValue;
		if(!data.hasOwnProperty("path")){ data.path = []; }
		var path = data.path;
		if(!data.hasOwnProperty("end")){ data.end = 1; }
		if(!data.hasOwnProperty("start")){
			data.start = (startValue&&startValue.hasOwnProperty("end")&&startValue.path===path)?startValue.end:0;
		}

		// Figure out subline information
		if(data.hasOwnProperty("_segments") && data._length){ return endValue; }
		var l = path.length;
		var accuracy = 10;		// Adjust to improve line following precision but sacrifice performance (# of seg)
		if(l >= 6 && (l-2) % 4 == 0){	// Enough points && contains correct number per entry ignoring start
			data._segments = [];
			data._length = 0;
			for(var i=2; i<l; i+=4){
				var sx = path[i-2], sy = path[i-1];
				var cx = path[i+0], cy = path[i+1];
				var ex = path[i+2], ey = path[i+3];
				var oldX = sx, oldY = sy;
				var tempX, tempY, total = 0;
				var sublines = [];
				for(var j=1; j<=accuracy; j++){
					var t = j/accuracy;
					var inv = 1 - t;
					tempX = inv*inv * sx + 2 * inv * t * cx + t*t * ex;
					tempY = inv*inv * sy + 2 * inv * t * cy + t*t * ey;
					total += sublines[sublines.push(Math.sqrt((temp=tempX-oldX)*temp + (temp=tempY-oldY)*temp))-1];
					oldX = tempX;
					oldY = tempY;
				}
				data._segments.push(total);
				data._segments.push(sublines);
				data._length += total;
			}
		} else {
			throw("invalid 'path' data, please see documentation for valid paths");
		}

		// Setup x/y tweens
		temp = data.orient;
		data.orient = true;
		var o = {};
		MotionGuidePlugin.calc(data, data.start, o);
		tween.__rotPathS = Number(o.rotation.toFixed(5));
		MotionGuidePlugin.calc(data, data.end, o);
		tween.__rotPathE = Number(o.rotation.toFixed(5));
		data.orient = false;	//here and now we don't know if we need to
		MotionGuidePlugin.calc(data, data.end, injectProps);
		data.orient = temp;

		// Setup rotation properties
		if(!data.orient){ return endValue; }
		tween.__guideData = data;
		MotionGuidePlugin.testRotData(tween, injectProps);
		return endValue;
	};

	/**
	 * @method testRotData
	 * @protected
	 * @static
	 **/
	MotionGuidePlugin.testRotData = function(tween, injectProps){

		// no rotation informat? if we need it come back, if we don't use 0 & ensure we have guide data
		if(tween.__rotGlobalS === undefined || tween.__rotGlobalE === undefined){
			if(tween.__needsRot){ return; }
			if(tween._curQueueProps.rotation !== undefined){
				tween.__rotGlobalS = tween.__rotGlobalE = tween._curQueueProps.rotation;
			} else {
				tween.__rotGlobalS = tween.__rotGlobalE = injectProps.rotation = tween.target.rotation || 0;
			}
		}
		if(tween.__guideData === undefined){ return; }

		// Process rotation properties
		var data = tween.__guideData;
		var rotGlobalD = tween.__rotGlobalE - tween.__rotGlobalS;
		var rotPathD = tween.__rotPathE - tween.__rotPathS;
		var rot = rotGlobalD - rotPathD;

		if(data.orient == "auto"){
			if(rot > 180){			rot -= 360; }
			else if(rot < -180){	rot += 360; }

		} else if(data.orient == "cw"){
			while(rot < 0){ rot += 360; }
			if(rot == 0 && rotGlobalD > 0 && rotGlobalD != 180){ rot += 360; }

		} else if(data.orient == "ccw"){
			rot = rotGlobalD - ((rotPathD > 180)?(360-rotPathD):(rotPathD));	// sign flipping on path
			while(rot > 0){ rot -= 360; }
			if(rot == 0 && rotGlobalD < 0 && rotGlobalD != -180){ rot -= 360; }
		}

		data.rotDelta = rot;
		data.rotOffS = tween.__rotGlobalS - tween.__rotPathS;

		// reset
		tween.__rotGlobalS = tween.__rotGlobalE = tween.__guideData = tween.__needsRot = undefined;
	};

	/**
	 * @method tween
	 * @protected
	 * @static
	 **/
	MotionGuidePlugin.tween = function(tween, prop, value, startValues, endValues, ratio, wait, end) {
		var data = endValues.guide;
		if(data == undefined || data === startValues.guide){ return value; }
		if(data.lastRatio != ratio){
			// first time through so calculate what I need to
			var t = ((data.end-data.start)*(wait?data.end:ratio)+data.start);
			MotionGuidePlugin.calc(data, t, tween.target);
			switch(data.orient){
				case "cw":		// mix in the original rotation
				case "ccw":
				case "auto": tween.target.rotation += data.rotOffS + data.rotDelta*ratio; break;
				case "fixed":	// follow fixed behaviour to solve potential issues
				default: tween.target.rotation += data.rotOffS; break;
			}
			data.lastRatio = ratio;
		}
		if(prop == "rotation" && ((!data.orient) || data.orient == "false")){ return value; }
		return tween.target[prop];
	};

	/**
	 * Determine the appropriate x/y/rotation information about a path for a given ratio along the path.
	 * Assumes a path object with all optional parameters specified.
	 * @param data Data object you would pass to the "guide:" property in a Tween
	 * @param ratio 0-1 Distance along path, values outside 0-1 are "best guess"
	 * @param target Object to copy the results onto, will use a new object if not supplied.
	 * @return {Object} The target object or a new object w/ the tweened properties
	 * @static
	 */
	MotionGuidePlugin.calc = function(data, ratio, target) {
		if(data._segments == undefined){ MotionGuidePlugin.validate(data); }
		if(target == undefined){ target = {x:0, y:0, rotation:0}; }
		var seg = data._segments;
		var path = data.path;

		// find segment
		var pos = data._length * ratio;
		var cap = seg.length - 2;
		var n = 0;
		while(pos > seg[n] && n < cap){
			pos -= seg[n];
			n+=2;
		}

		// find subline
		var sublines = seg[n+1];
		var i = 0;
		cap = sublines.length-1;
		while(pos > sublines[i] && i < cap){
			pos -= sublines[i];
			i++;
		}
		var t = (i/++cap)+(pos/(cap*sublines[i]));

		// find x/y
		n = (n*2)+2;
		var inv = 1 - t;
		target.x = inv*inv * path[n-2] + 2 * inv * t * path[n+0] + t*t * path[n+2];
		target.y = inv*inv * path[n-1] + 2 * inv * t * path[n+1] + t*t * path[n+3];

		// orientation
		if(data.orient){
			target.rotation = 57.2957795 * Math.atan2(
				(path[n+1]-path[n-1])*inv + (path[n+3]-path[n+1])*t,
				(path[n+0]-path[n-2])*inv + (path[n+2]-path[n+0])*t);
		}

		return target;
	};

	// public properties:

	// private properties:

	// constructor:

	// public methods:

	// private methods:

	createjs.MotionGuidePlugin = MotionGuidePlugin;
}());
/**
 * @module TweenJS
 */
this.createjs = this.createjs || {};

(function() {
	"use strict";

	/**
	 * Static class holding library specific information such as the version and buildDate of
	 * the library.
	 * @class TweenJS
	 **/
	var s = createjs.TweenJS = createjs.TweenJS || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*version*/"NEXT"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*date*/"Tue, 01 Oct 2013 16:03:38 GMT"; // injected by build process

})();
