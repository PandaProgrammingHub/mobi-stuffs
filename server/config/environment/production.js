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
    clientID: process.env.FACEBOOK_ID || '478177969209798',
    clientSecret: process.env.FACEBOOK_SECRET || '0452142ad019c5837311aa511af892e3',
    callbackURL: `${DOMAIN || ''}/auth/facebook/callback`

  },

  google: {
    clientID: process.env.GOOGLE_ID || '582456822443-vpa8l8mt9svfrmggq2l7slpj238guh96.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'aRz3tQEjMGhHOI0jlp2YxiCh',
    callbackURL: `${DOMAIN || ''}/auth/google/callback`
  },

  linkedin: {
    clientID: process.env.LINKEDIN_ID || '78erhmbrh9jce2',
    clientSecret: process.env.LINKEDIN_SECRET || 'UE7rVjkynWU1N0pf',
    callbackURL: `${DOMAIN || ''}/auth/linkedin/callback`
  },
  // Seed database on startup
  seedDB: false,
  SENDGRID_API_KEY: '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'
};
