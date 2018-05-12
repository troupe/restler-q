// Type definitions for restler-q
// Adapted from restler definitions by Cyril Schumacher <https://github.com/cyrilschumacher>

/// <reference types="node"/>

declare module "@gradecam/restler-q" {
    import * as http from "http";
    import * as Q from "q";

    interface RestlerMethods<T> {
        del(url: string, options?: Object): Q.Promise<T>;
        get(url: string, options?: RestlerOptions): Q.Promise<T>;
        head(url: string, options?: RestlerOptions): Q.Promise<T>;
        /** Send json data via GET method. */
        json(url: string, data?: any, options?: RestlerOptions, method?: string): Q.Promise<T>;
        patch(url: string, options?: RestlerOptions): Q.Promise<T>;
        patchJson(url: string, data?: any, options?: RestlerOptions): Q.Promise<T>;
        post(url: string, options?: RestlerOptions): Q.Promise<T>;
        postJson(url: string, data?: any, options?: RestlerOptions): Q.Promise<T>;
        put(url: string, options?: RestlerOptions): Q.Promise<T>;
        putJson(url: string, data?: any, options?: RestlerOptions): Q.Promise<T>;
        service(url: string, options?: RestlerOptions): Q.Promise<T>;
    }

    interface RestlerStatic extends RestlerMethods<any> {
        spread: RestlerMethods<[any, http.IncomingMessage]>;
    }

    /**
     * Interface for the header.
     * @interface
     */
    interface RestlerOptionsHeader {
        [headerName: string]: string;
    }

    /**
     * Interface for restler options.
     * @interface
     */
    interface RestlerOptions {
        /**
         * OAuth Bearer Token.
         * @type {string}
         */
        accessToken?: string;

        /**
         *  HTTP Agent instance to use. If not defined globalAgent will be used. If false opts out of connection pooling with an Agent, defaults request to Connection: close.
         * @type {any}
         */
        agent?: any;

        /**
         * A http.Client instance if you want to reuse or implement some kind of connection pooling.
         * @type {any}
         */
        client?: any;

        /**
         * Data to be added to the body of the request.
         * @type {any}
         */
        data?: any;

        /**
         * Encoding of the response body
         * @type {string}
         */
        decoding?: string;

        /**
         * Encoding of the request body.
         * @type {string}
         */
        encoding?: string;

        /**
         * If set will recursively follow redirects.
         * @type {boolean}
         */
        followRedirects?: boolean;

        /**
         * A hash of HTTP headers to be sent.
         * @type {RestlerOptionsHeader}
         */
        headers?: RestlerOptionsHeader;

        /**
         * Request method
         * @type {string}
         */
        method?: string;

        /**
         * If set the data passed will be formatted as <code>multipart/form-encoded</code>.
         * @type {boolean}
         */
        multipart?: boolean;

        /**
         * A function that will be called on the returned data. Use any of predefined <code>restler.parsers</code>.
         * @type {any}
         */
        parser?: any;

        /**
         * Basic auth password.
         * @type {string}
         */
        password?: string;

        /**
         * Query string variables as a javascript object, will override the querystring in the URL.
         * @type {any}
         */
        query?: any;

        /**
         * If true, the server certificate is verified against the list of supplied CAs.
         * An 'error' event is emitted if verification fails. Verification happens at the connection level, before the HTTP request is sent.
         * @type {boolean}
         */
        rejectUnauthorized?: boolean;

        /**
         * Emit the timeout event when the response does not return within the said value (in ms).
         * @type {number}
         */
        timeout?: number;

        /**
         * Basic auth username.
         * @type {string}
         */
        username?: string;

        /**
         * Options for xml2js.
         * @type {any}
         */
        xml2js?: any;
    }

    let restler: RestlerStatic;
    export = restler;
}
