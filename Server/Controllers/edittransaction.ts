import expess,{ Request, Response, NextFunction } from 'express';
import transaction from '../Models/transaction';
// import Util Functions
import { UserDisplayName } from '../Util';

// GET new Transaction
export function NewTransaction(req:Request, res:Response, next:NextFunction): void
{
    res.render('owner/edittransaction',{title: 'Add Transaction',
        transaction: [],
        displayName: UserDisplayName(req) 
    })
}

// POST new Transaction
export function CreateNewTransaction(req:Request, res:Response, next:NextFunction): void
{
    let newTransaction = new transaction
    ({
        "customer": req.body.customer,
        "email": req.body.email,
        "amount": req.body.amount,
        "status": req.body.status
    });

    transaction.create(newTransaction, (err) => {
        if(err)
        {
          console.error(err);
          res.end(err);
        }
    
        res.redirect('/owner/transactionhistory');
      });
}

// GET existing Transaction
export function DisplayTransaction(req:Request, res:Response, next:NextFunction): void
{
    let id = req.params.id;

    transaction.findById(id,{},{}, function(err, transaction){
        if(err){
            return console.error(err);
        }
        //printing list
        res.render('owner/edittransaction',{title: 'Edit Transaction',
            transaction: transaction,
            displayName: UserDisplayName(req) 
        })
    }); 
}

// POST edit Transaction details
export function EditTransaction(req:Request, res:Response, next:NextFunction): void
{
    let id = req.params.id

    let updatedTransaction = new transaction({
        "_id": id,
        "customer": req.body.customer,
        "email": req.body.email,
        "amount": req.body.amount,
        "status": req.body.status
    });

    transaction.updateOne({_id: id}, updatedTransaction, {}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/owner/transactionhistory');
        }
    });
}