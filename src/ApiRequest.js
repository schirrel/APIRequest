import Request from '@schirrel/request/Request.js';
import RequestObservable from './RequestObservable.js';
import { uniqueId } from './Util.js';
export default class APIRequest {

    constructor(_url, globalRequests) {
        this.uri = _url;
        this._observable = new RequestObservable(globalRequests);
    }

    loading(observable) {
        this._observable.watch(observable)
    }

    perform(request) {
        let id = uniqueId();
        this._observable.updateRequests(id);
        return new Promise((resolve, reject) => {
            request.then((res => {
                resolve(res);
            })).catch(err => {
                reject(err);
            }).finally(() => {
                this._observable.updateRequests(id, true);
            });
        })
    }

    /**
     * @param {String} id
     * @returns {Function} Promise
     */
    get(id) {
        return this.perform(Request.get(this.uri + '/' + id))
    }
    /**
     * @returns {Function} Promise
     */
    all() {
        return this.perform(Request.get(this.uri));
    }
    /**
 * @param {Object} model
 * @returns {Function} Promise
 */

    save(model) {
        if (model.id) {
            return this.perform(Request.put(this.uri + '/' + model.id, { body: JSON.stringify(model) }));
        } else
            return this.perform(Request.post(this.uri, { body: JSON.stringify(model) }));
    }
    /**
     * 
     * @param {Object} params 
     * @returns Promise
     */
    pagination(params) {
        params.page = params.page || 1;
        params.limit = params.limit || 10;
        return this.perform(Request.get(`${this.uri}/pagination`, params));
    }
    /**
     * 
     * @param {Object} params 
     * @returns Promise
     */
    search(params) {
        return this.perform(Request.get(this.uri + '/search', params))
    }
}