import _ from 'lodash';
const ProductMaster = [
  { name: 'Applications - Desktop & Enterprise' },
  { name: 'Business Integration' },
  { name: 'Business Intelligence and Financial Performance Management' },
  { name: 'Commerce' },
  { name: 'Data Warehouse and Industry Data Models' },
  { name: 'Enterprise Content Management' },
  { name: 'Host Transaction Processing' },
  { name: 'Information Integration and Master Data Management' },
  { name: 'Messaging Applications' },
  { name: 'Mobile, Speech and Enterprise Access' },
  { name: 'Networking' },
  { name: 'Operating Systems' },
  { name: 'Organizational Productivity, Portals and Collaboration' },
  { name: 'Product Lifecycle Management (PLM)' },
  { name: 'Security' },
  { name: 'Software Development' },
  { name: 'Storage Management' },
  { name: 'Systems and Asset Management' },
];

module.exports = {
  ProductMaster: _.uniqBy(ProductMaster, 'name')
};




















