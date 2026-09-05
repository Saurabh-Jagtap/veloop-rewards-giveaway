# Backend Learnings

## 1. Don't overwrite Express `req.query`

### Mistake
In the validation middleware, I tried:

req.query = result.data;

This caused:

TypeError: Cannot set property query...

### Why it happened
In Express 5, `req.query` is exposed as a getter and cannot be replaced directly.

### What I learned
`req.query` should be treated as read-only request data.

### Correct approach
Validate `req.query`, then store the validated/transformed result in `res.locals`:

res.locals.validatedQuery = result.data;

The controller can then read the validated data from `res.locals`.

### General lesson
Don't blindly replace framework-managed request properties. Validate/transform the data and pass the processed result separately.