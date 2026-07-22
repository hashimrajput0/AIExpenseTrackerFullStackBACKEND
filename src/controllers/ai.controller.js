import { transactionModel } from "../models/transaction.model.js";
import { generateSummary } from "../services/gemini.service.js";

async function getAISummaryController(req, res){

    
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
    })
    
    
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

const stats = {
    income,
    expense,
    savingsRate,
    netBalance,

    monthlyTransactions


}

if (monthlyTransactions.length === 0) {
    return res.status(200).json({
        message: "No transactions found for this month.",
        aiResponse: null
    });
}


        const aiResponse = await generateSummary(stats);

        res.status(200).json({
            message : "Succesfully Get data from Gemini",
            aiResponse
        })
    
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message : "Internal Server Error at getAISummaryController",
        })
    
    }
    

}

export {getAISummaryController}