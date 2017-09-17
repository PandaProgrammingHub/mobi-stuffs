/**
 * Created by mobinext4 on 23/8/17.
 */

'use strict';
const sgMail = require('@sendgrid/mail');
import config from '../../config/environment';

sgMail.setApiKey(config.SENDGRID_API_KEY);


function mailMetaData(fromMail, toMail, subject, description,htmlTemplate) {
  let mailOptions = {
    from: fromMail, // sender address
    to: toMail, // list of receivers
    subject: subject, // Subject line
    text: description, // plain text body
    html: htmlTemplate // html body
  };
  return mailOptions;
}

export function sentMail(fromMail, toMail, subject, description, htmlTemplate) {
  var mailOptions = mailMetaData(fromMail, toMail, subject, description, htmlTemplate);
  sgMail.send(mailOptions);
}


