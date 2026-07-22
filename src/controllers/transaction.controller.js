import { transactionModel } from "../models/transaction.model.js"




async function createTransactionController(req, res) {

    try {
            const { title, amount, type, note, category, date } = req.body


        if (!title || !amount || !type || !category) {
            return res.status(400).json({
                message: "Required fields are missing"
            });
        }

            const transaction = await transactionModel.create({
                title,
                amount,
                type,
                note,
                category,
                date,
                user : req.userID
            })

            res.status(200).json({
                message : "Successfully Created",
                transaction
            })


    }catch( err ) {
        res.status(500).json({
            message : "Internal Server Error at createTransactionController"
        })

    }
}

async function getTransactionController(req, res) {

try {

    

    const transactions = await transactionModel.find({
        user : req.userID
    }).sort({ createdAt: -1 });

    return res.status(200).json({
        transactions
    });


    
} catch(err) {

    res.status(200).json({
        message : "Internal Server Error at getTransactionController"
    })

}

}

async function updateTransactionController(req, res) {
    try {
        const { id } = req.params 

        const updatedTransaction = await transactionModel.findOneAndUpdate(
            { _id : id, user : req.userID }, req.body, { new : true }
        )

        if(!updatedTransaction) {
            return res.status(404).json({
                message : "Transaction Not Found"
            })
        }

        res.status(200).json({
            message : "Successfully Updated",
            updatedTransaction
        })

    }catch(err){
        res.status(500).json({
            message : "Internal Server Error at updateTransactionController"
        })

    }
}

async function deleteTransactionController(req, res) {

try {
        const { id } = req.params 
        const deletedTransaction = await transactionModel.findOneAndDelete(
            { _id : id, user : req.userID }
        )

        if(!deletedTransaction) {
            return res.status(404).json({
                message : "Transaction Not Found"
            })
        }

        res.status(200).json({
            message : "Sucessfully Deleted"
        })

} catch (err) {

    res.status(500).json({
        message : "Internal Server Error at deleteTransactionController"
    })

}



}


export {createTransactionController, getTransactionController, updateTransactionController, deleteTransactionController}