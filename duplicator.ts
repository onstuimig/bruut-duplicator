/*!
* Duplicator.js
* @version: 0.2
* @license: Copyright 2017 Onstuimig
* @creators: Onstuimig
*/

	export class Duplicator {

		public trigger; data; duplicateOriginal; duplicateTarget; maxDuplicates; duplicateItem; duplicateTargetCount;

		constructor(trigger) {
			this.trigger = trigger;
			this.convertAttributeToJson();
		}

		/**
		 * Try converting the string in the data-duplicator attribute to valid JSON object
		 * on fail: console the error and abort
		 */
		convertAttributeToJson() {
			try {
				this.data = JSON.parse(this.trigger.getAttribute('data-duplicator'));
				this.getDuplicateOriginal();
				this.createListener();
			} catch(e) {
				console.warn(e);
				console.error('No valid JSON string for Clone found. Aborting...');
				return;
			}
		}

		/**
		 * Get the duplicate element in the document
		 * @return {function} [Returns the .getDuplicateTarget() function, to get the element where the duplicates will be placed]
		 */
		getDuplicateOriginal() {
			this.duplicateOriginal = document.getElementById(this.data.id.replace('#', ''));
			return this.getDuplicateTarget();
		}

		/**
		 * Checks if there's a target set, if not, get the sibling element from the trigger. If a sibling
		 * doesn't exist, we create it
		 * @return {function} getmaxDuplicates() - Defines how many duplicates are allowed
		 */
		getDuplicateTarget() {

			if( typeof this.data.target === 'undefined' || this.data.target === null ) {
				this.duplicateTarget = this.trigger.nextElementSibling;

				if(this.duplicateTarget == null) {
					this.trigger.parentNode.insertAdjacentHTML('beforeEnd', '<div class="duplicator-duplicates"></div>');
					this.duplicateTarget = this.trigger.nextElementSibling;
				}
			}else {
				this.duplicateTarget = document.getElementById(this.data.target.replace('#', ''));
			}

			if(typeof this.duplicateTarget == 'undefined') {
				console.error(`Duplicator: No target element found with id: ${this.data.target}. Aborting...`)
				return false;
			}else {
				return this.getmaxDuplicates();
			}
		}

		/**
		 * Checks how many duplicates are allowed
		 */
		getmaxDuplicates() {
			this.maxDuplicates = (typeof this.data.max === 'undefined' || this.data.max === null ) ? false : this.data.max;
		}

		/**
		 * Creates the click listener for the trigger. On click:
		 * @return {function} duplicate() - Starts the duplicate process.
		 */
		createListener() {
			this.trigger.addEventListener('click', (e) => {
				if ((e.target.type && e.target.type !== 'checkbox' && e.target.type !== 'radio') || !e.target.type) {
					e.preventDefault();
				}

				return this.duplicate();
			});
		}

		/**
		 * Counts the children in the target element and returns them in a variable called duplicateTargetCount
		 * @return {number} [Children in the target element]
		 */
		getDuplicateTargetChildren() {
			return this.duplicateTargetCount = (typeof this.duplicateTarget.children === 'undefined') ? 0 : parseInt(this.duplicateTarget.children.length);
		}

		/**
		 * The duplicate process itself. If the maximum duplicates = false (infinite) or less than the children
		 * in the target element, duplicate the duplicateOriginal and add it to the duplicateTarget.
		 */
		duplicate() {

			var children = this.getDuplicateTargetChildren();

			if(this.maxDuplicates == false || children < parseInt(this.maxDuplicates) ) {
				this.duplicateItem = this.duplicateOriginal.cloneNode(true);
				this.duplicateItem.removeAttribute('id');

				this.duplicateTarget.appendChild(this.duplicateItem);

				this.getDuplicateTargetChildren();
				this.applyCallback();
			}
		}

		/**
		 * If there's a callback function string given AND the function is already created
		 * the function will be called with the instance of Duplicator and the current duplicateID as parameters
		 */
		applyCallback() {
			if(typeof this.data.callback !== 'undefined' && this.data.callback !== null) {
				var param = [this];
				var fn = window[this.data.callback];

				if (typeof fn === "function") {
					fn.apply(null, param);
				}
			}
		}
	}