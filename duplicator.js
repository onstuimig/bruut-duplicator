/*!
* Duplicator.js
* @version: 0.2
* @license: Copyright 2017 Onstuimig
* @creators: Onstuimig
*/
export var Duplicator = (function () {
    function Duplicator(trigger) {
        this.trigger = trigger;
        this.convertAttributeToJson();
    }
    Duplicator.prototype.convertAttributeToJson = function () {
        try {
            this.data = JSON.parse(this.trigger.getAttribute('data-duplicator'));
            this.getDuplicateOriginal();
            this.createListener();
        }
        catch (e) {
            console.warn(e);
            console.error('No valid JSON string for Clone found. Aborting...');
            return;
        }
    };
    Duplicator.prototype.getDuplicateOriginal = function () {
        this.duplicateOriginal = document.getElementById(this.data.id.replace('#', ''));
        return this.getDuplicateTarget();
    };
    Duplicator.prototype.getDuplicateTarget = function () {
        if (typeof this.data.target === 'undefined' || this.data.target === null) {
            this.duplicateTarget = this.trigger.nextElementSibling;
            if (this.duplicateTarget == null) {
                this.trigger.parentNode.insertAdjacentHTML('beforeEnd', '<div class="duplicator-duplicates"></div>');
                this.duplicateTarget = this.trigger.nextElementSibling;
            }
        }
        else {
            this.duplicateTarget = document.getElementById(this.data.target.replace('#', ''));
        }
        if (typeof this.duplicateTarget == 'undefined') {
            console.error("Duplicator: No target element found with id: " + this.data.target + ". Aborting...");
            return false;
        }
        else {
            return this.getmaxDuplicates();
        }
    };
    Duplicator.prototype.getmaxDuplicates = function () {
        this.maxDuplicates = (typeof this.data.max === 'undefined' || this.data.max === null) ? false : this.data.max;
    };
    Duplicator.prototype.createListener = function () {
        var _this = this;
        this.trigger.addEventListener('click', function (e) {
            if ((e.target.type && e.target.type !== 'checkbox' && e.target.type !== 'radio') || !e.target.type) {
                e.preventDefault();
            }
            return _this.duplicate();
        });
    };
    Duplicator.prototype.getDuplicateTargetChildren = function () {
        return this.duplicateTargetCount = (typeof this.duplicateTarget.children === 'undefined') ? 0 : parseInt(this.duplicateTarget.children.length);
    };
    Duplicator.prototype.duplicate = function () {
        var children = this.getDuplicateTargetChildren();
        if (this.maxDuplicates == false || children < parseInt(this.maxDuplicates)) {
            this.duplicateItem = this.duplicateOriginal.cloneNode(true);
            this.duplicateItem.removeAttribute('id');
            this.duplicateTarget.appendChild(this.duplicateItem);
            this.getDuplicateTargetChildren();
            this.applyCallback();
        }
    };
    Duplicator.prototype.applyCallback = function () {
        if (typeof this.data.callback !== 'undefined' && this.data.callback !== null) {
            var param = [this];
            var fn = window[this.data.callback];
            if (typeof fn === "function") {
                fn.apply(null, param);
            }
        }
    };
    return Duplicator;
}());
