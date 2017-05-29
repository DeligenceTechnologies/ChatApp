import { Mongo } from 'meteor/mongo';


export const Images = new FS.Collection("images", {
    stores: [new FS.Store.GridFS("logoImages", {})]
});

Images.allow({
    'insert': function () {
        // add custom authentication code here
        return true;
    },
    'download': function () {
        return true;
    }
});
