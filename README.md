## MVC approach

Directories:
- models: models that discribe an object that intarect with a data base.
- controllers: controllers that define the way the requests are handled
- views: views represents the presentation layer, responsible for displaying the data to the user. Documents that will work on the front-end

Model -> Controller -> View
Controller: use Models to get data and pass it to Views

## Status Codes

200 - OK
301 - Resource moved
404 - not found
500 - internal server error

100 range - informational response
200 range - sucess code
301 range - codes for redirects
404 range - user or client error codes
500 range - server error codes