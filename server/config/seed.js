/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Company from '../api/companies/companies.model';
import CompanyDump from './dumps/CompanyMaster';
import User from '../api/user/user.model';
import Product from '../api/product/product.model';
import ProductDump from './dumps/ProductMaster';
import Location from '../api/location/location.model';
import LocationDump from './dumps/LocationMaster';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    User.find({}).remove()
      .then(() => User.create({
        provider: 'local',
        name: 'Salesdoor Admin',
        email: 'hello@salesdoor.co',
        role: 'admin',
        password: 'SalesDoor124'
      }))
      .then(() => console.log('Removed All user then inserted one. Finished populating Admin User '))
      .catch(err => console.log('error populating  Admin User', err));

    Product.find({}).remove()
      .then(() => Product.create(ProductDump.ProductMaster))
      .then(() => console.log('finished populating Products'))
      .catch(err => console.log('error populating Products', err));

    Location.find({}).remove()
      .then(() => Location.create(LocationDump.LocationMaster))
      .then(() => console.log('finished populating Locations'))
      .catch(err => console.log('error populating Locations', err));

    Company.find({}).remove()
      .then(() => Company.create(CompanyDump.CompanyMaster))
      .then(() => console.log('finished populating Companies'))
      .catch(err => console.log('error populating Companies', err));
  }
}
