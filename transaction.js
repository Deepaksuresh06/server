const session = await mongoose.startSession();

try {
  session.startTransaction();

  // Update the sender account balance
  await Account.updateOne(
    { _id: fromAccount },
    { $inc: { balance: -amount } },
    { session }
  );

  // update the receiver account balance
  await Account.updateOne(
    { _id: toAccount },
    { $inc: { balance: amount } },
    { session }
  );

  await session.commitTransaction();

} 
catch (error) {

  // If any error occurs, abort the transaction
  await session.abortTransaction();
} 
finally {
  session.endSession();
}