import expess,{ Request, Response, NextFunction } from 'express';
import addbusiness from '../Models/addbusiness';
// import Util Functions
import { UserDisplayName } from '../Util';

// display the customer's dashboard
export function DisplayCustomerIndexPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('customer', { title: 'Dashboard', page: 'index', displayName: UserDisplayName(req) });
}

// display the customer's list of business contacts
export function DisplayListOfBusinesses(req: Request, res: Response, next: NextFunction): void
{
    addbusiness.find({}, null, {sort: {name: 1}}, function(err, addBusinessCollection){
        if(err){
            return console.error(err);
        }
        // print the list of businesses
        res.render('customer/businesslist', { title: "Your List of Businesses", page: "businesslist", addbusiness: addBusinessCollection, displayName: UserDisplayName(req) });
    })
}

// display the customer's add business page - CREATE
export function DisplayAddBusinessPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('customer/addbusiness', { title: "Add Business", page: "addbusiness", addbusiness: '', displayName: UserDisplayName(req) });
}

// process the customer's add business page - POST CREATE
export function ProcessAddBusiness(req: Request, res: Response, next: NextFunction): void
{
    let newBusiness = new addbusiness
    ({
        "bizname": req.body.bizname,
        "bizaddress": req.body.bizaddress,
        "bizdescription": req.body.bizdescription
    });
  
    addbusiness.create(newBusiness, (err) => {
        if(err)
        {
          console.error(err);
          res.end(err);
        }
    
        res.redirect('/customer/addbusiness');
      });
}

// display the edit business page - EDIT
export function DisplayEditBusinessPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    addbusiness.findById(id, {}, {}, (err, addbusinessItemToEdit) => 
        {
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            // show edit view
            res.render('customer/addbusiness', { title: 'Edit', page: 'addbusiness', addbusiness: addbusinessItemToEdit, displayName: UserDisplayName(req) });
        });
}

// process the edit business page - PROCESS EDIT
export function ProcessEditBusinessPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new business item
    let updateAddBusinessItem = new addbusiness
    ({
      "_id": id,
      "bizname": req.body.bizname,
      "bizaddress": req.body.bizaddress,
      "bizdescription": req.body.bizdescription
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    addbusiness.updateOne({_id: id}, updateAddBusinessItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/customer/addbusiness');
    });
}

// Display page for Customer to Rate a Business
export function DisplayRateBusinessPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('customer/ratebusiness', { title: 'Rate The Business', page: 'ratebusiness', displayName: UserDisplayName(req) });
}

