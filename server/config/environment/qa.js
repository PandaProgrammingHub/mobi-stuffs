'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
let DOMAIN = 'http://localhost:9000';
module.exports = {
  DOMAIN,
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://192.168.1.200/salesdoor'
  },

  facebook: {
    clientID: process.env.FACEBOOK_ID || '1532669400109649',
    clientSecret: process.env.FACEBOOK_SECRET || 'e6a7c9169b56682388df23464af4a979',
    callbackURL: `${DOMAIN || ''}/auth/facebook/callback`

  },

  google: {
    clientID: process.env.GOOGLE_ID || '941892409283-iic2p1h0ntoto5nknpcnseeub4oqudee.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'gd_ZF0JeT-nND5t_iKgOkHt5',
    callbackURL: `${DOMAIN || ''}/auth/google/callback`
  },

  linkedin: {
    clientID: process.env.LINKEDIN_ID || '81jnb2172vascc',
    clientSecret: process.env.LINKEDIN_SECRET || 'Fq6CIDlVNWIHCQj9',
    callbackURL: `${DOMAIN || ''}/auth/linkedin/callback`
  },
  // Seed database on startup
  seedDB: false,
  SENDGRID_API_KEY: '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'
};
