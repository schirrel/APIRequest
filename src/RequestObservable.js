import { uniqueId } from './Util.js';

export default class RequestObservable {

    constructor(parent) {
        this.requests = new Set();
        this.observables = new Map();
        this.parent = parent;
        this._identifier = `RequestObservable-${uniqueId()}`;
    }

    watch(observable) {
        let id = uniqueId();
        this.observables.set(id, observable)
        return id;
    }
    callObservables() {
        for (var [key, value] of this.observables) {
            value(!!this.requests.size);
        }
    }

    updateRequests(id, remove) {
        this.parent && this.parent.updateRequests && this.parent.updateRequests(id, remove)
        if (remove) {
            this.requests.delete(id);
        } else {
            this.requests.add(id);
        }
        this.callObservables();
    }
}