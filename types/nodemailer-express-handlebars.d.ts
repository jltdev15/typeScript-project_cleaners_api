declare module 'nodemailer-express-handlebars' {
  import { Options as NodemailerOptions } from 'nodemailer';
  import { Options as ExpressHandlebarsOptions } from 'express-handlebars';

  interface Options extends NodemailerOptions {
    viewEngine: ExpressHandlebarsOptions;
    viewPath: string;
    extName: string;
  }

  function nodemailerExpressHandlebars(options: Options): any;

  export = nodemailerExpressHandlebars;
}