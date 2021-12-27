// Initializes the `uploads` service on path `/uploads`
const hooks = require('./uploads.hooks')

const blobService = require('feathers-blob')
const fs = require('fs-blob-store')

const blobStorage = fs('./file.uploads')

const multer = require('multer')
const multipartMiddleware = multer()

module.exports = function (app) {

  app.use('/uploads',
          // multer parses the file named 'uri'.
          // Without extra params the data is temporarely kept in memory
          multipartMiddleware.single('uri'),

          // middleware to transfer the received file to feathers
          function(req, res, next){
              req.feathers.file = req.file
              next()
          },

          blobService({ Model: blobStorage})
        )

  const service = app.service('uploads')

  service.hooks(hooks)

}
