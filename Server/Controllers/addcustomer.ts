import expess,{ Request, Response, NextFunction } from 'express';
import addcustomer from '../Models/addcustomer';
import addbusiness from '../Models/addbusiness';
// import Util Functions
import { UserDisplayName, UserRole } from '../Util';

export function DisplayaddcustomerListPage(req: Request, res:Response,next:NextFunction): void
{
  // addcustomer.find({}, null, {sort: {name: 1}},function(err,addcustomerCollection){
  //   if(err){
  //     return console.error(err);
  //   }
    
  //   //printing list
  //   res.render('owner/addcustomer',{title: 'Add Contact', page: 'addcustomer', addcustomer: addcustomerCollection, displayName: UserDisplayName(req) })
  // }); 

  addcustomer.aggregate([     
      { '$sort': { 'custname': 1} }, 
      { '$lookup':         
        {           
          'from': 'addbusiness',
          'localField': 'businessname',
          'foreignField': '_id',
          'as': 'business'
        }
      }     
    ]).exec(function(err, result){
      if(err){
        return console.error(err);
      }
  
      res.render('owner/addcustomer', {title: 'Add Contact', page: 'addcustomer', addcustomer: result, displayName: UserDisplayName(req), isowner: UserRole(req) });
    });
}

// Display (E)dit page
export async function DisplayaddcustomerEditPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
    let id = req.params.id;
    const businessCollection = await addbusiness.find({})

    addcustomer.findById(id, {}, {}, async (err, addcustomerItemToEdit) => 
    {
       
        if(err)
        {
            console.error(err);
            res.end(err);
        }
       
        console.log(addcustomer);
        // show the edit view
        res.render('owner/update', { title: 'Update', page: 'update', addbusiness: businessCollection, addcustomer: addcustomerItemToEdit, displayName: UserDisplayName(req) });
    });
}

// Process (E)dit page
export function ProcessCustomerEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new customer Item
    let updatedaddcustomerItem = new addcustomer
    ({
      "_id": id,
      "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "businessname": req.body.businessname
    });
  
    // find the customer item via db.customer.update({"_id":id}) and then update
    addcustomer.updateOne({_id: id}, updatedaddcustomerItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/owner/addcustomer');
    });
}

// Display (C)reate page
export async function DisplayCustomerAddPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
  try {
    const businessCollection = await addbusiness.find({})
    res.render('owner/update', { 
    title: 'Add', 
    page: 'update', 
    addcustomer: '', 
    addbusiness: businessCollection,
    displayName: UserDisplayName(req)  });
  } catch  {
    res.redirect('owner/addcustomer');
  }
      
}


// Process (C)reate page
export function ProcessCustomerAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new customer
  let newCustomer = new addcustomer
  ({
    "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "businessname": req.body.businessname
  });

  // db.customer.insert({customer data is here...})
  addcustomer.create(newCustomer, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/addcustomer');
  });
}

// Process (D)elete page
export function ProcessCustomerDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.customer.remove({"_id: id"})
  addcustomer.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/addcustomer');
  });
}

export function DisplayTransactionHistoryPage(req: Request, res: Response, next: NextFunction): void 
{
  addcustomer.find({}, null, { sort: { name: 1 } }, function (err, addcustomerCollection) {
      if (err) {
          return console.error(err);
      }
      res.render('owner/transactionhistory', { title: 'Transaction History', page: 'transactionhistory', addcustomer: addcustomerCollection, displayName: UserDisplayName(req) });
  });
}

//dashboard to customer list
export function ProcessAddCustomer(req: Request, res: Response, next: NextFunction): void
 {
  res.render('owner', { title: 'Contact Us', page: 'addcustomer', displayName: UserDisplayName(req), isowner: UserRole(req)  });
}
