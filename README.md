# jest-plugin-objectid-matcher

A Jest custom matcher plugin to compare `String`s against MongoDB's `ObjectId`s.

# Setup

Add custom matcher available project-wide

# Use

You can now compare `String`s against `ObjectId`s, the following expect will all pass:

```
const id1 = '5af3365a1883d5c5661fd84c'
const id2 = '5af3365a1883d5c5661fd84d'
expect(ObjectId(id1)).toMatchObjectId(ObjectId(id2))
expect(ObjectId(id1)).toMatchObjectId(id2)
expect(id1).toMatchObjectId(ObjectId(id2))
expect(id1).toMatchObjectId(id2)
```

When comparing using `String`s, remember that the `String` **MUST** comply with the `ObjectId` format, so:

* It **MUST** be a 24 hex-characters string

If `expected` or `received` don't comply with that an error like this will show:

```
    expect(received).toMatchObjectId(expected)


              Expected "received" to be coercible to:

                  ObjectId

              Received:

                  "1234" (typeof: string)

```

# Developers, developers, developers

## Build the library

```bash
yarn build
```

That command generates, in the `dist` directory, traspiled javascript files which will be used when projects import this library.

*Husky will remember to _push_ those files in the `dist` directory to the git repository when pushing.*

## Auto build the library

If you are using this lib and you need to do some modifications too, you could link your application dependency to the directory where you cloned this repo (using `yarn link`).

After modifying the lib code, you should build the library again so that the application can see the changes.

There is a way to automate the build of the library whenever you change its code:

```bash
yarn start
```

Will start a daemon that builds the library and after that it watches for changes to the library code so that when a change occurs the library is rebuilt automatically.
