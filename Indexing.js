
// Without Index
const withoutIndex = await User
    .findOne({ email: "deepak@gmail.com" })
    .explain("executionStats");

/*
Scan: COLLSCAN -> collection scan
Documents Examined: 100000
Keys Examined: 0
Documents Returned: 1
*/

// Create index
await User.collection.createIndex({ email: 1 });

// With Index
 const withIndex = await User.findOne({
    email: "user99999@gmail.com",
  }).explain("executionStats");

/*
Scan: IXSCAN -> index scan
Documents Examined: 1
Keys Examined: 1
Documents Returned: 1
*/
