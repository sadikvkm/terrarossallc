'use-strict';

var knexConn = require('../config/knex');
const knex = knexConn.knexDb()

module.exports = {

  getUploadFile: async(resourceId, type, fieldName = "") => {

    let result = knex
      .from('upload_file_morph')
      .where('related_id', resourceId)
      .where('related_type', type);
    if (fieldName)
        result = result.where('field', fieldName);

      result = result.join('upload_file', 'upload_file_morph.upload_file_id', '=', 'upload_file.id')
      .select('url')
      .first();

    result = await result;
    let image = "";
    if (result) {
      image = process.env.BASE_URL + result.url
    }
    return image;
  }
}
