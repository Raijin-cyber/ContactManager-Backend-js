// What is an asyncHandler? 
/*A asynhandler method takes a async method. Async method always return a promise
now what is the use of async handler methods. It forwards all error occured to the Express's middlewae 
error pipeline. If async handler wasn't there then you would have to write try n catch block 
repetitively causing lots of boilerplate, and it can also lead unhandled promise rejections which may
lead to a problem.*/

function asyncHandler(fn) {
    return function(req, res, next) {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    }
}


// But we are not using this async handler because we already have a package named express async handler