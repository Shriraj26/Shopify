"use strict";
const HttpErrors = require("http-errors");

const Errors = {
    HttpErrors: HttpErrors,
    badRequest: msg => HttpErrors.BadRequest(msg),
    unAuthorized: msg => HttpErrors.Unauthorized(msg),
    paymentRequired: msg => HttpErrors.PaymentRequired(msg),
    forbidden: msg => HttpErrors.Forbidden(msg),
    notFound: msg => HttpErrors.NotFound(msg),
    methodNotAllowed: msg => HttpErrors.MethodNotAllowed(msg),
    notAcceptable: msg => HttpErrors.NotAcceptable(msg),
    proxyAuthenticationFailed: msg => HttpErrors.ProxyAuthenticationRequired(msg),
    requestTimeout: msg => HttpErrors.RequestTimeout(msg),
    conflict: msg => HttpErrors.Conflict(msg),
    gone: msg => HttpErrors.Gone(msg),
    lengthRequired: msg => HttpErrors.LengthRequired(msg),
    preconditionFailed: msg => HttpErrors.PreconditionFailed(msg),
    payloadTooLarge: msg => HttpErrors.PayloadTooLarge(msg),
    internalServerError: msg => HttpErrors.InternalServerError(msg),
    notImplemented: msg => HttpErrors.NotImplemented(msg),
    badGateway: msg => HttpErrors.BadGateway(msg),
};

exports.Errors = Errors;
