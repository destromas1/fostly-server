# Coding Challenge

The challenge is to develop an application similar to `bit.ly` - the link shortener.

## Back-end part
There should be an HTTP API provided. The actual framework doesn’t matter, it could be express.js / hapi.js etc.

HTTP API should provide such interface,

* **Create new short link**

```plain
HTTP POST /v1/links
```

Payload,

```json
{
	"url": "<target-url>"
}
```

Response,

```json
{
	"hash": "<short-link-hash>"
}
```

* **Access short link**

```plain
HTTP GET /v1/{short-link-hash}
```

As response the API should redirect to `target-url`.

## Bonus
Implement routes to manage an existing link, like updating the target url or entirly delete a link from the system.

## Front-end part

Provide the simple UI for the link management of the link shortener, build with `React` / `Redux`. 

The UI should contain a form, to submit a target url and get a short link as the result of submission.

## Bonus
Extend the UI to manage the links.

## Assumptions
1. The server persistence layer (database) is not required, in memory storage can be used. But, usage of some database (SQL, MongoDB etc.) is not prohibited.
2. HTTP API project should be run with `npm start` and spawn a local server at port `8888`.
3. UI project should be run with `npm start` and start a local server at port `8889`.
4. Wherever it’s applicable, tests should be provided.