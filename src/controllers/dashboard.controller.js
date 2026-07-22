import { transactionModel } from "../models/transaction.model.js"
import mongoose from "mongoose";
async function summaryDashboardController(req, res) {


try {

    const now = new Date();

const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
);

const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
);

console.log(startOfMonth, endOfMonth);


const monthlyTransactions = await transactionModel.find({
    user : req.userID,
    date : {
        $gte : startOfMonth,
        $lt : endOfMonth
    }
}).sort({ createdAt: -1 })


let income = 0
let expense = 0

for (let i = 0; i < monthlyTransactions.length; i++) {

    if (monthlyTransactions[i].type === "income") {
        income += monthlyTransactions[i].amount;
    }

    if (monthlyTransactions[i].type === "expense") {
        expense += monthlyTransactions[i].amount;
    }

}

const netBalance = income - expense;
const savingsRate =
    income > 0
        ? ((netBalance / income) * 100).toFixed(2)
        : 0;

res.status(200).json({
    income, expense, netBalance, savingsRate, monthlyTransactions
});

} catch(err) {
    return res.status(500).json({
        message : "Internal Server Error at summaryDashboardController",
        err
    })

}


}



async function AllSummary(req, res) {
    
try {
const AllTransactions = await transactionModel.find({
    user : req.userID,
}).sort({ createdAt: -1 })


let income = 0
let expense = 0

for (let i = 0; i < AllTransactions.length; i++) {

    if (AllTransactions[i].type === "income") {
        income += AllTransactions[i].amount;
    }

    if (AllTransactions[i].type === "expense") {
        expense += AllTransactions[i].amount;
    }

}

const netBalance = income - expense;
const savingsRate =
    income > 0
        ? ((netBalance / income) * 100).toFixed(2)
        : 0;



   // Monthly Summary
    const monthlySummary = await transactionModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.userID),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          income: {
            $sum: {
              $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                0,
              ],
            },
          },
          expense: {
            $sum: {
              $cond: [
                { $eq: ["$type", "expense"] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Format Monthly Summary
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedSummary = monthlySummary.map((item) => ({
      month: months[item._id.month - 1],
      year: item._id.year,
      income: item.income,
      expense: item.expense,
      netBalance: item.income - item.expense,
    }));

        res.status(200).json({
    income, expense, netBalance, savingsRate, AllTransactions, formattedSummary
});


} catch(err) {
res.status(500).json({ message : "internal server error",error: err.message
})
}
    
}




export { summaryDashboardController, AllSummary }